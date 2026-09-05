import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ApiMessages } from "./ApiWorker";
import type * as ApiWorkerClientModule from "./ApiWorkerClient";
import { FetchError } from "./ApiWorkerClient";
import type { ApiError, ApiResponse } from "./ApiWorkerReponse";

/**
 * The worker entry point wires a message handler onto the worker global and is
 * never imported by anything else, so these tests load it fresh with the global
 * stubbed, capture the handler it registers, and drive it directly.
 */

// Hoisted so the `vi.mock` factories below, which run before the module body, can see them.
const { workerClient, tokenStorage } = vi.hoisted(() => ({
  workerClient: {
    tokenRequest: vi.fn(),
    refreshToken: vi.fn(),
    removeToken: vi.fn(),
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
  tokenStorage: {
    setToken: vi.fn(),
    clearToken: vi.fn(),
    getToken: vi.fn().mockReturnValue(null),
  },
}));

vi.mock("../Client/FetchClient", () => ({ client: {} }));
vi.mock("../Token/TokenStorage", () => tokenStorage);
vi.mock("./ApiWorkerClient", async (importOriginal) => {
  const original = await importOriginal<typeof ApiWorkerClientModule>();
  // A plain function, not `vi.fn`, so `new ApiWorkerClient(...)` in the worker works.
  return {
    ...original,
    ApiWorkerClient: function ApiWorkerClientStub(): typeof workerClient {
      return workerClient;
    },
  };
});

type MessageHandler = (event: MessageEvent<ApiMessages>) => Promise<void>;

/** Loads the worker module and hands back the handler it registered. */
async function loadWorker(): Promise<MessageHandler> {
  let handler: MessageHandler | null = null;
  vi.stubGlobal("addEventListener", (type: string, listener: MessageHandler) => {
    if (type === "message") handler = listener;
  });

  vi.resetModules();
  await import("./ApiWorker");

  if (!handler) throw new Error("The worker did not register a message handler");
  return handler;
}

/** Sends one message through the worker and returns what it posted back. */
async function send(handler: MessageHandler, data: ApiMessages): Promise<ApiResponse | ApiError> {
  const postMessage = vi.fn();
  await handler({ data, ports: [{ postMessage }] } as unknown as MessageEvent<ApiMessages>);

  expect(postMessage).toHaveBeenCalledTimes(1);
  return postMessage.mock.calls[0]![0] as ApiResponse | ApiError;
}

function jsonResponse(body: unknown, status = 200, statusText = "OK"): Response {
  return { status, statusText, json: vi.fn().mockResolvedValue(body) } as unknown as Response;
}

let handler: MessageHandler;

beforeEach(async () => {
  vi.clearAllMocks();
  handler = await loadWorker();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("the worker's message port", () => {
  it("does nothing when no port came with the message", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);

    await handler({ data: { type: "token/refresh" }, ports: [] } as unknown as MessageEvent<ApiMessages>);

    expect(consoleError).toHaveBeenCalledWith("No port provided");
    expect(workerClient.refreshToken).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });
});

describe("token messages", () => {
  it("stores the token a login returns", async () => {
    workerClient.tokenRequest.mockResolvedValue("jwt-from-login");
    const payload = { email: "root@admin.com", password: "password" };

    const response = await send(handler, { type: "token/request", payload });

    expect(workerClient.tokenRequest).toHaveBeenCalledWith(payload);
    expect(tokenStorage.setToken).toHaveBeenCalledWith("jwt-from-login");
    expect(response).toEqual({ data: null, status: 200, statusText: "OK" });
  });

  it("stores the token a refresh returns", async () => {
    workerClient.refreshToken.mockResolvedValue("jwt-from-refresh");

    const response = await send(handler, { type: "token/refresh" });

    expect(tokenStorage.setToken).toHaveBeenCalledWith("jwt-from-refresh");
    expect(response).toEqual({ data: null, status: 200, statusText: "OK" });
  });

  it("clears the token on logout", async () => {
    workerClient.removeToken.mockResolvedValue(undefined);

    const response = await send(handler, { type: "user/logout" });

    expect(workerClient.removeToken).toHaveBeenCalled();
    expect(tokenStorage.clearToken).toHaveBeenCalled();
    expect(response).toEqual({ data: null, status: 200, statusText: "OK" });
  });
});

describe("request messages", () => {
  const methods = [
    { type: "request/get", method: "get" },
    { type: "request/delete", method: "delete" },
  ] as const;

  methods.forEach(({ type, method }) => {
    it(`passes a ${type} through to the client and returns its body`, async () => {
      workerClient[method].mockResolvedValue(jsonResponse({ ok: true }));

      const response = await send(handler, { type, url: "/api/personal/profile" });

      expect(workerClient[method]).toHaveBeenCalledWith("/api/personal/profile");
      expect(response).toEqual({ data: { ok: true }, status: 200, statusText: "OK" });
    });
  });

  const bodyMethods = [
    { type: "request/post", method: "post" },
    { type: "request/put", method: "put" },
    { type: "request/patch", method: "patch" },
  ] as const;

  bodyMethods.forEach(({ type, method }) => {
    it(`passes a ${type} and its payload through to the client`, async () => {
      workerClient[method].mockResolvedValue(jsonResponse({ id: 1 }, 201, "Created"));

      const response = await send(handler, { type, url: "/api/users", payload: { name: "Ada" } });

      expect(workerClient[method]).toHaveBeenCalledWith("/api/users", { name: "Ada" });
      expect(response).toEqual({ data: { id: 1 }, status: 201, statusText: "Created" });
    });

    it(`reads no body from an empty ${type} response`, async () => {
      const noContent = jsonResponse(null, 204, "No Content");
      workerClient[method].mockResolvedValue(noContent);

      const response = await send(handler, { type, url: "/api/users", payload: {} });

      expect(response).toEqual({ data: null, status: 204, statusText: "No Content" });
      expect(noContent.json).not.toHaveBeenCalled();
    });
  });

  it("reads no body from an empty GET response", async () => {
    workerClient.get.mockResolvedValue(jsonResponse(null, 204, "No Content"));

    const response = await send(handler, { type: "request/get", url: "/api/personal/profile" });

    expect(response).toEqual({ data: null, status: 204, statusText: "No Content" });
  });

  it("reads no body from an empty DELETE response", async () => {
    workerClient.delete.mockResolvedValue(jsonResponse(null, 204, "No Content"));

    const response = await send(handler, { type: "request/delete", url: "/api/users/1" });

    expect(response).toEqual({ data: null, status: 204, statusText: "No Content" });
  });
});

describe("unknown messages", () => {
  it("answers with a 400 rather than going quiet", async () => {
    const response = (await send(handler, { type: "nonsense" } as unknown as ApiMessages)) as ApiError;

    expect(response.status).toBe(400);
    expect(response.code).toBe("UNKNOWN_REQUEST");
  });
});

describe("errors", () => {
  it("passes a fetch error's status and code back to the caller", async () => {
    workerClient.get.mockRejectedValue(new FetchError("Unauthorized", 401, "Unauthorized", undefined, "AUTH"));

    const response = (await send(handler, { type: "request/get", url: "/api/personal/profile" })) as ApiError;

    expect(response.status).toBe(401);
    expect(response.code).toBe("AUTH");
    expect(response.message).toBe("Unauthorized");
  });

  it("turns anything else into a 500", async () => {
    workerClient.post.mockRejectedValue(new Error("socket hang up"));

    const response = (await send(handler, { type: "request/post", url: "/api/users" })) as ApiError;

    expect(response).toEqual({ name: "Unknown error", message: "socket hang up", status: 500 });
  });
});

describe("demo mode", () => {
  beforeEach(async () => {
    vi.stubEnv("VITE_DEMO_MODE", "true");
    handler = await loadWorker();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("answers a GET from canned data instead of the network", async () => {
    const response = (await send(handler, {
      type: "request/get",
      url: "/api/personal/profile",
    })) as ApiResponse<{ email: string }>;

    expect(workerClient.get).not.toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(response.data?.email).toBe("demo@example.com");
  });

  it("has canned data for the dashboard and the app info", async () => {
    const dashboard = (await send(handler, { type: "request/get", url: "/api/dashboard" })) as ApiResponse<{
      stats: unknown;
    }>;
    expect(dashboard.data?.stats).toBeDefined();

    const info = (await send(handler, { type: "request/get", url: "/api/application/info" })) as ApiResponse<{
      version: string;
    }>;
    expect(info.data?.version).toBe("demo");
  });

  it("answers a URL it has no canned data for with null", async () => {
    const response = (await send(handler, { type: "request/get", url: "/api/unknown" })) as ApiResponse;

    expect(response.data).toBeNull();
  });

  it("still goes to the network for anything that is not a GET", async () => {
    workerClient.post.mockResolvedValue(jsonResponse({ ok: true }));

    await send(handler, { type: "request/post", url: "/api/users", payload: {} });

    expect(workerClient.post).toHaveBeenCalled();
  });
});

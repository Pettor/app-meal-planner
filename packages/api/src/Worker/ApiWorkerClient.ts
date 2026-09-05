import { produce } from "immer";
import type { LoginData } from "../Api/Login/Types";
import type { FetchClient } from "../Client/FetchClient";
import type { JwtToken } from "../Token/JwtToken";
import { getToken } from "../Token/TokenStorage";
import { tokenSchema } from "./ApiWorkerClasses";

export class FetchError extends Error {
  public readonly status: number;
  public readonly statusText: string;
  public readonly response?: Response;
  public readonly code?: string;
  public readonly cause?: Error;

  constructor(message: string, status: number, statusText: string, response?: Response, code?: string, cause?: Error) {
    super(message);
    this.name = "FetchError";
    this.status = status;
    this.statusText = statusText;
    this.response = response;
    this.code = code;
    this.cause = cause;
  }
}

export function isFetchError(error: unknown): error is FetchError {
  return error instanceof FetchError;
}

/**
 * Passes an ok response through, and turns a failed one into a `FetchError`.
 *
 * A non-ok response is still a resolved `fetch`, so without this every 4xx and
 * 5xx would travel back to the app as an ordinary `ApiResponse` and read as
 * success — a rejected sign-up would look like a completed one. The worker
 * catches `FetchError` and reports its status, which is what the route hooks
 * map onto the message the user sees.
 */
function throwOnFailure(response: Response): Response {
  if (!response.ok) {
    throw new FetchError(`HTTP error! status: ${response.status}`, response.status, response.statusText, response);
  }
  return response;
}

export class ApiWorkerClient {
  private readonly TOKEN_API_URL = "/api/tokens";
  private readonly REFRESH_TOKEN_API_URL = "/api/tokens/refresh";

  private _client: FetchClient;
  private _defaultHeaders: Record<string, string>;
  private _defaultConfig: Record<string, unknown>;
  private _allowedUrls: string[];
  private _isRefreshing: boolean = false;
  private _refreshPromise: Promise<JwtToken> | null = null;

  constructor(client: FetchClient, allowedUrls: string[], tenant = "root") {
    this._client = client;
    this._allowedUrls = allowedUrls;

    this._defaultHeaders = {
      tenant,
    };

    this._defaultConfig = {
      headers: this._defaultHeaders,
    };
  }

  public async tokenRequest(data: LoginData): Promise<JwtToken> {
    const response = await this._client.request(this.TOKEN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this._defaultHeaders,
      },
      body: JSON.stringify(data),
    });

    throwOnFailure(response);

    const responseData = await response.json();
    const { token } = await tokenSchema.parseAsync(responseData);
    return token;
  }

  public async removeToken(): Promise<Response> {
    return await this._client.request(this.TOKEN_API_URL, {
      method: "DELETE",
      headers: this._defaultHeaders,
    });
  }

  public async refreshToken(): Promise<JwtToken> {
    if (this._isRefreshing && this._refreshPromise) {
      return this._refreshPromise;
    }

    this._isRefreshing = true;
    this._refreshPromise = this._performTokenRefresh();

    try {
      const token = await this._refreshPromise;
      return token;
    } finally {
      this._isRefreshing = false;
      this._refreshPromise = null;
    }
  }

  private async _performTokenRefresh(): Promise<JwtToken> {
    const response = await this._client.request(this.REFRESH_TOKEN_API_URL, {
      method: "GET",
      headers: this._defaultHeaders,
    });

    throwOnFailure(response);

    const responseData = await response.json();
    const { token } = await tokenSchema.parseAsync(responseData);
    return token;
  }

  public async patch(url: string, data?: unknown): Promise<Response> {
    this.checkUrl(url);
    return await this._requestWithRetry(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...this.createHeaders(),
      },
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public async post(url: string, data?: unknown): Promise<Response> {
    this.checkUrl(url);
    return await this._requestWithRetry(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.createHeaders(),
      },
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public async put(url: string, data?: unknown): Promise<Response> {
    this.checkUrl(url);
    return await this._requestWithRetry(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...this.createHeaders(),
      },
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public async get(url: string): Promise<Response> {
    this.checkUrl(url);
    return await this._requestWithRetry(url, {
      method: "GET",
      headers: this.createHeaders(),
    });
  }

  public async delete(url: string): Promise<Response> {
    this.checkUrl(url);
    return await this._requestWithRetry(url, {
      method: "DELETE",
      headers: this.createHeaders(),
    });
  }

  private async _requestWithRetry(url: string, options: RequestInit): Promise<Response> {
    const response = await this._client.request(url, options);

    // If unauthorized and not already a refresh token request, try to refresh and retry
    if (response.status === 401 && !url.includes(this.REFRESH_TOKEN_API_URL)) {
      let retried: Response;

      try {
        await this.refreshToken();

        // Retry request with new token
        const retryOptions = {
          ...options,
          headers: {
            ...options.headers,
            ...this.createHeaders(),
          },
        };

        retried = await this._client.request(url, retryOptions);
      } catch {
        // The refresh failed, so the original 401 is the real answer.
        return throwOnFailure(response);
      }

      // Outside the catch, so a failed retry is reported as itself rather than
      // being mistaken for a failed refresh.
      return throwOnFailure(retried);
    }

    return throwOnFailure(response);
  }

  private createConfig(): Record<string, unknown> {
    return produce<Record<string, unknown>>(this._defaultConfig, (draft) => {
      draft.headers = this.createHeaders();
    });
  }

  private createHeaders(): Record<string, string> {
    return produce<Record<string, string>>(this._defaultHeaders, (draft) => {
      draft["Authorization"] = `Bearer ${getToken()}`;
    });
  }

  private checkUrl(url: string): void {
    if (!this.isAllowedUrl(url)) {
      throw new Error(`URL ${url} is not allowed`);
    }
  }

  private isAllowedUrl(url: string): boolean {
    return this._allowedUrls.some((allowedUrl) => url.startsWith(allowedUrl));
  }
}

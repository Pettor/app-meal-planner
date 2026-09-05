import { createConnection } from "net";

/**
 * Admin API port of this project's Mocks Server, set in `tools/mock/mocks.config.js`.
 *
 * It is deliberately off the 3110 default: another checkout of the template
 * running its own mock server would otherwise answer here, and the suite would
 * drive that server instead of this one — passing while testing the wrong thing.
 */
export const MOCK_ADMIN_API_PORT = 3210;

/** Resolves once something accepts TCP connections on the port, or rejects at the deadline. */
export function waitForPort(port: number, host: string, timeout: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + timeout;
    function attempt(): void {
      const socket = createConnection(port, host);
      socket.once("connect", () => {
        socket.destroy();
        resolve();
      });
      socket.once("error", () => {
        socket.destroy();
        if (Date.now() >= deadline) {
          reject(new Error(`${host}:${port} not ready within ${timeout}ms`));
        } else {
          setTimeout(attempt, 500);
        }
      });
    }

    attempt();
  });
}

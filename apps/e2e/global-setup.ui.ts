import { MOCK_ADMIN_API_PORT, waitForPort } from "./wait-for-port";

async function globalSetup(): Promise<void> {
  const timeout = 60_000;
  await Promise.all([waitForPort(4240, "localhost", timeout), waitForPort(MOCK_ADMIN_API_PORT, "127.0.0.1", timeout)]);
}

export default globalSetup;

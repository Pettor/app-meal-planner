export function useAppInfo(): {
  appName: string;
  appNameCapital: string;
} {
  const appName = "Meal Planner";
  const appNameCapital = appName.toUpperCase();

  return {
    appName,
    appNameCapital,
  };
}

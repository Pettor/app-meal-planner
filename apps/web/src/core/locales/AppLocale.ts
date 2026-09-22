/** An interface language the app ships. */
export type AppLocale = "en" | "sv";

/** Every interface language, in the order the settings modal offers them. */
export const SupportedLocales: AppLocale[] = ["en", "sv"];

export function isAppLocale(value: string): value is AppLocale {
  return (SupportedLocales as string[]).includes(value);
}

/**
 * The shipped locale that best matches a browser language tag.
 *
 * Tags carry a region (`sv-SE`), so only the language subtag is compared;
 * anything the app has no interface for falls back to English.
 */
export function resolveAppLocale(languageTag: string): AppLocale {
  const language = languageTag.split("-")[0]?.toLowerCase() ?? "";
  return isAppLocale(language) ? language : "en";
}

import { atomWithStorage } from "jotai/utils";
import type { AppLocale } from "~/core/locales/AppLocale";
import { resolveAppLocale } from "~/core/locales/AppLocale";
import { StorageOptions } from "~/core/storage/StorageOptions";

/**
 * The interface language, chosen in settings.
 *
 * Starts from the browser's own preference and is persisted from then on, so a
 * cook who picks a language keeps it across visits regardless of the browser.
 */
export const appLocaleAtom = atomWithStorage<AppLocale>(
  "settings.locale",
  resolveAppLocale(navigator.language),
  undefined,
  StorageOptions
);

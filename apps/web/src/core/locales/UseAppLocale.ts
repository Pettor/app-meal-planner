import { useAtom } from "jotai";
import type { AppLocale } from "~/core/locales/AppLocale";
import { appLocaleAtom } from "~/core/locales/LocaleAtoms";

export interface UseAppLocaleResult {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
}

/** Read and write the interface language. */
export function useAppLocale(): UseAppLocaleResult {
  const [locale, setLocale] = useAtom(appLocaleAtom);
  return { locale, setLocale };
}

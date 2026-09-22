import type { ComponentProps, ReactElement } from "react";
import { IntlProvider, ReactIntlErrorCode } from "react-intl";
import type { AppLocale } from "~/core/locales/AppLocale";
import svMessages from "~/core/locales/messages/sv.json";
import { useAppLocale } from "~/core/locales/UseAppLocale";

interface Props {
  children: ReactElement;
}

/**
 * Translations per interface language, keyed by message id.
 *
 * English is the source language and lives in the `defaultMessage` of every
 * call site, so it needs no catalogue of its own; every other language ships
 * one and falls back to `defaultMessage` for anything not translated yet.
 * Regenerate the English side with `pnpm --filter=@app/web intl:extract`.
 */
const Messages: Record<AppLocale, Record<string, string>> = {
  en: {},
  sv: svMessages,
};

/** Exactly what `IntlProvider` hands `onError`, without naming its internals. */
type IntlProviderError = Parameters<NonNullable<ComponentProps<typeof IntlProvider>["onError"]>>[0];

function handleIntlError(error: IntlProviderError): void {
  // Falling back to `defaultMessage` is the expected state for every message a
  // catalogue has not caught up with yet, so it is not worth reporting.
  if (error.code === ReactIntlErrorCode.MISSING_TRANSLATION) return;
  console.error(error);
}

export function AppLocales({ children }: Props): ReactElement {
  const { locale } = useAppLocale();

  return (
    <IntlProvider locale={locale} defaultLocale="en" messages={Messages[locale]} onError={handleIntlError}>
      {children}
    </IntlProvider>
  );
}

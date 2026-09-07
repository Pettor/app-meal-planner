import type { ComponentProps, ReactElement } from "react";
import type { MessageFormatElement } from "react-intl";
import { IntlProvider, ReactIntlErrorCode } from "react-intl";
import type { AppLocale } from "~/core/locales/AppLocale";
import { useAppLocale } from "~/core/locales/UseAppLocale";

interface Props {
  children: ReactElement;
}

/**
 * Compiled translations per interface language.
 *
 * Only English is extracted so far; the other languages fall back to each
 * message's `defaultMessage`, while dates, numbers and plurals already format
 * in the chosen locale.
 */
const Messages: Record<AppLocale, Record<string, MessageFormatElement[]>> = {
  en: {},
  sv: {},
};

/** Exactly what `IntlProvider` hands `onError`, without naming its internals. */
type IntlProviderError = Parameters<NonNullable<ComponentProps<typeof IntlProvider>["onError"]>>[0];

function handleIntlError(error: IntlProviderError): void {
  // Falling back to `defaultMessage` is the expected state for every language
  // without a compiled catalogue yet, so it is not worth reporting.
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

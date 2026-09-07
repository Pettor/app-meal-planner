import type { ReactElement } from "react";
import { LanguageIcon } from "@heroicons/react/24/outline";
import { useIntl } from "react-intl";
import { SettingsOptionRow } from "./SettingsOptionRow";
import type { AppLocale } from "~/core/locales/AppLocale";

export interface SettingsLanguageSectionProps {
  locale: AppLocale;
  onSelect: (locale: AppLocale) => void;
}

/**
 * The interface language.
 *
 * Each language is named in itself, so it is readable to whoever is looking for
 * it; the aside names it in the current interface language where that differs.
 */
export function SettingsLanguageSection({ locale, onSelect }: SettingsLanguageSectionProps): ReactElement {
  const intl = useIntl();

  const options: { locale: AppLocale; label: string; note?: string }[] = [
    { locale: "en", label: "English" },
    {
      locale: "sv",
      label: "Svenska",
      note: intl.formatMessage({
        description: "SettingsLanguageSection: note - swedish named in the interface language",
        defaultMessage: "Swedish",
        id: "6t3goo",
      }),
    },
  ];

  return (
    <>
      {options.map((option) => (
        <SettingsOptionRow
          key={option.locale}
          icon={<LanguageIcon className="size-4.75" />}
          label={option.label}
          note={option.note}
          isSelected={locale === option.locale}
          onSelect={() => onSelect(option.locale)}
        />
      ))}
    </>
  );
}

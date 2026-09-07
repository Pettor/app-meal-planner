import type { ReactElement } from "react";
import type { ThemeSelectorProps } from "~/components/actions/theme-selector/ThemeSelector";
import { ThemeSelector } from "~/components/actions/theme-selector/ThemeSelector";

export interface SettingsAppearanceSectionProps {
  themeSelector: ThemeSelectorProps;
}

/** Light, dark or follow the OS — each shown as a miniature of the theme it picks. */
export function SettingsAppearanceSection({ themeSelector }: SettingsAppearanceSectionProps): ReactElement {
  return <ThemeSelector {...themeSelector} />;
}

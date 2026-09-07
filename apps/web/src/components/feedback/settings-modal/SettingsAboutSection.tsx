import type { ReactElement } from "react";
import { AboutDetails, type AboutDetailsProps } from "~/components/feedback/about-details/AboutDetails";

export interface SettingsAboutSectionProps extends AboutDetailsProps {}

export function SettingsAboutSection(props: SettingsAboutSectionProps): ReactElement {
  return <AboutDetails {...props} />;
}

import { useMemo, useState } from "react";
import { fetchApplicationInfoQuery, fetchPersonalProfileQuery } from "@package/api";
import { useQuery } from "@tanstack/react-query";
import type { SettingsModalProps } from "./SettingsModal";
import { useThemeSelector } from "~/components/actions/theme-selector/UseThemeSelector";
import { getAuthStatus } from "~/core/auth/AuthState";
import { useAppInfo } from "~/core/config/UseAppInfo";
import { useAppLocale } from "~/core/locales/UseAppLocale";
import { SampleTagCatalogue } from "~/core/recipes/RecipeSampleData";
import { useDefaultTags } from "~/core/settings/UseDefaultTags";
import { useSettingsData } from "~/core/settings/UseSettingsData";
import { useSettingsModal } from "~/core/settings/UseSettingsModal";

export function useSettingsModalController(): SettingsModalProps {
  const { isOpen, initialSection, sections, close } = useSettingsModal();
  const { appName } = useAppInfo();
  const themeSelector = useThemeSelector();
  const { locale, setLocale } = useAppLocale();
  const { pinnedTags, togglePinnedTag } = useDefaultTags();
  const settingsData = useSettingsData();
  const isAuthenticated = getAuthStatus() === "authenticated";

  const [isTagBrowserOpen, setIsTagBrowserOpen] = useState(false);

  const { data: profileInfo } = useQuery({
    ...fetchPersonalProfileQuery(),
    enabled: isAuthenticated,
  });
  const { data: appInfo } = useQuery({
    ...fetchApplicationInfoQuery(),
    enabled: isOpen,
  });

  const account = useMemo(() => {
    if (!isAuthenticated) return undefined;
    return {
      name: profileInfo ? `${profileInfo.firstName} ${profileInfo.lastName}` : "",
      email: profileInfo?.email ?? "",
    };
  }, [isAuthenticated, profileInfo]);

  const aboutDetails = useMemo(
    () => ({
      appName,
      appVersion: import.meta.env.VITE_APP_VERSION,
      serverVersion: appInfo?.version ?? "",
    }),
    [appName, appInfo]
  );

  return {
    isOpen,
    sections,
    initialSection,
    onClose: close,
    account,
    appearance: { themeSelector },
    language: { locale, onSelect: setLocale },
    defaultTags: isAuthenticated
      ? {
          tags: pinnedTags,
          catalogue: SampleTagCatalogue,
          isBrowserOpen: isTagBrowserOpen,
          onToggleTag: togglePinnedTag,
          onOpenBrowser: () => setIsTagBrowserOpen(true),
          onCloseBrowser: () => setIsTagBrowserOpen(false),
        }
      : undefined,
    data: isAuthenticated ? settingsData : undefined,
    aboutDetails,
  };
}

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { SettingsSection } from "./SettingsSection";
import { DefaultPinnedTags } from "~/core/plan/PlanUtils";

export interface SettingsModalState {
  isOpen: boolean;
  initialSection?: SettingsSection;
}

export const settingsModalAtom = atom<SettingsModalState>({ isOpen: false });

/**
 * The tags offered first whenever the cook sets quotas for a week.
 *
 * Settings owns them — "Your default tags" is where they are curated — and the
 * plan wizard reads from here, so an edit in either place sticks.
 */
export const pinnedTagsAtom = atomWithStorage<string[]>("settings.pinnedTags", DefaultPinnedTags);

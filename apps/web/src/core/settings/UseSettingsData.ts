import { useState } from "react";
import { useAtom } from "jotai";
import { pinnedTagsAtom } from "./SettingsAtoms";
import type { SettingsSnapshot } from "./SettingsSnapshot";
import { SettingsSnapshotVersion, formatSettingsSnapshot, parseSettingsSnapshot } from "./SettingsSnapshot";
import { savedPlansAtom, selectedWeekKeyAtom } from "~/core/plan/PlanAtoms";
import { DefaultPinnedTags, thisWeekKey } from "~/core/plan/PlanUtils";
import { savedRecipeIdsAtom } from "~/core/recipes/RecipeAtoms";
import { SampleRecipes } from "~/core/recipes/RecipeSampleData";

/** What the last action did, so the section can say so without holding the copy itself. */
export type SettingsDataStatus = "idle" | "applied" | "invalid" | "reset";

export interface UseSettingsDataResult {
  /** The editor's text: the current data until the cook edits it, their draft after. */
  json: string;
  status: SettingsDataStatus;
  onJsonChange: (json: string) => void;
  onApply: () => void;
  onDownload: () => void;
  onReset: () => void;
}

const DownloadFileName = "meal-planner-data.json";

/**
 * The cook's data as one editable JSON blob.
 *
 * Reads straight from the atoms the rest of the app writes to, so the editor is
 * never stale, and writes back through the same atoms so an applied blob lands
 * in local storage exactly as a normal edit would.
 */
export function useSettingsData(): UseSettingsDataResult {
  const [savedRecipeIds, setSavedRecipeIds] = useAtom(savedRecipeIdsAtom);
  const [pinnedTags, setPinnedTags] = useAtom(pinnedTagsAtom);
  const [plans, setPlans] = useAtom(savedPlansAtom);
  const [selectedWeekKey, setSelectedWeekKey] = useAtom(selectedWeekKeyAtom);

  const [draft, setDraft] = useState<string | null>(null);
  const [status, setStatus] = useState<SettingsDataStatus>("idle");

  const snapshot: SettingsSnapshot = {
    version: SettingsSnapshotVersion,
    savedRecipeIds,
    pinnedTags,
    plans,
    selectedWeekKey,
  };

  function write(next: SettingsSnapshot): void {
    setSavedRecipeIds(next.savedRecipeIds);
    setPinnedTags(next.pinnedTags);
    setPlans(next.plans);
    setSelectedWeekKey(next.selectedWeekKey);
  }

  function onApply(): void {
    const parsed = parseSettingsSnapshot(draft ?? formatSettingsSnapshot(snapshot));
    if (!parsed) {
      setStatus("invalid");
      return;
    }

    write(parsed);
    // Dropping the draft hands the editor back to the atoms, so what is on
    // screen after applying is what the app actually holds.
    setDraft(null);
    setStatus("applied");
  }

  function onDownload(): void {
    const blob = new Blob([formatSettingsSnapshot(snapshot)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = DownloadFileName;
    link.click();
    URL.revokeObjectURL(url);
  }

  function onReset(): void {
    write({
      version: SettingsSnapshotVersion,
      savedRecipeIds: SampleRecipes.filter((recipe) => recipe.isSaved).map((recipe) => recipe.id),
      pinnedTags: DefaultPinnedTags,
      plans: {},
      selectedWeekKey: thisWeekKey(),
    });
    setDraft(null);
    setStatus("reset");
  }

  return {
    json: draft ?? formatSettingsSnapshot(snapshot),
    status,
    onJsonChange: (json) => {
      setDraft(json);
      setStatus("idle");
    },
    onApply,
    onDownload,
    onReset,
  };
}

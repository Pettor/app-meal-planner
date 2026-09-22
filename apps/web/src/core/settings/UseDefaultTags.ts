import { useAtom } from "jotai";
import { pinnedTagsAtom } from "./SettingsAtoms";

export interface UseDefaultTagsResult {
  /** Tags offered first when setting quotas for a week. */
  pinnedTags: string[];
  togglePinnedTag: (tag: string) => void;
  removePinnedTag: (tag: string) => void;
}

/** Read and write the cook's default tags. */
export function useDefaultTags(): UseDefaultTagsResult {
  const [pinnedTags, setPinnedTags] = useAtom(pinnedTagsAtom);

  return {
    pinnedTags,
    togglePinnedTag: (tag) =>
      setPinnedTags((current) => (current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag])),
    removePinnedTag: (tag) => setPinnedTags((current) => current.filter((t) => t !== tag)),
  };
}

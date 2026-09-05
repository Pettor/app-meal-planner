import { useMemo, useState } from "react";
import type { FeedEntry, FeedScope, FeedTagCount, SharedWeek } from "~/core/community/CommunityTypes";
import { buildFeed, feedEntryOwnerId, feedTagCounts, matchesTagFilter } from "~/core/community/CommunityUtils";
import type { Recipe } from "~/core/recipes/RecipeTypes";

export interface UseCommunityFeedResult {
  scope: FeedScope;
  setScope: (scope: FeedScope) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  clearTags: () => void;
  hasTagFilter: boolean;
  /** Tags offered as filters, counted against the entries in scope. */
  tagChips: FeedTagCount[];
  entries: FeedEntry[];
  isEmpty: boolean;
}

/**
 * The feed's own state: whose activity it shows and which tags it is narrowed
 * to. Scope is applied before the tag counts so the chips describe what is
 * actually on screen rather than the whole community.
 */
export function useCommunityFeed(weeks: SharedWeek[], recipes: Recipe[], following: string[]): UseCommunityFeedResult {
  const [scope, setScope] = useState<FeedScope>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const inScope = useMemo(() => {
    const all = buildFeed(weeks, recipes);
    if (scope === "all") return all;
    return all.filter((entry) => following.includes(feedEntryOwnerId(entry, recipes)));
  }, [weeks, recipes, following, scope]);

  const tagChips = useMemo(() => feedTagCounts(inScope, recipes), [inScope, recipes]);

  const entries = useMemo(
    () => inScope.filter((entry) => matchesTagFilter(entry, recipes, selectedTags)),
    [inScope, recipes, selectedTags]
  );

  function toggleTag(tag: string): void {
    setSelectedTags((current) => (current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag]));
  }

  return {
    scope,
    setScope,
    selectedTags,
    toggleTag,
    clearTags: () => setSelectedTags([]),
    hasTagFilter: selectedTags.length > 0,
    tagChips,
    entries,
    isEmpty: entries.length === 0,
  };
}

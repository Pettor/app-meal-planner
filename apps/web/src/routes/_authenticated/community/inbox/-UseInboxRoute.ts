import { useEffect, useMemo } from "react";
import { toast } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { useIntl } from "react-intl";
import { loadWeekTargetAtom } from "~/core/community/CommunityAtoms";
import { sharedWeekDays, sharedWeekTags } from "~/core/community/CommunityUtils";
import { UseCommunity } from "~/core/community/UseCommunity";
import { UseRecipes } from "~/core/recipes/UseRecipes";
import type { InboxCardViewModel } from "~/views/community/InboxCard";
import type { InboxViewProps } from "~/views/community/InboxView";
import { communityAction, communityAgo, UseDayShortNames } from "~/views/community/UseCommunityCards";

/**
 * Wires the inbox to the community store.
 *
 * Opening the inbox marks everything in it as read — the unread badge is there
 * to get the cook here, not to survive the visit. Accepting a recipe saves it;
 * accepting a week hands over to the same confirmation the feed uses.
 */
export function UseInboxRoute(): InboxViewProps {
  const intl = useIntl();
  const navigate = useNavigate();
  const dayNames = UseDayShortNames();
  const { inbox, personById, weekById, markInboxRead, removeInboxItem } = UseCommunity();
  const { recipes, saveRecipe } = UseRecipes();
  const setLoadWeekTarget = useSetAtom(loadWeekTargetAtom);

  useEffect(() => {
    markInboxRead();
    // Runs once per visit — `markInboxRead` is a no-op when nothing is unread.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = useMemo<InboxCardViewModel[]>(
    () =>
      inbox.flatMap<InboxCardViewModel>((item) => {
        const from = personById(item.fromId);
        if (!from) return [];

        if (item.kind === "week") {
          const week = weekById(item.refId);
          if (!week) return [];
          return [
            {
              id: item.id,
              kind: "week" as const,
              from,
              action: communityAction(intl, "week", true),
              ago: communityAgo(intl, item.daysAgo),
              note: item.note,
              title: week.title,
              tags: sharedWeekTags(week, recipes),
              days: sharedWeekDays(week, recipes, dayNames),
            },
          ];
        }

        const recipe = recipes.find((candidate) => candidate.id === item.refId);
        if (!recipe) return [];
        return [
          {
            id: item.id,
            kind: "recipe" as const,
            from,
            action: communityAction(intl, "recipe", true),
            ago: communityAgo(intl, item.daysAgo),
            note: item.note,
            title: recipe.title,
            tags: recipe.tags,
            days: [],
          },
        ];
      }),
    [inbox, personById, weekById, recipes, intl, dayNames]
  );

  function accept(itemId: string): void {
    const item = inbox.find((candidate) => candidate.id === itemId);
    if (!item) return;

    removeInboxItem(itemId);

    if (item.kind === "week") {
      setLoadWeekTarget(item.refId);
      void navigate({ to: "/community" });
      return;
    }

    saveRecipe(item.refId);
    toast(
      intl.formatMessage({
        description: "UseInboxRoute: toast - recipe saved from a recommendation",
        defaultMessage: "Saved to your recipes.",
        id: "r+2Y3i",
      })
    );
  }

  return {
    items,
    onBack: () => void navigate({ to: "/community" }),
    onOpenProfile: (personId: string) => void navigate({ to: "/community/$personId", params: { personId } }),
    onAccept: accept,
    onDismiss: removeInboxItem,
  };
}

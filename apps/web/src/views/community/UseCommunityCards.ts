import { useMemo } from "react";
import type { IntlShape } from "react-intl";
import { useIntl } from "react-intl";
import type { SharedWeekCardViewModel } from "~/components/display/shared-week-card/SharedWeekCard";
import type { SharedWeek } from "~/core/community/CommunityTypes";
import { sharedWeekDays, sharedWeekPhotos, sharedWeekTags } from "~/core/community/CommunityUtils";
import { PLAN_DAY_ORDER } from "~/core/plan/PlanTypes";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import { planDayShortName } from "~/views/plan/PlanDayLabels";

/** How long ago something was shared, as the community writes it. */
export function communityAgo(intl: IntlShape, daysAgo: number): string {
  if (daysAgo <= 0) {
    return intl.formatMessage({
      description: "UseCommunityCards: label - shared today",
      defaultMessage: "today",
      id: "9DagLC",
    });
  }
  return intl.formatMessage(
    {
      description: "UseCommunityCards: label - how many days ago something was shared",
      defaultMessage: "{days}d ago",
      id: "riNe1w",
    },
    { days: daysAgo }
  );
}

/** How many cooks have loaded a shared week. */
export function communityUses(intl: IntlShape, uses: number): string {
  return intl.formatMessage(
    {
      description: "UseCommunityCards: label - how many cooks used a shared week",
      defaultMessage: "{count, plural, one {# use} other {# uses}}",
      id: "yaLARc",
    },
    { count: uses }
  );
}

/** What someone has published, e.g. "3 weeks · 12 recipes". */
export function communityCounts(intl: IntlShape, weekCount: number, recipeCount: number): string {
  const weeks = intl.formatMessage(
    {
      description: "UseCommunityCards: label - how many weeks someone has shared",
      defaultMessage: "{count, plural, one {# week} other {# weeks}}",
      id: "JN4eco",
    },
    { count: weekCount }
  );
  const recipes = intl.formatMessage(
    {
      description: "UseCommunityCards: label - how many recipes someone has shared",
      defaultMessage: "{count, plural, one {# recipe} other {# recipes}}",
      id: "6BClx2",
    },
    { count: recipeCount }
  );
  return `${weeks} · ${recipes}`;
}

/** The action line under someone's name in the feed and the inbox. */
export function communityAction(intl: IntlShape, kind: "week" | "recipe", isRecommendation = false): string {
  if (isRecommendation) {
    return kind === "week"
      ? intl.formatMessage({
          description: "UseCommunityCards: label - they recommended a week",
          defaultMessage: "recommended a week",
          id: "ZO5hxq",
        })
      : intl.formatMessage({
          description: "UseCommunityCards: label - they recommended a recipe",
          defaultMessage: "recommended a recipe",
          id: "K1+XLU",
        });
  }
  return kind === "week"
    ? intl.formatMessage({
        description: "UseCommunityCards: label - they shared a week",
        defaultMessage: "shared a week",
        id: "FLEOYa",
      })
    : intl.formatMessage({
        description: "UseCommunityCards: label - they added a recipe",
        defaultMessage: "added a recipe",
        id: "PbLvJV",
      });
}

/** The three-letter day names the seven-day strips are labelled with. */
export function UseDayShortNames(): string[] {
  const intl = useIntl();
  return useMemo(() => PLAN_DAY_ORDER.map((day) => planDayShortName(intl, day)), [intl]);
}

/** Resolves a shared week against a recipe pool into everything its card renders. */
export function buildSharedWeekCard(
  intl: IntlShape,
  dayNames: string[],
  week: SharedWeek,
  recipes: Recipe[]
): SharedWeekCardViewModel {
  return {
    id: week.id,
    title: week.title,
    note: week.note,
    tags: sharedWeekTags(week, recipes),
    days: sharedWeekDays(week, recipes, dayNames),
    photos: sharedWeekPhotos(week, recipes),
    usesLabel: communityUses(intl, week.uses),
    agoLabel: communityAgo(intl, week.daysAgo),
  };
}

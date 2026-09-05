import type { ReactElement } from "react";
import { Button, Card } from "@heroui/react";
import { useIntl } from "react-intl";
import { CommunityCardHeader } from "~/components/display/community-card-header/CommunityCardHeader";
import { CommunityRecipeCard } from "~/components/display/community-recipe-card/CommunityRecipeCard";
import { SharedWeekCard } from "~/components/display/shared-week-card/SharedWeekCard";
import { ToggleChip } from "~/components/input/toggle-chip/ToggleChip";
import type { CommunityPerson, SharedWeek } from "~/core/community/CommunityTypes";
import { findRecipe } from "~/core/community/CommunityUtils";
import { useDayShortNames } from "~/core/plan/PlanDayLabels";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import { buildSharedWeekCard, communityAction, communityAgo } from "~/views/community/UseCommunityCards";
import { useCommunityFeed } from "~/views/community/UseCommunityFeed";

export interface CommunityFeedPanelProps {
  weeks: SharedWeek[];
  recipes: Recipe[];
  following: string[];
  personById: (personId: string) => CommunityPerson | null;
  onOpenProfile: (personId: string) => void;
  onOpenRecipe: (recipeId: string) => void;
  onRecommendWeek: (week: SharedWeek) => void;
  onRecommendRecipe: (recipe: Recipe) => void;
  onUseWeek: (week: SharedWeek) => void;
}

/** "Feed" — everything the community has shared lately, newest first. */
export function CommunityFeedPanel({
  weeks,
  recipes,
  following,
  personById,
  onOpenProfile,
  onOpenRecipe,
  onRecommendWeek,
  onRecommendRecipe,
  onUseWeek,
}: CommunityFeedPanelProps): ReactElement {
  const intl = useIntl();
  const dayNames = useDayShortNames();
  const feed = useCommunityFeed(weeks, recipes, following);

  return (
    <>
      <div className="mt-4.5 mb-4 flex items-center justify-center gap-1.5">
        <ToggleChip
          label={intl.formatMessage({
            description: "CommunityFeedPanel: toggle - show everyone's activity",
            defaultMessage: "Everyone",
            id: "E3S4Ka",
          })}
          isSelected={feed.scope === "all"}
          onChange={() => feed.setScope("all")}
        />
        <ToggleChip
          label={intl.formatMessage({
            description: "CommunityFeedPanel: toggle - show only people you follow",
            defaultMessage: "Following only",
            id: "FxEBSy",
          })}
          isSelected={feed.scope === "following"}
          onChange={() => feed.setScope("following")}
        />
      </div>

      <div className="mx-auto mb-4.5 flex max-w-[45rem] flex-col items-center gap-2">
        <div className="text-default-500 text-xs font-medium tracking-[0.08em] uppercase">
          {intl.formatMessage({
            description: "CommunityFeedPanel: label - tag filter",
            defaultMessage: "Filter by tag",
            id: "WbEq0X",
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-1.5">
          {feed.tagChips.map((tag) => (
            <ToggleChip
              key={tag.name}
              label={tag.name}
              isSelected={feed.selectedTags.includes(tag.name)}
              onChange={() => feed.toggleTag(tag.name)}
              endContent={<span className="text-xs font-normal tabular-nums opacity-70">{tag.count}</span>}
            />
          ))}

          {feed.hasTagFilter && (
            <Button variant="ghost" size="sm" className="text-accent" onPress={feed.clearTags}>
              {intl.formatMessage({
                description: "CommunityFeedPanel: button - clear the tag filter",
                defaultMessage: "Clear",
                id: "+KgBP8",
              })}
            </Button>
          )}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[45rem] flex-col gap-3.5">
        {feed.entries.map((entry) => {
          if (entry.kind === "week") {
            const owner = personById(entry.week.ownerId);
            if (!owner) return null;

            return (
              <SharedWeekCard
                key={entry.key}
                week={buildSharedWeekCard(intl, dayNames, entry.week, recipes)}
                header={
                  <CommunityCardHeader
                    person={owner}
                    action={communityAction(intl, "week")}
                    ago={communityAgo(intl, entry.daysAgo)}
                    onOpenProfile={() => onOpenProfile(owner.id)}
                  />
                }
                onRecommend={() => onRecommendWeek(entry.week)}
                onUse={() => onUseWeek(entry.week)}
              />
            );
          }

          const recipe = findRecipe(recipes, entry.recipeId);
          const author = recipe ? personById(recipe.author.id) : null;
          if (!recipe || !author) return null;

          return (
            <CommunityRecipeCard
              key={entry.key}
              recipe={recipe}
              header={
                <CommunityCardHeader
                  person={author}
                  action={communityAction(intl, "recipe")}
                  ago={communityAgo(intl, entry.daysAgo)}
                  onOpenProfile={() => onOpenProfile(author.id)}
                />
              }
              onRecommend={() => onRecommendRecipe(recipe)}
              onOpen={() => onOpenRecipe(recipe.id)}
            />
          );
        })}

        {feed.isEmpty && (
          <Card variant="secondary" className="mx-auto w-full max-w-[45rem] p-13 text-center">
            <p className="text-default-500">
              {intl.formatMessage({
                description: "CommunityFeedPanel: body - nothing in the feed yet",
                defaultMessage: "Nothing from the people you follow yet.",
                id: "kgmJa8",
              })}
            </p>
          </Card>
        )}
      </div>
    </>
  );
}

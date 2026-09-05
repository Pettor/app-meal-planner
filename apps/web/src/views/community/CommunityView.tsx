import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import { ToggleChip } from "~/components/input/toggle-chip/ToggleChip";
import type { CommunityPerson, CommunityTab, SharedWeek } from "~/core/community/CommunityTypes";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import { CommunityFeedPanel } from "~/views/community/CommunityFeedPanel";
import { CommunityPageHeader } from "~/views/community/CommunityPageHeader";
import { CommunityPeoplePanel } from "~/views/community/CommunityPeoplePanel";
import { CommunityWeeksPanel } from "~/views/community/CommunityWeeksPanel";

export interface CommunityViewProps {
  tab: CommunityTab;
  onTabChange: (tab: CommunityTab) => void;
  people: CommunityPerson[];
  weeks: SharedWeek[];
  /** The whole pool — the cook's own recipes and the community's together. */
  recipes: Recipe[];
  following: string[];
  personById: (personId: string) => CommunityPerson | null;
  onToggleFollow: (personId: string) => void;
  onOpenProfile: (personId: string) => void;
  onOpenRecipe: (recipeId: string) => void;
  onOpenInbox: () => void;
  onRecommendWeek: (week: SharedWeek) => void;
  onRecommendRecipe: (recipe: Recipe) => void;
  onUseWeek: (week: SharedWeek) => void;
}

/** "Community" — the feed, the people in it, and every week they have shared. */
export function CommunityView({
  tab,
  onTabChange,
  people,
  weeks,
  recipes,
  following,
  personById,
  onToggleFollow,
  onOpenProfile,
  onOpenRecipe,
  onOpenInbox,
  onRecommendWeek,
  onRecommendRecipe,
  onUseWeek,
}: CommunityViewProps): ReactElement {
  const intl = useIntl();

  const tabs: { id: CommunityTab; label: string }[] = [
    {
      id: "feed",
      label: intl.formatMessage({
        description: "CommunityView: tab - the activity feed",
        defaultMessage: "Feed",
        id: "0L52dg",
      }),
    },
    {
      id: "people",
      label: intl.formatMessage({
        description: "CommunityView: tab - the people in the community",
        defaultMessage: "People",
        id: "Eb7+KN",
      }),
    },
    {
      id: "weeks",
      label: intl.formatMessage({
        description: "CommunityView: tab - every shared week",
        defaultMessage: "Shared weeks",
        id: "SQbBch",
      }),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[77.5rem] px-6 py-9">
      <CommunityPageHeader onOpenInbox={onOpenInbox} />

      <div className="mt-6.5 flex flex-wrap items-center justify-center gap-1.5">
        {tabs.map((entry) => (
          <ToggleChip
            key={entry.id}
            label={entry.label}
            isSelected={tab === entry.id}
            onChange={() => onTabChange(entry.id)}
          />
        ))}
      </div>

      {tab === "feed" && (
        <CommunityFeedPanel
          weeks={weeks}
          recipes={recipes}
          following={following}
          personById={personById}
          onOpenProfile={onOpenProfile}
          onOpenRecipe={onOpenRecipe}
          onRecommendWeek={onRecommendWeek}
          onRecommendRecipe={onRecommendRecipe}
          onUseWeek={onUseWeek}
        />
      )}

      {tab === "people" && (
        <CommunityPeoplePanel
          people={people}
          weeks={weeks}
          recipes={recipes}
          following={following}
          onToggleFollow={onToggleFollow}
          onOpenProfile={onOpenProfile}
        />
      )}

      {tab === "weeks" && (
        <CommunityWeeksPanel
          weeks={weeks}
          recipes={recipes}
          personById={personById}
          onOpenProfile={onOpenProfile}
          onRecommendWeek={onRecommendWeek}
          onUseWeek={onUseWeek}
        />
      )}
    </div>
  );
}

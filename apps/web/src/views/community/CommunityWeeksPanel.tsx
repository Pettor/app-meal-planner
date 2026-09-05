import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import { CommunityCardHeader } from "~/components/display/community-card-header/CommunityCardHeader";
import { SharedWeekCard } from "~/components/display/shared-week-card/SharedWeekCard";
import type { CommunityPerson, SharedWeek } from "~/core/community/CommunityTypes";
import { useDayShortNames } from "~/core/plan/PlanDayLabels";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import { buildSharedWeekCard, communityAgo } from "~/views/community/UseCommunityCards";

export interface CommunityWeeksPanelProps {
  weeks: SharedWeek[];
  recipes: Recipe[];
  personById: (personId: string) => CommunityPerson | null;
  onOpenProfile: (personId: string) => void;
  onRecommendWeek: (week: SharedWeek) => void;
  onUseWeek: (week: SharedWeek) => void;
}

/** "Shared weeks" — every published week side by side, rather than as a feed. */
export function CommunityWeeksPanel({
  weeks,
  recipes,
  personById,
  onOpenProfile,
  onRecommendWeek,
  onUseWeek,
}: CommunityWeeksPanelProps): ReactElement {
  const intl = useIntl();
  const dayNames = useDayShortNames();

  return (
    <div className="mx-auto mt-5 grid max-w-[72.5rem] grid-cols-[repeat(auto-fill,minmax(23.125rem,1fr))] gap-4">
      {weeks.map((week) => {
        const owner = personById(week.ownerId);
        if (!owner) return null;

        return (
          <SharedWeekCard
            key={week.id}
            week={buildSharedWeekCard(intl, dayNames, week, recipes)}
            header={
              <CommunityCardHeader
                person={owner}
                showHandle
                withBorder
                ago={communityAgo(intl, week.daysAgo)}
                onOpenProfile={() => onOpenProfile(owner.id)}
              />
            }
            onRecommend={() => onRecommendWeek(week)}
            onUse={() => onUseWeek(week)}
          />
        );
      })}
    </div>
  );
}

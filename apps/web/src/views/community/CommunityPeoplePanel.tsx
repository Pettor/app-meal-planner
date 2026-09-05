import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import { PersonCard } from "~/components/display/person-card/PersonCard";
import type { CommunityPerson, SharedWeek } from "~/core/community/CommunityTypes";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import { communityCounts } from "~/views/community/UseCommunityCards";

export interface CommunityPeoplePanelProps {
  people: CommunityPerson[];
  weeks: SharedWeek[];
  recipes: Recipe[];
  following: string[];
  onToggleFollow: (personId: string) => void;
  onOpenProfile: (personId: string) => void;
}

/** "People" — everyone in the community, and whether you follow them. */
export function CommunityPeoplePanel({
  people,
  weeks,
  recipes,
  following,
  onToggleFollow,
  onOpenProfile,
}: CommunityPeoplePanelProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="mx-auto mt-5 grid max-w-[60rem] grid-cols-[repeat(auto-fill,minmax(18.125rem,1fr))] gap-4">
      {people.map((person) => (
        <PersonCard
          key={person.id}
          person={person}
          counts={communityCounts(
            intl,
            weeks.filter((week) => week.ownerId === person.id).length,
            recipes.filter((recipe) => recipe.author.id === person.id).length
          )}
          isFollowing={following.includes(person.id)}
          onToggleFollow={() => onToggleFollow(person.id)}
          onOpenProfile={() => onOpenProfile(person.id)}
        />
      ))}
    </div>
  );
}

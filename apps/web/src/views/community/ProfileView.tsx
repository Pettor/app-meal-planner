import type { ReactElement } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button, Card, Chip } from "@heroui/react";
import { useIntl } from "react-intl";
import { CommunityRecipeCard } from "~/components/display/community-recipe-card/CommunityRecipeCard";
import { SharedWeekCard } from "~/components/display/shared-week-card/SharedWeekCard";
import { UserAvatar } from "~/components/display/user-avatar/UserAvatar";
import { ToggleChip } from "~/components/input/toggle-chip/ToggleChip";
import type { CommunityPerson, ProfileTab, SharedWeek } from "~/core/community/CommunityTypes";
import { useDayShortNames } from "~/core/plan/PlanDayLabels";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import { buildSharedWeekCard, communityCounts } from "~/views/community/UseCommunityCards";

export interface ProfileViewProps {
  person: CommunityPerson;
  /** Whether this is the signed-in cook's own profile. */
  isMe: boolean;
  isFollowing: boolean;
  tab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  /** The weeks this person has shared. */
  weeks: SharedWeek[];
  /** The recipes this person has published. */
  recipes: Recipe[];
  /** The whole pool, so a shared week can resolve recipes it didn't author. */
  allRecipes: Recipe[];
  onToggleFollow: () => void;
  onEditProfile: () => void;
  onBack: () => void;
  onOpenRecipe: (recipeId: string) => void;
  onRecommendWeek: (week: SharedWeek) => void;
  onRecommendRecipe: (recipe: Recipe) => void;
  onUseWeek: (week: SharedWeek) => void;
}

/** Someone's profile — who they are, and everything they have shared. */
export function ProfileView({
  person,
  isMe,
  isFollowing,
  tab,
  onTabChange,
  weeks,
  recipes,
  allRecipes,
  onToggleFollow,
  onEditProfile,
  onBack,
  onOpenRecipe,
  onRecommendWeek,
  onRecommendRecipe,
  onUseWeek,
}: ProfileViewProps): ReactElement {
  const intl = useIntl();
  const dayNames = useDayShortNames();

  return (
    <div className="mx-auto w-full max-w-[77.5rem] px-6 py-9">
      <Button variant="ghost" className="mb-4.5" onPress={onBack} data-testid="profile__back">
        <ArrowLeftIcon className="mr-1.5 h-[15px] w-[15px]" />
        {intl.formatMessage({
          description: "ProfileView: button - back to the community",
          defaultMessage: "Community",
          id: "yerfN2",
        })}
      </Button>

      <div className="flex max-w-[66.25rem] flex-col gap-6.5">
        <Card className="flex max-w-[40rem] flex-row items-start gap-5 px-6 py-5.5">
          <UserAvatar
            name={person.name}
            avatarUrl={person.avatarUrl}
            color={person.color}
            size="lg"
            className="h-16 w-16 text-xl"
          />

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex flex-wrap items-baseline gap-2.5">
              <h1 className="text-2xl leading-tight font-bold tracking-[-0.02em]">{person.name}</h1>
              <span className="text-default-500 text-sm">{person.handle}</span>

              {person.followsMe && (
                <Chip size="sm" variant="soft">
                  {intl.formatMessage({
                    description: "ProfileView: chip - this person follows you",
                    defaultMessage: "Follows you",
                    id: "JzUN6D",
                  })}
                </Chip>
              )}

              {isMe && (
                <Chip size="sm" variant="soft" color="accent">
                  {intl.formatMessage({
                    description: "ProfileView: chip - this is your own profile",
                    defaultMessage: "This is you",
                    id: "QoAEuc",
                  })}
                </Chip>
              )}
            </div>

            <p className="text-default-500 text-sm">{person.bio}</p>
            <span className="text-default-500 text-xs">{communityCounts(intl, weeks.length, recipes.length)}</span>
          </div>

          <div className="flex flex-none">
            {isMe ? (
              <Button variant="outline" onPress={onEditProfile}>
                {intl.formatMessage({
                  description: "ProfileView: button - edit your own profile",
                  defaultMessage: "Edit avatar and name",
                  id: "eFOzv1",
                })}
              </Button>
            ) : (
              <Button
                variant={isFollowing ? "outline" : "primary"}
                onPress={onToggleFollow}
                data-testid="profile__follow"
              >
                {isFollowing
                  ? intl.formatMessage({
                      description: "ProfileView: button - already following, press to unfollow",
                      defaultMessage: "Following",
                      id: "G5fY3n",
                    })
                  : intl.formatMessage({
                      description: "ProfileView: button - start following",
                      defaultMessage: "Follow",
                      id: "NJTHyd",
                    })}
              </Button>
            )}
          </div>
        </Card>

        <div className="flex min-w-0 flex-col gap-4">
          <div className="border-border flex items-center gap-1.5 border-b pb-3.5">
            <ToggleChip
              label={intl.formatMessage(
                {
                  description: "ProfileView: tab - shared weeks, with a count",
                  defaultMessage: "Shared weeks ({count})",
                  id: "/IQZ4I",
                },
                { count: weeks.length }
              )}
              isSelected={tab === "weeks"}
              onChange={() => onTabChange("weeks")}
            />
            <ToggleChip
              label={intl.formatMessage(
                {
                  description: "ProfileView: tab - recipes, with a count",
                  defaultMessage: "Recipes ({count})",
                  id: "XGqzGF",
                },
                { count: recipes.length }
              )}
              isSelected={tab === "recipes"}
              onChange={() => onTabChange("recipes")}
            />
          </div>

          {tab === "weeks" && (
            <>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(20.625rem,1fr))] gap-4">
                {weeks.map((week) => (
                  <SharedWeekCard
                    key={week.id}
                    week={buildSharedWeekCard(intl, dayNames, week, allRecipes)}
                    showAgeBesideTitle
                    onRecommend={() => onRecommendWeek(week)}
                    onUse={() => onUseWeek(week)}
                  />
                ))}
              </div>

              {weeks.length === 0 && (
                <p className="text-default-500">
                  {intl.formatMessage({
                    description: "ProfileView: body - this person has shared no weeks",
                    defaultMessage: "No shared weeks yet.",
                    id: "ylSJdv",
                  })}
                </p>
              )}
            </>
          )}

          {tab === "recipes" && (
            <>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(18.75rem,1fr))] gap-4">
                {recipes.map((recipe) => (
                  <CommunityRecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    photoHeight="short"
                    onRecommend={() => onRecommendRecipe(recipe)}
                    onOpen={() => onOpenRecipe(recipe.id)}
                  />
                ))}
              </div>

              {recipes.length === 0 && (
                <p className="text-default-500">
                  {intl.formatMessage({
                    description: "ProfileView: body - this person has shared no recipes",
                    defaultMessage: "No recipes shared yet.",
                    id: "TxTse1",
                  })}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

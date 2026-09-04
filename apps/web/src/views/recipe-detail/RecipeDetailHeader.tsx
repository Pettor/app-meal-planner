import type { ReactElement } from "react";
import { ClockIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { Chip } from "@heroui/react";
import { useIntl } from "react-intl";
import { TagChip } from "~/components/display/tag-chip/TagChip";
import { UserAvatar } from "~/components/display/user-avatar/UserAvatar";
import type { Recipe } from "~/core/recipes/RecipeTypes";

export interface RecipeDetailHeaderProps {
  recipe: Recipe;
  servings: number;
  onOpenAuthor: (authorId: string) => void;
}

export function RecipeDetailHeader({ recipe, servings, onOpenAuthor }: RecipeDetailHeaderProps): ReactElement {
  const intl = useIntl();
  const isMine = recipe.author.id === "me";

  return (
    <>
      <h1 className="mb-3 text-3xl leading-tight tracking-tight text-pretty md:text-4xl">{recipe.title}</h1>

      <div className="mb-4 flex items-center gap-2.5">
        <UserAvatar
          name={recipe.author.name}
          avatarUrl={recipe.author.avatarUrl}
          color={recipe.author.color}
          size="md"
        />
        <span className="flex flex-col">
          <button
            type="button"
            className="hover:text-accent cursor-pointer text-left text-sm font-medium transition-colors"
            onClick={() => onOpenAuthor(recipe.author.id)}
          >
            {recipe.author.name}
          </button>
          <span className="text-default-500 text-xs">{recipe.author.handle}</span>
        </span>
        {recipe.isSaved && !isMine && (
          <Chip size="sm" variant="soft" color="success" className="ml-auto">
            {intl.formatMessage({
              description: "RecipeDetailHeader: chip - already saved",
              defaultMessage: "In your recipes",
              id: "htdWfe",
            })}
          </Chip>
        )}
      </div>

      <div className="mb-3.5 flex flex-wrap gap-1.5">
        {recipe.tags.map((tag) => (
          <TagChip key={tag} tag={tag} />
        ))}
      </div>

      <div className="text-default-500 flex flex-wrap gap-5 text-sm">
        <span className="inline-flex items-center gap-1.5">
          <ClockIcon className="h-4 w-4" />
          {intl.formatMessage(
            {
              description: "RecipeDetailHeader: label - cooking time",
              defaultMessage: "{minutes} minutes",
              id: "MqxgNq",
            },
            { minutes: recipe.timeMinutes }
          )}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <UserGroupIcon className="h-4 w-4" />
          {intl.formatMessage(
            {
              description: "RecipeDetailHeader: label - written for and scaled to",
              defaultMessage: "written for {writtenFor}, scaled to {scaledTo}",
              id: "6Ln0VO",
            },
            { writtenFor: recipe.servings, scaledTo: servings }
          )}
        </span>
      </div>
    </>
  );
}

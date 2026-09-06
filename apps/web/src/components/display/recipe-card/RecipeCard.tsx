import type { ReactElement } from "react";
import { ClockIcon, PlusCircleIcon, TrashIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { Button, Card, Chip } from "@heroui/react";
import { useIntl } from "react-intl";
import { RecipePhoto } from "~/components/display/recipe-photo/RecipePhoto";
import { TagChip } from "~/components/display/tag-chip/TagChip";
import { UserAvatar } from "~/components/display/user-avatar/UserAvatar";
import type { Recipe } from "~/core/recipes/RecipeTypes";

export interface RecipeCardProps {
  recipe: Recipe;
  /** Show the "save to my recipes" affordances — only meaningful outside your own pool. */
  showSaveAction?: boolean;
  onOpen: (recipeId: string) => void;
  onSave?: (recipeId: string) => void;
  onRemove?: (recipeId: string) => void;
}

export function RecipeCard({ recipe, showSaveAction, onOpen, onSave, onRemove }: RecipeCardProps): ReactElement {
  const intl = useIntl();

  const canSave = Boolean(showSaveAction && !recipe.isSaved && onSave);
  const canRemove = Boolean(!showSaveAction && recipe.isSaved && onRemove);

  return (
    <Card
      className="card-raise relative gap-0 overflow-hidden border border-transparent p-0 transition-all duration-200 hover:-translate-y-0.5"
      data-testid={`recipe-card__${recipe.id}`}
    >
      <RecipePhoto photoUrl={recipe.photoUrl} alt={recipe.title} className="h-34" />
      <Card.Content className="flex flex-col gap-2.5 p-4">
        <div className="text-base leading-snug font-semibold text-pretty">{recipe.title}</div>

        <div className="flex items-center gap-2">
          <UserAvatar
            name={recipe.author.name}
            avatarUrl={recipe.author.avatarUrl}
            color={recipe.author.color}
            size="xs"
          />
          <span className="text-default-500 text-xs">{recipe.author.name}</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {recipe.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>

        <div className="text-default-500 flex items-center gap-3.5 text-xs">
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="h-3.5 w-3.5" />
            {intl.formatMessage(
              {
                description: "RecipeCard: label - cooking time",
                defaultMessage: "{minutes} min",
                id: "R3XziU",
              },
              { minutes: recipe.timeMinutes }
            )}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <UserGroupIcon className="h-3.5 w-3.5" />
            {intl.formatMessage(
              {
                description: "RecipeCard: label - servings",
                defaultMessage: "{count} people",
                id: "V1yKMr",
              },
              { count: recipe.servings }
            )}
          </span>
        </div>
      </Card.Content>

      {/*
       * The whole card opens the recipe. A stretched button keeps that reachable
       * by keyboard without nesting interactive elements — the row below it is
       * lifted above the overlay so its own buttons stay clickable.
       */}
      <button
        type="button"
        className="absolute inset-0 z-0 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2"
        onClick={() => onOpen(recipe.id)}
      >
        <span className="sr-only">
          {intl.formatMessage(
            {
              description: "RecipeCard: aria-label - open recipe",
              defaultMessage: "Open {title}",
              id: "iwYia1",
            },
            { title: recipe.title }
          )}
        </span>
      </button>

      {(canSave || canRemove || (showSaveAction && recipe.isSaved)) && (
        <div className="relative z-10 flex px-4 pb-4">
          {canSave && (
            <Button
              variant="secondary"
              size="sm"
              fullWidth
              onPress={() => onSave?.(recipe.id)}
              data-testid={`recipe-card__save--${recipe.id}`}
            >
              <PlusCircleIcon className="mr-1.5 h-4 w-4" />
              {intl.formatMessage({
                description: "RecipeCard: button - save to my recipes",
                defaultMessage: "Save to my recipes",
                id: "z8a3ox",
              })}
            </Button>
          )}

          {showSaveAction && recipe.isSaved && (
            <Chip size="sm" variant="soft" color="success">
              {intl.formatMessage({
                description: "RecipeCard: chip - already saved",
                defaultMessage: "In your recipes",
                id: "UxbWXU",
              })}
            </Chip>
          )}

          {canRemove && (
            <Button
              variant="ghost"
              size="sm"
              className="text-danger -ml-3"
              onPress={() => onRemove?.(recipe.id)}
              data-testid={`recipe-card__remove--${recipe.id}`}
            >
              <TrashIcon className="mr-1.5 h-4 w-4" />
              {intl.formatMessage({
                description: "RecipeCard: button - remove from my recipes",
                defaultMessage: "Remove",
                id: "9PLzJJ",
              })}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}

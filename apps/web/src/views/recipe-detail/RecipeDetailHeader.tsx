import type { ReactElement } from "react";
import { Chip, Link } from "@heroui/react";
import { useIntl } from "react-intl";
import { RecipeStatStrip } from "~/components/display/recipe-stat-strip/RecipeStatStrip";
import { TagChip } from "~/components/display/tag-chip/TagChip";
import { UserAvatar } from "~/components/display/user-avatar/UserAvatar";
import type { Recipe } from "~/core/recipes/RecipeTypes";

export interface RecipeDetailHeaderProps {
  recipe: Recipe;
  onOpenAuthor: (authorId: string) => void;
}

/** The copy half of the hero: what the recipe is, who wrote it, and what it costs you. */
export function RecipeDetailHeader({ recipe, onOpenAuthor }: RecipeDetailHeaderProps): ReactElement {
  const intl = useIntl();
  const isMine = recipe.author.id === "me";

  return (
    <>
      <h1 className="mb-3 text-3xl leading-[1.1] font-bold tracking-[-0.02em] text-pretty md:text-4xl">
        {recipe.title}
      </h1>

      <div className="mb-4.5 flex flex-wrap items-center gap-2 text-sm">
        <UserAvatar
          name={recipe.author.name}
          avatarUrl={recipe.author.avatarUrl}
          color={recipe.author.color}
          size="xs"
        />
        <Link
          className="text-foreground hover:text-accent rounded-none text-sm font-medium hover:no-underline"
          onPress={() => onOpenAuthor(recipe.author.id)}
        >
          {recipe.author.name}
        </Link>
        <span className="text-default-500">{recipe.author.handle}</span>
        {recipe.isSaved && !isMine && (
          <Chip size="sm" variant="soft" color="success">
            {intl.formatMessage({
              description: "RecipeDetailHeader: chip - already saved",
              defaultMessage: "In your recipes",
              id: "htdWfe",
            })}
          </Chip>
        )}
      </div>

      <div className="mb-5.5">
        <RecipeStatStrip timeMinutes={recipe.timeMinutes} ingredientCount={recipe.ingredients.length} />
      </div>

      {recipe.description && (
        <p className="text-default-500 mb-5.5 max-w-[46ch] text-lg leading-[1.6] text-pretty">{recipe.description}</p>
      )}

      <div className="mb-5 flex flex-wrap gap-1.5">
        {recipe.tags.map((tag) => (
          <TagChip key={tag} tag={tag} />
        ))}
      </div>
    </>
  );
}

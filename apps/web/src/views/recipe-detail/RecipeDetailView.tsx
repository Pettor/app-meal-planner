import type { ReactElement } from "react";
import { Card, Separator } from "@heroui/react";
import { RecipePhoto } from "~/components/display/recipe-photo/RecipePhoto";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import { RecipeDetailHeader } from "~/views/recipe-detail/RecipeDetailHeader";
import { RecipeDetailIngredients } from "~/views/recipe-detail/RecipeDetailIngredients";
import { RecipeDetailMethod } from "~/views/recipe-detail/RecipeDetailMethod";
import { RecipeDetailToolbar } from "~/views/recipe-detail/RecipeDetailToolbar";
import { UseRecipeServings } from "~/views/recipe-detail/UseRecipeServings";

export interface RecipeDetailViewProps {
  recipe: Recipe;
  onBack: () => void;
  onEdit: (recipeId: string) => void;
  onRecommend: (recipeId: string) => void;
  onSave: (recipeId: string) => void;
  onRemove: (recipeId: string) => void;
  onPrint: () => void;
  onOpenAuthor: (authorId: string) => void;
}

/** A single recipe, scaled to however many people are eating. */
export function RecipeDetailView({
  recipe,
  onBack,
  onEdit,
  onRecommend,
  onSave,
  onRemove,
  onPrint,
  onOpenAuthor,
}: RecipeDetailViewProps): ReactElement {
  const { servings, increase, decrease, scaled } = UseRecipeServings(recipe.ingredients, recipe.servings);

  return (
    <div className="mx-auto w-full max-w-[77.5rem] px-6 py-9">
      <RecipeDetailToolbar
        servings={servings}
        isMine={recipe.author.id === "me"}
        isSaved={recipe.isSaved}
        onBack={onBack}
        onIncreaseServings={increase}
        onDecreaseServings={decrease}
        onEdit={() => onEdit(recipe.id)}
        onRecommend={() => onRecommend(recipe.id)}
        onSave={() => onSave(recipe.id)}
        onRemove={() => onRemove(recipe.id)}
        onPrint={onPrint}
      />

      <Card className="mx-auto max-w-[53.75rem] gap-0 overflow-hidden p-0">
        <RecipePhoto
          photoUrl={recipe.photoUrl}
          alt={recipe.title}
          className="h-75"
          placeholderClassName="border-border h-45 border-b"
        />
        <Card.Content className="px-6 pt-8 pb-11 md:px-9">
          <RecipeDetailHeader recipe={recipe} servings={servings} onOpenAuthor={onOpenAuthor} />
          <Separator className="my-7" />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(17.5rem,1fr))] items-start gap-10">
            <RecipeDetailIngredients ingredients={scaled} />
            <RecipeDetailMethod steps={recipe.steps} />
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}

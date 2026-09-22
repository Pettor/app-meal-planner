import type { ReactElement } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button, Card } from "@heroui/react";
import { useIntl } from "react-intl";
import { RecipePhoto } from "~/components/display/recipe-photo/RecipePhoto";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import { RecipeDetailActions } from "~/views/recipe-detail/RecipeDetailActions";
import { RecipeDetailHeader } from "~/views/recipe-detail/RecipeDetailHeader";
import { RecipeDetailIngredients } from "~/views/recipe-detail/RecipeDetailIngredients";
import { RecipeDetailMethod } from "~/views/recipe-detail/RecipeDetailMethod";
import { useRecipeServings } from "~/views/recipe-detail/UseRecipeServings";

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
  const intl = useIntl();
  const { servings, increase, decrease, scaled } = useRecipeServings(recipe.ingredients, recipe.servings);

  return (
    <div className="mx-auto w-full max-w-[77.5rem] px-6 py-9">
      <div className="mb-5 flex print:hidden">
        <Button variant="ghost" onPress={onBack} data-testid="recipe-detail__back">
          <ArrowLeftIcon className="mr-1.5 h-4 w-4" />
          {intl.formatMessage({
            description: "RecipeDetailView: button - back",
            defaultMessage: "Back",
            id: "zMq0kL",
          })}
        </Button>
      </div>

      <Card className="mx-auto max-w-[70rem] gap-0 overflow-hidden p-0">
        {/*
         * Copy and photo share the hero, but the photo leads on narrow screens —
         * hence the DOM order (copy first, which is also the print order) being
         * reversed below the two-column breakpoint.
         */}
        <div className="grid items-start min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)]">
          <div className="order-2 flex min-w-0 flex-col px-5.5 pt-6.5 pb-7.5 min-[900px]:order-1 min-[900px]:px-10 min-[900px]:pt-9.5 min-[900px]:pb-8.5">
            <RecipeDetailHeader recipe={recipe} onOpenAuthor={onOpenAuthor} />
            <RecipeDetailActions
              isMine={recipe.author.id === "me"}
              isSaved={recipe.isSaved}
              onEdit={() => onEdit(recipe.id)}
              onRecommend={() => onRecommend(recipe.id)}
              onSave={() => onSave(recipe.id)}
              onRemove={() => onRemove(recipe.id)}
              onPrint={onPrint}
            />
          </div>

          <RecipePhoto
            photoUrl={recipe.photoUrl}
            alt={recipe.title}
            className="order-1 aspect-square min-h-65 w-full min-[900px]:order-2 min-[900px]:min-h-85 print:min-h-75"
            iconClassName="h-10 w-10"
          />
        </div>

        <Card.Content className="border-separator border-t px-6 pt-8 pb-11 md:px-9">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(17.5rem,1fr))] items-start gap-10">
            <RecipeDetailIngredients
              ingredients={scaled}
              servings={servings}
              onIncreaseServings={increase}
              onDecreaseServings={decrease}
            />
            <RecipeDetailMethod steps={recipe.steps} />
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}

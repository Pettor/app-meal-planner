import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import type { RecipeIngredient } from "~/core/recipes/RecipeTypes";
import { formatAmount } from "~/core/recipes/RecipeUtils";
import { RecipeDetailServingsStepper } from "~/views/recipe-detail/RecipeDetailServingsStepper";

export interface RecipeDetailIngredientsProps {
  ingredients: RecipeIngredient[];
  servings: number;
  onIncreaseServings: () => void;
  onDecreaseServings: () => void;
}

export function RecipeDetailIngredients({
  ingredients,
  servings,
  onIncreaseServings,
  onDecreaseServings,
}: RecipeDetailIngredientsProps): ReactElement {
  const intl = useIntl();

  return (
    <div>
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold tracking-[-0.01em]">
          {intl.formatMessage({
            description: "RecipeDetailIngredients: heading - ingredients",
            defaultMessage: "Ingredients",
            id: "+RhAgE",
          })}
        </h2>
        <RecipeDetailServingsStepper
          servings={servings}
          onIncrease={onIncreaseServings}
          onDecrease={onDecreaseServings}
        />
      </div>
      <ul className="flex flex-col overflow-hidden rounded-lg">
        {ingredients.map((ingredient) => (
          <li
            key={ingredient.item}
            className="even:bg-surface-secondary/55 flex justify-between gap-3.5 px-3 py-2.5 text-base"
          >
            <span>{ingredient.item}</span>
            <span className="text-default-500 font-medium whitespace-nowrap">
              {formatAmount(ingredient.quantity, ingredient.unit)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

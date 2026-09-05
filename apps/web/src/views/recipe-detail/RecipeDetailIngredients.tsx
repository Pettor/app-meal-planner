import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import type { RecipeIngredient } from "~/core/recipes/RecipeTypes";
import { formatAmount } from "~/core/recipes/RecipeUtils";

export interface RecipeDetailIngredientsProps {
  ingredients: RecipeIngredient[];
}

export function RecipeDetailIngredients({ ingredients }: RecipeDetailIngredientsProps): ReactElement {
  const intl = useIntl();

  return (
    <div>
      <h2 className="text-default-500 mb-3.5 text-xs font-semibold tracking-[0.09em] uppercase">
        {intl.formatMessage({
          description: "RecipeDetailIngredients: heading - ingredients",
          defaultMessage: "Ingredients",
          id: "+RhAgE",
        })}
      </h2>
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

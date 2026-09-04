import type { ReactElement } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Label } from "@heroui/react";
import { useIntl } from "react-intl";
import { TextInputField } from "~/components/input/input-field/TextInputField";
import type { RecipeIngredientDraft } from "~/views/recipe-edit/RecipeDraft";

export interface RecipeEditIngredientsPanelProps {
  ingredients: RecipeIngredientDraft[];
  onUpdate: (id: string, patch: Partial<RecipeIngredientDraft>) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}

export function RecipeEditIngredientsPanel({
  ingredients,
  onUpdate,
  onAdd,
  onRemove,
}: RecipeEditIngredientsPanelProps): ReactElement {
  const intl = useIntl();

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <Label>
          {intl.formatMessage({
            description: "RecipeEditIngredientsPanel: label - ingredients",
            defaultMessage: "Ingredients",
            id: "OgUG4B",
          })}
        </Label>
        <Button
          variant="ghost"
          size="sm"
          className="text-accent px-0"
          onPress={onAdd}
          data-testid="recipe-edit__add-ingredient"
        >
          {intl.formatMessage({
            description: "RecipeEditIngredientsPanel: button - add ingredient",
            defaultMessage: "+ Add ingredient",
            id: "lDoaIM",
          })}
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {ingredients.map((ingredient, index) => (
          <div key={ingredient.id} className="grid grid-cols-[5.25rem_6rem_1fr_2.25rem] items-center gap-2">
            <TextInputField
              value={ingredient.quantity}
              onChange={(quantity) => onUpdate(ingredient.id, { quantity })}
              placeholder="200"
              ariaLabel={intl.formatMessage(
                {
                  description: "RecipeEditIngredientsPanel: aria-label - quantity",
                  defaultMessage: "Ingredient {number} quantity",
                  id: "6zcG8Y",
                },
                { number: index + 1 }
              )}
            />
            <TextInputField
              value={ingredient.unit}
              onChange={(unit) => onUpdate(ingredient.id, { unit })}
              placeholder="g"
              ariaLabel={intl.formatMessage(
                {
                  description: "RecipeEditIngredientsPanel: aria-label - unit",
                  defaultMessage: "Ingredient {number} unit",
                  id: "nyDt+o",
                },
                { number: index + 1 }
              )}
            />
            <TextInputField
              value={ingredient.item}
              onChange={(item) => onUpdate(ingredient.id, { item })}
              placeholder={intl.formatMessage({
                description: "RecipeEditIngredientsPanel: placeholder - ingredient name",
                defaultMessage: "Arborio rice",
                id: "j5W0QR",
              })}
              ariaLabel={intl.formatMessage(
                {
                  description: "RecipeEditIngredientsPanel: aria-label - ingredient name",
                  defaultMessage: "Ingredient {number}",
                  id: "9qzGTG",
                },
                { number: index + 1 }
              )}
            />
            <Button
              variant="ghost"
              size="sm"
              isIconOnly
              className="text-danger"
              onPress={() => onRemove(ingredient.id)}
              aria-label={intl.formatMessage(
                {
                  description: "RecipeEditIngredientsPanel: aria-label - remove ingredient",
                  defaultMessage: "Remove ingredient {number}",
                  id: "E3bD/N",
                },
                { number: index + 1 }
              )}
            >
              <XMarkIcon className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

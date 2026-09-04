import type { Recipe, RecipeIngredient, ScannedRecipe } from "~/core/recipes/RecipeTypes";

/**
 * Ingredients and steps are edited as free text and get stable ids so rows keep
 * their identity while the cook types, reorders or deletes.
 */
export interface RecipeIngredientDraft {
  id: string;
  quantity: string;
  unit: string;
  item: string;
}

export interface RecipeStepDraft {
  id: string;
  text: string;
}

export interface RecipeDraft {
  title: string;
  servings: string;
  timeMinutes: string;
  photoUrl: string | null;
  tags: string[];
  ingredients: RecipeIngredientDraft[];
  steps: RecipeStepDraft[];
}

let nextRowId = 0;

export function newRowId(prefix: string): string {
  nextRowId += 1;
  return `${prefix}-${nextRowId}`;
}

export function emptyIngredientDraft(): RecipeIngredientDraft {
  return { id: newRowId("ing"), quantity: "", unit: "", item: "" };
}

export function emptyStepDraft(): RecipeStepDraft {
  return { id: newRowId("step"), text: "" };
}

/** A blank recipe, pre-seeded with a few empty rows so the form isn't a wall of buttons. */
export function emptyRecipeDraft(): RecipeDraft {
  return {
    title: "",
    servings: "4",
    timeMinutes: "30",
    photoUrl: null,
    tags: [],
    ingredients: [emptyIngredientDraft(), emptyIngredientDraft(), emptyIngredientDraft()],
    steps: [emptyStepDraft(), emptyStepDraft()],
  };
}

export function recipeToDraft(recipe: Recipe): RecipeDraft {
  return {
    title: recipe.title,
    servings: String(recipe.servings),
    timeMinutes: String(recipe.timeMinutes),
    photoUrl: recipe.photoUrl,
    tags: [...recipe.tags],
    ingredients: recipe.ingredients.map(toIngredientDraft),
    steps: recipe.steps.map((text) => ({ id: newRowId("step"), text })),
  };
}

export function scannedRecipeToDraft(scanned: ScannedRecipe): RecipeDraft {
  return {
    title: scanned.title,
    servings: String(scanned.servings),
    timeMinutes: String(scanned.timeMinutes),
    photoUrl: scanned.photoUrl,
    tags: [...scanned.tags],
    ingredients: scanned.ingredients.map(toIngredientDraft),
    steps: scanned.steps.map((text) => ({ id: newRowId("step"), text })),
  };
}

function toIngredientDraft(ingredient: RecipeIngredient): RecipeIngredientDraft {
  return {
    id: newRowId("ing"),
    quantity: ingredient.quantity === null ? "" : String(ingredient.quantity),
    unit: ingredient.unit,
    item: ingredient.item,
  };
}

/** Turns the edited draft back into the domain shape, dropping blank rows. */
export function draftToRecipeFields(draft: RecipeDraft): {
  title: string;
  servings: number;
  timeMinutes: number;
  photoUrl: string | null;
  tags: string[];
  ingredients: RecipeIngredient[];
  steps: string[];
} {
  return {
    title: draft.title.trim(),
    servings: Number(draft.servings) || 1,
    timeMinutes: Number(draft.timeMinutes) || 0,
    photoUrl: draft.photoUrl,
    tags: draft.tags,
    ingredients: draft.ingredients
      .filter((ingredient) => ingredient.item.trim().length > 0)
      .map((ingredient) => ({
        quantity: ingredient.quantity.trim() === "" ? null : Number(ingredient.quantity),
        unit: ingredient.unit.trim(),
        item: ingredient.item.trim(),
      })),
    steps: draft.steps.map((step) => step.text.trim()).filter((text) => text.length > 0),
  };
}

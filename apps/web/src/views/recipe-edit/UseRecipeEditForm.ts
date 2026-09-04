import { useState } from "react";
import type { RecipeDraft, RecipeIngredientDraft, RecipeStepDraft } from "~/views/recipe-edit/RecipeDraft";
import { emptyIngredientDraft, emptyStepDraft } from "~/views/recipe-edit/RecipeDraft";

export interface UseRecipeEditFormResult {
  draft: RecipeDraft;
  setDraft: (draft: RecipeDraft) => void;
  setField: <K extends keyof RecipeDraft>(field: K, value: RecipeDraft[K]) => void;
  toggleTag: (tag: string) => void;
  addTag: (tag: string) => void;
  updateIngredient: (id: string, patch: Partial<RecipeIngredientDraft>) => void;
  addIngredient: () => void;
  removeIngredient: (id: string) => void;
  updateStep: (id: string, text: string) => void;
  addStep: () => void;
  removeStep: (id: string) => void;
  /** Set once the cook tries to save without tags — the planner needs at least one. */
  hasTagError: boolean;
  /** Returns the draft when it is valid, or `null` after flagging what is missing. */
  validate: () => RecipeDraft | null;
}

/** All the editing state behind the recipe form. */
export function UseRecipeEditForm(initialDraft: RecipeDraft): UseRecipeEditFormResult {
  const [draft, setDraft] = useState<RecipeDraft>(initialDraft);
  const [hasTagError, setHasTagError] = useState(false);

  function setField<K extends keyof RecipeDraft>(field: K, value: RecipeDraft[K]): void {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function toggleTag(tag: string): void {
    setHasTagError(false);
    setDraft((current) => ({
      ...current,
      tags: current.tags.includes(tag) ? current.tags.filter((t) => t !== tag) : [...current.tags, tag],
    }));
  }

  function addTag(tag: string): void {
    const trimmed = tag.trim().toLowerCase();
    if (!trimmed) return;
    setHasTagError(false);
    setDraft((current) =>
      current.tags.includes(trimmed) ? current : { ...current, tags: [...current.tags, trimmed] }
    );
  }

  function updateIngredient(id: string, patch: Partial<RecipeIngredientDraft>): void {
    setDraft((current) => ({
      ...current,
      ingredients: current.ingredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, ...patch } : ingredient
      ),
    }));
  }

  function addIngredient(): void {
    setDraft((current) => ({ ...current, ingredients: [...current.ingredients, emptyIngredientDraft()] }));
  }

  function removeIngredient(id: string): void {
    setDraft((current) => ({
      ...current,
      ingredients: current.ingredients.filter((ingredient) => ingredient.id !== id),
    }));
  }

  function updateStep(id: string, text: string): void {
    setDraft((current) => ({
      ...current,
      steps: current.steps.map((step: RecipeStepDraft) => (step.id === id ? { ...step, text } : step)),
    }));
  }

  function addStep(): void {
    setDraft((current) => ({ ...current, steps: [...current.steps, emptyStepDraft()] }));
  }

  function removeStep(id: string): void {
    setDraft((current) => ({ ...current, steps: current.steps.filter((step) => step.id !== id) }));
  }

  function validate(): RecipeDraft | null {
    if (draft.tags.length === 0) {
      setHasTagError(true);
      return null;
    }
    return draft;
  }

  return {
    draft,
    setDraft,
    setField,
    toggleTag,
    addTag,
    updateIngredient,
    addIngredient,
    removeIngredient,
    updateStep,
    addStep,
    removeStep,
    hasTagError,
    validate,
  };
}

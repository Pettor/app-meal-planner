import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { WeekView as Component } from "./WeekView";
import type { WeekViewProps as Props } from "./WeekView";
import { PLAN_DAY_ORDER } from "~/core/plan/PlanTypes";
import type { PlanSlot, SavedPlan } from "~/core/plan/PlanTypes";
import { emptyPlanDraft, thisWeekKey, weekKeyOf } from "~/core/plan/PlanUtils";
import { SampleRecipes } from "~/core/recipes/RecipeSampleData";
import { NavbarLayoutDecorator } from "~/storybook/decorators/NavbarLayoutDecorator";

const weekKey = thisWeekKey();
const savedRecipes = SampleRecipes.filter((recipe) => recipe.isSaved);

/** A dinner every day, plus a lunch at the weekend, drawn round-robin from the pool. */
const slots: PlanSlot[] = PLAN_DAY_ORDER.flatMap((day, index) => {
  const dinner: PlanSlot = {
    day,
    meal: "dinner",
    people: 4,
    recipeId: savedRecipes[index % savedRecipes.length]?.id ?? null,
  };
  if (index < 5) return [dinner];
  return [
    { ...dinner, meal: "lunch", people: 2, recipeId: savedRecipes[(index + 3) % savedRecipes.length]?.id ?? null },
    dinner,
  ];
});

const plannedWeek: SavedPlan = {
  status: "final",
  savedAt: weekKeyOf(new Date()),
  draft: { ...emptyPlanDraft(), slots },
};

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Week",
  tags: ["!test"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [NavbarLayoutDecorator()],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  weekKey,
  plan: plannedWeek,
  plans: { [weekKey]: plannedWeek },
  recipes: SampleRecipes,
  onSelectWeek: fn(),
  onOpenRecipe: fn(),
  onEditWeek: fn(),
  onPlanWeek: fn(),
  onPublishWeek: fn(),
  onPrint: fn(),
} satisfies Props;

export const Fullscreen: Story = {
  args: defaultArgs,
  parameters: { viewport: { value: "full" } },
};

export const Draft: Story = {
  args: {
    ...defaultArgs,
    plan: { ...plannedWeek, status: "draft" },
    plans: { [weekKey]: { ...plannedWeek, status: "draft" } },
  },
  parameters: { viewport: { value: "full" } },
};

export const NotPlanned: Story = {
  args: { ...defaultArgs, plan: null, plans: {} },
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};

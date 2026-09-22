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
  recipes: SampleRecipes,
  layout: "table",
  onLayoutChange: fn(),
  onOpenRecipe: fn(),
  onOpenShoppingList: fn(),
  onEditWeek: fn(),
  onPlanWeek: fn(),
  onPublishWeek: fn(),
  onPrint: fn(),
} satisfies Props;

export const Fullscreen: Story = {
  args: defaultArgs,
  parameters: { viewport: { value: "full" } },
};

/** The same week as a card per day, the layout the toggle's other half selects. */
export const Cards: Story = {
  args: { ...defaultArgs, layout: "cards" },
  parameters: { viewport: { value: "full" } },
};

/** A dinner-only week is one row, not two — an empty lunch row says nothing. */
export const DinnersOnly: Story = {
  args: {
    ...defaultArgs,
    plan: {
      ...plannedWeek,
      draft: { ...emptyPlanDraft(), slots: slots.filter((slot) => slot.meal === "dinner") },
    },
  },
  parameters: { viewport: { value: "full" } },
};

export const Draft: Story = {
  args: {
    ...defaultArgs,
    plan: { ...plannedWeek, status: "draft" },
  },
  parameters: { viewport: { value: "full" } },
};

export const NotPlanned: Story = {
  args: { ...defaultArgs, plan: null },
  parameters: { viewport: { value: "full" } },
};

/** Still wide enough for seven columns — the timetable scrolls rather than stacks. */
export const Tablet: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "ipad" } },
};

/** The cards layout steps 4 → 3 → 2 → 1 at 1100px, 760px and 520px. */
export const CardsTablet: Story = {
  args: { ...defaultArgs, layout: "cards" },
  globals: { viewport: { value: "ipad" } },
};

export const Narrow: Story = {
  args: defaultArgs,
  parameters: {
    viewport: { options: { narrow: { name: "Narrow", styles: { width: "640px", height: "1000px" } } } },
  },
  globals: { viewport: { value: "narrow" } },
};

/** Below 821px the timetable turns on its side: a card per day, meal rail on the left. */
export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};

/** A day with nothing on it still reads as a day, not a gap. */
export const DayWithNothingPlanned: Story = {
  args: {
    ...defaultArgs,
    layout: "cards",
    plan: {
      ...plannedWeek,
      draft: { ...emptyPlanDraft(), slots: slots.filter((slot) => slot.day !== "wednesday") },
    },
  },
  parameters: { viewport: { value: "full" } },
};

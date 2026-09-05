import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { ShoppingView as Component } from "./ShoppingView";
import type { ShoppingViewProps as Props } from "./ShoppingView";
import { PLAN_DAY_ORDER } from "~/core/plan/PlanTypes";
import type { PlanSlot, SavedPlan } from "~/core/plan/PlanTypes";
import { emptyPlanDraft, thisWeekKey, weekKeyOf } from "~/core/plan/PlanUtils";
import { SampleRecipes } from "~/core/recipes/RecipeSampleData";
import { NavbarLayoutDecorator } from "~/storybook/decorators/NavbarLayoutDecorator";

const weekKey = thisWeekKey();
const savedRecipes = SampleRecipes.filter((recipe) => recipe.isSaved);

/** A dinner every day, drawn round-robin from the pool — enough overlap to exercise the roll-up. */
const slots: PlanSlot[] = PLAN_DAY_ORDER.map((day, index) => ({
  day,
  meal: "dinner",
  people: 4,
  recipeId: savedRecipes[index % savedRecipes.length]?.id ?? null,
}));

const plannedWeek: SavedPlan = {
  status: "final",
  savedAt: weekKeyOf(new Date()),
  draft: { ...emptyPlanDraft(), slots },
};

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Shopping",
  tags: ["autodocs"],
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
  checkedLines: {},
  onToggleLine: fn(),
  onPrint: fn(),
} satisfies Props;

export const Fullscreen: Story = {
  args: defaultArgs,
  parameters: { viewport: { value: "full" } },
};

/** Lines already ticked off read back muted, with a filled checkbox. */
export const PartlyTickedOff: Story = {
  args: {
    ...defaultArgs,
    checkedLines: Object.fromEntries(
      (savedRecipes[0]?.ingredients ?? []).map((ingredient) => [`${ingredient.item}|${ingredient.unit}`, true])
    ),
  },
  parameters: { viewport: { value: "full" } },
};

export const NotPlanned: Story = {
  args: { ...defaultArgs, plan: null },
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};

/** Ticking a row reports the line it belongs to, so the tick can be persisted. */
export const TicksOffALine: Story = {
  args: defaultArgs,
  parameters: { viewport: { value: "full" } },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const lines = await canvas.findAllByRole("checkbox");
    await expect(lines.length).toBeGreaterThan(0);

    await expect(lines[0]).not.toBeChecked();
    await userEvent.click(lines[0] as HTMLElement);

    await expect(args.onToggleLine).toHaveBeenCalledTimes(1);
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { PlanView as Component } from "./PlanView";
import type { PlanViewProps as Props } from "./PlanView";
import { DefaultPinnedTags } from "~/core/plan/PlanUtils";
import { SampleRecipes, SampleTagCatalogue } from "~/core/recipes/RecipeSampleData";
import { NavbarLayoutDecorator } from "~/storybook/decorators/NavbarLayoutDecorator";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Plan",
  tags: ["!test"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [NavbarLayoutDecorator()],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  recipes: SampleRecipes.filter((recipe) => recipe.isSaved),
  tagCatalogue: SampleTagCatalogue,
  pinnedTags: DefaultPinnedTags,
  onWeekSaved: fn(),
} satisfies Props;

export const Fullscreen: Story = {
  args: defaultArgs,
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};

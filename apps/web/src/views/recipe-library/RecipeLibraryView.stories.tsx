import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { RecipeLibraryView as Component } from "./RecipeLibraryView";
import type { RecipeLibraryViewProps as Props } from "./RecipeLibraryView";
import { DefaultPinnedTags } from "~/core/plan/PlanUtils";
import { SampleRecipes, SampleTagCatalogue } from "~/core/recipes/RecipeSampleData";
import { NavbarLayoutDecorator } from "~/storybook/decorators/NavbarLayoutDecorator";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Recipes/Library",
  tags: ["!test"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [NavbarLayoutDecorator()],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  recipes: SampleRecipes,
  tagCatalogue: SampleTagCatalogue,
  pinnedTags: DefaultPinnedTags,
  onTogglePinnedTag: fn(),
  onOpenRecipe: fn(),
  onAddRecipe: fn(),
  onRemoveRecipe: fn(),
  onBrowseCommunity: fn(),
} satisfies Props;

export const Fullscreen: Story = {
  args: defaultArgs,
  parameters: { viewport: { value: "full" } },
};

export const NoDefaultTags: Story = {
  args: { ...defaultArgs, pinnedTags: [] },
  parameters: { viewport: { value: "full" } },
};

export const Empty: Story = {
  args: { ...defaultArgs, recipes: [] },
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};

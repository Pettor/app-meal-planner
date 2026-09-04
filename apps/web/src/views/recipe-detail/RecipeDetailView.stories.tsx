import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { RecipeDetailView as Component } from "./RecipeDetailView";
import type { RecipeDetailViewProps as Props } from "./RecipeDetailView";
import { SampleRecipes } from "~/core/recipes/RecipeSampleData";
import { NavbarLayoutDecorator } from "~/storybook/decorators/NavbarLayoutDecorator";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Recipe Detail",
  tags: ["!test"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [NavbarLayoutDecorator()],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  recipe: SampleRecipes[0]!,
  onBack: fn(),
  onEdit: fn(),
  onRecommend: fn(),
  onSave: fn(),
  onRemove: fn(),
  onPrint: fn(),
  onOpenAuthor: fn(),
} satisfies Props;

export const Fullscreen: Story = {
  args: defaultArgs,
  parameters: { viewport: { value: "full" } },
};

export const WithoutPhoto: Story = {
  args: { ...defaultArgs, recipe: SampleRecipes[1]! },
  parameters: { viewport: { value: "full" } },
};

export const FromTheCommunity: Story = {
  args: { ...defaultArgs, recipe: SampleRecipes[6]! },
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};

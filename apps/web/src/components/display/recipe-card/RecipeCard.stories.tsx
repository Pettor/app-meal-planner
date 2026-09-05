import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { RecipeCard as Component } from "./RecipeCard";
import type { RecipeCardProps as Props } from "./RecipeCard";
import { SampleRecipes } from "~/core/recipes/RecipeSampleData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Display/Recipe Card",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ownRecipe = SampleRecipes[0]!;
const communityRecipe = SampleRecipes[6]!;

const defaultArgs = {
  recipe: ownRecipe,
  onOpen: fn(),
  onRemove: fn(),
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
};

export const WithoutPhoto: Story = {
  args: { ...defaultArgs, recipe: SampleRecipes[1]! },
};

export const FromTheCommunity: Story = {
  args: {
    recipe: communityRecipe,
    showSaveAction: true,
    onOpen: fn(),
    onSave: fn(),
  },
};

export const AlreadySaved: Story = {
  args: {
    recipe: { ...communityRecipe, isSaved: true },
    showSaveAction: true,
    onOpen: fn(),
    onSave: fn(),
  },
};

export const OpensOnClick: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: `Open ${ownRecipe.title}` }));
    await expect(args.onOpen).toHaveBeenCalledWith(ownRecipe.id);
  },
};

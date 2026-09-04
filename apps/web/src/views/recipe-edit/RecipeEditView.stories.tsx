import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { emptyRecipeDraft, recipeToDraft } from "./RecipeDraft";
import { RecipeEditView as Component } from "./RecipeEditView";
import type { RecipeEditViewProps as Props } from "./RecipeEditView";
import { SampleRecipes, SampleScannedRecipe, SampleTagCatalogue, SuggestedTags } from "~/core/recipes/RecipeSampleData";
import { NavbarLayoutDecorator } from "~/storybook/decorators/NavbarLayoutDecorator";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Recipe Edit",
  tags: ["!test"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [NavbarLayoutDecorator()],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  isOpen: true,
  initialDraft: emptyRecipeDraft(),
  isExistingRecipe: false,
  suggestedTags: SuggestedTags,
  tagCatalogue: SampleTagCatalogue,
  sampleScanResult: SampleScannedRecipe,
  onSave: fn(),
  onCancel: fn(),
  onDelete: fn(),
} satisfies Props;

export const NewRecipe: Story = {
  args: defaultArgs,
  parameters: { viewport: { value: "full" } },
};

export const EditingExisting: Story = {
  args: {
    ...defaultArgs,
    initialDraft: recipeToDraft(SampleRecipes[2]!),
    isExistingRecipe: true,
  },
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};

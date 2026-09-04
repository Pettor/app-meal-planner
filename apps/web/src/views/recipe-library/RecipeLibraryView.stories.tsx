import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { RecipeLibraryView as Component } from "./RecipeLibraryView";
import type { RecipeLibraryViewProps as Props } from "./RecipeLibraryView";
import { SampleRecipes, SampleScannedRecipe, SampleTagCatalogue, SuggestedTags } from "~/core/recipes/RecipeSampleData";
import { NavbarLayoutDecorator } from "~/storybook/decorators/NavbarLayoutDecorator";
import { emptyRecipeDraft } from "~/views/recipe-edit/RecipeDraft";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Recipe Library",
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
  onOpenRecipe: fn(),
  onAddRecipe: fn(),
  onSaveRecipe: fn(),
  onRemoveRecipe: fn(),
  addRecipeModal: {
    isOpen: false,
    initialDraft: emptyRecipeDraft(),
    isExistingRecipe: false,
    suggestedTags: SuggestedTags,
    tagCatalogue: SampleTagCatalogue,
    sampleScanResult: SampleScannedRecipe,
    onSave: fn(),
    onCancel: fn(),
    onDelete: fn(),
  },
} satisfies Props;

export const AddRecipeModalOpen: Story = {
  args: { ...defaultArgs, addRecipeModal: { ...defaultArgs.addRecipeModal, isOpen: true } },
  parameters: { viewport: { value: "full" } },
};

export const Fullscreen: Story = {
  args: defaultArgs,
  parameters: { viewport: { value: "full" } },
};

export const Everyone: Story = {
  args: { ...defaultArgs, initialScope: "everyone" },
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

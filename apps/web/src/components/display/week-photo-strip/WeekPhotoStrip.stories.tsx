import type { Meta, StoryObj } from "@storybook/react-vite";
import { WeekPhotoStrip as Component } from "./WeekPhotoStrip";
import { SampleRecipes } from "~/core/recipes/RecipeSampleData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Display/Week Photo Strip",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-160">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const photos = SampleRecipes.map((recipe) => recipe.photoUrl).filter((photo): photo is string => photo !== null);

export const Default: Story = {
  args: { photos: photos.slice(0, 4), weekTitle: "Meatless, still filling" },
};

export const PartlyEmpty: Story = {
  args: { photos: [photos[0] ?? null, null, photos[1] ?? null, null], weekTitle: "Fish twice, cheap the rest" },
};

export const NoPhotos: Story = {
  args: { photos: [null, null, null, null], weekTitle: "Cooking for two" },
};

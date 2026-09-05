import type { Meta, StoryObj } from "@storybook/react-vite";
import { RecipePhoto as Component } from "./RecipePhoto";
import type { RecipePhotoProps as Props } from "./RecipePhoto";
import dalImgSrc from "~/assets/images/recipes/dal.jpg";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Display/Recipe Photo",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  photoUrl: dalImgSrc,
  alt: "Red lentil dal",
  className: "h-34",
} satisfies Props;

export const WithPhoto: Story = {
  args: defaultArgs,
};

export const Placeholder: Story = {
  args: { ...defaultArgs, photoUrl: null },
};

export const PlaceholderWithPrompt: Story = {
  args: {
    ...defaultArgs,
    photoUrl: null,
    placeholderClassName: "h-45",
    placeholderContent: (
      <>
        <span className="text-accent text-sm font-medium">Add a photo</span>
        <span className="text-xs">Optional, sits on top of the recipe</span>
      </>
    ),
  },
};

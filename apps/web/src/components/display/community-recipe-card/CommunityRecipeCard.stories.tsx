import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { CommunityRecipeCard as Component } from "./CommunityRecipeCard";
import type { CommunityRecipeCardProps as Props } from "./CommunityRecipeCard";
import { CommunityCardHeader } from "~/components/display/community-card-header/CommunityCardHeader";
import { SampleCommunityPeople } from "~/core/community/CommunitySampleData";
import { SampleRecipes } from "~/core/recipes/RecipeSampleData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Display/Community Recipe Card",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-180">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const withPhoto = SampleRecipes.find((recipe) => recipe.author.id !== "me" && recipe.photoUrl !== null)!;
const withoutPhoto = SampleRecipes.find((recipe) => recipe.author.id !== "me" && recipe.photoUrl === null)!;
const author = SampleCommunityPeople.find((person) => person.id === withPhoto.author.id)!;

const defaultArgs = {
  recipe: withPhoto,
  onRecommend: fn(),
  onOpen: fn(),
} satisfies Props;

export const WithPhoto: Story = {
  args: defaultArgs,
};

export const WithoutPhoto: Story = {
  args: { ...defaultArgs, recipe: withoutPhoto },
};

export const InTheFeed: Story = {
  args: {
    ...defaultArgs,
    header: <CommunityCardHeader person={author} action="added a recipe" ago="3d ago" onOpenProfile={fn()} />,
  },
};

export const ShortPhoto: Story = {
  args: { ...defaultArgs, photoHeight: "short" },
};

export const OpensOnClick: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "View recipe" }));
    await expect(args.onOpen).toHaveBeenCalled();
  },
};

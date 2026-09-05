import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { ProfileView as Component } from "./ProfileView";
import type { ProfileViewProps as Props } from "./ProfileView";
import { SampleCommunityPeople, SampleSharedWeeks } from "~/core/community/CommunitySampleData";
import { SampleAuthorMe, SampleRecipes } from "~/core/recipes/RecipeSampleData";
import { NavbarLayoutDecorator } from "~/storybook/decorators/NavbarLayoutDecorator";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Community Profile",
  tags: ["!test"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [NavbarLayoutDecorator()],
};

export default meta;
type Story = StoryObj<typeof meta>;

const person = SampleCommunityPeople[0]!;

const defaultArgs = {
  person,
  isMe: false,
  isFollowing: true,
  tab: "weeks",
  onTabChange: fn(),
  weeks: SampleSharedWeeks.filter((week) => week.ownerId === person.id),
  recipes: SampleRecipes.filter((recipe) => recipe.author.id === person.id),
  allRecipes: SampleRecipes,
  onToggleFollow: fn(),
  onEditProfile: fn(),
  onBack: fn(),
  onOpenRecipe: fn(),
  onRecommendWeek: fn(),
  onRecommendRecipe: fn(),
  onUseWeek: fn(),
} satisfies Props;

export const SomeoneYouFollow: Story = {
  args: defaultArgs,
};

export const NotFollowing: Story = {
  args: { ...defaultArgs, isFollowing: false },
};

export const TheirRecipes: Story = {
  args: { ...defaultArgs, tab: "recipes" },
};

export const YourOwnProfile: Story = {
  args: {
    ...defaultArgs,
    person: { ...SampleAuthorMe, bio: "Plans the week on Sunday and mostly sticks to it.", followsMe: false },
    isMe: true,
    weeks: [],
    recipes: SampleRecipes.filter((recipe) => recipe.author.id === "me"),
  },
};

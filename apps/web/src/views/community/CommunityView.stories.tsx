import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { CommunityView as Component } from "./CommunityView";
import type { CommunityViewProps as Props } from "./CommunityView";
import { DefaultFollowing, SampleCommunityPeople, SampleSharedWeeks } from "~/core/community/CommunitySampleData";
import type { CommunityPerson } from "~/core/community/CommunityTypes";
import { SampleRecipes } from "~/core/recipes/RecipeSampleData";
import { NavbarLayoutDecorator } from "~/storybook/decorators/NavbarLayoutDecorator";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Community/Feed",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [NavbarLayoutDecorator()],
};

export default meta;
type Story = StoryObj<typeof meta>;

function personById(personId: string): CommunityPerson | null {
  return SampleCommunityPeople.find((person) => person.id === personId) ?? null;
}

const defaultArgs = {
  tab: "feed",
  onTabChange: fn(),
  people: SampleCommunityPeople,
  weeks: SampleSharedWeeks,
  recipes: SampleRecipes,
  following: DefaultFollowing,
  personById,
  onToggleFollow: fn(),
  onOpenProfile: fn(),
  onOpenRecipe: fn(),
  onOpenInbox: fn(),
  onRecommendWeek: fn(),
  onRecommendRecipe: fn(),
  onUseWeek: fn(),
} satisfies Props;

export const Feed: Story = {
  args: defaultArgs,
};

export const People: Story = {
  args: { ...defaultArgs, tab: "people" },
};

export const SharedWeeks: Story = {
  args: { ...defaultArgs, tab: "weeks" },
};

export const OpensInbox: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId("community__open-inbox"));
    await expect(args.onOpenInbox).toHaveBeenCalled();
  },
};

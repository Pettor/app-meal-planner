import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { SharedWeekCard as Component } from "./SharedWeekCard";
import type { SharedWeekCardProps as Props } from "./SharedWeekCard";
import { CommunityCardHeader } from "~/components/display/community-card-header/CommunityCardHeader";
import { SampleCommunityPeople, SampleSharedWeeks } from "~/core/community/CommunitySampleData";
import { sharedWeekDays, sharedWeekPhotos, sharedWeekTags } from "~/core/community/CommunityUtils";
import { SampleRecipes } from "~/core/recipes/RecipeSampleData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Display/Shared Week Card",
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

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const sharedWeek = SampleSharedWeeks[0]!;
const owner = SampleCommunityPeople.find((person) => person.id === sharedWeek.ownerId)!;

const week = {
  id: sharedWeek.id,
  title: sharedWeek.title,
  note: sharedWeek.note,
  tags: sharedWeekTags(sharedWeek, SampleRecipes),
  days: sharedWeekDays(sharedWeek, SampleRecipes, dayNames),
  photos: sharedWeekPhotos(sharedWeek, SampleRecipes),
  usesLabel: "31 uses",
  agoLabel: "2d ago",
};

const defaultArgs = {
  week,
  onRecommend: fn(),
  onUse: fn(),
} satisfies Props;

export const WithoutHeader: Story = {
  args: { ...defaultArgs, showAgeBesideTitle: true },
};

export const InTheFeed: Story = {
  args: {
    ...defaultArgs,
    header: <CommunityCardHeader person={owner} action="shared a week" ago="2d ago" onOpenProfile={fn()} />,
  },
};

export const InTheWeeksGrid: Story = {
  args: {
    ...defaultArgs,
    header: <CommunityCardHeader person={owner} showHandle withBorder ago="2d ago" onOpenProfile={fn()} />,
  },
};

export const UsesTheWeekOnClick: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Use this week" }));
    await expect(args.onUse).toHaveBeenCalled();
  },
};

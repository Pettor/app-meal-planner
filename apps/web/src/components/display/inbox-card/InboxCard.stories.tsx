import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { InboxCard as Component } from "./InboxCard";
import type { InboxCardProps as Props } from "./InboxCard";
import { SampleCommunityPeople, SampleSharedWeeks } from "~/core/community/CommunitySampleData";
import { sharedWeekDays, sharedWeekTags } from "~/core/community/CommunityUtils";
import { SampleRecipes } from "~/core/recipes/RecipeSampleData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Display/Inbox Card",
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
const week = SampleSharedWeeks[1]!;
const recipe = SampleRecipes.find((candidate) => candidate.id === "c7")!;

const weekItem = {
  id: "n1",
  kind: "week" as const,
  from: SampleCommunityPeople[1]!,
  action: "recommended a week",
  ago: "1d ago",
  note: "Thought of you when I put this week together. The Tuesday one is the winner.",
  title: week.title,
  tags: sharedWeekTags(week, SampleRecipes),
  days: sharedWeekDays(week, SampleRecipes, dayNames),
};

const defaultArgs = {
  item: weekItem,
  onOpenProfile: fn(),
  onAccept: fn(),
  onDismiss: fn(),
} satisfies Props;

export const AWeek: Story = {
  args: defaultArgs,
};

export const ARecipe: Story = {
  args: {
    ...defaultArgs,
    item: {
      id: "n2",
      kind: "recipe",
      from: SampleCommunityPeople[0]!,
      action: "recommended a recipe",
      ago: "3d ago",
      note: "Twenty-five minutes and it tastes like you tried much harder.",
      title: recipe.title,
      tags: recipe.tags,
      days: [],
    },
  },
};

export const AcceptsOnClick: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId("inbox-card__accept--n1"));
    await expect(args.onAccept).toHaveBeenCalled();
  },
};

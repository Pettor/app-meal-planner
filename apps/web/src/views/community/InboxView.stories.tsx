import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { InboxView as Component } from "./InboxView";
import type { InboxViewProps as Props } from "./InboxView";
import type { InboxCardViewModel } from "~/components/display/inbox-card/InboxCard";
import { SampleCommunityPeople, SampleSharedWeeks } from "~/core/community/CommunitySampleData";
import { sharedWeekDays, sharedWeekTags } from "~/core/community/CommunityUtils";
import { SampleRecipes } from "~/core/recipes/RecipeSampleData";
import { NavbarLayoutDecorator } from "~/storybook/decorators/NavbarLayoutDecorator";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Community/Inbox",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [NavbarLayoutDecorator()],
};

export default meta;
type Story = StoryObj<typeof meta>;

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const week = SampleSharedWeeks[1]!;
const recipe = SampleRecipes.find((candidate) => candidate.id === "c7")!;

const items: InboxCardViewModel[] = [
  {
    id: "n1",
    kind: "week",
    from: SampleCommunityPeople[1]!,
    action: "recommended a week",
    ago: "1d ago",
    note: "Thought of you when I put this week together. The Tuesday one is the winner.",
    title: week.title,
    tags: sharedWeekTags(week, SampleRecipes),
    days: sharedWeekDays(week, SampleRecipes, dayNames),
  },
  {
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
];

const defaultArgs = {
  items,
  onBack: fn(),
  onOpenProfile: fn(),
  onAccept: fn(),
  onDismiss: fn(),
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
};

export const Empty: Story = {
  args: { ...defaultArgs, items: [] },
};

export const DismissesAnItem: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId("inbox-card__dismiss--n2"));
    await expect(args.onDismiss).toHaveBeenCalledWith("n2");
  },
};

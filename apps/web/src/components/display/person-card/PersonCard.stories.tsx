import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { PersonCard as Component } from "./PersonCard";
import type { PersonCardProps as Props } from "./PersonCard";
import { SampleCommunityPeople } from "~/core/community/CommunitySampleData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Display/Person Card",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-73">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const person = SampleCommunityPeople[0]!;

const defaultArgs = {
  person,
  counts: "6 weeks · 12 recipes",
  isFollowing: false,
  onToggleFollow: fn(),
  onOpenProfile: fn(),
} satisfies Props;

export const NotFollowing: Story = {
  args: defaultArgs,
};

export const Following: Story = {
  args: { ...defaultArgs, isFollowing: true },
};

export const DoesNotFollowYou: Story = {
  args: { ...defaultArgs, person: SampleCommunityPeople[3]! },
};

export const FollowsOnClick: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId(`person-card__follow--${person.id}`));
    await expect(args.onToggleFollow).toHaveBeenCalled();
  },
};

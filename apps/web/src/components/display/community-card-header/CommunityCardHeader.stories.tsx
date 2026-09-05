import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { CommunityCardHeader as Component } from "./CommunityCardHeader";
import type { CommunityCardHeaderProps as Props } from "./CommunityCardHeader";
import { SampleCommunityPeople } from "~/core/community/CommunitySampleData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Display/Community Card Header",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="border-border w-160 rounded-lg border">
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
  action: "shared a week",
  ago: "2d ago",
  onOpenProfile: fn(),
} satisfies Props;

export const WithAction: Story = {
  args: defaultArgs,
};

export const WithHandle: Story = {
  args: { person, showHandle: true, withBorder: true, ago: "4d ago", onOpenProfile: fn() },
};

export const OpensProfileOnClick: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: person.name }));
    await expect(args.onOpenProfile).toHaveBeenCalled();
  },
};

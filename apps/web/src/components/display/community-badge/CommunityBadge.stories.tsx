import type { Meta, StoryObj } from "@storybook/react-vite";
import { CommunityBadge as Component } from "./CommunityBadge";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Display/Community Badge",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Week: Story = {
  args: { kind: "week" },
};

export const Recipe: Story = {
  args: { kind: "recipe" },
};

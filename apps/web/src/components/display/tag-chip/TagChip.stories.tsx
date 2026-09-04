import type { Meta, StoryObj } from "@storybook/react-vite";
import { TagChip as Component } from "./TagChip";
import type { TagChipProps as ComponentProps } from "./TagChip";

const meta: Meta<typeof Component> = {
  title: "Display/Tag Chip",
  component: Component,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  tag: "vegetarian",
} satisfies ComponentProps;

export const Default: Story = {
  args: defaultArgs,
};

export const Tones: Story = {
  args: defaultArgs,
  render: () => (
    <div className="flex flex-wrap gap-1.5">
      {["vegetarian", "meat", "fish", "bbq", "quick", "cheap", "expensive", "comfort", "weeknight"].map((tag) => (
        <Component key={tag} tag={tag} />
      ))}
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
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

/** Every tag is drawn the same; only the leading dot says which family it belongs to. */
export const Families: Story = {
  args: defaultArgs,
  render: () => (
    <div className="flex flex-wrap gap-1.5">
      {["vegetarian", "gluten-free", "meat", "fish", "bbq", "sheet-pan", "quick", "comfort", "italian"].map((tag) => (
        <Component key={tag} tag={tag} />
      ))}
    </div>
  ),
};

/** The same primitive with a larger hit area, used wherever tags are picked. */
export const Interactive: Story = {
  args: defaultArgs,
  render: () => (
    <div className="flex flex-wrap gap-1.5">
      <Component tag="vegetarian" onPress={fn()} />
      <Component tag="meat" onPress={fn()} isSelected />
      <Component tag="bbq" onPress={fn()} endContent="1,120" />
      <Component tag="quick" onPress={fn()} isSelected endContent="3,600" />
    </div>
  ),
};

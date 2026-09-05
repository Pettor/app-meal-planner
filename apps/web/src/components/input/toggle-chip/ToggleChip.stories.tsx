import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { ToggleChip as Component } from "./ToggleChip";
import type { ToggleChipProps as Props } from "./ToggleChip";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Input/Toggle Chip",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  label: "vegetarian",
  isSelected: false,
  onChange: () => {},
} satisfies Props;

export const Unselected: Story = {
  args: defaultArgs,
};

export const Selected: Story = {
  args: { ...defaultArgs, isSelected: true },
};

export const WithCount: Story = {
  args: {
    ...defaultArgs,
    isSelected: true,
    endContent: <span className="font-mono text-[11px] opacity-70">2840</span>,
  },
};

export const Toggles: Story = {
  args: defaultArgs,
  render: function Render(args) {
    const [isSelected, setIsSelected] = useState(false);
    return <Component {...args} isSelected={isSelected} onChange={setIsSelected} />;
  },
  play: async ({ canvas, userEvent }) => {
    const chip = canvas.getByRole("button", { name: "vegetarian" });

    await expect(chip).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(chip);
    await expect(chip).toHaveAttribute("aria-pressed", "true");
  },
};

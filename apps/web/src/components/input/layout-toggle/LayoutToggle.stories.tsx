import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { LayoutToggle as Component } from "./LayoutToggle";
import type { LayoutToggleProps as Props } from "./LayoutToggle";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Input/Layout Toggle",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  options: [
    { value: "table", label: "Timetable" },
    { value: "cards", label: "Cards" },
  ],
  value: "table",
  onChange: () => {},
} satisfies Props<string>;

export const Default: Story = {
  args: defaultArgs,
};

/** The planner's review step offers the same control over its own two layouts. */
export const PlannerLayouts: Story = {
  args: {
    options: [
      { value: "rows", label: "List" },
      { value: "grid", label: "Week grid" },
    ],
    value: "grid",
    onChange: () => {},
  },
};

export const Switches: Story = {
  args: defaultArgs,
  render: function Render(args) {
    const [value, setValue] = useState("table");
    return <Component {...args} value={value} onChange={setValue} />;
  },
  play: async ({ canvas, userEvent }) => {
    const timetable = canvas.getByRole("button", { name: "Timetable" });
    const cards = canvas.getByRole("button", { name: "Cards" });

    await expect(timetable).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(cards);
    await expect(cards).toHaveAttribute("aria-pressed", "true");
    await expect(timetable).toHaveAttribute("aria-pressed", "false");
  },
};

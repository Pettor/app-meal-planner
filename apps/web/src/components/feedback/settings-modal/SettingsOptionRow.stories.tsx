import { SunIcon } from "@heroicons/react/24/outline";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { SettingsOptionRow as Component } from "./SettingsOptionRow";
import type { SettingsOptionRowProps as Props } from "./SettingsOptionRow";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Settings Modal/Option Row",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  icon: <SunIcon className="size-4.75" />,
  label: "Light",
  isSelected: false,
  onSelect: fn(),
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
};

export const Selected: Story = {
  args: { ...defaultArgs, isSelected: true },
};

export const WithNote: Story = {
  args: { ...defaultArgs, label: "System", note: "follows your OS" },
};

export const Interaction: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Light" }));
    await expect(args.onSelect).toHaveBeenCalled();
  },
};

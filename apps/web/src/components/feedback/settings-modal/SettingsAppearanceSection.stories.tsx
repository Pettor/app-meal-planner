import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { SettingsAppearanceSection as Component } from "./SettingsAppearanceSection";
import type { SettingsAppearanceSectionProps as Props } from "./SettingsAppearanceSection";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Settings Modal/Appearance Section",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  themeSelector: { mode: "auto" as const, onSelect: fn() },
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
};

export const Dark: Story = {
  args: { themeSelector: { mode: "dark", onSelect: fn() } },
};

export const Interaction: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("radio", { name: "Light" }));
    await expect(args.themeSelector.onSelect).toHaveBeenCalledWith("light");

    await userEvent.click(canvas.getByRole("radio", { name: "Dark" }));
    await expect(args.themeSelector.onSelect).toHaveBeenCalledWith("dark");
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { SettingsLanguageSection as Component } from "./SettingsLanguageSection";
import type { SettingsLanguageSectionProps as Props } from "./SettingsLanguageSection";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Settings Modal/Language Section",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  locale: "en" as const,
  onSelect: fn(),
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
};

export const Swedish: Story = {
  args: { ...defaultArgs, locale: "sv" },
};

export const Interaction: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByRole("button", { name: "English" })).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(canvas.getByRole("button", { name: /Svenska/ }));
    await expect(args.onSelect).toHaveBeenCalledWith("sv");
  },
};

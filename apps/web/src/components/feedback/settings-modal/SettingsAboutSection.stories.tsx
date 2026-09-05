import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { SettingsAboutSection as Component } from "./SettingsAboutSection";
import type { SettingsAboutSectionProps as Props } from "./SettingsAboutSection";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Settings Modal/About Section",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  appName: "My App",
  appVersion: "1.0.0",
  serverVersion: "2.0.0",
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
  play: async ({ canvas }) => {
    await expect(canvas.getByText("About")).toBeInTheDocument();
    await expect(canvas.getByText("1.0.0")).toBeInTheDocument();
  },
};

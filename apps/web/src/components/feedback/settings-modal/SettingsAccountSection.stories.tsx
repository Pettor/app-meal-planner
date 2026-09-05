import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { SettingsAccountSection as Component } from "./SettingsAccountSection";
import type { SettingsAccountSectionProps as Props } from "./SettingsAccountSection";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Settings Modal/Account Section",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  name: "John Doe",
  email: "john.doe@example.com",
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
  play: async ({ canvas }) => {
    await expect(canvas.getByText("John Doe")).toBeInTheDocument();
    await expect(canvas.getByText("john.doe@example.com")).toBeInTheDocument();
  },
};

export const Loading: Story = {
  // The profile has not arrived yet, so both values fall back to a skeleton.
  args: { name: "", email: "" },
  play: async ({ canvas }) => {
    await expect(canvas.queryByText("John Doe")).not.toBeInTheDocument();
    await expect(canvas.getByText("Name")).toBeInTheDocument();
  },
};

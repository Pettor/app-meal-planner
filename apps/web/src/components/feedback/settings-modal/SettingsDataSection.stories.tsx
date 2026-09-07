import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { SettingsDataSection as Component } from "./SettingsDataSection";
import type { SettingsDataSectionProps as Props } from "./SettingsDataSection";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Settings Modal/Data Section",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleJson = JSON.stringify(
  {
    version: 1,
    savedRecipeIds: ["r1", "r3"],
    pinnedTags: ["vegetarian", "quick"],
    plans: {},
    selectedWeekKey: "2026-09-07",
  },
  null,
  2
);

const defaultArgs = {
  json: sampleJson,
  status: "idle" as const,
  onJsonChange: fn(),
  onApply: fn(),
  onDownload: fn(),
  onReset: fn(),
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
};

export const Applied: Story = {
  args: { ...defaultArgs, status: "applied" },
};

export const ParseError: Story = {
  args: { ...defaultArgs, json: "{ not json", status: "invalid" },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Could not parse that JSON.")).toBeInTheDocument();
  },
};

export const Interaction: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Apply JSON" }));
    await expect(args.onApply).toHaveBeenCalled();

    await userEvent.click(canvas.getByRole("button", { name: "Reset to sample data" }));
    await expect(args.onReset).toHaveBeenCalled();
  },
};

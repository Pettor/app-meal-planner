import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen } from "storybook/test";
import { ConfirmDialog as Component } from "./ConfirmDialog";
import type { ConfirmDialogProps as Props } from "./ConfirmDialog";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Confirm Dialog",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  isOpen: true,
  title: "Delete this recipe?",
  subject: "Mushroom risotto",
  body: "You wrote this one, so removing it deletes it for good. It will also be cleared from any planned day that used it.",
  confirmLabel: "Delete it",
  onConfirm: fn(),
  onCancel: fn(),
} satisfies Props;

export const Danger: Story = {
  args: defaultArgs,
};

export const Accent: Story = {
  args: {
    ...defaultArgs,
    tone: "accent",
    title: "Load this week?",
    subject: "Fish twice, cheap the rest",
    body: "Copied into next week as a draft. Nothing is saved until you say so.",
    confirmLabel: "Load into planner",
  },
};

export const Confirms: Story = {
  args: defaultArgs,
  play: async ({ args, userEvent }) => {
    // The modal renders in a portal, so query the whole document rather than the canvas.
    await userEvent.click(await screen.findByTestId("confirm-dialog__confirm"));
    await expect(args.onConfirm).toHaveBeenCalled();
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { AuthSwitchPrompt as Component } from "./AuthSwitchPrompt";
import type { AuthSwitchPromptProps as ComponentProps } from "./AuthSwitchPrompt";

const meta: Meta<typeof Component> = {
  title: "Display/Auth Switch Prompt",
  component: Component,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  text: "New here?",
  actionLabel: "Create an account",
  onPress: fn(),
} satisfies ComponentProps;

export const Default: Story = {
  args: defaultArgs,
};

export const SignIn: Story = {
  args: {
    ...defaultArgs,
    text: "Already cooking with us?",
    actionLabel: "Sign in",
  },
};

export const Interaction: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId("auth-switch-prompt__action"));
    await expect(args.onPress).toHaveBeenCalled();
  },
};

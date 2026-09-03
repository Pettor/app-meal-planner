import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { PasswordStrength as Component } from "./PasswordStrength";
import type { PasswordStrengthProps as ComponentProps } from "./PasswordStrength";

const meta: Meta<typeof Component> = {
  title: "Display/Password Strength",
  component: Component,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  password: "",
} satisfies ComponentProps;

export const Empty: Story = {
  args: defaultArgs,
};

export const Weak: Story = {
  args: { password: "kitchen" },
};

export const Fair: Story = {
  args: { password: "kitchen1" },
};

export const Good: Story = {
  args: { password: "kitchentable1" },
};

export const Strong: Story = {
  args: { password: "kitchen-table-1!" },
};

export const Interaction: Story = {
  args: { password: "kitchen-table-1!" },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId("password-strength__label")).toHaveTextContent("Strong");
  },
};

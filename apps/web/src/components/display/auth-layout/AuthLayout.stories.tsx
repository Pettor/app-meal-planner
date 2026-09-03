import { Alert, Button } from "@heroui/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { AuthLayout as Component } from "./AuthLayout";
import type { AuthLayoutProps as ComponentProps } from "./AuthLayout";
import { AuthSwitchPrompt } from "./AuthSwitchPrompt";
import { BasicLayoutDecorator } from "~/storybook/decorators/BasicLayoutDecorator";

const meta: Meta<typeof Component> = {
  title: "Display/Auth Layout",
  component: Component,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [BasicLayoutDecorator()],
  argTypes: {
    banner: { table: { disable: true } },
    footer: { table: { disable: true } },
    headerAction: { table: { disable: true } },
    children: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  appName: "Meal Planner",
  title: "Welcome back",
  subtitle: "Sign in and pick up where the week left off.",
  children: <Button variant="primary">Sign in</Button>,
  footer: <AuthSwitchPrompt text="New here?" actionLabel="Create an account" onPress={() => {}} />,
} satisfies ComponentProps;

export const Default: Story = {
  args: defaultArgs,
};

export const WithBanner: Story = {
  args: {
    ...defaultArgs,
    banner: (
      <Alert status="warning">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Description>
            Demo build. Any valid email and a password of at least 8 characters will get you in.
          </Alert.Description>
        </Alert.Content>
      </Alert>
    ),
  },
};

export const WithBackButton: Story = {
  args: {
    ...defaultArgs,
    title: "Reset your password",
    subtitle: "Enter the email you signed up with and we'll send a link to set a new password.",
    footer: <AuthSwitchPrompt text="Remembered it?" actionLabel="Sign in" onPress={() => {}} />,
    onBack: () => {},
  },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};

export const Interaction: Story = {
  args: {
    ...defaultArgs,
    onBack: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { name: "Welcome back" })).toBeInTheDocument();
    await expect(canvas.getByTestId("auth-layout__back-button")).toBeInTheDocument();
    await expect(canvas.getByTestId("auth-switch-prompt__action")).toBeInTheDocument();
  },
};

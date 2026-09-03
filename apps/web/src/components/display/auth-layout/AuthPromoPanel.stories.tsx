import type { Meta, StoryObj } from "@storybook/react-vite";
import { AuthPromoPanel as Component } from "./AuthPromoPanel";
import type { AuthPromoPanelProps as ComponentProps } from "./AuthPromoPanel";

const meta: Meta<typeof Component> = {
  title: "Display/Auth Promo Panel",
  component: Component,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  appName: "Meal Planner",
} satisfies ComponentProps;

export const Default: Story = {
  args: defaultArgs,
};

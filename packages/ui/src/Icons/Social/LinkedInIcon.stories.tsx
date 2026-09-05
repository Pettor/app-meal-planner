import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { LinkedInIcon as Component } from "./LinkedInIcon";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Shared/Icons/LinkedIn Icon",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <span className="text-foreground block h-8 w-8 fill-current">
        <Story />
      </span>
    ),
  ],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("img", { name: "LinkedIn" })).toBeInTheDocument();
  },
};

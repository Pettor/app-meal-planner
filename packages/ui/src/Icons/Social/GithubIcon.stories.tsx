import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { GithubIcon as Component } from "./GithubIcon";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Shared/Icons/Github Icon",
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
    await expect(canvas.getByRole("img", { name: "GitHub" })).toBeInTheDocument();
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { UserAvatar as Component } from "./UserAvatar";
import type { UserAvatarProps as ComponentProps } from "./UserAvatar";
import avatarImgSrc from "~/assets/images/recipes/risotto.png";

const meta: Meta<typeof Component> = {
  title: "Display/User Avatar",
  component: Component,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  name: "Nina Farrow",
} satisfies ComponentProps;

export const Initials: Story = {
  args: defaultArgs,
};

export const Sizes: Story = {
  args: defaultArgs,
  render: (args) => (
    <div className="flex items-center gap-3">
      <Component {...args} size="xs" />
      <Component {...args} size="sm" />
      <Component {...args} size="md" />
      <Component {...args} size="lg" />
    </div>
  ),
};

export const WithPhoto: Story = {
  args: {
    ...defaultArgs,
    size: "lg",
    avatarUrl: avatarImgSrc,
  },
};

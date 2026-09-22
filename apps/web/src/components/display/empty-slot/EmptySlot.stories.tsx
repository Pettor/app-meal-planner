import type { Meta, StoryObj } from "@storybook/react-vite";
import { EmptySlot as Component } from "./EmptySlot";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Display/Empty Slot",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-surface-secondary flex w-60 flex-col p-2.5">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NothingPlanned: Story = {
  args: { label: "Nothing planned" },
};

export const NoMeals: Story = {
  args: { label: "No meals" },
};

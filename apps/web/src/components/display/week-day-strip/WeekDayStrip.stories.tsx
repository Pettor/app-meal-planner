import type { Meta, StoryObj } from "@storybook/react-vite";
import { WeekDayStrip as Component } from "./WeekDayStrip";
import type { SharedWeekDay } from "~/core/community/CommunityTypes";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Display/Week Day Strip",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-160">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const days: SharedWeekDay[] = [
  { day: "Mon", title: "Paneer butter masala" },
  { day: "Tue", title: "Chana masala" },
  { day: "Wed", title: "Red lentil dal" },
  { day: "Thu", title: "Roast veg traybake with feta" },
  { day: "Fri", title: "Miso aubergine rice bowls" },
  { day: "Sat", title: "Coconut sambar" },
  { day: "Sun", title: "Halloumi and chickpea salad" },
];

export const Default: Story = {
  args: { days },
};

export const WithEmptyDays: Story = {
  args: { days: days.map((day, index) => (index % 3 === 1 ? { ...day, title: "—" } : day)) },
};

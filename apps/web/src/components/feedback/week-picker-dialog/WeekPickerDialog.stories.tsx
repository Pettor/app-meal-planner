import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen } from "storybook/test";
import { WeekPickerDialog as Component } from "./WeekPickerDialog";
import type { WeekPickerDialogProps as Props } from "./WeekPickerDialog";
import type { PlanCalendarWeekViewModel } from "~/core/plan/PlanTypes";
import { buildCalendarWeeks, firstOfMonth } from "~/core/plan/PlanUtils";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Week Picker Dialog",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** A month of real week rows, with the second one planned and selected. */
const weeks: PlanCalendarWeekViewModel[] = buildCalendarWeeks(firstOfMonth(new Date())).map((row, index) => ({
  weekNumber: row.weekNumber,
  statusDotClassName: index === 1 ? "bg-success" : index === 2 ? "bg-warning" : "bg-default-300",
  mealsLabel: index === 1 ? "7 filled" : index === 2 ? "3 filled" : "",
  isSelected: index === 1,
  days: row.days.map((day) => ({
    dayNumber: day.dayNumber,
    isCurrentMonth: day.isCurrentMonth,
    isToday: day.isToday,
    hasPlannedMeal: index === 1,
  })),
  onSelect: fn(),
}));

const defaultArgs = {
  isOpen: true,
  title: "March 2026",
  dayNames,
  weeks,
  onPrevMonth: fn(),
  onNextMonth: fn(),
  onToday: fn(),
  onClose: fn(),
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
};

/** Before any week has been planned, every row is unplanned and nothing is selected. */
export const NothingPlanned: Story = {
  args: {
    ...defaultArgs,
    weeks: weeks.map((week) => ({
      ...week,
      statusDotClassName: "bg-default-300",
      mealsLabel: "",
      isSelected: false,
      days: week.days.map((day) => ({ ...day, hasPlannedMeal: false })),
    })),
  },
};

export const StepsThroughMonths: Story = {
  args: defaultArgs,
  play: async ({ args, userEvent }) => {
    // The modal renders in a portal, so query the whole document rather than the canvas.
    await userEvent.click(await screen.findByRole("button", { name: "Next month" }));
    await expect(args.onNextMonth).toHaveBeenCalled();

    await userEvent.click(await screen.findByRole("button", { name: "Previous month" }));
    await expect(args.onPrevMonth).toHaveBeenCalled();
  },
};

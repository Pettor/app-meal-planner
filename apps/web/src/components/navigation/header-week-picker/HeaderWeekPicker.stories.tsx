import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { HeaderWeekPicker as Component } from "./HeaderWeekPicker";
import type { HeaderWeekPickerProps as Props } from "./HeaderWeekPicker";
import type { PlanCalendarWeekViewModel } from "~/core/plan/PlanTypes";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Navigation/Header Week Picker",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const weeks: PlanCalendarWeekViewModel[] = [10, 11, 12, 13].map((weekNumber, index) => ({
  weekNumber,
  statusDotClassName: index === 0 ? "bg-success" : index === 1 ? "bg-warning" : "bg-default-300",
  mealsLabel: index === 0 ? "7 filled" : "",
  isSelected: index === 1,
  days: Array.from({ length: 7 }, (_, day) => ({
    dayNumber: 2 + index * 7 + day,
    isCurrentMonth: true,
    isToday: index === 1 && day === 2,
    hasPlannedMeal: index === 0,
  })),
  onSelect: fn(),
}));

const defaultArgs = {
  switcher: {
    label: "W11",
    hint: "Week 11 · This week",
    statusDotClassName: "bg-warning",
    onPrevious: fn(),
    onNext: fn(),
    onOpenPicker: fn(),
  },
  dialog: {
    isOpen: false,
    title: "March 2026",
    dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    weeks,
    onPrevMonth: fn(),
    onNextMonth: fn(),
    onToday: fn(),
    onClose: fn(),
  },
} satisfies Props;

/** How the picker sits in the navbar: a compact chip between two step arrows. */
export const Closed: Story = {
  args: defaultArgs,
};

/** A week nobody has planned yet — the dot goes grey. */
export const UnplannedWeek: Story = {
  args: {
    ...defaultArgs,
    switcher: {
      ...defaultArgs.switcher,
      label: "W14",
      hint: "Week 14 · In 3 weeks",
      statusDotClassName: "bg-default-300",
    },
  },
};

/** The "Schedule" calendar the chip opens, with every week's status at a glance. */
export const CalendarOpen: Story = {
  args: { ...defaultArgs, dialog: { ...defaultArgs.dialog, isOpen: true } },
};

export const OpensTheCalendar: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: defaultArgs.switcher.label }));
    await expect(args.switcher.onOpenPicker).toHaveBeenCalled();

    await userEvent.click(canvas.getByRole("button", { name: "Next week" }));
    await expect(args.switcher.onNext).toHaveBeenCalled();

    await userEvent.click(canvas.getByRole("button", { name: "Previous week" }));
    await expect(args.switcher.onPrevious).toHaveBeenCalled();
  },
};

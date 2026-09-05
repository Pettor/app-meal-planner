import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { WeekSwitcher as Component } from "./WeekSwitcher";
import type { WeekSwitcherProps as Props } from "./WeekSwitcher";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Navigation/Week Switcher",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  label: "This week",
  hint: "week 14 · 3 Apr – 9 Apr",
  statusDotClassName: "bg-success",
  onPrevious: fn(),
  onNext: fn(),
  onOpenPicker: fn(),
} satisfies Props;

/** The week in view is planned and finalised — a green dot. */
export const Planned: Story = {
  args: defaultArgs,
};

/** A week saved but not yet published shows the draft dot. */
export const Draft: Story = {
  args: { ...defaultArgs, label: "Week 15", hint: "week 15 · 10 Apr – 16 Apr", statusDotClassName: "bg-warning" },
};

/** A week nobody has planned yet. */
export const Unplanned: Story = {
  args: { ...defaultArgs, label: "Week 16", hint: "week 16 · 17 Apr – 23 Apr", statusDotClassName: "bg-default-300" },
};

export const StepsBetweenWeeks: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Next week" }));
    await expect(args.onNext).toHaveBeenCalled();

    await userEvent.click(canvas.getByRole("button", { name: "Previous week" }));
    await expect(args.onPrevious).toHaveBeenCalled();

    await userEvent.click(canvas.getByRole("button", { name: defaultArgs.label }));
    await expect(args.onOpenPicker).toHaveBeenCalled();
  },
};

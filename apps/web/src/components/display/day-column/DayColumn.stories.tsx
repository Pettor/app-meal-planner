import type { Meta, StoryObj } from "@storybook/react-vite";
import { DayColumn as Component } from "./DayColumn";
import type { DayColumnProps as ComponentProps } from "./DayColumn";

const meta: Meta<typeof Component> = {
  title: "Display/Day Column",
  component: Component,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-53">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

function SampleMeal({ label }: { label: string }): React.ReactElement {
  return <div className="border-separator border-t px-3.5 py-6 text-sm">{label}</div>;
}

const defaultArgs = {
  dayLabel: "Monday",
  dateNumber: "31",
  monthLabel: "Aug",
  peopleLabel: "4 people",
  isToday: false,
  children: <SampleMeal label="Red lentil dal" />,
} satisfies ComponentProps;

export const Default: Story = {
  args: defaultArgs,
};

export const Today: Story = {
  args: { ...defaultArgs, isToday: true },
};

export const TwoMeals: Story = {
  args: {
    ...defaultArgs,
    children: (
      <>
        <SampleMeal label="Halloumi and chickpea salad" />
        <SampleMeal label="Mushroom risotto" />
      </>
    ),
  },
};

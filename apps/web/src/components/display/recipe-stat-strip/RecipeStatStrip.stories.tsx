import type { Meta, StoryObj } from "@storybook/react-vite";
import { RecipeStatStrip as Component } from "./RecipeStatStrip";
import type { RecipeStatStripProps as ComponentProps } from "./RecipeStatStrip";

const meta: Meta<typeof Component> = {
  title: "Display/Recipe Stat Strip",
  component: Component,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  timeMinutes: 30,
  ingredientCount: 5,
} satisfies ComponentProps;

/** The hero treatment: icon over label, sized to sit beside a recipe photo. */
export const Stacked: Story = {
  args: defaultArgs,
  render: (args) => (
    <div className="max-w-100">
      <Component {...args} />
    </div>
  ),
};

/** The card treatment: icon beside label, so it costs one line instead of three. */
export const Inline: Story = {
  args: { ...defaultArgs, layout: "inline" },
  render: (args) => (
    <div className="max-w-63">
      <Component {...args} />
    </div>
  ),
};

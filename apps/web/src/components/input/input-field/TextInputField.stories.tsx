import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { TextInputField as Component } from "./TextInputField";
import type { TextInputFieldProps as Props } from "./TextInputField";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Input/Text Input Field",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  value: "",
  onChange: () => {},
  label: "Title",
  placeholder: "e.g. Mushroom risotto",
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
};

export const WithDescription: Story = {
  args: {
    ...defaultArgs,
    label: "Base servings",
    value: "4",
    type: "number",
    description: "Ingredients scale from this number.",
  },
};

export const WithError: Story = {
  args: { ...defaultArgs, errorMessage: "Give the recipe a name." },
};

export const AcceptsTyping: Story = {
  args: defaultArgs,
  render: function Render(args) {
    const [value, setValue] = useState("");
    return <Component {...args} value={value} onChange={setValue} />;
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox", { name: "Title" });
    await userEvent.type(input, "Miso butter noodles");
    await expect(input).toHaveValue("Miso butter noodles");
  },
};

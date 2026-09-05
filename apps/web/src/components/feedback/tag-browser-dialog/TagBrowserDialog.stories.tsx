import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen } from "storybook/test";
import { TagBrowserDialog as Component } from "./TagBrowserDialog";
import type { TagBrowserDialogProps as Props } from "./TagBrowserDialog";
import { SampleTagCatalogue } from "~/core/recipes/RecipeSampleData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Tag Browser Dialog",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  isOpen: true,
  description: "Pick the tags that describe this recipe.",
  catalogue: SampleTagCatalogue,
  selectedTags: ["vegetarian", "quick"],
  onToggleTag: fn(),
  onClose: fn(),
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
};

export const NothingSelected: Story = {
  args: { ...defaultArgs, selectedTags: [] },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};

export const FiltersBySearch: Story = {
  args: {
    ...defaultArgs,
    // Selection is driven locally so the play function sees the toggle take effect.
    onToggleTag: fn(),
  },
  render: function Render(args) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    return (
      <Component
        {...args}
        selectedTags={selectedTags}
        onToggleTag={(tag) => {
          args.onToggleTag(tag);
          setSelectedTags((current) => (current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag]));
        }}
      />
    );
  },
  play: async ({ args, userEvent }) => {
    // The modal renders in a portal, so query the whole document rather than the canvas.
    await userEvent.type(await screen.findByRole("textbox", { name: "Search community tags" }), "veg");

    const vegetarian = await screen.findByRole("button", { name: /^vegetarian/ });
    await expect(screen.queryByRole("button", { name: /^italian/ })).not.toBeInTheDocument();

    await userEvent.click(vegetarian);
    await expect(args.onToggleTag).toHaveBeenCalledWith("vegetarian");
    await expect(vegetarian).toHaveAttribute("aria-pressed", "true");
  },
};

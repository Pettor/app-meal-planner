import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { SettingsDefaultTagsSection as Component } from "./SettingsDefaultTagsSection";
import type { SettingsDefaultTagsSectionProps as Props } from "./SettingsDefaultTagsSection";
import { DefaultPinnedTags } from "~/core/plan/PlanUtils";
import { SampleTagCatalogue } from "~/core/recipes/RecipeSampleData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Settings Modal/Default Tags Section",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  tags: DefaultPinnedTags,
  catalogue: SampleTagCatalogue,
  isBrowserOpen: false,
  onToggleTag: fn(),
  onOpenBrowser: fn(),
  onCloseBrowser: fn(),
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
};

export const Empty: Story = {
  args: { ...defaultArgs, tags: [] },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("No default tags yet.")).toBeInTheDocument();
  },
};

export const Interaction: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /vegetarian/ }));
    await expect(args.onToggleTag).toHaveBeenCalledWith("vegetarian");

    await userEvent.click(canvas.getByRole("button", { name: "Browse all tags" }));
    await expect(args.onOpenBrowser).toHaveBeenCalled();
  },
};

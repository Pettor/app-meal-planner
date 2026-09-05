import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen } from "storybook/test";
import { LoadWeekDialog as Component } from "./LoadWeekDialog";
import type { LoadWeekDialogProps as Props } from "./LoadWeekDialog";
import { SampleCommunityPeople, SampleSharedWeeks } from "~/core/community/CommunitySampleData";
import { sharedWeekDays } from "~/core/community/CommunityUtils";
import { SampleRecipes } from "~/core/recipes/RecipeSampleData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Load Week Dialog",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const week = SampleSharedWeeks[0]!;
const owner = SampleCommunityPeople.find((person) => person.id === week.ownerId)!;

const defaultArgs = {
  isOpen: true,
  weekTitle: week.title,
  owner,
  days: sharedWeekDays(week, SampleRecipes, dayNames),
  targetWeekNumber: "12",
  missingRecipeCount: 4,
  onConfirm: fn(),
  onClose: fn(),
} satisfies Props;

export const WithRecipesToImport: Story = {
  args: defaultArgs,
};

export const NothingToImport: Story = {
  args: { ...defaultArgs, missingRecipeCount: 0 },
};

export const LoadsOnConfirm: Story = {
  args: defaultArgs,
  play: async ({ args, userEvent }) => {
    // The modal renders in a portal, so query the whole document rather than the canvas.
    await userEvent.click(await screen.findByTestId("load-week-dialog__confirm"));
    await expect(args.onConfirm).toHaveBeenCalled();
  },
};

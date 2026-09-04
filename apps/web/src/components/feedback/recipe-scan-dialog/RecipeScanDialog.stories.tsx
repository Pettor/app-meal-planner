import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { RecipeScanDialog as Component } from "./RecipeScanDialog";
import type { RecipeScanDialogProps as Props } from "./RecipeScanDialog";
import { SampleScannedRecipe } from "~/core/recipes/RecipeSampleData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Recipe Scan Dialog",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  isOpen: true,
  stage: "capture",
  scansRemaining: 3,
  scannedRecipe: null,
  correction: "",
  onCorrectionChange: fn(),
  onPhotoSelected: fn(),
  onRerun: fn(),
  onUseRecipe: fn(),
  onClose: fn(),
} satisfies Props;

export const Capture: Story = {
  args: defaultArgs,
};

export const NoScansLeft: Story = {
  args: { ...defaultArgs, scansRemaining: 0 },
};

export const Working: Story = {
  args: { ...defaultArgs, stage: "working", scansRemaining: 2 },
};

export const Preview: Story = {
  args: {
    ...defaultArgs,
    stage: "preview",
    scansRemaining: 2,
    scannedRecipe: SampleScannedRecipe,
  },
};

export const Phone: Story = {
  args: {
    ...defaultArgs,
    stage: "preview",
    scansRemaining: 2,
    scannedRecipe: SampleScannedRecipe,
  },
  globals: { viewport: { value: "iphonex" } },
};

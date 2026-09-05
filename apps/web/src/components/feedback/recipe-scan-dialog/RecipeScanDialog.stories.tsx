import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen } from "storybook/test";
import { RecipeScanDialog as Component } from "./RecipeScanDialog";
import type { RecipeScanDialogProps as Props } from "./RecipeScanDialog";
import { SampleScannedRecipe } from "~/core/recipes/RecipeSampleData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Recipe Scan Dialog",
  tags: ["autodocs"],
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

/** From the preview, the scanned recipe can be accepted straight into the editor. */
export const UsesTheScannedRecipe: Story = {
  args: { ...defaultArgs, stage: "preview", scansRemaining: 2, scannedRecipe: SampleScannedRecipe },
  play: async ({ args, userEvent }) => {
    // The modal renders in a portal, so query the whole document rather than the canvas.
    await userEvent.click(await screen.findByTestId("recipe-scan-dialog__use"));
    await expect(args.onUseRecipe).toHaveBeenCalled();
  },
};

/** Typing a correction is reported up, and re-reading only unlocks once there is one. */
export const CorrectsAndRereads: Story = {
  args: { ...defaultArgs, stage: "preview", scansRemaining: 2, scannedRecipe: SampleScannedRecipe },
  play: async ({ args, userEvent }) => {
    const reread = await screen.findByRole("button", { name: "Re-read" });
    await expect(reread).toBeDisabled();

    await userEvent.type(await screen.findByRole("textbox", { name: /Something off/ }), "400g");
    await expect(args.onCorrectionChange).toHaveBeenCalled();
  },
};

/** With the correction already filled in, re-reading is available. */
export const RereadsWithCorrection: Story = {
  args: {
    ...defaultArgs,
    stage: "preview",
    scansRemaining: 2,
    scannedRecipe: SampleScannedRecipe,
    correction: "400g mushrooms",
  },
  play: async ({ args, userEvent }) => {
    await userEvent.click(await screen.findByRole("button", { name: "Re-read" }));
    await expect(args.onRerun).toHaveBeenCalled();
  },
};

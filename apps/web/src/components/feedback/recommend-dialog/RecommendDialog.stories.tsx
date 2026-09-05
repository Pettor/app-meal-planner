import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen } from "storybook/test";
import { RecommendDialog as Component } from "./RecommendDialog";
import type { RecommendDialogProps as Props } from "./RecommendDialog";
import { SampleCommunityPeople } from "~/core/community/CommunitySampleData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Recommend Dialog",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const targets = SampleCommunityPeople.slice(0, 3);

const defaultArgs = {
  isOpen: true,
  itemTitle: "Meatless, still filling",
  targets,
  selectedIds: [],
  note: "",
  onNoteChange: fn(),
  onToggleTarget: fn(),
  onSend: fn(),
  onClose: fn(),
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
};

export const WithSelection: Story = {
  args: { ...defaultArgs, selectedIds: [targets[0]!.id], note: "The Tuesday one is the winner." },
};

export const NobodyToSendTo: Story = {
  args: { ...defaultArgs, targets: [] },
};

export const PicksARecipient: Story = {
  args: defaultArgs,
  play: async ({ args, userEvent }) => {
    // The modal renders in a portal, so query the whole document rather than the canvas.
    await userEvent.click(await screen.findByTestId(`recommend-dialog__target--${targets[0]!.id}`));
    await expect(args.onToggleTarget).toHaveBeenCalledWith(targets[0]!.id);
  },
};

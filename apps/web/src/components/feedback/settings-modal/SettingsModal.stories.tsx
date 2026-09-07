import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen } from "storybook/test";
import { SettingsModal as Component } from "./SettingsModal";
import type { SettingsModalProps as Props } from "./SettingsModal";
import { DefaultPinnedTags } from "~/core/plan/PlanUtils";
import { SampleTagCatalogue } from "~/core/recipes/RecipeSampleData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Settings Modal",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const allSections = ["account", "appearance", "language", "tags", "data", "about"] as Props["sections"];

const defaultArgs = {
  isOpen: true,
  sections: allSections,
  onClose: fn(),
  account: {
    name: "John Doe",
    email: "john.doe@example.com",
  },
  appearance: {
    themeSelector: { mode: "auto" as const, onSelect: fn() },
  },
  language: {
    locale: "en" as const,
    onSelect: fn(),
  },
  defaultTags: {
    tags: DefaultPinnedTags,
    catalogue: SampleTagCatalogue,
    isBrowserOpen: false,
    onToggleTag: fn(),
    onOpenBrowser: fn(),
    onCloseBrowser: fn(),
  },
  data: {
    json: '{\n  "version": 1\n}',
    status: "idle" as const,
    onJsonChange: fn(),
    onApply: fn(),
    onDownload: fn(),
    onReset: fn(),
  },
  aboutDetails: {
    appName: "My App",
    appVersion: "1.0.0",
    serverVersion: "2.0.0",
  },
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
};

export const Account: Story = {
  args: { ...defaultArgs, initialSection: "account" },
};

export const Appearance: Story = {
  args: { ...defaultArgs, initialSection: "appearance" },
};

export const Language: Story = {
  args: { ...defaultArgs, initialSection: "language" },
};

export const DefaultTags: Story = {
  args: { ...defaultArgs, initialSection: "tags" },
};

export const Data: Story = {
  args: { ...defaultArgs, initialSection: "data" },
};

export const About: Story = {
  args: { ...defaultArgs, initialSection: "about" },
};

/** Signed out: only the preferences that apply to anyone. */
export const SignedOut: Story = {
  args: {
    ...defaultArgs,
    sections: ["appearance", "language", "about"] as Props["sections"],
    account: undefined,
    defaultTags: undefined,
    data: undefined,
  },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};

export const Interaction: Story = {
  args: defaultArgs,
  // The modal renders into a portal, so it is queried off the document, not the canvas.
  play: async ({ userEvent }) => {
    // The pane header, not the section, carries the title and what it is for.
    await userEvent.click(await screen.findByRole("tab", { name: "Language" }));
    await expect(await screen.findByText("Interface language. Recipe text stays as you wrote it.")).toBeInTheDocument();

    await userEvent.click(await screen.findByRole("tab", { name: "Your default tags" }));
    await expect(await screen.findByRole("button", { name: "Browse all tags" })).toBeInTheDocument();
  },
};

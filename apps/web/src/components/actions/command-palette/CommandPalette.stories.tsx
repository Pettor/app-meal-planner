import type { ReactElement } from "react";
import {
  ArrowLeftStartOnRectangleIcon,
  BookOpenIcon,
  CalendarIcon,
  ComputerDesktopIcon,
  InboxIcon,
  MoonIcon,
  ShoppingCartIcon,
  SparklesIcon,
  SunIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import type { Command } from "./Command";
import { CommandPalette as Component } from "./CommandPalette";
import type { CommandPaletteProps as Props } from "./CommandPalette";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Actions/Command Palette",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function iconEl(node: ReactElement): ReactElement {
  return node;
}

/** Mirrors the command set the app builds in `UseCommandPaletteController`. */
const commands: Command[] = [
  {
    id: "goto-recipes",
    label: "Go to Recipes",
    group: "Navigation",
    keywords: ["home", "start", "library", "cookbook"],
    icon: iconEl(<BookOpenIcon className="h-4 w-4" />),
    shortcut: { mod: true, shift: true, key: "h" },
    perform: () => console.log("goto recipes"),
  },
  {
    id: "goto-plan",
    label: "Go to Plan",
    group: "Navigation",
    keywords: ["planner", "meals", "menu"],
    icon: iconEl(<SparklesIcon className="h-4 w-4" />),
    perform: () => console.log("goto plan"),
  },
  {
    id: "goto-week",
    label: "Go to This week",
    group: "Navigation",
    keywords: ["schedule", "calendar", "days"],
    icon: iconEl(<CalendarIcon className="h-4 w-4" />),
    perform: () => console.log("goto week"),
  },
  {
    id: "goto-shop",
    label: "Go to Shopping",
    group: "Navigation",
    keywords: ["groceries", "list", "cart"],
    icon: iconEl(<ShoppingCartIcon className="h-4 w-4" />),
    perform: () => console.log("goto shopping"),
  },
  {
    id: "goto-community",
    label: "Go to Community",
    group: "Navigation",
    keywords: ["friends", "people", "feed"],
    icon: iconEl(<UsersIcon className="h-4 w-4" />),
    perform: () => console.log("goto community"),
  },
  {
    id: "goto-inbox",
    label: "Go to Inbox",
    description: "Recommendations shared with you",
    group: "Navigation",
    keywords: ["inbox", "shared", "notifications"],
    icon: iconEl(<InboxIcon className="h-4 w-4" />),
    perform: () => console.log("goto inbox"),
  },
  {
    id: "goto-profile",
    label: "Go to My Profile",
    description: "Your recipes and shared weeks",
    group: "Navigation",
    keywords: ["profile", "me", "account"],
    icon: iconEl(<UserCircleIcon className="h-4 w-4" />),
    perform: () => console.log("goto profile"),
  },
  {
    id: "theme-auto",
    label: "Theme: System",
    group: "Appearance",
    keywords: ["auto", "system"],
    icon: iconEl(<ComputerDesktopIcon className="h-4 w-4" />),
    perform: () => console.log("theme auto"),
  },
  {
    id: "theme-light",
    label: "Theme: Light",
    group: "Appearance",
    icon: iconEl(<SunIcon className="h-4 w-4" />),
    shortcut: { mod: true, shift: true, key: "l" },
    perform: () => console.log("theme light"),
  },
  {
    id: "theme-dark",
    label: "Theme: Dark",
    group: "Appearance",
    icon: iconEl(<MoonIcon className="h-4 w-4" />),
    shortcut: { mod: true, shift: true, key: "k" },
    perform: () => console.log("theme dark"),
  },
  {
    id: "logout",
    label: "Log out",
    description: "End the current session",
    group: "Account",
    icon: iconEl(<ArrowLeftStartOnRectangleIcon className="h-4 w-4" />),
    perform: () => console.log("logout"),
  },
];

const defaultArgs: Props = {
  isOpen: true,
  commands,
  onClose: () => console.log("onClose"),
};

export const Default: Story = {
  args: defaultArgs,
};

export const Empty: Story = {
  args: {
    ...defaultArgs,
    commands: [],
  },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};

export const Search: Story = {
  args: defaultArgs,
  play: async ({ userEvent }) => {
    const body = within(document.body);
    const input = body.getByTestId("command-palette__search");
    await userEvent.type(input, "home");
    await expect(body.getByTestId("command-palette__item-goto-recipes")).toBeInTheDocument();
    await expect(body.queryByTestId("command-palette__item-logout")).not.toBeInTheDocument();
  },
};

export const EmptySearch: Story = {
  args: defaultArgs,
  play: async ({ userEvent }) => {
    const body = within(document.body);
    const input = body.getByTestId("command-palette__search");
    await userEvent.type(input, "zzz");
    await expect(body.getByText("No commands found")).toBeInTheDocument();
  },
};

export const ClickCommand: Story = {
  args: defaultArgs,
  play: async ({ userEvent }) => {
    const body = within(document.body);
    const item = body.getByTestId("command-palette__item-goto-week");
    await expect(item).toBeInTheDocument();
    await userEvent.click(item);
  },
};

export const KeyboardNavigation: Story = {
  args: defaultArgs,
  play: async ({ userEvent }) => {
    const body = within(document.body);
    const input = body.getByTestId("command-palette__search");
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowUp}");
    await userEvent.keyboard("{Home}");
    await userEvent.keyboard("{End}");
    await userEvent.keyboard("{Enter}");
  },
};

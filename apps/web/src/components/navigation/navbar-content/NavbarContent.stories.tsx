import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
import { NavbarContent as Component } from "./NavbarContent";
import type { NavbarContentProps as Props } from "./NavbarContent";
import { NavbarContentCommonData } from "~/storybook/data/NavbarContentData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Navigation/Navbar Content",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  ...NavbarContentCommonData,
} satisfies Props;

export const Responsive: Story = {
  args: defaultArgs,
};

export const Desktop: Story = {
  args: defaultArgs,
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};

export const Interaction: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    const menuButton = canvas.getByTestId("home-page__menu-button");
    await expect(menuButton).toBeInTheDocument();
    await userEvent.click(menuButton);
    const body = within(document.body);
    await expect(body.getByTestId("quick-menu__settings-button")).toBeInTheDocument();
    await userEvent.click(body.getByTestId("quick-menu__settings-button"));
  },
};

export const WithCommunityMenu: Story = {
  args: {
    ...defaultArgs,
    activeTab: "plan",
    accountMenu: {
      unreadCount: 2,
      onOpenProfile: fn(),
      onOpenInbox: fn(),
    },
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId("home-page__menu-button"));
    const body = within(document.body);

    // The inbox entry carries the unread count that got the cook here.
    await expect(body.getByText("2 new")).toBeInTheDocument();

    await userEvent.click(body.getByTestId("navbar__inbox"));
    await expect(args.accountMenu?.onOpenInbox).toHaveBeenCalled();

    await userEvent.click(canvas.getByTestId("home-page__menu-button"));
    await userEvent.click(body.getByTestId("navbar__my-profile"));
    await expect(args.accountMenu?.onOpenProfile).toHaveBeenCalled();
  },
};

export const TabNavigation: Story = {
  args: {
    ...defaultArgs,
    activeTab: "recipes",
    onTabChange: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    // Every nav entry reports which section it is, rather than navigating itself.
    await userEvent.click(canvas.getAllByRole("button", { name: "Plan" })[0] as HTMLElement);
    await expect(args.onTabChange).toHaveBeenCalledWith("plan");

    await userEvent.click(canvas.getAllByRole("button", { name: "Community" })[0] as HTMLElement);
    await expect(args.onTabChange).toHaveBeenCalledWith("community");

    // The app title goes home.
    await userEvent.click(canvas.getByRole("button", { name: "Meal Planner" }));
    await expect(args.onTabChange).toHaveBeenCalledWith("recipes");
  },
};

export const QuickMenuActions: Story = {
  args: { ...defaultArgs, quickMenu: { onSettings: fn(), onLogout: fn(), onSearch: fn() } },
  play: async ({ args, canvas, userEvent }) => {
    const body = within(document.body);

    await userEvent.click(canvas.getByTestId("home-page__menu-button"));
    await userEvent.click(body.getByTestId("quick-menu__search-button"));
    await expect(args.quickMenu.onSearch).toHaveBeenCalled();

    await userEvent.click(canvas.getByTestId("home-page__menu-button"));
    await userEvent.click(body.getByTestId("quick-menu__logout-button"));
    await expect(args.quickMenu.onLogout).toHaveBeenCalled();
  },
};

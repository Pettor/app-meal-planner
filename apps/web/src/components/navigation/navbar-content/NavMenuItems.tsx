import type { ReactElement } from "react";
import { BookOpenIcon, CalendarIcon, ShoppingCartIcon, SparklesIcon, UsersIcon } from "@heroicons/react/24/outline";
import type { IntlShape } from "react-intl";

export interface NavMenuItem {
  id: string;
  name: string;
  shortName: string;
  href: string;
  icon: ReactElement;
  disabled?: boolean;
}

export function createNavMenuItems(intl: IntlShape): NavMenuItem[] {
  return [
    {
      id: "recipes",
      name: intl.formatMessage({
        description: "NavMenuItems: menu-item - recipes",
        defaultMessage: "Recipes",
        id: "BpvAE5",
      }),
      shortName: intl.formatMessage({
        description: "NavMenuItems: menu-item - recipes (short, mobile tab bar)",
        defaultMessage: "Recipes",
        id: "lzH6R6",
      }),
      href: "#/",
      icon: <BookOpenIcon className="h-[18px] w-[18px]" />,
    },
    {
      id: "plan",
      name: intl.formatMessage({
        description: "NavMenuItems: menu-item - plan",
        defaultMessage: "Plan",
        id: "SIwWzu",
      }),
      shortName: intl.formatMessage({
        description: "NavMenuItems: menu-item - plan (short, mobile tab bar)",
        defaultMessage: "Plan",
        id: "DmSF9w",
      }),
      href: "#/",
      icon: <SparklesIcon className="h-[18px] w-[18px]" />,
      disabled: true,
    },
    {
      id: "week",
      name: intl.formatMessage({
        description: "NavMenuItems: menu-item - this week",
        defaultMessage: "This week",
        id: "myl/z5",
      }),
      shortName: intl.formatMessage({
        description: "NavMenuItems: menu-item - this week (short, mobile tab bar)",
        defaultMessage: "Week",
        id: "/4Y51F",
      }),
      href: "#/",
      icon: <CalendarIcon className="h-[18px] w-[18px]" />,
      disabled: true,
    },
    {
      id: "shop",
      name: intl.formatMessage({
        description: "NavMenuItems: menu-item - shopping",
        defaultMessage: "Shopping",
        id: "LS5BYx",
      }),
      shortName: intl.formatMessage({
        description: "NavMenuItems: menu-item - shopping (short, mobile tab bar)",
        defaultMessage: "Shopping",
        id: "aAqsh5",
      }),
      href: "#/",
      icon: <ShoppingCartIcon className="h-[18px] w-[18px]" />,
      disabled: true,
    },
    {
      id: "community",
      name: intl.formatMessage({
        description: "NavMenuItems: menu-item - community",
        defaultMessage: "Community",
        id: "b6ZYZt",
      }),
      shortName: intl.formatMessage({
        description: "NavMenuItems: menu-item - community (short, mobile tab bar)",
        defaultMessage: "Friends",
        id: "YfA5jn",
      }),
      href: "#/",
      icon: <UsersIcon className="h-[18px] w-[18px]" />,
      disabled: true,
    },
  ];
}

import { cloneElement, useMemo, type ReactElement } from "react";
import {
  ArrowLeftStartOnRectangleIcon,
  ComputerDesktopIcon,
  InboxIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { useIntl } from "react-intl";
import type { Command } from "./Command";
import type { CommandPaletteProps } from "./CommandPalette";
import { useCommandPalette } from "./UseCommandPalette";
import { useCommandPaletteShortcut } from "./UseCommandPaletteShortcut";
import { useCommandShortcuts } from "./UseCommandShortcuts";
import { createNavMenuItems } from "~/components/navigation/navbar-content/NavMenuItems";
import { useAuth } from "~/core/auth/UseAuth";
import { useCommunity } from "~/core/community/UseCommunity";
import { themeModeAtom } from "~/core/theme/ThemeAtoms";
import type { ThemeMode } from "~/core/theme/ThemeMode";

/**
 * Where each navbar section lives. The palette reuses the navbar's own menu
 * items so every section the cook can reach from the navbar is also reachable
 * from search — a new navbar entry only needs a path added here.
 */
const SECTION_PATHS = {
  recipes: "/",
  plan: "/plan",
  week: "/week",
  shop: "/shopping",
  community: "/community",
} as const;

type SectionId = keyof typeof SECTION_PATHS;

/** Search terms and global shortcuts layered onto the navbar's section labels. */
const SECTION_EXTRAS: Record<SectionId, { keywords: string[]; shortcut?: Command["shortcut"] }> = {
  recipes: { keywords: ["home", "start", "library", "cookbook"], shortcut: { mod: true, shift: true, key: "h" } },
  plan: { keywords: ["planner", "meals", "menu", "week plan"] },
  week: { keywords: ["this week", "schedule", "calendar", "days"] },
  shop: { keywords: ["shopping", "groceries", "list", "cart", "ingredients"] },
  community: { keywords: ["friends", "people", "following", "feed"] },
};

/**
 * Builds the app's default command list (navigation, theme, logout), wires up
 * the Cmd/Ctrl+K shortcut and per-command shortcuts, and returns props ready to
 * spread onto `<CommandPalette>`. To add or change commands, extend the array
 * returned from `useMemo` below — `Command` is intentionally minimal.
 */
export function useCommandPaletteController(): CommandPaletteProps {
  const intl = useIntl();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { me } = useCommunity();
  const setThemeMode = useSetAtom(themeModeAtom);
  const { isOpen, close } = useCommandPalette();

  const navigationGroup = intl.formatMessage({
    description: "CommandPaletteController: label - navigation group",
    defaultMessage: "Navigation",
    id: "RCtY7O",
  });
  const appearanceGroup = intl.formatMessage({
    description: "CommandPaletteController: label - appearance group",
    defaultMessage: "Appearance",
    id: "vWoN3+",
  });
  const accountGroup = intl.formatMessage({
    description: "CommandPaletteController: label - account group",
    defaultMessage: "Account",
    id: "9cU9e3",
  });

  const myId = me.id;

  const commands = useMemo<Command[]>(() => {
    function setTheme(mode: ThemeMode): void {
      setThemeMode(mode);
    }

    function gotoLabel(section: string): string {
      return intl.formatMessage(
        {
          description: "CommandPaletteController: label - go to a navbar section",
          defaultMessage: "Go to {section}",
          id: "TassCS",
        },
        { section }
      );
    }

    // One navigation command per navbar section, so the palette can never fall
    // behind the navbar.
    const sectionCommands = createNavMenuItems(intl).flatMap<Command>((item) => {
      const path = SECTION_PATHS[item.id as SectionId];
      if (!path || item.disabled) {
        return [];
      }
      const extras = SECTION_EXTRAS[item.id as SectionId];

      return [
        {
          id: `goto-${item.id}`,
          label: gotoLabel(item.name),
          group: navigationGroup,
          keywords: [item.name.toLowerCase(), item.shortName.toLowerCase(), ...extras.keywords],
          icon: cloneElement(item.icon as ReactElement<{ className?: string }>, { className: "h-4 w-4" }),
          shortcut: extras.shortcut,
          perform: () => {
            void navigate({ to: path });
          },
        },
      ];
    });

    return [
      ...sectionCommands,
      {
        id: "goto-inbox",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - go to inbox command",
          defaultMessage: "Go to Inbox",
          id: "+A3Jo2",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController: caption - go to inbox command",
          defaultMessage: "Recommendations shared with you",
          id: "VN7uxx",
        }),
        group: navigationGroup,
        keywords: ["inbox", "shared", "recommendations", "notifications"],
        icon: <InboxIcon className="h-4 w-4" />,
        perform: () => {
          void navigate({ to: "/community/inbox" });
        },
      },
      {
        id: "goto-profile",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - go to my profile command",
          defaultMessage: "Go to My Profile",
          id: "oDtj7L",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController: caption - go to my profile command",
          defaultMessage: "Your recipes and shared weeks",
          id: "c9E280",
        }),
        group: navigationGroup,
        keywords: ["profile", "me", "account", "my page"],
        icon: <UserCircleIcon className="h-4 w-4" />,
        perform: () => {
          void navigate({ to: "/community/$personId", params: { personId: myId } });
        },
      },
      {
        id: "theme-auto",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - theme system command",
          defaultMessage: "Theme: System",
          id: "xr2NN2",
        }),
        group: appearanceGroup,
        keywords: ["auto", "system", "theme"],
        icon: <ComputerDesktopIcon className="h-4 w-4" />,
        perform: () => setTheme("auto"),
      },
      {
        id: "theme-light",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - theme light command",
          defaultMessage: "Theme: Light",
          id: "MibXHq",
        }),
        group: appearanceGroup,
        keywords: ["light", "theme"],
        icon: <SunIcon className="h-4 w-4" />,
        shortcut: { mod: true, shift: true, key: "l" },
        perform: () => setTheme("light"),
      },
      {
        id: "theme-dark",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - theme dark command",
          defaultMessage: "Theme: Dark",
          id: "5ywSOX",
        }),
        group: appearanceGroup,
        keywords: ["dark", "theme"],
        icon: <MoonIcon className="h-4 w-4" />,
        shortcut: { mod: true, shift: true, key: "k" },
        perform: () => setTheme("dark"),
      },
      {
        id: "logout",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - logout command",
          defaultMessage: "Log out",
          id: "9/X3Xw",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController: caption - logout command",
          defaultMessage: "End the current session",
          id: "oUdMPU",
        }),
        group: accountGroup,
        keywords: ["logout", "signout", "exit"],
        icon: <ArrowLeftStartOnRectangleIcon className="h-4 w-4" />,
        perform: () => {
          void logout();
        },
      },
    ];
  }, [intl, navigate, setThemeMode, logout, myId, navigationGroup, appearanceGroup, accountGroup]);

  useCommandPaletteShortcut();
  useCommandShortcuts(commands);

  return { isOpen, commands, onClose: close };
}

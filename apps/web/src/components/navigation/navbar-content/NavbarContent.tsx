import { useMemo, useState, type ReactElement } from "react";
import { InboxIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Popover } from "@heroui/react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import { createNavMenuItems, type NavMenuItem } from "./NavMenuItems";
import type { QuickMenuProps } from "~/components/actions/quick-menu/QuickMenu";
import { QuickMenu } from "~/components/actions/quick-menu/QuickMenu";
import { UserAvatar } from "~/components/display/user-avatar/UserAvatar";

export interface NavbarContentProps {
  quickMenu: QuickMenuProps;
  avatarName: string;
  avatarEmail?: string;
  activeTab?: string;
  onTabChange?: (id: string) => void;
  /** Community entries in the account dropdown, with the inbox's unread count. */
  accountMenu?: {
    unreadCount: number;
    onOpenProfile: () => void;
    onOpenInbox: () => void;
  };
}

function navigateToHash(href: string): void {
  window.location.hash = href.replace(/^#/, "");
}

function LogoMark(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" className="text-accent h-[26px] w-[26px] flex-none" aria-hidden="true">
      <circle cx="12" cy="12" r="10.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />
      <path
        d="M8.7 12.1L11.2 14.6L15.5 9.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NavbarContent({
  quickMenu,
  avatarName,
  avatarEmail,
  activeTab = "recipes",
  onTabChange,
  accountMenu,
}: NavbarContentProps): ReactElement {
  const intl = useIntl();
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const menuItems = useMemo(() => createNavMenuItems(intl), [intl]);
  const handle = avatarEmail ? `@${avatarEmail.split("@")[0]}` : "";

  function go(item: NavMenuItem): void {
    if (item.disabled) {
      return;
    }
    if (onTabChange) {
      onTabChange(item.id);
    } else {
      navigateToHash(item.href);
    }
  }

  const appName = intl.formatMessage({
    description: "NavbarContent: heading - app title in navbar",
    defaultMessage: "Meal Planner",
    id: "MwZQf8",
  });

  const comingSoon = intl.formatMessage({
    description: "NavbarContent: tooltip - disabled nav item not built yet",
    defaultMessage: "Coming soon",
    id: "3rWi7W",
  });

  return (
    <>
      <header className="bg-background/70 border-border sticky top-0 z-40 border-b backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6">
          <button
            type="button"
            className="flex min-w-0 shrink-0 items-center gap-2"
            onClick={() => (onTabChange ? onTabChange("recipes") : navigateToHash("#/"))}
            aria-label={appName}
          >
            <LogoMark />
            <span className="truncate text-xl font-normal" style={{ fontFamily: "var(--font-family-display)" }}>
              {appName}
            </span>
          </button>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-5 sm:flex"
            aria-label={intl.formatMessage({
              description: "NavbarContent: aria-label - navigation tabs",
              defaultMessage: "Navigation",
              id: "3R8Sia",
            })}
          >
            {menuItems.map((item) => {
              const isActive = item.id === activeTab;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item)}
                  aria-current={isActive ? "page" : undefined}
                  aria-disabled={item.disabled}
                  title={item.disabled ? comingSoon : undefined}
                  className={clsx(
                    "inline-flex items-center gap-1.5 py-2 text-sm whitespace-nowrap transition-colors",
                    item.disabled
                      ? "text-muted/50 cursor-default"
                      : isActive
                        ? "text-foreground font-medium shadow-[inset_0_-2px_0_0_var(--accent)]"
                        : "text-muted hover:text-foreground cursor-pointer"
                  )}
                >
                  {item.icon}
                  {item.name}
                </button>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center">
            <Popover isOpen={isAccountOpen} onOpenChange={setIsAccountOpen}>
              <Popover.Trigger data-testid="home-page__menu-button">
                <div className="border-border bg-surface flex cursor-pointer items-center gap-2 rounded-full border py-0.5 pr-2.5 pl-0.5">
                  <UserAvatar name={avatarName} size="sm" />
                  {handle && <span className="text-muted hidden text-xs font-medium sm:inline">{handle}</span>}
                </div>
              </Popover.Trigger>
              <Popover.Content placement="bottom end">
                <Popover.Dialog className="w-63 overflow-hidden p-0">
                  <div className="border-separator flex items-center gap-2.5 border-b p-3.5">
                    <UserAvatar name={avatarName} size="md" />
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-semibold">{avatarName}</span>
                      {handle && <span className="text-muted truncate text-xs">{handle}</span>}
                    </span>
                  </div>
                  {accountMenu && (
                    <div className="border-separator flex flex-col border-b p-2">
                      <button
                        type="button"
                        className="hover:bg-surface-secondary flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm"
                        onClick={() => {
                          setIsAccountOpen(false);
                          accountMenu.onOpenProfile();
                        }}
                        data-testid="navbar__my-profile"
                      >
                        <UserCircleIcon className="h-[18px] w-[18px]" />
                        {intl.formatMessage({
                          description: "NavbarContent: menu-item - open your own community profile",
                          defaultMessage: "My profile",
                          id: "izLyKM",
                        })}
                      </button>
                      <button
                        type="button"
                        className="hover:bg-surface-secondary flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm"
                        onClick={() => {
                          setIsAccountOpen(false);
                          accountMenu.onOpenInbox();
                        }}
                        data-testid="navbar__inbox"
                      >
                        <InboxIcon className="h-[18px] w-[18px]" />
                        {intl.formatMessage({
                          description: "NavbarContent: menu-item - open the recommendations inbox",
                          defaultMessage: "Inbox",
                          id: "TsXLmk",
                        })}
                        {accountMenu.unreadCount > 0 && (
                          <span className="bg-accent text-accent-foreground ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold">
                            {intl.formatMessage(
                              {
                                description: "NavbarContent: badge - unread recommendations",
                                defaultMessage: "{count} new",
                                id: "co8SjV",
                              },
                              { count: accountMenu.unreadCount }
                            )}
                          </span>
                        )}
                      </button>
                    </div>
                  )}
                  <div className="p-2">
                    <QuickMenu
                      onSettings={() => {
                        setIsAccountOpen(false);
                        quickMenu.onSettings();
                      }}
                      onLogout={() => {
                        setIsAccountOpen(false);
                        quickMenu.onLogout();
                      }}
                      onSearch={() => {
                        setIsAccountOpen(false);
                        quickMenu.onSearch();
                      }}
                    />
                  </div>
                </Popover.Dialog>
              </Popover.Content>
            </Popover>
          </div>
        </div>
      </header>

      <nav
        className="border-border bg-background/85 fixed inset-x-0 bottom-0 z-40 flex h-[62px] items-stretch border-t backdrop-blur-lg sm:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label={appName}
      >
        {menuItems.map((item) => {
          const isActive = item.id === activeTab;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item)}
              aria-current={isActive ? "page" : undefined}
              aria-disabled={item.disabled}
              className={clsx(
                "flex flex-1 flex-col items-center justify-center gap-1 px-1 text-[10px] tracking-[0.01em]",
                item.disabled ? "text-muted/50" : isActive ? "text-accent font-medium" : "text-muted"
              )}
            >
              <span
                className={clsx("h-0.5 w-5 rounded-full", isActive && !item.disabled ? "bg-accent" : "bg-transparent")}
              />
              {item.icon}
              <span className="max-w-full truncate">{item.shortName}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

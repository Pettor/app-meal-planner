import { useLocation, useNavigate } from "@tanstack/react-router";
import { UseCommunity } from "~/core/community/UseCommunity";
import type { AppSessionContent } from "~/core/session/AppSessionContent";
import { useAppSessionContent } from "~/core/session/UseAppSessionContent";
import type { AppSocialLinks } from "~/core/social-links/AppSocialLinks";
import { useAppSocialLinks } from "~/core/social-links/UseAppSocialLinks";

const GITHUB_LINK = "https://github.com/Pettor/template-web-app-react";
const LINKEDIN_LINK = "https://www.linkedin.com/in/petter-hancock/";

export interface UseAuthenticatedRouteResult {
  activeTab: string;
  onTabChange: (id: string) => void;
  sessionContent: AppSessionContent;
  socialLinks: AppSocialLinks;
  /** Where each account-menu entry goes, plus the inbox's unread count. */
  accountMenu: {
    unreadCount: number;
    onOpenProfile: () => void;
    onOpenInbox: () => void;
  };
}

/**
 * Which nav tab each route belongs to. A profile and the inbox both live under
 * Community, so the tab stays lit while the cook is inside that section.
 */
const TAB_ROUTES: { id: string; path: string; matches: (pathname: string) => boolean }[] = [
  {
    id: "recipes",
    path: "/",
    matches: (pathname) => pathname === "/" || pathname.startsWith("/recipes"),
  },
  { id: "plan", path: "/plan", matches: (pathname) => pathname.startsWith("/plan") },
  { id: "week", path: "/week", matches: (pathname) => pathname.startsWith("/week") },
  { id: "shop", path: "/shopping", matches: (pathname) => pathname.startsWith("/shopping") },
  { id: "community", path: "/community", matches: (pathname) => pathname.startsWith("/community") },
];

export function useAuthenticatedRoute(): UseAuthenticatedRouteResult {
  const navigate = useNavigate();
  const pathname = useLocation({ select: (state) => state.pathname });
  const sessionContent = useAppSessionContent();
  const socialLinks = useAppSocialLinks(GITHUB_LINK, LINKEDIN_LINK);
  const { me, unreadCount } = UseCommunity();

  const activeTab = TAB_ROUTES.find((route) => route.matches(pathname))?.id ?? "";

  function handleTabChange(id: string): void {
    const route = TAB_ROUTES.find((candidate) => candidate.id === id);
    if (route) void navigate({ to: route.path });
  }

  return {
    activeTab,
    onTabChange: handleTabChange,
    sessionContent,
    socialLinks,
    accountMenu: {
      unreadCount,
      onOpenProfile: () => void navigate({ to: "/community/$personId", params: { personId: me.id } }),
      onOpenInbox: () => void navigate({ to: "/community/inbox" }),
    },
  };
}

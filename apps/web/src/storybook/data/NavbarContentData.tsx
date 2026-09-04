import type { NavbarContentProps } from "~/components/navigation/navbar-content/NavbarContent";

export const NavbarContentCommonData: NavbarContentProps = {
  quickMenu: {
    onSettings: () => console.log("onSettings"),
    onLogout: () => console.log("onLogout"),
    onSearch: () => console.log("onSearch"),
  },
  avatarName: "John Doe",
  avatarEmail: "john.doe@example.com",
};

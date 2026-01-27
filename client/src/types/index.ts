import type { IconType } from "react-icons";

export interface SideMenuData {
  id: string;
  label: "Dashboard" | "Blog Posts" | "Comments";
  icon: IconType;
  path: string;
}

export interface BlogNavbarData {
  id: string;
  label: "Home" | "React JS" | "Next JS";
  icon: IconType;
  path: string;
  onlySideMenu?: boolean;
}

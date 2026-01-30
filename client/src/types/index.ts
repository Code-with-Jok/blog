import type { IconType } from "react-icons";

export interface SideMenuData {
  id: string;
  label: "Dashboard" | "Blog Posts" | "Comments";
  icon: IconType;
  path: string;
}

export interface BlogNavbarData {
  id: string;
  label: "Home" | "React JS" | "Next JS" | "Admin";
  icon: IconType;
  path: string;
  onlySideMenu?: boolean;
}

export interface SignUpForm {
  fullName: string;
  email: string;
  password: string;
  adminAccessToken: string;
}

export interface SignUpErrors {
  fullName?: string;
  email?: string;
  password?: string;
  adminAccessToken?: string;
  root?: string;
  profileImageUrl?: string;
}

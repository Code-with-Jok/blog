import {
  LuGalleryVerticalEnd,
  LuLayoutDashboard,
  LuLayoutTemplate,
  LuMessageSquareQuote,
  LuTag,
} from "react-icons/lu";
import type { IconType } from "react-icons";

interface SideMenuData {
  id: string;
  label: string;
  icon: IconType;
  path: string;
}

interface BlogNavbarData {
  id: string;
  label: string;
  icon: IconType;
  path: string;
  onlySideMenu?: boolean;
}

export const SIDE_MENU_DATA: SideMenuData[] = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    id: "02",
    label: "Blog Posts",
    icon: LuGalleryVerticalEnd,
    path: "/admin/posts",
  },
  {
    id: "03",
    label: "Comments",
    icon: LuMessageSquareQuote,
    path: "/admin/comments",
  },
];

export const BLOG_NAVBAR_DATA: BlogNavbarData[] = [
  {
    id: "01",
    label: "Home",
    icon: LuLayoutTemplate,
    path: "/",
  },
  {
    id: "02",
    label: "React JS",
    icon: LuTag,
    path: "/tag/react-js",
  },
  {
    id: "03",
    label: "Next JS",
    icon: LuTag,
    path: "/tag/next-js",
  },
];

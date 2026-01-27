import type { BlogNavbarData, SideMenuData } from "@/utils/data";
import BlogNavbar from "./BlogNavbar";

type BlogLayoutProps = {
  children: React.ReactNode;
  activeMenu?: SideMenuData["label"] | BlogNavbarData["label"];
};

const BlogLayout = ({ children, activeMenu }: BlogLayoutProps) => {
  return (
    <div className="bg-white pb-3">
      <BlogNavbar activeMenu={activeMenu} />
      <div className="container mx-auto px-5 md:px-0 mt-10">{children}</div>
    </div>
  );
};

export default BlogLayout;

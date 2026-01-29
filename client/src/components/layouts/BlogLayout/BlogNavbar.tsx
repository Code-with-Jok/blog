import { cn } from "@/utils";
import { BLOG_NAVBAR_DATA } from "@/utils/data";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LuLayoutDashboard, LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import SideMenu from "../../SideMenu";
import { useUserContext } from "@/context/UserContextDefinition";
import ProfileInfoCard from "@/components/Cards/ProfileInfoCard";
import Modal from "@/components/Modal";
import Login from "@/components/Auth/Login";
import SignUp from "@/components/Auth/SignUp";
import type { BlogNavbarData, SideMenuData } from "@/types";
import SearchModal from "@/components/SearchModal";

type BlogNavbarProps = {
  activeMenu?: SideMenuData["label"] | BlogNavbarData["label"];
};

const BlogNavbar = ({ activeMenu }: BlogNavbarProps) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);

  const { user, setOpenAuthForm } = useUserContext();

  const navbarData =
    user?.role === "admin"
      ? [
          ...BLOG_NAVBAR_DATA,
          {
            id: "04",
            label: "Admin",
            icon: LuLayoutDashboard,
            path: "/admin/dashboard",
            onlySideMenu: false,
          },
        ]
      : BLOG_NAVBAR_DATA;

  return (
    <>
      <div className="bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
        <div className="container mx-auto flex items-center justify-between gap-5">
          <div className="flex gap-5">
            <button
              className="block lg:hidden text-black -mt-1"
              onClick={() => {
                setOpenSideMenu(!openSideMenu);
              }}
            >
              {openSideMenu ? (
                <HiOutlineX className="text-2xl" />
              ) : (
                <HiOutlineMenu className="text-2xl" />
              )}
            </button>

            <Link to="/">
              <img src="logo.png" alt="logo" className="h-6 md:h-[26px]" />
            </Link>
          </div>

          <nav>
            <ul className="hidden md:flex items-center gap-10">
              {navbarData.map((item, index) => {
                return item.onlySideMenu ? null : (
                  <Link key={item.id} to={item.path}>
                    <li className="text-[15px] text-black font-medium listnon relative group cursor-pointer">
                      {item.label}
                      <span
                        className={cn(
                          `absolute inset-x-0 bottom-0 h-0.5 bg-sky-500 transition-all duration-300 origin-left group-hover:scale-x-100`,
                          index === 0 ? "scale-x-100" : "scale-x-0"
                        )}
                      ></span>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <button
              className="hover:text-sky-500 cursor-pointer transition-colors"
              onClick={() => {
                setOpenSearchBar(true);
              }}
            >
              <LuSearch className="text-[22px]" />
            </button>

            {!user ? (
              <button
                onClick={() => {
                  setOpenAuthForm(true);
                }}
                className="hidden md:flex items-center gap-3 bg-linear-to-r from-sky-500 to-cyan-400 text-xs md:text-sm font-semibold text-white px-5 md:px-7 py-2 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-cyan-200"
              >
                Login/SignUp
              </button>
            ) : (
              <div className="hidden md:block">
                <ProfileInfoCard />
              </div>
            )}
          </div>

          {openSideMenu && (
            <div className="fixed top-[61px] -ml-4 bg-white">
              <SideMenu
                activeMenu={activeMenu}
                isBlogMenu
                setOpenSideMenu={setOpenSideMenu}
              />
            </div>
          )}
        </div>
      </div>

      <AuthModel />
      <SearchModal
        isOpen={openSearchBar}
        onClose={() => setOpenSearchBar(false)}
      />
    </>
  );
};

export default BlogNavbar;

const AuthModel = () => {
  const { openAuthForm, setOpenAuthForm } = useUserContext();
  const [currentPage, setCurrentPage] = useState("login");
  return (
    <>
      <Modal
        isOpen={openAuthForm}
        onClose={() => setOpenAuthForm(false)}
        hideHeader
      >
        <div className="">
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

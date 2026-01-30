import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import type { BlogNavbarData, SideMenuData } from "@/types";
import logo from "@/assets/logo.png";
interface NavbarProps {
  activeMenu?: SideMenuData["label"] | BlogNavbarData["label"];
}

const Navbar = ({ activeMenu }: NavbarProps) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="flex items-center justify-between bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-50">
      <div className="flex items-center gap-5">
        <button
          className="block lg:hidden text-black -ml-1"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <img
          src={logo}
          alt="logo"
          className="h-[24px] md:h-[26px] cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="hidden md:flex flex-1 max-w-md mx-auto px-6">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full bg-gray-100/50 border border-gray-200 text-gray-700 text-sm rounded-full focus:ring-indigo-500 focus:border-indigo-500 block pl-10 p-2.5 transition-all focus:bg-white focus:shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        </div>
      </div>

      {openSideMenu && (
        <div className="fixed top-[61px] left-0 right-0 bg-white shadow-md lg:hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block pl-10 p-2.5"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    navigate(
                      `/search?q=${encodeURIComponent(searchQuery.trim())}`
                    );
                    setOpenSideMenu(false);
                    setSearchQuery("");
                  }
                }}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;

import { cn } from "@/utils";
import { BLOG_NAVBAR_DATA, SIDE_MENU_DATA } from "@/utils/data";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

interface SideMenuProps {
  activeMenu?: string;
  isBlogMenu: boolean;
}

const SideMenu = ({ activeMenu, isBlogMenu }: SideMenuProps) => {
  const user = {
    name: "Lutfi Hafiz",
    email: "lutfihafiz@gmail.com",
    profileImageUrl: "",
  };
  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navigateTo = (router: string) => {
    if (router === "logout") {
      handelLogout();
      return;
    }
    navigate(router);
  };

  return (
    <div className="block lg:hidden w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      {user && (
        <div className="flex items-center flex-col justify-center gap-1 mt-3 mb-7">
          {user?.profileImageUrl ? (
            <img
              src={user?.profileImageUrl}
              alt="Profile Image"
              className="size-20 bg-slate-400 rounded-full"
            />
          ) : (
            <CharAvatar fullname={user?.name ?? ""} />
          )}

          <>
            <h5 className="text-gray-950 font-semibold text-center leading-6 mt-1">
              {user?.name ?? ""}
            </h5>

            <p className="text-[13px] font-medium text-gray-800 text-center">
              {user?.email ?? ""}
            </p>
          </>
        </div>
      )}
      {(isBlogMenu ? BLOG_NAVBAR_DATA : SIDE_MENU_DATA).map((item, index) => (
        <button
          key={cn(`menu_${index}`)}
          className={cn(
            `w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 cursor-pointer`,
            {
              "text-white bg-linear-to-r from-sky-500 to-cyan-400":
                activeMenu === item.label,
            }
          )}
          onClick={() => navigateTo(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
      {user && (
        <button
          className={cn(
            `w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 cursor-pointer`
          )}
          onClick={() => handelLogout()}
        >
          <LuLogOut className="text-xl" />
          Logout
        </button>
      )}
    </div>
  );
};

export default SideMenu;

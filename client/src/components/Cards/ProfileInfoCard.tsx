import { useUserContext } from "@/context/UserContextDefinition";

const ProfileInfoCard = () => {
  const { user, clearUser } = useUserContext();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
  };

  return user ? (
    <div className="flex items-center">
      <img
        src={user.profileImageUrl}
        alt="profile-image"
        className="size-11 bg-gray-300 rounded-full object-cover mr-3"
      />

      <div>
        <div className="text-[15px] text-black font-bold leading-3">
          {user.name}
        </div>
        <button
          className="text-sky-600 text-sm font-semibold cursor-pointer hover:underline"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  ) : null;
};

export default ProfileInfoCard;

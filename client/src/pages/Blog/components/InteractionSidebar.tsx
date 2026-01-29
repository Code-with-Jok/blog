import { useState } from "react";
import { LuHeart, LuMessageCircle, LuBookmark } from "react-icons/lu";
import { cn } from "@/utils";
import { useBlogPostInteractions } from "@/hooks/useBlogPostInteractions";
import { useUserContext } from "@/context/UserContextDefinition";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface InteractionSidebarProps {
  postId: string;
  initialLikes?: number;
  commentCount?: number;
}

const InteractionSidebar = ({
  postId,
  initialLikes = 0,
  commentCount = 0,
}: InteractionSidebarProps) => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { likes, handleLike, isLiking } = useBlogPostInteractions(
    postId,
    initialLikes
  );
  const [isBookmarked, setIsBookmarked] = useState(false);

  const onLikeClick = () => {
    if (!user) {
      toast.error("Please login to like this post");
      navigate("/login");
      return;
    }
    handleLike();
  };

  const onBookmarkClick = () => {
    if (!user) {
      toast.error("Please login to bookmark this post");
      navigate("/login");
      return;
    }
    setIsBookmarked(!isBookmarked);
    toast.success(
      isBookmarked ? "Removed from bookmarks" : "Saved to bookmarks"
    );
  };

  const scrollToComments = () => {
    const commentsSection = document.getElementById("comments-section");
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center">
      {/* Like Button */}
      <div className="flex flex-col items-center gap-1 group">
        <button
          onClick={onLikeClick}
          disabled={isLiking}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
            "hover:bg-pink-50 hover:text-pink-600 hover:scale-110",
            "border border-transparent hover:border-pink-100",
            // TODO: Check if user already liked
            isLiking
              ? "text-pink-600 bg-pink-50"
              : "text-gray-500 bg-white shadow-sm border-gray-100"
          )}
        >
          <LuHeart
            className={cn(
              "text-xl transition-transform duration-200",
              isLiking && "scale-75"
            )}
            fill={isLiking ? "currentColor" : "none"}
          />
        </button>
        <span className="text-sm font-medium text-gray-500 group-hover:text-pink-600 transition-colors">
          {likes}
        </span>
      </div>

      <div className="flex flex-col items-center gap-1 group">
        <button
          onClick={scrollToComments}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
            "hover:bg-blue-50 hover:text-blue-600 hover:scale-110",
            "text-gray-500 bg-white shadow-sm border border-gray-100 hover:border-blue-100"
          )}
        >
          <LuMessageCircle className="text-xl" />
        </button>
        <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors">
          {commentCount}
        </span>
      </div>

      {/* Bookmark Button */}
      <div className="flex flex-col items-center gap-1 group">
        <button
          onClick={onBookmarkClick}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
            "hover:bg-yellow-50 hover:text-yellow-600 hover:scale-110",
            "border border-transparent hover:border-yellow-100",
            isBookmarked
              ? "text-yellow-600 bg-yellow-50"
              : "text-gray-500 bg-white shadow-sm border-gray-100"
          )}
        >
          <LuBookmark
            className="text-xl"
            fill={isBookmarked ? "currentColor" : "none"}
          />
        </button>
        <span className="text-sm font-medium text-gray-500 group-hover:text-yellow-600 transition-colors">
          {isBookmarked ? "1" : "0"}
        </span>
      </div>
    </div>
  );
};

export default InteractionSidebar;

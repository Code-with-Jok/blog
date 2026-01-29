import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import toast from "react-hot-toast";

interface UseBlogPostInteractionsReturn {
  likes: number;
  handleLike: () => Promise<void>;
  isLiking: boolean;
}

export const useBlogPostInteractions = (
  postId: string,
  initialLikes: number = 0
): UseBlogPostInteractionsReturn => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);
    try {
      // Optimistic update
      setLikes((prev) => prev + 1);

      await axiosInstance.post(API_PATHS.POSTS.LIKE(postId));
      toast.success("Liked post!");
    } catch (error) {
      console.error("Failed to like post", error);
      // Revert on failure
      setLikes((prev) => prev - 1);
      toast.error("Failed to like post");
    } finally {
      setIsLiking(false);
    }
  };

  return {
    likes,
    handleLike,
    isLiking,
  };
};

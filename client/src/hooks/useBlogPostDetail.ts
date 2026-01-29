import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { type BlogPost } from "@/types/api";
import axios from "axios";

interface UseBlogPostDetailReturn {
  blogPostData: BlogPost | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useBlogPostDetail = (slug?: string): UseBlogPostDetailReturn => {
  const [blogPostData, setBlogPostData] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const incrementViewCount = async (postId: string) => {
    if (!postId) return;
    try {
      await axiosInstance.post(API_PATHS.POSTS.INCREMENT_VIEW(postId));
    } catch (error) {
      console.error(error);
    }
  };

  const getPostDetailsBySlug = useCallback(async () => {
    if (!slug) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        API_PATHS.POSTS.GET_BY_SLUG(slug)
      );
      if (response.data) {
        const data = response.data;
        setBlogPostData(data);
        incrementViewCount(data._id);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message);
      } else {
        setError("Failed to fetch post details");
      }
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    getPostDetailsBySlug();
  }, [getPostDetailsBySlug]);

  return {
    blogPostData,
    isLoading,
    error,
    refetch: getPostDetailsBySlug,
  };
};

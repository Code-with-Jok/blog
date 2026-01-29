import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { type BlogPost } from "@/types/api";

interface UseBlogPostsReturn {
  blogPostList: BlogPost[];
  page: number;
  totalPages: number;
  loading: boolean;
  loadMore: () => void;
  refresh: () => void;
}

export const useBlogPosts = (initialPage = 1): UseBlogPostsReturn => {
  const [blogPostList, setBlogPostList] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  // Function to fetch posts
  const fetchPosts = useCallback(async (pageNumber: number) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.POSTS.GET_ALL, {
        params: {
          status: "published",
          page: pageNumber,
        },
      });

      const { posts, totalPages: total } = response.data;

      setBlogPostList((prev) =>
        pageNumber === 1 ? posts : [...prev, ...posts]
      );
      setPage(pageNumber);
      setTotalPages(total);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchPosts(initialPage);
  }, [fetchPosts, initialPage]);

  // Handle load more
  const loadMore = useCallback(() => {
    if (page < totalPages && !loading) {
      fetchPosts(page + 1);
    }
  }, [page, totalPages, loading, fetchPosts]);

  // Refresh feed (e.g. pull to refresh or manual reload)
  const refresh = useCallback(() => {
    setPage(1);
    fetchPosts(1);
  }, [fetchPosts]);

  return {
    blogPostList,
    page,
    totalPages,
    loading,
    loadMore,
    refresh,
  };
};

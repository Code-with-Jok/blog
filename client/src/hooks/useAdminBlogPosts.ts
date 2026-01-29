import { useState, useCallback, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { type BlogPost, type PaginatedResponse } from "@/types/api";
import toast from "react-hot-toast";

export interface Tab {
  label: string;
  count: number;
}

interface UseAdminBlogPostsReturn {
  tabs: Tab[];
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  blogPostList: BlogPost[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  getAllPosts: (pageNumber?: number) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  loadMorePosts: () => void;
}

export const useAdminBlogPosts = (): UseAdminBlogPostsReturn => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [blogPostList, setBlogPostList] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // fetch all blog posts
  const getAllPosts = useCallback(
    async (pageNumber = 1) => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get<PaginatedResponse<BlogPost>>(
          API_PATHS.POSTS.GET_ALL,
          {
            params: {
              status: filterStatus.toLowerCase(),
              page: pageNumber,
            },
          }
        );

        const { posts, totalPages, counts } = response.data;

        setBlogPostList((prev) =>
          pageNumber === 1 ? posts : [...prev, ...posts]
        );

        setTotalPages(totalPages);
        setPage(pageNumber);

        // Map status summary data
        const statusSummary = counts || {
          all: 0,
          published: 0,
          draft: 0,
        };

        const statusArray = [
          {
            label: "ALL",
            count: statusSummary.all,
          },
          {
            label: "Published",
            count: statusSummary.published,
          },
          {
            label: "Draft",
            count: statusSummary.draft,
          },
        ];

        const mappedTabs = statusArray.map((s) => ({
          label: s.label,
          count: s.count,
        }));
        setTabs(mappedTabs);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [filterStatus]
  );

  // delete blog post
  const deletePost = async (postId: string) => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(API_PATHS.POSTS.DELETE(postId));
      toast.success("Post deleted successfully");
      getAllPosts(1);
    } catch (error) {
      console.error("Error deleting post", error);
      toast.error("Failed to delete post");
    } finally {
      setIsLoading(false);
    }
  };

  // load more posts
  const loadMorePosts = async () => {
    if (page < totalPages) {
      getAllPosts(page + 1);
    }
  };

  useEffect(() => {
    getAllPosts(1);
  }, [getAllPosts]);

  return {
    tabs,
    filterStatus,
    setFilterStatus,
    blogPostList,
    page,
    totalPages,
    isLoading,
    getAllPosts,
    deletePost,
    loadMorePosts,
  };
};

import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";

export interface TrendingPost {
  _id: string;
  title: string;
  slug: string;
  coverImageUrl?: string;
  tags: string[];
  createdAt: string;
}

export const useTrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState<TrendingPost[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTrendingPosts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          API_PATHS.POSTS.GET_TRENDING_POSTS
        );
        const data = await response.data;

        if (response.data?.length > 0) {
          setTrendingPosts(data);
        } else {
          setTrendingPosts([]);
        }
      } catch (error) {
        console.error("Error fetching trending posts:", error);
        setTrendingPosts([]);
      } finally {
        setLoading(false);
      }
    };

    getTrendingPosts();
  }, []);

  return { trendingPosts, loading };
};

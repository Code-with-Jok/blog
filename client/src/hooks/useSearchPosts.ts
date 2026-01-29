import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import type { BlogPost } from "@/types/api";

export const useSearchPosts = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchPosts = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.POSTS.SEARCH}?q=${encodeURIComponent(query.trim())}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
  };

  return {
    query,
    setQuery,
    results,
    loading,
    hasSearched,
    searchPosts,
    clearSearch,
  };
};

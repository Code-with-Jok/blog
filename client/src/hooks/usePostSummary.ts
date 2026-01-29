import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";

interface UsePostSummaryReturn {
  summaryContent: string | null;
  isSummaryLoading: boolean;
  summaryError: string | null;
  fetchBlogPostSummary: (content: string) => Promise<void>;
  clearSummary: () => void;
}

export const usePostSummary = (): UsePostSummaryReturn => {
  const [summaryContent, setSummaryContent] = useState<string | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const fetchBlogPostSummary = async (content: string) => {
    try {
      setSummaryError(null);
      setIsSummaryLoading(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_POST_SUMMARY,
        {
          content,
        }
      );

      if (response.data) {
        setSummaryContent(response.data.content.summary);
      }
    } catch (error) {
      console.error(error);
      setSummaryError("Failed to generate summary");
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const clearSummary = () => {
    setSummaryContent(null);
    setSummaryError(null);
  };

  return {
    summaryContent,
    isSummaryLoading,
    summaryError,
    fetchBlogPostSummary,
    clearSummary,
  };
};

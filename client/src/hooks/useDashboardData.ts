import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import type { DashboardSummary } from "@/types/api";

interface UseDashboardDataReturn {
  dashboardData: DashboardSummary | null;
  maxViews: number;
  loading: boolean;
  error: string | null;
}

export const useDashboardData = (): UseDashboardDataReturn => {
  const [dashboardData, setDashboardData] = useState<DashboardSummary | null>(
    null
  );
  const [maxViews, setMaxViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<DashboardSummary>(
          API_PATHS.DASHBOARD.GET_DASHBOARD_DATA
        );
        setDashboardData(response.data);

        const { topPosts } = response.data;
        const totalViews = Math.max(0, ...topPosts.map((post) => post.views));
        setMaxViews(totalViews);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
        setError("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    getDashboardData();
  }, []);

  return { dashboardData, maxViews, loading, error };
};

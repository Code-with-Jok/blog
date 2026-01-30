import DashboardLayout from "@/components/layouts/AdminLayout/DashboardLayout";
import { useUserContext } from "@/context/UserContextDefinition";
import moment from "moment";
import DashboardSummaryCard from "@/components/Cards/DashboardSummaryCard";
import {
  LuChartLine,
  LuCheckCheck,
  LuGalleryVerticalEnd,
  LuHeartHandshake,
} from "react-icons/lu";
import TagInsights from "@/components/Cards/TagInsights";
import TopPostCard from "@/components/Cards/TopPostCard";
import RecentComments from "@/components/Cards/RecentComments";
import { useDashboardData } from "@/hooks/useDashboardData";
import EmptyState from "@/components/EmptyState";
import { LuTag, LuTrophy, LuMessageSquare } from "react-icons/lu";

const Dashboard = () => {
  const { dashboardData, maxViews } = useDashboardData();
  const { user } = useUserContext();

  const time = moment().format("dddd MMM YYYY");

  return (
    <DashboardLayout activeMenu="Dashboard">
      {dashboardData && (
        <>
          <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50 mt-5">
            <div>
              <div className="col-span-3">
                <h2 className="text-xl md:text-2xl font-medium">
                  Hello {user?.name}
                </h2>
                <p className="text-xs md:text-[13px] font-medium text-gray-400 mt-1.5">
                  {time}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
              <DashboardSummaryCard
                icon={<LuGalleryVerticalEnd />}
                label="Total Posts"
                value={dashboardData?.status?.totalPosts ?? 0}
                bgColor="bg-sky-100/60"
                color="text-sky-500"
              />

              <DashboardSummaryCard
                icon={<LuCheckCheck />}
                label="Published Posts"
                value={dashboardData?.status?.publishedPosts ?? 0}
                bgColor="bg-sky-100/60"
                color="text-sky-500"
              />

              <DashboardSummaryCard
                icon={<LuChartLine />}
                label="Total Views"
                value={dashboardData?.status?.totalViews ?? 0}
                bgColor="bg-sky-100/60"
                color="text-sky-500"
              />

              <DashboardSummaryCard
                icon={<LuHeartHandshake />}
                label="Total Likes"
                value={dashboardData?.status?.totalLikes ?? 0}
                bgColor="bg-sky-100/60"
                color="text-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-12 gap-6 my-4 md:my-6">
            <div className="col-span-12 md:col-span-7 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
              <div className="flex items-center justify-between">
                <h5 className="font-medium">Tag Insights</h5>
              </div>
              {dashboardData?.tagUsage && dashboardData.tagUsage.length > 0 ? (
                <TagInsights tagUsage={dashboardData.tagUsage} />
              ) : (
                <EmptyState
                  message="No Tags Yet"
                  subMessage=""
                  icon={<LuTag className="text-3xl" />}
                  className="py-6 border-none bg-gray-50/50"
                />
              )}
            </div>

            <div className="col-span-12 md:col-span-5 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
              <div className="flex items-center justify-between">
                <h5 className="font-medium">Top Posts</h5>
              </div>

              {dashboardData?.topPosts && dashboardData.topPosts.length > 0 ? (
                dashboardData.topPosts.map((post) => (
                  <TopPostCard
                    key={post._id}
                    title={post.title}
                    coverImageUrl={post.coverImageUrl || ""}
                    views={post.views}
                    likes={post.likes}
                    maxViews={maxViews}
                  />
                ))
              ) : (
                <EmptyState
                  message="No Top Posts"
                  subMessage=""
                  icon={<LuTrophy className="text-3xl" />}
                  className="py-6 border-none bg-gray-50/50"
                />
              )}
            </div>

            <div className="col-span-12 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
              <div className="flex items-center justify-between">
                <h5 className="font-medium">Recent Comments</h5>
              </div>

              {dashboardData?.recentComments &&
              dashboardData.recentComments.length > 0 ? (
                <RecentComments comments={dashboardData.recentComments} />
              ) : (
                <EmptyState
                  message="No Recent Comments"
                  subMessage="Comments from readers will appear here."
                  icon={<LuMessageSquare className="text-3xl" />}
                  className="py-10 border-none bg-gray-50/50"
                />
              )}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DashboardLayout from "@/components/layouts/AdminLayout/DashboardLayout";
import Modal from "@/components/Modal";
import Tabs from "@/components/Tabs";
import BlogPostSummaryCard from "@/components/Cards/BlogPostSummaryCard";
import DeleteAlertContent from "@/components/DeleteAlertContent";
import { LuGalleryVerticalEnd, LuLoaderCircle, LuPlus } from "react-icons/lu";
import moment from "moment";
import { type BlogPost } from "@/types/api"; // Keep type import if needed for delete alert
import { useAdminBlogPosts } from "@/hooks/useAdminBlogPosts";

const BlogPosts = () => {
  const navigate = useNavigate();

  const {
    tabs,
    filterStatus,
    setFilterStatus,
    blogPostList,
    page,
    totalPages,
    isLoading,
    deletePost,
    loadMorePosts,
  } = useAdminBlogPosts();

  const [openDeleteAlert, setOpenDeleteAlert] = useState<{
    open: boolean;
    data: BlogPost | null;
  }>({
    open: false,
    data: null,
  });

  const handleDeleteSubmition = async () => {
    if (openDeleteAlert.data) {
      await deletePost(openDeleteAlert.data._id);
      setOpenDeleteAlert({ open: false, data: null });
    }
  };

  return (
    <DashboardLayout activeMenu="Blog Posts">
      <div className="w-auto mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold mt-5 mb-5">Blog Posts</h2>

          <button
            onClick={() => navigate("/admin/create-post")}
            className="btn-small"
          >
            <LuPlus className="text-[18px]" />
            Create Post
          </button>
        </div>

        <Tabs
          tabs={tabs}
          activeTab={filterStatus}
          setActiveTab={setFilterStatus}
        />

        <div className="mt-5">
          {blogPostList.map((post) => (
            <BlogPostSummaryCard
              key={post._id}
              title={post.title}
              imgUrl={post.coverImageUrl || ""}
              updatedOn={
                post.updatedAt
                  ? moment(post.updatedAt).format("Do MMM YYYY")
                  : "-"
              }
              tags={post.tags}
              likes={post.likes}
              views={post.views}
              onClick={() => navigate(`/admin/edit/${post.slug}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data: post })}
            />
          ))}

          {page < totalPages && (
            <div className="flex items-center justify-center mb-8">
              <button
                className="flex items-center gap-3 text-sm text-white font-medium bg-black px-7 py-2.5 rounded-full text-nowrap hover:scale-105 transition-all duration-300 ease-in-out"
                disabled={isLoading}
                onClick={loadMorePosts}
              >
                {isLoading ? (
                  <>
                    <LuLoaderCircle className="animate-spin text-[15px]" />
                    Loading...
                  </>
                ) : (
                  <>
                    <LuGalleryVerticalEnd className="text-lg" />
                    Load More
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Post"
      >
        <div className="w-[90vw] md:w-[30vw]">
          <DeleteAlertContent
            onDelete={handleDeleteSubmition}
            content="Are you sure you want to delete this post?"
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default BlogPosts;

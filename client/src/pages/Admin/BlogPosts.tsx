import BlogPostSummaryCard from "@/components/Cards/BlogPostSummaryCard";
import DeleteAlertContent from "@/components/DeleteAlertContent";
import DashboardLayout from "@/components/layouts/AdminLayout/DashboardLayout";
import Modal from "@/components/Modal";
import Tabs from "@/components/Tabs";
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import moment from "moment";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { LuGalleryVerticalEnd, LuLoaderCircle, LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { type BlogPost, type PaginatedResponse } from "@/types/api";

export interface Tab {
  label: string;
  count: number;
}

const BlogPosts = () => {
  const navigate = useNavigate();

  const [tabs, setTabs] = useState<Tab[]>([]);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [blogPostList, setBlogPostList] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState<{
    open: boolean;
    data: BlogPost | null;
  }>({
    open: false,
    data: null,
  });

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
            pages: totalPages, // Add if needed or just count
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

        // Fix tabs mapping if types don't match exactly or logic changed, ensuring safe types
        const mappedTabs = statusArray.map((s) => ({
          label: s.label,
          count: s.count,
        }));
        setTabs(mappedTabs);
      } catch (error) {
        console.log(error);
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

      setOpenDeleteAlert({ open: false, data: null });

      getAllPosts(1);
    } catch (error) {
      console.log("Error deleting post", error);
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
    return () => {};
  }, [getAllPosts]);

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
            onDelete={() =>
              openDeleteAlert.data && deletePost(openDeleteAlert.data._id)
            }
            content="Are you sure you want to delete this post?"
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default BlogPosts;

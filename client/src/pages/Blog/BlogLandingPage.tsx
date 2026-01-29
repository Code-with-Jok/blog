import BlogLayout from "@/components/layouts/BlogLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { LuGalleryVerticalEnd, LuLoaderCircle } from "react-icons/lu";
import moment from "moment";
import FeaturedBlogPost from "./components/FeaturedBlogPost";
import BlogPostCard from "./components/BlogPostCard";
import TrendingPostsSection from "./components/TrendingPostsSection";
import type { BlogPost } from "@/types/api";

const BlogLandingPage = () => {
  const navigate = useNavigate();

  const [blogPostList, setBlogPostList] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  // get blog posts
  const getAllPosts = async (pageNumber: number) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.POSTS.GET_ALL, {
        params: {
          status: "published",
          page: pageNumber,
        },
      });

      const { posts, totalPages } = response.data;
      setBlogPostList((prev) =>
        pageNumber === 1 ? posts : [...prev, ...posts]
      );
      setPage(pageNumber);
      setTotalPages(totalPages);
    } catch (error) {
      console.log("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // load more posts
  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
      getAllPosts(page + 1);
    }
  };

  const navigateToPost = (slug: string) => {
    navigate(`/post/${slug}`);
  };

  // use effect to get all posts
  useEffect(() => {
    getAllPosts(1);
  }, []);

  return (
    <BlogLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-8">
            {sectionTitle("Featured Post")}
            {blogPostList.length > 0 && (
              <FeaturedBlogPost
                title={blogPostList[0].title}
                coverImageUrl={blogPostList[0].coverImageUrl ?? ""}
                description={blogPostList[0].content}
                tags={blogPostList[0].tags}
                updatedOn={
                  blogPostList[0].updatedAt
                    ? moment(blogPostList[0].updatedAt).format("Do MMM YYYY")
                    : "-"
                }
                authorName={blogPostList[0].author.name}
                authProfileImg={blogPostList[0].author.profileImageUrl ?? ""}
                onClick={() => navigateToPost(blogPostList[0].slug)}
              />
            )}

            <div className="mt-16 mb-8 flex items-center justify-between">
              {sectionTitle("Latest Articles")}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPostList.length > 0 &&
                blogPostList
                  .slice(1)
                  .map((item) => (
                    <BlogPostCard
                      key={item._id}
                      title={item.title}
                      coverImageUrl={item.coverImageUrl ?? ""}
                      description={item.content}
                      tags={item.tags}
                      updatedOn={
                        item.updatedAt
                          ? moment(item.updatedAt).format("Do MMM YYYY")
                          : "-"
                      }
                      authorName={item.author.name}
                      authProfileImg={item.author.profileImageUrl ?? ""}
                      onClick={() => navigateToPost(item.slug)}
                    />
                  ))}
            </div>

            {page < totalPages && (
              <div className="flex items-center justify-center mt-12">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="group flex items-center gap-3 px-8 py-3 bg-white border border-gray-200 text-gray-700 rounded-full hover:bg-gray-50 hover:border-indigo-200 hover:text-indigo-600 transition-all duration-300 shadow-sm font-semibold text-sm"
                >
                  {loading ? (
                    <>
                      <LuLoaderCircle className="animate-spin text-lg" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <LuGalleryVerticalEnd className="text-lg group-hover:scale-110 transition-transform" />
                      <span>Load More Articles</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="col-span-12 md:col-span-4 space-y-10">
            <div className="sticky top-24 shadow-2xl">
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden">
                <div className="p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="text-2xl">🔥</span> Trending
                  </h3>
                  <TrendingPostsSection />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};

const sectionTitle = (title: string) => (
  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-6 flex items-center gap-3">
    <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
    {title}
  </h2>
);

export default BlogLandingPage;

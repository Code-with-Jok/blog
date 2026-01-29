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
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
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
            <div className="flex items-center justify-center mt-5">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
              >
                {loading ? (
                  <>
                    <LuLoaderCircle className="animate-spin text-lg" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <LuGalleryVerticalEnd className="text-lg" />
                    <span>Load More</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="col-span-12 md:col-span-4">
          <TrendingPostsSection />
        </div>
      </div>
    </BlogLayout>
  );
};

export default BlogLandingPage;

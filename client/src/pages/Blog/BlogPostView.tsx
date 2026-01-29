import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/UserContextDefinition";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import axios from "axios";
import BlogLayout from "@/components/layouts/BlogLayout";
import moment from "moment";
import { LuDot, LuSparkles } from "react-icons/lu";
import TrendingPostsSection from "./components/TrendingPostsSection";
import ImagePreview from "@/components/ImagePreview";
import MDContent from "./components/MDContent";
import { sanitizeMarkdown } from "@/utils/helper";
import type { BlogPost } from "@/types/api";

const BlogPostView = () => {
  const { slug } = useParams();
  const { user } = useUserContext();

  const navigate = useNavigate();

  const [blogPostData, setBlogPostData] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  // const [replyText, setReplyText] = useState("");
  // const [showReplyForm, setShowReplyForm] = useState(false);

  // const [openSummarizeDrawer, setOpenSummarizeDrawer] = useState(false);
  // const [summaryContent, setSummaryContent] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get post data by slug
  const getPostDetailsBySlug = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        API_PATHS.POSTS.GET_BY_SLUG(slug!)
      );
      if (response.data) {
        const data = response.data;
        setBlogPostData(data);
        getCommentsByPostId(data._id);
        incrementViewCount(data._id);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message);
      } else {
        setError("Failed to fetch post details");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // get comment by post id
  const getCommentsByPostId = async (postId: string) => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.COMMENTS.GET_ALL_BY_POST(postId)
      );

      if (response.data) {
        setComments(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // generate blog post summary
  const generateBlogPostSummary = async () => {
    // Placeholder for summary logic
    console.log("Generating summary...");
  };

  // increment view count
  const incrementViewCount = async (postId: string) => {
    if (!postId) return;
    try {
      await axiosInstance.post(API_PATHS.POSTS.INCREMENT_VIEW(postId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (slug) {
      getPostDetailsBySlug();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <BlogLayout activeMenu="Blog Posts">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </BlogLayout>
    );
  }

  if (error) {
    return (
      <BlogLayout activeMenu="Blog Posts">
        <div className="text-center py-20 text-red-500 bg-red-50 rounded-lg mx-4">
          <p className="text-xl font-bold">Error</p>
          <p>{error}</p>
        </div>
      </BlogLayout>
    );
  }

  return (
    <BlogLayout activeMenu="Blog Posts">
      {blogPostData && (
        <>
          <title>{blogPostData.title}</title>
          <meta name="description" content={blogPostData.title} />

          <div className="px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-10 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                {blogPostData.title}
              </h1>
              <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                {blogPostData.tags?.map((tag, index) => (
                  <span
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/tag/${tag}`);
                    }}
                    className="px-4 py-1.5 rounded-full text-sm font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 cursor-pointer transition-colors duration-200 border border-indigo-100/50"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-600 mb-8 border-b border-gray-100 pb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md">
                    {blogPostData.author?.name?.[0] || "A"}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-sm">
                      {blogPostData.author?.name || "Unknown Author"}
                    </span>
                    <span className="text-xs text-gray-500">Author</span>
                  </div>
                </div>

                <LuDot className="text-gray-300 hidden md:block" />

                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                  <span className="text-sm font-medium">
                    {moment(blogPostData.updatedAt).format("MMMM Do, YYYY")}
                  </span>
                </div>

                <LuDot className="text-gray-300 hidden md:block" />

                <button
                  className="group flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
                  onClick={generateBlogPostSummary}
                >
                  <LuSparkles className="text-lg animate-pulse" />
                  <span>Summarize AI</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                <div className="mb-10 relative group rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/50">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500"></div>
                  <ImagePreview
                    src={blogPostData.coverImageUrl}
                    alt={blogPostData.title}
                    wrapperClassName="w-full aspect-video"
                    className="w-full h-full object-cover transform hover:shadow-2xl hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="max-w-none bg-white shadow-2xl py-5 px-8 rounded-xl">
                  <MDContent
                    content={sanitizeMarkdown(blogPostData.content ?? "")}
                  />
                </div>

                <div className="mt-16 pt-10 border-t border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Comments ({comments.length})
                  </h3>
                  {comments.length === 0 ? (
                    <p className="text-gray-500 italic bg-gray-50 p-6 rounded-lg text-center">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {comments.map((comment: any, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-semibold text-gray-900">
                            {comment.user?.fullName || "User"}
                          </p>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-4 space-y-8">
                <div className="sticky top-24 shadow-2xl">
                  <div className="bg-white rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden">
                    <div className="p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    <div className="p-6 ">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="text-2xl">🔥</span> Trending Posts
                      </h3>
                      <TrendingPostsSection />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </BlogLayout>
  );
};

export default BlogPostView;

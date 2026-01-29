import BlogLayout from "@/components/layouts/BlogLayout";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { LuLoaderCircle, LuSearchX } from "react-icons/lu";
import moment from "moment";
import BlogPostCard from "./components/BlogPostCard";
import TrendingPostsSection from "./components/TrendingPostsSection";
import type { BlogPost } from "@/types/api";

const SearchPosts = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `${API_PATHS.POSTS.SEARCH}?q=${encodeURIComponent(query)}`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error searching posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const navigateToPost = (slug: string) => {
    navigate(`/post/${slug}`);
  };

  return (
    <BlogLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10 md:flex md:flex-col md:gap-10">
          <div className="col-span-12 md:col-span-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Search Results
              </h2>
              <p className="text-gray-500">
                Found {posts.length} results for{" "}
                <span className="font-semibold text-indigo-600">"{query}"</span>
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <LuLoaderCircle className="animate-spin text-3xl text-indigo-500" />
              </div>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((item) => (
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
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <LuSearchX className="text-6xl mb-4 text-gray-300" />
                <p className="text-lg font-medium">No posts found</p>
                <p className="text-sm">Try searching for something else</p>
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

export default SearchPosts;

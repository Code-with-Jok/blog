import ImagePreview from "@/components/ImagePreview";
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface TrendingPostCardProps {
  title: string;
  coverImageUrl: string;
  tags: string[];
  onClick: () => void;
}

interface TrendingPost {
  _id: string;
  title: string;
  slug: string;
  coverImageUrl: string;
  tags: string[];
}

const TrendingPostsSection = () => {
  const navigate = useNavigate();

  const [trendingPosts, setTrendingPosts] = useState<TrendingPost[]>([]);

  const handlePostClick = (slug: string) => {
    navigate(`/post/${slug}`);
  };

  useEffect(() => {
    const getTrendingPosts = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.POSTS.GET_TRENDING_POSTS
        );
        const data = await response.data;

        if (response.data?.length > 0) {
          setTrendingPosts(data);
        } else {
          setTrendingPosts([]);
        }
      } catch (error) {
        console.error("Error fetching trending posts:", error);
      }
    };

    getTrendingPosts();
  }, []);

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-gray-100 shadow-sm sticky top-24">
      <h4 className="text-lg text-gray-800 font-bold mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-primary rounded-full"></span>
        Trending Now
      </h4>

      {trendingPosts.length > 0 &&
        trendingPosts.map((item) => (
          <TrendingPostCard
            key={item._id}
            title={item.title}
            coverImageUrl={item.coverImageUrl}
            tags={item.tags}
            onClick={() => handlePostClick(item.slug)}
          />
        ))}
    </div>
  );
};

export default TrendingPostsSection;

const TrendingPostCard = ({
  title,
  coverImageUrl,
  tags,
  onClick,
}: TrendingPostCardProps) => {
  return (
    <div
      className="group mb-5 cursor-pointer relative pl-4 transition-all hover:translate-x-1"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <ImagePreview
          src={coverImageUrl}
          alt={title}
          wrapperClassName="size-16 rounded-lg object-cover shrink-0 shadow-sm"
          className="size-16 rounded-lg object-cover"
        />

        <div>
          <h6 className="text-[10px] font-bold text-primary tracking-wider mb-1">
            {tags[0]?.toUpperCase() || "BLOG"}
          </h6>
          <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
};

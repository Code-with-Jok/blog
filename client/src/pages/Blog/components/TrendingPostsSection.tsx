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
    <div className="space-y-6">
      {trendingPosts.length > 0 ? (
        trendingPosts.map((item, index) => (
          <TrendingPostCard
            key={item._id}
            index={index}
            title={item.title}
            coverImageUrl={item.coverImageUrl}
            tags={item.tags}
            onClick={() => handlePostClick(item.slug)}
          />
        ))
      ) : (
        <div className="text-gray-400 text-sm text-center py-4">
          No trending posts yet.
        </div>
      )}
    </div>
  );
};

export default TrendingPostsSection;

const TrendingPostCard = ({
  title,
  coverImageUrl,
  tags,
  onClick,
  index,
}: TrendingPostCardProps & { index: number }) => {
  return (
    <div
      className="group flex items-center gap-4 cursor-pointer p-2 rounded-xl transition-all hover:bg-gray-50 hover:pl-3"
      onClick={onClick}
    >
      <span className="text-2xl font-bold text-gray-200 group-hover:text-indigo-200 transition-colors w-6 flex-shrink-0 text-center select-none font-mono italic">
        {index + 1}
      </span>

      <div className="relative overflow-hidden size-16 rounded-xl flex-shrink-0 shadow-sm border border-gray-100 group-hover:border-indigo-100 transition-colors">
        <ImagePreview
          src={coverImageUrl}
          alt={title}
          wrapperClassName="w-full h-full"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-col min-w-0">
        {tags.length > 0 && (
          <span className="text-[10px] font-bold text-indigo-500 tracking-wider uppercase mb-0.5 line-clamp-1">
            {tags[0]}
          </span>
        )}
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight group-hover:text-indigo-700 transition-colors">
          {title}
        </h3>
      </div>
    </div>
  );
};

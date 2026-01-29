import { useNavigate } from "react-router-dom";

interface BlogPostCardProps {
  title: string;
  coverImageUrl: string;
  description: string;
  tags: string[];
  updatedOn: string;
  authorName: string;
  authProfileImg: string;
  onClick: () => void;
}

const BlogPostCard = ({
  title,
  coverImageUrl,
  description,
  tags,
  updatedOn,
  authorName,
  authProfileImg,
  onClick,
}: BlogPostCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1 border border-gray-100"
      onClick={onClick}
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={coverImageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5 flex flex-col justify-between flex-1">
        <div className="flex items-center flex-wrap gap-2 mb-3">
          {tags.slice(0, 3).map((tag, index) => (
            <button
              key={index}
              className="bg-primary/5 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide hover:bg-primary/10 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/tag/${tag}`);
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {title}
        </h2>
        <p className="text-gray-500 mb-4 text-sm line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center pt-4 border-t gap-2 border-gray-50">
          <img
            src={authProfileImg}
            alt={authorName}
            className="size-8 rounded-full object-cover ring-2 ring-white shadow-sm"
          />

          <div className="flex flex-col">
            <p className="font-semibold text-xs text-gray-900">{authorName}</p>
            <p className="text-[10px] text-gray-400 font-medium">{updatedOn}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;

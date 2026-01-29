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
      className="flex flex-col group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-2 border border-gray-100/50"
      onClick={onClick}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={coverImageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-4 right-4 translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
          <div className="p-2 bg-white rounded-full shadow-lg text-indigo-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col justify-between flex-1 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

        <div className="flex items-center flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider hover:bg-indigo-100 transition-colors border border-indigo-100"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/tag/${tag}`);
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors duration-300">
          {title}
        </h2>

        <p className="text-gray-500 mb-6 text-sm line-clamp-3 leading-relaxed font-medium">
          {description}
        </p>

        <div className="flex items-center pt-6 border-t border-gray-50 mt-auto">
          <div className="relative group/avatar">
            <img
              src={authProfileImg}
              alt={authorName}
              className="size-9 rounded-full object-cover ring-2 ring-transparent group-hover/avatar:ring-indigo-100 transition-all duration-300"
            />
          </div>

          <div className="flex flex-col ml-3">
            <p className="font-bold text-xs text-gray-900">{authorName}</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
              {updatedOn}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;

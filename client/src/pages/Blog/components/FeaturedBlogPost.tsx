import ImagePreview from "@/components/ImagePreview";

interface FeaturedBlogPostProps {
  title: string;
  coverImageUrl: string;
  description: string;
  tags: string[];
  updatedOn: string;
  authorName: string;
  authProfileImg: string;
  onClick: () => void;
}

const FeaturedBlogPost = ({
  title,
  coverImageUrl,
  description,
  tags,
  updatedOn,
  authorName,
  authProfileImg,
  onClick,
}: FeaturedBlogPostProps) => {
  return (
    <div
      className="group grid grid-cols-12 bg-white shadow-lg hover:shadow-2xl rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 border border-gray-100 hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="col-span-12 md:col-span-7 relative overflow-hidden">
        <img
          src={coverImageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

        <div className="absolute top-6 left-6">
          <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-indigo-600 text-xs font-bold tracking-widest uppercase rounded-full shadow-lg border border-white/50 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Featured Post
          </span>
        </div>
      </div>

      <div className="col-span-12 md:col-span-5 flex flex-col justify-center p-8 md:p-10 relative bg-white">
        <div className="flex items-center gap-2 mb-6">
          {tags.length > 0 && (
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[11px] font-bold tracking-wider uppercase rounded-full border border-indigo-100">
              {tags[0]}
            </span>
          )}
          <span className="text-xs text-gray-400 font-medium ml-auto flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            {updatedOn}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 line-clamp-3 leading-tight text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 tracking-tight">
          {title}
        </h2>

        <p className="text-gray-500 leading-relaxed mb-8 line-clamp-3 text-base font-medium">
          {description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-8 border-t border-gray-100">
          <div className="flex items-center gap-3 group/author">
            <div className="relative">
              <img
                src={authProfileImg}
                alt={authorName}
                className="size-12 rounded-full object-cover ring-4 ring-gray-50 group-hover/author:ring-indigo-50 transition-all duration-300"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                Author
              </span>
              <p className="font-bold text-sm text-gray-900 group-hover/author:text-indigo-600 transition-colors">
                {authorName}
              </p>
            </div>
          </div>

          <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogPost;

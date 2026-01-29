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
      className="group grid grid-cols-12 bg-white shadow-sm hover:shadow-xl rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border border-gray-100"
      onClick={onClick}
    >
      <div className="col-span-12 md:col-span-7 relative overflow-hidden h-64 md:h-96">
        <img
          src={coverImageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-60" />
      </div>

      <div className="col-span-12 md:col-span-5 flex flex-col justify-center p-6 md:p-8 lg:p-10 relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />

        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold tracking-wider uppercase rounded-full">
            Featured
          </span>
          {tags.length > 0 && (
            <span className="px-3 py-1 bg-gray-100/80 text-gray-600 text-[10px] font-bold tracking-wider uppercase rounded-full border border-gray-200">
              {tags[0]}
            </span>
          )}
          <span className="text-xs text-gray-400 font-medium ml-auto">
            {updatedOn}
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-4 line-clamp-3 leading-tight text-gray-900 group-hover:text-primary transition-colors">
          {title}
        </h2>

        <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3 text-sm md:text-base">
          {description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <img
              src={authProfileImg}
              alt={authorName}
              className="size-10 rounded-full object-cover ring-2 ring-white shadow-md"
            />
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium">
                Written by
              </span>
              <p className="font-bold text-sm text-gray-900">{authorName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogPost;

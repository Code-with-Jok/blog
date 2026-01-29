import { LuSearch } from "react-icons/lu";
import moment from "moment";

export interface SearchPostPreview {
  _id: string;
  title: string;
  slug: string;
  coverImageUrl?: string;
  tags?: string[];
  createdAt: string;
}

interface SearchPostItemProps {
  post: SearchPostPreview;
  onClick: (slug: string) => void;
}

const SearchPostItem = ({ post, onClick }: SearchPostItemProps) => {
  return (
    <div
      onClick={() => onClick(post.slug)}
      className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group"
    >
      <div className="w-20 h-14 md:w-24 md:h-16 shrink-0 rounded-lg overflow-hidden bg-gray-200">
        {post.coverImageUrl ? (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            <LuSearch />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-indigo-600 line-clamp-2 transition-colors">
          {post.title}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          {post.tags && post.tags.length > 0 && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded">
              #{post.tags[0]}
            </span>
          )}
          <span className="text-xs text-gray-400">
            {moment(post.createdAt).fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchPostItem;

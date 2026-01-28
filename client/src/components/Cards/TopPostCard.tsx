import { LuHeartHandshake } from "react-icons/lu";
import ImagePreview from "../ImagePreview";

interface TopPostCardProps {
  title: string;
  coverImageUrl: string;
  views: number;
  likes: number;
  maxViews: number;
}

const TopPostCard = ({
  title,
  coverImageUrl,
  views,
  likes,
  maxViews,
}: TopPostCardProps) => {
  const viewPercentage = ((views / maxViews) * 100).toFixed(2);
  const likePercentage = ((likes / maxViews) * 100).toFixed(2);

  return (
    <div className="bg-white p-4 flex flex-col gap-3 border-b border-gray-100">
      <div className="flex items-start gap-2">
        <ImagePreview
          overlayClassName="size-10"
          wrapperClassName="rounded-md"
          className="size-10 rounded-md object-cover"
          src={coverImageUrl}
          alt={title}
        />

        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          {title}
        </h3>
      </div>

      <div className="relative w-full h-1.5 bg-sky-100/60 rounded-full overflow-hidden mt-1">
        <div
          className="h-full bg-linear-to-r from-sky-500 to-cyan-400 transition-all duration-300 ease-in-out rounded-full"
          style={{ width: `${viewPercentage}%` }}
        />
        <div
          className="h-full bg-red-500 transition-all duration-300 ease-in-out rounded-full"
          style={{ width: `${likePercentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-600">
        <span className="flex items-center gap-1 text-sm text-black">
          {views} views
        </span>

        <span className="flex items-center gap-1 text-sm text-black">
          <LuHeartHandshake className="text-base text-gray-500" />
          {likes} likes
        </span>
      </div>
    </div>
  );
};

export default TopPostCard;

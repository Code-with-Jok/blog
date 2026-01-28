import { cn } from "@/utils";
import moment from "moment";
import avatar from "@/assets/avatar.gif";
import ImagePreview from "@/components/ImagePreview";
import { type Comment } from "@/services/commentService";

interface CommentSidebarItemProps {
  comment: Comment;
  isSelected: boolean;
  onClick: () => void;
}

const CommentSidebarItem = ({
  comment,
  isSelected,
  onClick,
}: CommentSidebarItemProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 border-b border-slate-100 cursor-pointer transition-colors hover:bg-slate-50 last:border-0",
        isSelected
          ? "bg-blue-50/60 border-l-4 border-l-blue-500 hover:bg-blue-50/80"
          : "border-l-4 border-l-transparent"
      )}
    >
      <div className="flex items-start gap-3">
        <ImagePreview
          src={comment.author?.profileImageUrl || avatar}
          alt={comment.author?.name}
          className="size-9 object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <h4
              className={cn(
                "text-xs font-semibold truncate",
                isSelected ? "text-blue-700" : "text-slate-800"
              )}
            >
              {comment.author?.name}
            </h4>
            <span className="text-[10px] text-slate-400 shrink-0">
              {moment(comment.updatedAt).fromNow(true)}
            </span>
          </div>

          <p
            className={cn(
              "text-xs line-clamp-2 mb-2",
              isSelected ? "text-slate-700 font-medium" : "text-slate-500"
            )}
          >
            {comment.content}
          </p>

          <div className="flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-slate-200" />
            <p className="text-[10px] text-slate-400 truncate max-w-[150px]">
              On: {comment.post?.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSidebarItem;

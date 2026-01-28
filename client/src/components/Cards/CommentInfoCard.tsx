import { useUserContext } from "@/context/UserContextDefinition";
import { cn } from "@/utils";
import moment from "moment";
import { useState } from "react";
import {
  LuChevronDown,
  LuReply,
  LuTrash2,
  LuMessageSquare,
} from "react-icons/lu";
import CommentReplyInput from "./CommentReplyInput";
import toast from "react-hot-toast";
import { commentService } from "@/services/commentService";
import { type Comment } from "@/services/commentService";
import ImagePreview from "../ImagePreview";

interface CommentInfoCardProps {
  commentId: string;
  authorName: string;
  authorPhoto: string;
  content: string;
  updateOn: string;
  post: Comment["post"] | null;
  replies: Comment[];
  getAllComments?: () => void;
  onDelete: (commentId: string) => void;
  isSubReply?: boolean;
}

const CommentInfoCard = ({
  commentId,
  authorName,
  authorPhoto,
  content,
  updateOn,
  post,
  replies,
  getAllComments,
  onDelete,
  isSubReply = false,
}: CommentInfoCardProps) => {
  const { user } = useUserContext();

  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showSubReplies, setShowSubReplies] = useState(false);

  const handleCancelReply = () => {
    setReplyText("");
    setShowReplyForm(false);
  };

  const addReply = async () => {
    try {
      if (!post?._id) return;
      await commentService.reply(post._id, replyText, commentId);

      toast.success("Reply posted successfully");
      setReplyText("");
      setShowReplyForm(false);

      // Expand replies to show the new one
      setShowSubReplies(true);

      getAllComments?.();
    } catch (error) {
      console.log("Error adding reply:", error);
      toast.error("Failed to add reply");
    }
  };

  return (
    <div
      className={cn(
        "bg-white p-4 rounded-xl border border-slate-200 transition-all hover:border-slate-300 hover:shadow-sm",
        isSubReply ? "mt-3 ml-6 bg-slate-50/50 border-slate-100" : "mb-4"
      )}
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="shrink-0">
          <ImagePreview
            src={authorPhoto}
            alt={authorName}
            className={cn(
              "rounded-full object-cover border border-slate-100",
              isSubReply ? "size-8" : "size-10"
            )}
          />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          {/* Header: Author & Metadata */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-800">
                @{authorName}
              </h3>
              <span className="text-xs text-slate-400 font-medium">
                • {updateOn}
              </span>
            </div>

            {!isSubReply && post && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                <span className="text-xs text-slate-500 font-medium max-w-[150px] truncate">
                  On: {post.title}
                </span>
              </div>
            )}
          </div>

          {/* Comment Body */}
          <p className="text-sm text-slate-700 leading-relaxed">{content}</p>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-1">
            {!isSubReply && (
              <button
                onClick={() => setShowReplyForm((prev) => !prev)}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-sky-600 transition-colors"
              >
                <LuReply className="size-3.5" />
                Reply
              </button>
            )}

            {!isSubReply && replies?.length > 0 && (
              <button
                onClick={() => setShowSubReplies((prev) => !prev)}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors"
              >
                <LuMessageSquare className="size-3.5" />
                {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
                <LuChevronDown
                  className={cn(
                    "size-3 transition-transform",
                    showSubReplies && "rotate-180"
                  )}
                />
              </button>
            )}

            <button
              onClick={() => onDelete(commentId)}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-red-500 transition-colors ml-auto md:ml-0"
            >
              <LuTrash2 className="size-3.5" />
              Delete
            </button>
          </div>

          {/* Reply Input Form */}
          {showReplyForm && (
            <CommentReplyInput
              user={user}
              authorName={authorName}
              content={content}
              replyText={replyText}
              setReplyText={setReplyText}
              addReply={addReply}
              handleCancelReply={handleCancelReply}
              type="reply"
            />
          )}

          {/* Nested Replies */}
          {showSubReplies && replies?.length > 0 && (
            <div className="mt-4 pl-4 border-l-2 border-slate-100">
              {replies.map((reply) => (
                <CommentInfoCard
                  key={reply._id}
                  commentId={reply._id}
                  authorName={reply.author?.name || "Unknown"}
                  authorPhoto={reply.author?.profileImageUrl}
                  content={reply.content}
                  updateOn={
                    reply.updatedAt
                      ? moment(reply.updatedAt).format("Do MMM YYYY")
                      : "-"
                  }
                  post={null} // Sub-replies don't need to show post info again
                  replies={reply.replies ?? []}
                  onDelete={onDelete}
                  isSubReply={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentInfoCard;

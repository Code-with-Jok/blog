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
import { type Comment } from "@/services/commentService";
import ImagePreview from "../ImagePreview";

interface CommentInfoCardProps {
  commentId: string;
  postId: string;
  authorName: string;
  authorPhoto: string;
  content: string;
  updateOn: string;
  post: Comment["post"] | null;
  replies: Comment[];
  getAllComments?: () => void;
  onDelete?: (commentId: string) => void;
  onReply?: (content: string, parentCommentId: string) => Promise<void>;
  isSubReply?: boolean;
  isDelete?: boolean;
  depth?: number;
}

const CommentInfoCard = ({
  commentId,
  postId,
  authorName,
  authorPhoto,
  content,
  updateOn,
  post,
  replies,
  getAllComments,
  onDelete,
  onReply,
  isSubReply = false,
  isDelete = true,
  depth = 1,
}: CommentInfoCardProps) => {
  const { user } = useUserContext();

  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);

  const [showSubReplies, setShowSubReplies] = useState(isSubReply);

  const handleCancelReply = () => {
    setReplyText("");
    setShowReplyForm(false);
  };

  const handleAddReply = async () => {
    try {
      if (!onReply) return;
      await onReply(replyText, commentId);

      setReplyText("");
      setShowReplyForm(false);

      setShowSubReplies(true);
    } catch (error) {
      console.log("Error adding reply:", error);
    }
  };

  return (
    <div
      className={cn(
        "p-4 rounded-xl border transition-all hover:shadow-sm",
        isSubReply
          ? "mt-3 ml-6 md:ml-12 border-l-4 border-l-indigo-500/30 border-y-slate-100 border-r-slate-100 bg-slate-50/80"
          : "mb-6 bg-white border-slate-200 shadow-sm"
      )}
    >
      <div className="flex gap-4">
        <div className="shrink-0">
          <ImagePreview
            src={authorPhoto}
            alt={authorName}
            wrapperClassName="rounded-full"
            className={cn(
              "object-cover border border-slate-100",
              isSubReply ? "size-8" : "size-10"
            )}
          />
        </div>

        <div className="flex-1 space-y-2">
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

          <p className="text-sm text-slate-700 leading-relaxed">{content}</p>

          <div className="flex items-center gap-4 pt-1">
            {depth < 3 && (
              <button
                onClick={() => setShowReplyForm((prev) => !prev)}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-sky-600 transition-colors"
                aria-label="Reply to comment"
              >
                <LuReply className="size-3.5" />
                Reply
              </button>
            )}

            {replies?.length > 0 && (
              <button
                onClick={() => setShowSubReplies((prev) => !prev)}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors"
                aria-label={showSubReplies ? "Hide replies" : "Show replies"}
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

            {isDelete && (
              <button
                onClick={() => onDelete?.(commentId)}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-red-500 transition-colors ml-auto md:ml-0"
                aria-label="Delete comment"
              >
                <LuTrash2 className="size-3.5" />
                Delete
              </button>
            )}
          </div>

          {showReplyForm && (
            <CommentReplyInput
              user={user}
              authorName={authorName}
              content={content}
              replyText={replyText}
              setReplyText={setReplyText}
              addReply={handleAddReply}
              handleCancelReply={handleCancelReply}
              type="reply"
            />
          )}

          {showSubReplies && replies?.length > 0 && (
            <div className="mt-4 space-y-4">
              {replies
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((reply) => (
                  <CommentInfoCard
                    isDelete={isDelete}
                    key={reply._id}
                    commentId={reply._id}
                    postId={postId}
                    authorName={reply.author?.name || "Unknown"}
                    authorPhoto={reply.author?.profileImageUrl}
                    content={reply.content}
                    updateOn={
                      reply.updatedAt
                        ? moment(reply.updatedAt).format("Do MMM YYYY")
                        : "-"
                    }
                    post={null}
                    replies={reply.replies ?? []}
                    onDelete={onDelete}
                    onReply={onReply}
                    isSubReply={true}
                    depth={depth + 1}
                    getAllComments={getAllComments}
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

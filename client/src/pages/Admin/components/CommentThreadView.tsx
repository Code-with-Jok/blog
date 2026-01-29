import type { Comment } from "@/services/commentService";
import moment from "moment";
import { useState } from "react";
import { LuExternalLink, LuMessageSquare, LuTrash2 } from "react-icons/lu";
import avatar from "@/assets/avatar.gif";
import CommentReplyInput from "@/components/Cards/CommentReplyInput";
import { useUserContext } from "@/context/UserContextDefinition";
import { commentService } from "@/services/commentService";
import toast from "react-hot-toast";
import ImagePreview from "@/components/ImagePreview";

interface CommentThreadViewProps {
  comment: Comment;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

const CommentThreadView = ({
  comment,
  onDelete,
  onRefresh,
}: CommentThreadViewProps) => {
  const { user } = useUserContext();
  const [replyText, setReplyText] = useState("");

  const handleReply = async () => {
    if (!replyText.trim() || !comment.post?._id) return;

    try {
      await commentService.reply(comment.post._id, replyText, comment._id);
      toast.success("Reply posted");
      setReplyText("");
      onRefresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to post reply");
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-4">
        <ImagePreview
          src={comment.post?.coverImageUrl}
          alt="Cover"
          wrapperClassName="rounded-md"
          className="w-16 h-12 object-cover shadow-sm border border-white"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-800 truncate">
            {comment.post?.title}
          </h3>
          <a
            href={`/${comment.post?.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-0.5"
          >
            View Post <LuExternalLink className="size-3" />
          </a>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <div className="flex gap-4">
          <ImagePreview
            src={comment.author?.profileImageUrl || avatar}
            alt={comment.author?.name}
            overlayClassName="size-12"
            wrapperClassName="rounded-full"
            className="size-12 ring-4 ring-slate-50 object-cover"
          />
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-800">
                  {comment.author?.name}
                </h4>
                <span className="text-xs text-slate-400">
                  Commented on{" "}
                  {moment(comment.createdAt).format("MMMM Do YYYY, h:mm a")}
                </span>
              </div>
              <button
                onClick={() => onDelete(comment._id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                title="Delete Thread"
              >
                <LuTrash2 className="size-4" />
              </button>
            </div>

            <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-line">
              {comment.content}
            </p>
          </div>
        </div>

        {comment.replies && comment.replies.length > 0 && (
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider font-semibold text-slate-400">
              <span className="bg-white px-3 flex items-center gap-2">
                <LuMessageSquare className="size-3" />
                {comment.replies.length} Replies
              </span>
            </div>
          </div>
        )}

        <div className="space-y-6 pl-8 md:pl-16">
          {comment.replies?.map((reply) => (
            <div key={reply._id} className="group flex gap-3">
              <ImagePreview
                src={reply.author?.profileImageUrl || avatar}
                overlayClassName="size-8"
                wrapperClassName="rounded-full"
                className="size-8 ring-4 ring-slate-50 object-cover"
              />
              <div className="flex-1 bg-slate-50 p-3 rounded-tr-xl rounded-br-lx rounded-bl-xl rounded-tl-sm">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="text-sm font-semibold text-slate-700">
                    {reply.author?.name}
                  </h5>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">
                      {moment(reply.createdAt).fromNow()}
                    </span>
                    <button
                      onClick={() => onDelete(reply._id)}
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity"
                    >
                      <LuTrash2 className="size-3" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-600">{reply.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white border-t border-slate-100 z-10">
        <CommentReplyInput
          user={user}
          authorName={comment.author?.name || "Unknown"}
          content={comment.content}
          replyText={replyText}
          setReplyText={setReplyText}
          addReply={handleReply}
          handleCancelReply={() => setReplyText("")}
          type="new"
        />
      </div>
    </div>
  );
};

export default CommentThreadView;

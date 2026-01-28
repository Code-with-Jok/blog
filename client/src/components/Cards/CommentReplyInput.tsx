import type { User } from "@/types/api";
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
import Input from "../Inputs";
import { cn } from "@/utils";
import {
  LuLoaderCircle,
  LuReply,
  LuSend,
  LuWandSparkles,
} from "react-icons/lu";
import ImagePreview from "../ImagePreview";

interface CommentReplyInputProps {
  user: User | null;
  authorName: string;
  content: string;
  replyText: string;
  setReplyText: (text: string) => void;
  addReply: () => void;
  handleCancelReply: () => void;
  disableAutGen?: boolean;
  type: "reply" | "new";
}

const CommentReplyInput = ({
  user,
  authorName,
  content,
  replyText,
  setReplyText,
  addReply,
  handleCancelReply,
  disableAutGen,
  type = "reply",
}: CommentReplyInputProps) => {
  const [loading, setLoading] = useState(false);

  // Generate AI Reply
  const generateAIReply = async () => {
    try {
      setLoading(true);
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_COMMENT_REPLY,
        {
          author: { name: authorName },
          content,
        }
      );

      const generatedReply = aiResponse.data;

      if (generatedReply?.content?.length > 0) {
        setReplyText(generatedReply.content);
      }
    } catch (error) {
      console.log("Error generating AI reply:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-lg animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-start gap-3">
        <ImagePreview
          src={user?.profileImageUrl}
          alt={user?.name}
          overlayClassName="size-8"
          wrapperClassName="rounded-full"
          className="size-8 ring-2 ring-white"
        />

        <div className="flex-1 space-y-3">
          <Input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            label={type === "new" ? authorName : `Reply to @${authorName}`}
            placeholder={
              type === "new" ? "Write a comment..." : "Write your reply..."
            }
            type="text"
          />

          <div className="flex items-center justify-between">
            {!disableAutGen ? (
              <button
                className="flex items-center gap-1.5 text-xs font-medium text-purple-600 hover:text-purple-700 hover:underline disabled:opacity-50"
                onClick={generateAIReply}
                disabled={loading}
              >
                {loading ? (
                  <LuLoaderCircle className="animate-spin size-3" />
                ) : (
                  <LuWandSparkles className="size-3" />
                )}
                {loading ? "Generating..." : "Generate with AI"}
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                className="text-xs font-medium text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-md hover:bg-slate-200 transition-colors"
                disabled={loading}
                onClick={handleCancelReply}
              >
                Cancel
              </button>

              <button
                className={cn(
                  "flex items-center gap-1.5 text-xs font-medium text-white px-4 py-1.5 rounded-full transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:active:scale-100",
                  type === "new"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-sky-500 hover:bg-sky-600"
                )}
                disabled={replyText.trim().length === 0 || loading}
                onClick={addReply}
              >
                {type === "new" ? (
                  <LuSend className="size-3" />
                ) : (
                  <LuReply className="size-3" />
                )}
                {type === "new" ? "Post Comment" : "Reply"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentReplyInput;

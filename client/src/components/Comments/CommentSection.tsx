import { useState } from "react";
import { useUserContext } from "@/context/UserContextDefinition";
import CommentReplyInput from "@/components/Cards/CommentReplyInput";
import CommentInfoCard from "@/components/Cards/CommentInfoCard";
import Modal from "@/components/Modal";
import DeleteAlertContent from "@/components/DeleteAlertContent";
import type { Comment } from "@/services/commentService";

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onAddComment: (content: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
  onReplyComment: (content: string, parentCommentId: string) => Promise<void>;
  refreshComments: () => void;
}

const CommentSection = ({
  postId,
  comments,
  onAddComment,
  onDeleteComment,
  onReplyComment,
  refreshComments,
}: CommentSectionProps) => {
  const { user, setOpenAuthForm } = useUserContext();
  const [replyText, setReplyText] = useState("");
  const [openDeleteAlert, setOpenDeleteAlert] = useState<{
    open: boolean;
    data: string | null;
  }>({
    open: false,
    data: null,
  });

  const handleAddSubmit = async () => {
    if (!replyText.trim()) return;
    await onAddComment(replyText);
    setReplyText("");
  };

  const confirmDelete = async () => {
    if (openDeleteAlert.data) {
      await onDeleteComment(openDeleteAlert.data);
      setOpenDeleteAlert({ open: false, data: null });
    }
  };

  return (
    <div className="mt-10 pt-10 border bg-white shadow-2xl rounded-xl p-5 border-gray-100 flex flex-col justify-between">
      <h3 className="text-2xl font-bold text-gray-900">
        Comments ({comments.length})
      </h3>

      <div className="mb-8">
        <CommentReplyInput
          user={user}
          authorName={user?.name ?? ""}
          content=""
          replyText={replyText}
          setReplyText={setReplyText}
          handleCancelReply={() => setReplyText("")}
          disableAutGen
          addReply={() => {
            if (!user) {
              setOpenAuthForm(true);
              return;
            }
            handleAddSubmit();
          }}
          onAuthNeeded={() => setOpenAuthForm(true)}
          type="new"
        />
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentInfoCard
            key={comment._id}
            isDelete={user?.role === "admin"}
            commentId={comment._id}
            postId={postId}
            authorName={comment.author?.name ?? ""}
            authorPhoto={comment.author?.profileImageUrl ?? ""}
            content={comment.content ?? ""}
            updateOn={
              comment.updatedAt
                ? new Date(comment.updatedAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "-"
            }
            post={comment.post}
            replies={comment.replies ?? []}
            getAllComments={refreshComments}
            onDelete={(id) => setOpenDeleteAlert({ open: true, data: id })}
            onReply={onReplyComment}
          />
        ))}
      </div>

      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Comment"
      >
        <DeleteAlertContent
          onDelete={confirmDelete}
          content="Are you sure you want to delete this comment? This action cannot be undone"
        />
      </Modal>
    </div>
  );
};

export default CommentSection;

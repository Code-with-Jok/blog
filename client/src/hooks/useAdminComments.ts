import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { commentService, type Comment } from "@/services/commentService";

interface UseAdminCommentsReturn {
  comments: Comment[];
  loading: boolean;
  selectedCommentId: string | null;
  setSelectedCommentId: (id: string | null) => void;
  getAllComments: () => Promise<void>;
  refreshComments: () => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
}

export const useAdminComments = (): UseAdminCommentsReturn => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null
  );

  const getAllComments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await commentService.getAll();
      setComments(data);
      // Auto-select first comment if none selected and data exists
      if (data.length > 0 && !selectedCommentId) {
        setSelectedCommentId(data[0]._id);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  }, [selectedCommentId]);

  // Helper just to refresh layout or selection if necessary
  const refreshComments = async () => {
    try {
      const data = await commentService.getAll();
      setComments(data);
    } catch (error) {
      console.error("Silent refresh failed", error);
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await commentService.delete(commentId);
      toast.success("Comment deleted successfully");

      // If deleted comment was selected, deselect or select next logic is handled by re-render/fetch usually but here manual:
      if (selectedCommentId === commentId) {
        setSelectedCommentId(null);
      }

      await getAllComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment");
    }
  };

  useEffect(() => {
    getAllComments();
  }, [getAllComments]);

  return {
    comments,
    loading,
    selectedCommentId,
    setSelectedCommentId,
    getAllComments,
    refreshComments,
    deleteComment,
  };
};

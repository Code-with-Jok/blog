import { useState, useCallback } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { commentService, type Comment } from "@/services/commentService";
import toast from "react-hot-toast";

interface UseCommentsReturn {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  fetchComments: (postId: string) => Promise<void>;
  addComment: (postId: string, content: string) => Promise<void>;
  deleteComment: (commentId: string, postId: string) => Promise<void>;
  replyToComment: (
    postId: string,
    content: string,
    parentCommentId: string
  ) => Promise<void>;
}

export const useComments = (): UseCommentsReturn => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async (postId: string) => {
    if (!postId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        API_PATHS.COMMENTS.GET_ALL_BY_POST(postId)
      );
      if (response.data) {
        // Sort by newest first
        const sortedComments = response.data.sort(
          (a: Comment, b: Comment) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setComments(sortedComments);
      }
    } catch (err) {
      setError("Failed to fetch comments");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addComment = useCallback(
    async (postId: string, content: string) => {
      try {
        await axiosInstance.post(API_PATHS.COMMENTS.CREATE(postId), {
          content,
        });
        toast.success("Comment added successfully");
        await fetchComments(postId);
      } catch (err) {
        console.error(err);
        toast.error("Failed to add comment");
        throw err;
      }
    },
    [fetchComments]
  );

  const deleteComment = useCallback(
    async (commentId: string, postId: string) => {
      try {
        await commentService.delete(commentId);
        toast.success("Comment deleted successfully");
        await fetchComments(postId);
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete comment");
        throw err;
      }
    },
    [fetchComments]
  );

  const replyToComment = useCallback(
    async (postId: string, content: string, parentCommentId: string) => {
      try {
        await commentService.reply(postId, content, parentCommentId);
        toast.success("Reply posted successfully");
        await fetchComments(postId);
      } catch (err) {
        console.error(err);
        toast.error("Failed to add reply");
        throw err;
      }
    },
    [fetchComments]
  );

  return {
    comments,
    loading,
    error,
    fetchComments,
    addComment,
    deleteComment,
    replyToComment,
  };
};

import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";

export interface Comment {
  _id: string;
  content: string;
  author: {
    _id: string;
    name: string;
    profileImageUrl: string;
  };
  post: {
    _id: string;
    title: string;
    slug: string;
    coverImageUrl: string;
  };
  replies?: Comment[];
  updatedAt: string;
  createdAt: string;
}

export const commentService = {
  getAll: async (): Promise<Comment[]> => {
    const response = await axiosInstance.get(API_PATHS.COMMENTS.GET_ALL);
    return response.data || [];
  },

  delete: async (commentId: string): Promise<void> => {
    await axiosInstance.delete(API_PATHS.COMMENTS.DELETE(commentId));
  },

  reply: async (
    postId: string,
    content: string,
    parentCommentId: string
  ): Promise<Comment> => {
    const response = await axiosInstance.post(
      API_PATHS.COMMENTS.CREATE(postId),
      {
        content,
        parentComment: parentCommentId,
      }
    );
    return response.data;
  },
};

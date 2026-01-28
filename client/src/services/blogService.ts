import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";

export interface CreatePostPayload {
  title: string;
  content: string;
  coverImageUrl: string;
  tags: string[];
  isDraft: boolean;
  generatedByAI: boolean;
}

export const blogService = {
  createPost: async (payload: CreatePostPayload) => {
    const response = await axiosInstance.post(API_PATHS.POSTS.CREATE, payload);
    return response.data;
  },

  updatePost: async (id: string, payload: CreatePostPayload) => {
    const response = await axiosInstance.put(
      API_PATHS.POSTS.UPDATE(id),
      payload
    );
    return response.data;
  },

  getPostBySlug: async (slug: string) => {
    const response = await axiosInstance.get(API_PATHS.POSTS.GET_BY_SLUG(slug));
    return response.data;
  },

  deletePost: async (id: string) => {
    const response = await axiosInstance.delete(API_PATHS.POSTS.DELETE(id));
    return response.data;
  },
};

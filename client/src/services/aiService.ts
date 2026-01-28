import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";

export interface AIResponse<T> {
  content: T;
}

export interface BlogPostIdea {
  title: string;
  summary: string;
  tags: string[];
  tone: string;
}

export interface GeneratedBlogPost {
  title: string;
  content: string;
}

export const aiService = {
  generateIdeas: async (topics: string): Promise<BlogPostIdea[]> => {
    const response = await axiosInstance.post(
      API_PATHS.AI.GENERATE_BLOG_POST_IDEAS,
      { topics }
    );
    return response.data.content;
  },

  generateBlogPost: async (
    title: string,
    tone: string
  ): Promise<GeneratedBlogPost> => {
    const response = await axiosInstance.post(API_PATHS.AI.GENERATE_BLOG_POST, {
      title,
      tone,
    });
    return response.data.content;
  },
};

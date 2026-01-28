export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/v1/auth/register", // Signup
    LOGIN: "/api/v1/auth/login", // Authenticate user & return JWT token
    GET_PROFILE: "/api/v1/auth/profile", // Get logged-in user details
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image", // Upload profile picture
  },

  DASHBOARD: {
    GET_DASHBOARD_DATA: "/api/v1/dashboard", // Get Dashboard Data
  },

  AI: {
    GENERATE_BLOG_POST: "/api/v1/ai/generate", // Generate a blog post using AI
    GENERATE_BLOG_POST_IDEAS: "/api/v1/ai/generate-ideas", // Generate blog post ideas using AI
    GENERATE_COMMENT_REPLY: "/api/v1/ai/generate-reply", // Generate a reply using AI
    GENERATE_POST_SUMMARY: "/api/v1/ai/generate-summary", // Generate post summary using AI
  },

  POSTS: {
    CREATE: "/api/v1/posts", // Create a new blog post (Admin only)
    GET_ALL: "/api/v1/posts", // Get all published blog posts
    GET_TRENDING_POSTS: "/api/v1/posts/trending", // Get trending blog posts
    GET_BY_SLUG: (slug: string) => `/api/v1/posts/slug/${slug}`, // Get a single blog post by slug
    UPDATE: (id: string) => `/api/v1/posts/${id}`, // Update a blog post
    DELETE: (id: string) => `/api/v1/posts/${id}`, // Delete a blog post
    GET_BY_TAG: (tag: string) => `/api/v1/posts/tag/${tag}`, // Get posts by a specific tag
    SEARCH: "/api/v1/posts/search", // Search posts by title or content
    INCREMENT_VIEW: (id: string) => `/api/v1/posts/${id}/view`, // Increment view count of a blog post
    LIKE: (id: string) => `/api/v1/posts/${id}/like`, // Like a blog post
  },
  COMMENTS: {
    CREATE: (id: string) => `/api/v1/comments/${id}`, // Create a comment on a blog post
    GET_ALL: "/api/v1/comments", // Get all comments
    GET_ALL_BY_POST: (id: string) => `/api/v1/comments/${id}`, // Get all comments on a blog post
    DELETE: (id: string) => `/api/v1/comments/${id}`, // Delete a comment on a blog post
  },
};

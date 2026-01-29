export interface User {
  _id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
  bio?: string;
  role: "admin" | "member";
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse extends User {
  token: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  coverImageUrl?: string;
  tags: string[];
  author: User; // Populated
  isDraft: boolean;
  views: number;
  likes: number;
  generatedByAI: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  post: BlogPost | string;
  author: User; // Populated
  content: string;
  parentComment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalPosts: number;
  draftPosts: number;
  publishedPosts: number;
  aiGeneratedPosts: number;
  totalComments: number;
  totalViews: number;
  totalLikes: number;
}

export interface TagUsage {
  tag: string;
  count: number;
}

export interface DashboardSummary {
  status: DashboardStats;
  topPosts: BlogPost[];
  recentComments: Comment[];
  tagUsage: TagUsage[];
}

export interface PaginatedResponse<T> {
  posts: T[];
  page: number;
  totalPages: number;
  totalCount: number;
  counts: {
    all: number;
    draft: number;
    published: number;
  };
}

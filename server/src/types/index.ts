export interface User {
  name: string
  email: string
  password: string
  bio: string
  role: 'admin' | 'member'
  profileImageUrl?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface BlogPost {
  title: string
  slug: string
  content: string
  coverImageUrl?: string | null
  tags?: string[]
  author: string
  isDraft?: boolean
  generatedByAI?: boolean
  createdAt: Date
  updatedAt: Date
}

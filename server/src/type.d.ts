import { Document } from 'mongoose'

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: Document<
        unknown,
        {},
        {
          name: string
          email: string
          password: string
          bio: string
          role: 'admin' | 'member'
          profileImageUrl?: string | null
          createdAt: Date
          updatedAt: Date
        }
      >
    }
  }
}

export {}

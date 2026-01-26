import { Document } from 'mongoose'

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: HydratedDocument<User>
    }
  }
}

export {}

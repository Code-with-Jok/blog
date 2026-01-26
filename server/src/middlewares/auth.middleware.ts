import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import User from '@/models/User'

interface IJwtPayload extends JwtPayload {
  id: string
}

// auth middleware
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.startsWith('Bearer') && authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Token is required' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? '') as IJwtPayload
    const user = await User.findById(decoded.id).select('-password')

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

// admin-only middleware
export const adminOnlyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    return next()
  }
  return res.status(403).json({ message: 'Admin access only' })
}

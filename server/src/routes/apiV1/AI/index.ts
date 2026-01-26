import { authMiddleware } from '@/middlewares/auth.middleware'
import {
  generateBlogPost,
  generateBlogPostIdeas,
  generateBlogPostReply,
  generateBlogPostSummary
} from '@/controllers/ai.controller'
import express from 'express'

const router = express.Router()

router.post('/generate', authMiddleware, generateBlogPost)
router.post('/generate-ideas', authMiddleware, generateBlogPostIdeas)
router.post('/generate-reply', authMiddleware, generateBlogPostReply)
router.post('/generate-summary', generateBlogPostSummary)

export const aiRoutes = router

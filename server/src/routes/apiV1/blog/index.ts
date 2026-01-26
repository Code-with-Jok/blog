import express from 'express'
import { adminOnlyMiddleware, authMiddleware } from '@/middlewares/auth.middleware'
import {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogPostByTag,
  getBlogPostBySearch,
  incrementBlogPostView,
  likeBlogPost,
  getTrendingBlogPosts
} from '@/controllers/blog.controller'

const router = express.Router()

router.route('/').post(authMiddleware, adminOnlyMiddleware, createBlogPost).get(getAllBlogPosts)

router
  .route('/:id')
  .put(authMiddleware, adminOnlyMiddleware, updateBlogPost)
  .delete(authMiddleware, adminOnlyMiddleware, deleteBlogPost)

router.get('/slug/:slug', getBlogPostBySlug)
router.get('/tag/:tag', getBlogPostByTag)
router.get('/search', getBlogPostBySearch)
router.post('/:id/view', incrementBlogPostView)
router.post('/:id/like', authMiddleware, likeBlogPost)
router.get('/trending', getTrendingBlogPosts)

export const blogPostRoutes = router

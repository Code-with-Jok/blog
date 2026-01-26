import { addCommentToPost, deleteComment, getAllComments, getCommentsByPostId } from '@/controllers/comment.controller'
import { authMiddleware } from '@/middlewares/auth.middleware'
import express from 'express'

const router = express.Router()

router.route('/:postId').post(authMiddleware, addCommentToPost).get(getCommentsByPostId)

router.route('/').get(getAllComments)
router.route('/:commentId').delete(authMiddleware, deleteComment)
export const commentRoutes = router

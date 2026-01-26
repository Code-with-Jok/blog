import express from 'express'
import { authRoutes } from './auth'
import { blogPostRoutes } from './blog'
import { commentRoutes } from './comment'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/posts', blogPostRoutes)
router.use('/comments', commentRoutes)

export const apiV1 = router

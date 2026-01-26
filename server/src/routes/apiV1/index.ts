import express from 'express'
import { authRoutes } from './auth'
import { blogPostRoutes } from './blog'
import { commentRoutes } from './comment'
import { dashboardRoutes } from './dashboard'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/posts', blogPostRoutes)
router.use('/comments', commentRoutes)
router.use('/dashboard', dashboardRoutes)

export const apiV1 = router

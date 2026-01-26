import express from 'express'
import { authRoutes } from './auth'
import { blogPostRoutes } from './blog'
import { commentRoutes } from './comment'
import { dashboardRoutes } from './dashboard'
import { aiRoutes } from './AI'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/posts', blogPostRoutes)
router.use('/comments', commentRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/ai', aiRoutes)

export const apiV1 = router

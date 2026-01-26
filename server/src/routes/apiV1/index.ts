import express from 'express'
import { authRoutes } from './auth'
import { blogPostRoutes } from './blog'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/posts', blogPostRoutes)

export const apiV1 = router

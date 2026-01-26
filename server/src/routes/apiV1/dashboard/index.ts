import express from 'express'
import { adminOnlyMiddleware, authMiddleware } from '@/middlewares/auth.middleware'
import { getDashboardSummary } from '@/controllers/dashboard.controller'

const router = express.Router()

router.get('/', authMiddleware, adminOnlyMiddleware, getDashboardSummary)

export const dashboardRoutes = router

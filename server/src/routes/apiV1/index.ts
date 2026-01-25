import express from 'express'
import { authRouter } from './auth'

const route = express.Router()

route.use('/auth', authRouter)

export const apiV1 = route

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import path from 'path'

import connectDB from '@/config/db'
import { apiV1 } from './routes/apiV1'

const app = express()

connectDB()
  .then(() => {
    startSever()
  })
  .catch((err) => {
    console.log(err)
  })

const startSever = async () => {
  // Trust proxy for secure cookies and protocol detection (Render/Heroku/Vercel)
  app.set('trust proxy', 1)

  // middleware to handle Cors
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  )

  // middleware to handle json
  app.use(express.json())

  // uploads folder
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'), {}))

  // routes
  app.use('/api/v1', apiV1)

  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
  })
}

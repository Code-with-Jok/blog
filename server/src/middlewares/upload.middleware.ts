import multer, { FileFilterCallback } from 'multer'
import { Request } from 'express'
import fs from 'fs'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/'
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp']
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Only .jpeg, .png, .jpg, .gif, .webp files are allowed'))
  }
}

export const upload = multer({
  storage,
  fileFilter
})

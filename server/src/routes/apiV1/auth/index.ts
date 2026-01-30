import express from 'express'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { getUserProfile, loginUser, registerUser } from '@/controllers/auth.controller'
import { upload } from '@/middlewares/upload.middleware'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', authMiddleware, getUserProfile)

// @desc upload image
// @route POST /api/v1/auth/upload-image
// @access Private
// @access Private
router.post(
  '/upload-image',
  (req, res, next) => {
    upload.single('image')(req, res, (err) => {
      if (err) {
        console.error('Multer Upload Error:', err)
        return res.status(500).json({ message: 'Image upload failed', error: err.message || err })
      }
      next()
    })
  },
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        message: 'No file uploaded'
      })
    }

    // When using Cloudinary storage, `req.file.path` contains the public URL
    const imageUrl = req.file.path

    res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl
    })
  }
)

export const authRoutes = router

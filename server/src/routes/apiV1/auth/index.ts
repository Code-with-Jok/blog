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
router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: 'No file uploaded'
    })
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`

  res.status(200).json({
    message: 'Image uploaded successfully',
    imageUrl
  })
})

export const authRoutes = router

import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

// Generate JWT token
export const generateToken = (userId: string) => {
  const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'
  const JWT_SECRET = process.env.JWT_SECRET || ''
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions)
}

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, profileImageUrl, bio, adminAccessToken } = req.body

    const userExist = await User.findOne({ email })

    if (userExist) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Determine user role:
    // if adminAccessToken is provided and matches the secret, user is admin, otherwise user is regular user

    let role = 'member'

    if (adminAccessToken && adminAccessToken === process.env.ADMIN_ACCESS_TOKEN) {
      role = 'admin'
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
      bio,
      role
    })

    const token = generateToken(user._id.toString())

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      bio: user.bio,
      role,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to register user' })
  }
}

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    const token = generateToken(user._id.toString())

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      bio: user.bio,
      role: user.role,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to login user' })
  }
}

// @desc    Get user profile
// @route   GET /api/v1/auth/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?._id).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to get user profile' })
  }
}

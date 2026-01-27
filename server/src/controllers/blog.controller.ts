import { Request, Response } from 'express'
import BlogPost from '@/models/BlogPost'
import { populate } from 'dotenv'

// @desc Create a new blog post
// @route POST /api/v1/posts
// @access Private (Admin only)
export const createBlogPost = async (req: Request, res: Response) => {
  try {
    const { title, content, coverImageUrl, tags, isDraft, generatedByAI } = req.body

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' })
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    const newBlogPost = await BlogPost.create({
      title,
      slug,
      content,
      coverImageUrl,
      tags,
      author: req.user?._id,
      isDraft,
      generatedByAI
    })

    res.status(201).json(newBlogPost)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to create blog post' })
  }
}

// @desc Update a blog post
// @route PUT /api/v1/posts/:id
// @access Private (Author or Admin)
export const updateBlogPost = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' })
    }

    if (post.author.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to update this blog post' })
    }

    const { title, content, coverImageUrl, tags, isDraft, generatedByAI } = req.body

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' })
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      {
        title,
        slug,
        content,
        coverImageUrl,
        tags,
        isDraft,
        generatedByAI
      },
      { new: true }
    )

    if (!updatedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' })
    }

    res.status(200).json(updatedBlogPost)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to update blog post' })
  }
}

// @desc Delete a blog post
// @route DELETE /api/v1/posts/:id
// @access Private (Author or Admin)
export const deleteBlogPost = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id)

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' })
    }

    res.status(200).json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to delete blog post' })
  }
}

// @desc Get all blog posts by status (all, published, draft) and include counts
// @route GET /api/v1/posts?status=all|published|draft&page=1
// @access Public
export const getAllBlogPosts = async (req: Request, res: Response) => {
  try {
    const status = req.query.status || 'published'
    const page = parseInt(req.query.page as string) || 1
    const limit = 10
    const skip = (page - 1) * limit

    // Determin filter for main posts query
    let filter = {}
    if (status === 'published') {
      filter = { isDraft: false }
    } else if (status === 'draft') {
      filter = { isDraft: true }
    }

    // Fetch paginated posts
    const posts = await BlogPost.find(filter)
      .populate('author', 'name profileImageUrl')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    // Get counts for pagination
    const [totalCount, allCount, draftCount, publishedCount] = await Promise.all([
      BlogPost.countDocuments(filter),
      BlogPost.countDocuments(),
      BlogPost.countDocuments({ isDraft: true }),
      BlogPost.countDocuments({ isDraft: false })
    ])

    res.status(200).json({
      posts,
      page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      counts: {
        all: allCount,
        draft: draftCount,
        published: publishedCount
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to get blog posts' })
  }
}

// @desc Get blog post by slug
// @route GET /api/v1/posts/slug/:slug
// @access Public
export const getBlogPostBySlug = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug }).populate('author', 'name profileImageUrl')
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' })
    }
    res.status(200).json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to get blog post' })
  }
}

// @desc Get blog post by tag
// @route GET /api/v1/posts/tag/:tag
// @access Public
export const getBlogPostByTag = async (req: Request, res: Response) => {
  try {
    const tag = req.params.tag
    const posts = await BlogPost.find({
      tags: tag,
      isDraft: false
    }).populate('author', 'name profileImageUrl')
    res.status(200).json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to get blog posts' })
  }
}

// @desc Get blog post by search
// @route GET /api/v1/posts/search?q=keyword
// @access Public
export const getBlogPostBySearch = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string

    const posts = await BlogPost.find({
      isDraft: false,
      $or: [{ title: { $regex: query, $options: 'i' } }, { content: { $regex: query, $options: 'i' } }]
    }).populate('author', 'name profileImageUrl')
    res.status(200).json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to get blog posts' })
  }
}

// @desc Increment blog post view
// @route GET /api/v1/posts/:id/view
// @access Public
export const incrementBlogPostView = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } })
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' })
    }
    res.status(200).json({ message: 'Blog post view incremented successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to increment blog post view' })
  }
}

// @desc Like a blog post
// @route GET /api/v1/posts/:id/like
// @access Public
export const likeBlogPost = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } })
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' })
    }
    res.status(200).json({ message: 'Blog post liked successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to like blog post' })
  }
}

// @desc Get trending blog posts
// @route GET /api/v1/posts/trending
// @access Public
export const getTrendingBlogPosts = async (req: Request, res: Response) => {
  try {
    const posts = await BlogPost.find({ isDraft: false }).sort({ views: -1, likes: -1 }).limit(10)
    res.status(200).json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to get trending blog posts' })
  }
}

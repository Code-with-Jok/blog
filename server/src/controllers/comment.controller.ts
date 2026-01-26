import BlogPost from '@/models/BlogPost'
import Comment from '@/models/Comment'
import { Request, Response } from 'express'

// @desc Add a comment to a blog post
// @route POST /api/v1/comments/:postId
// @access Private (User)
export const addCommentToPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params
    const { content, parentComment } = req.body

    // Ensure the blog post exists
    const blogPost = await BlogPost.findById(postId)
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' })
    }

    const comment = await Comment.create({
      post: postId,
      author: req.user?._id,
      content,
      parentComment
    })

    await comment.populate('author', 'name profileImageUrl')

    return res.status(201).json(comment)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Failed to add comment' })
  }
}

// @desc Get all comments with nested replies
// @route GET /api/v1/comments
// @access Public
interface IComment {
  _id: string
  post: any
  author: {
    _id: string
    name: string
    profileImageUrl: string
  }
  content: string
  parentComment: string | null
  createdAt: Date
  updatedAt: Date
}

interface INestedComment extends IComment {
  replies: INestedComment[]
}

// @desc Get all comments with nested replies
// @route GET /api/v1/comments
// @access Public
export const getAllComments = async (req: Request, res: Response) => {
  try {
    // Fetch all comments with author populated using .lean() for performance
    const comments = (await Comment.find()
      .populate('author', 'name profileImageUrl')
      .populate('post', 'title converImageUrl')
      .sort({ createdAt: 1 })
      .lean()) as any[]

    const commentMap: Record<string, INestedComment> = {}
    const nestedComments: INestedComment[] = []

    // Initialize the comment map with replies array
    comments.forEach((comment) => {
      commentMap[comment._id.toString()] = { ...comment, replies: [] }
    })

    // Build the nested structure
    comments.forEach((comment) => {
      const commentWithReplies = commentMap[comment._id.toString()]
      if (comment.parentComment) {
        const parent = commentMap[comment.parentComment.toString()]
        if (parent) {
          parent.replies.push(commentWithReplies)
        } else {
          nestedComments.push(commentWithReplies)
        }
      } else {
        nestedComments.push(commentWithReplies)
      }
    })

    return res.status(200).json(nestedComments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return res.status(500).json({ message: 'Failed to get comments' })
  }
}

// @desc Get comments by post ID with nested replies
// @route GET /api/v1/comments/:postId
// @access Public
export const getCommentsByPostId = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params
    const comments = (await Comment.find({ post: postId })
      .populate('author', 'name profileImageUrl')
      .populate('post', 'title converImageUrl')
      .sort({ createdAt: 1 })
      .lean()) as any[]

    const commentMap: Record<string, INestedComment> = {}
    const nestedComments: INestedComment[] = []

    // Initialize the comment map with replies array
    comments.forEach((comment) => {
      commentMap[comment._id.toString()] = { ...comment, replies: [] }
    })

    // Build the nested structure
    comments.forEach((comment) => {
      const commentWithReplies = commentMap[comment._id.toString()]
      if (comment.parentComment) {
        const parent = commentMap[comment.parentComment.toString()]
        if (parent) {
          parent.replies.push(commentWithReplies)
        } else {
          nestedComments.push(commentWithReplies)
        }
      } else {
        nestedComments.push(commentWithReplies)
      }
    })
    return res.status(200).json(nestedComments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return res.status(500).json({ message: 'Failed to get comments' })
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params
    const comment = await Comment.findById(commentId)

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }

    // Delete the comment
    await Comment.deleteOne({ _id: commentId })

    // Delete the replies
    await Comment.deleteMany({ parentComment: commentId })

    return res.status(200).json({ message: 'Comment deleted successfully' })
  } catch (error) {
    console.error('Error deleting comment:', error)
    return res.status(500).json({ message: 'Failed to delete comment' })
  }
}

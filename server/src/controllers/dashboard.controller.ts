import BlogPost from '@/models/BlogPost'
import Comment from '@/models/Comment'
import { Request, Response } from 'express'

// @desc    Get dashboard summary
// @route   GET /api/v1/dashboard/summary
// @access  Private
export const getDashboardSummary = async (req: Request, res: Response) => {
  try {
    const [totalPosts, draftPosts, publishedPosts, aiGeneratedPosts, totalComments] = await Promise.all([
      BlogPost.countDocuments(),
      BlogPost.countDocuments({ isDraft: true }),
      BlogPost.countDocuments({ isDraft: false }),
      BlogPost.countDocuments({ generatedByAI: true }),
      Comment.countDocuments()
    ])

    const totalViewsAgg = await BlogPost.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$views' }
        }
      }
    ])

    const totalLikesAgg = await BlogPost.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$likes' }
        }
      }
    ])

    const totalViews = totalViewsAgg[0]?.total || 0
    const totalLikes = totalLikesAgg[0]?.total || 0

    // top 5 posts by views
    const topPosts = await BlogPost.find({ isDraft: false })
      .select('title author coverImageUrl views likes comments')
      .sort({ views: -1 })
      .limit(5)

    // Recent 5 comments
    const recentComments = await Comment.find()
      .populate('author', 'name profileImageUrl')
      .populate('post', 'title coverImageUrl')
      .sort({ createdAt: -1 })
      .limit(5)

    // top 5 tags by usage
    const tagUsage = await BlogPost.aggregate([
      {
        $unwind: '$tags'
      },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          tag: '$_id',
          count: 1,
          _id: 0
        }
      },
      { $sort: { count: -1 } }
    ])

    res.status(200).json({
      status: {
        totalPosts,
        draftPosts,
        publishedPosts,
        aiGeneratedPosts,
        totalComments,
        totalViews,
        totalLikes
      },
      topPosts,
      recentComments,
      tagUsage
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Failed to fetch dashboard summary' })
  }
}

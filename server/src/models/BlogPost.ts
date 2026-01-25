import mongoose from 'mongoose'

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    content: {
      type: String,
      required: true
    },
    convertImageUrl: {
      type: String,
      default: null
    },
    tags: [
      {
        type: String
      }
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isDraft: {
      type: Boolean,
      default: false
    },
    views: {
      type: Number,
      default: 0
    },
    generatedByAI: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

const BlogPost = mongoose.model('BlogPost', blogPostSchema)

export default BlogPost

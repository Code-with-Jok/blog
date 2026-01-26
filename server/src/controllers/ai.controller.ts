import { blogPostIdeasPrompt, blogSummaryPrompt, generateBlogPostPrompt, generateReplyPrompt } from '@/utils/prompts'
import { GoogleGenAI } from '@google/genai'
import { Request, Response } from 'express'

// @desc Generate blog post
// @route POST /api/v1/ai/generate
// @access Private
export const generateBlogPost = async (req: Request, res: Response) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY || ''
    })
    const { title, tone } = req.body
    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: generateBlogPostPrompt(title, tone),
      config: {
        responseMimeType: 'application/json'
      }
    })

    const text = response.text
    if (!text) {
      return res.status(500).json({ message: 'Failed to generate blog post' })
    }

    const data = JSON.parse(text)

    res.status(200).json({ content: data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Generate blog post failed' })
  }
}

// @desc Generate blog post ideas
// @route POST /api/v1/ai/generate-ideas
// @access Private
export const generateBlogPostIdeas = async (req: Request, res: Response) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY || ''
    })
    const { topics } = req.body
    if (!topics) {
      return res.status(400).json({ message: 'topics is required' })
    }
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: blogPostIdeasPrompt(topics),
      config: {
        responseMimeType: 'application/json'
      }
    })

    const text = response.text
    if (!text) {
      return res.status(500).json({ message: 'Failed to generate blog post ideas' })
    }

    const data = JSON.parse(text)

    res.status(200).json({ content: data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Generate blog post ideas failed' })
  }
}

// @desc Generate blog post reply
// @route POST /api/v1/ai/generate-reply
// @access Private
export const generateBlogPostReply = async (req: Request, res: Response) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY || ''
    })
    const { content, author } = req.body

    if (!content) {
      return res.status(400).json({ message: 'content is required' })
    }
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: generateReplyPrompt(content, author),
      config: {
        responseMimeType: 'application/json'
      }
    })

    const text = response.text
    if (!text) {
      return res.status(500).json({ message: 'Failed to generate blog post reply' })
    }

    const data = JSON.parse(text)

    res.status(200).json({ content: data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Generate blog post reply failed' })
  }
}

// @desc Generate blog post summary
// @route POST /api/v1/ai/generate-summary
// @access Private
export const generateBlogPostSummary = async (req: Request, res: Response) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY || ''
    })
    const { content } = req.body
    if (!content) {
      return res.status(400).json({ message: 'content is required' })
    }
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: blogSummaryPrompt(content),
      config: {
        responseMimeType: 'application/json'
      }
    })

    const text = response.text
    if (!text) {
      return res.status(500).json({ message: 'Failed to generate blog post summary' })
    }

    const data = JSON.parse(text)

    res.status(200).json({ content: data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Generate blog post summary failed' })
  }
}

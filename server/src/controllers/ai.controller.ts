import { blogPostIdeasPrompt, blogSummaryPrompt, generateBlogPostPrompt, generateReplyPrompt } from '@/utils/prompts'
import { GoogleGenAI } from '@google/genai'
import { Request, Response } from 'express'

// Helper to clean JSON string
const cleanJsonString = (str: string) => {
  if (!str) return ''

  // Function to extract the FIRST balanced JSON block
  const extractJSON = (text: string, startChar: '{' | '[', endChar: '}' | ']') => {
    const startIndex = text.indexOf(startChar)
    if (startIndex === -1) return null

    let balance = 0
    let inString = false
    let escape = false

    for (let i = startIndex; i < text.length; i++) {
      const char = text[i]
      if (escape) {
        escape = false
        continue
      }
      if (char === '\\') {
        escape = true
        continue
      }
      if (char === '"') {
        inString = !inString
        continue
      }
      if (!inString) {
        if (char === startChar) balance++
        else if (char === endChar) {
          balance--
          if (balance === 0) {
            return text.substring(startIndex, i + 1)
          }
        }
      }
    }
    return null
  }

  // Try extracting array or object, depending on which comes first
  const firstBrace = str.indexOf('{')
  const firstBracket = str.indexOf('[')

  // Determine if we should look for array or object first
  let json: string | null = null
  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    json = extractJSON(str, '{', '}')
  } else if (firstBracket !== -1) {
    json = extractJSON(str, '[', ']')
  }

  if (json) return json

  // Fallback cleanup if extraction fails (though the above should catch valid JSON)
  return str
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim()
}

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
      model: process.env.MODEL_AI || '',
      contents: generateBlogPostPrompt(title, tone),
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            title: { type: 'STRING' },
            slug: { type: 'STRING' },
            content: { type: 'STRING' },
            tags: { type: 'ARRAY', items: { type: 'STRING' } }
          },
          required: ['title', 'slug', 'content', 'tags']
        }
      }
    })

    const text = response.text
    if (!text) {
      return res.status(500).json({ message: 'Failed to generate blog post' })
    }

    // With responseSchema, the text is guaranteed to be valid JSON
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
      model: process.env.MODEL_AI || '',
      contents: blogPostIdeasPrompt(topics),
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'ARRAY',
          items: {
            type: 'OBJECT',
            properties: {
              title: { type: 'STRING' },
              tags: { type: 'ARRAY', items: { type: 'STRING' } },
              tone: { type: 'STRING' },
              summary: { type: 'STRING' }
            },
            required: ['title', 'tags', 'tone', 'summary']
          }
        }
      }
    })

    const text = response.text
    if (!text) {
      return res.status(500).json({ message: 'Failed to generate blog post ideas' })
    }

    const data = JSON.parse(text)

    res.status(200).json({ content: data })
  } catch (error: any) {
    console.error('Error generating blog post ideas:', error)

    if (error.status === 503 || error.message?.includes('overloaded')) {
      return res.status(503).json({ message: 'AI Service is currently overloaded. Please try again in a few moments.' })
    }

    if (error.status === 429) {
      return res.status(429).json({ message: 'Daily quota exceeded. Please try again later.' })
    }

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
      model: process.env.MODEL_AI || '',
      contents: generateReplyPrompt(content, author),
      config: {
        responseMimeType: 'application/json'
      }
    })

    const text = response.text
    if (!text) {
      return res.status(500).json({ message: 'Failed to generate blog post reply' })
    }

    let data
    try {
      data = JSON.parse(cleanJsonString(text))
    } catch (parseError) {
      console.error('JSON Parse Error in generateBlogPostReply:', parseError)
      console.log('Raw text:', text)
      return res.status(500).json({ message: 'Failed to parse AI response' })
    }

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
      model: process.env.MODEL_AI || '',
      contents: blogSummaryPrompt(content),
      config: {
        responseMimeType: 'application/json'
      }
    })

    const text = response.text
    if (!text) {
      return res.status(500).json({ message: 'Failed to generate blog post summary' })
    }

    let data
    try {
      data = JSON.parse(cleanJsonString(text))
    } catch (parseError) {
      console.error('JSON Parse Error in generateBlogPostSummary:', parseError)
      console.log('Raw text:', text)
      return res.status(500).json({ message: 'Failed to parse AI response' })
    }

    res.status(200).json({ content: data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Generate blog post summary failed' })
  }
}

/**
 * Prompt for generating blog post ideas.
 * Based on the topic provided, it returns 5 structured ideas.
 */
export const blogPostIdeasPrompt = (topics: string) => `
You are an expert content strategist. Given the topics "${topics}", generate 5 unique and engaging blog post ideas.
Each idea must include a title, 3-5 relevant tags, and a brief summary of the core message.
Return the result strictly as a JSON array of objects:
[
  {
    "title": "Target Title",
    "tags": ["tag1", "tag2"],
    "tone": "tone",
    "summary": "Short description of the post content."
  }
]
`

/**
 * Prompt for generating a reply to a comment.
 * Aims for a professional, helpful, and engaging tone.
 */
export const generateReplyPrompt = (comment: string, author: string) => `
You are a thoughtful blog author responding to a reader. 
The reader commented: "${comment}" from "${author}"
Write a polite, insightful, and concise response (max 2-3 sentences). 
If it's a question, answer it accurately. If it's feedback, express gratitude and add a small relevant insight.
Return only the text of the reply.
`

/**
 * Prompt for summarizing a blog post.
 * Useful for meta descriptions (SEO) and preview cards.
 */
export const blogSummaryPrompt = (blogContent: string) => `
As an expert editor, summarize the following blog content into a compelling and SEO-friendly snippet (max 150-160 characters).
Content: "${blogContent}"
Focus on the value proposition of the article.
Return only the summary text.
`

/**
 * Detailed prompt for generating a full blog post.
 * Maps directly to the BlogPost model fields: title, slug, content (Markdown), tags.
 */
export const fullBlogPostPrompt = (idea: string) => `
You are a professional content creator. Write a deep, well-researched, and high-quality blog post based on this idea: "${idea}".
The output must be a well-structured JSON object that fits the following data model:
- title: A compelling and SEO-optimized title.
- slug: A URL-friendly string (e.g., "how-to-build-apps").
- content: The full body of the post in Markdown. Use headers (H2, H3), bullet points, and code blocks if relevant for depth.
- tags: An array of 3-5 relevant keywords.

JSON structure:
{
  "title": "...",
  "slug": "...",
  "content": "...",
  "tags": ["...", "..."]
}
`

/**
 * Detailed prompt for generating a full blog post with a specific tone.
 * Maps directly to the BlogPost model: title, slug, content (Markdown), tags.
 */
export const generateBlogPostPrompt = (title: string, tone: string) => `
You are a professional blog writer and SEO expert. 
Your task is to write a comprehensive, high-quality, and engaging blog post about: "${title}".
The tone of the article should be: "${tone}".

Requirements:
1. Content Depth: Provide deep insights, practical examples, and well-reasoned arguments.
2. Structure: Use Markdown formatting. Include a clear introduction, logically organized sections with H2 and H3 headers, bullet points for readability, and a concluding summary.
3. Code Snippets: If the topic is technical, include relevant, well-commented code blocks.
4. Model Alignment: The output must strictly follow the JSON structure below to match our database.

JSON Output Format:
{
  "title": "A catchy, SEO-friendly version of the title",
  "slug": "url-friendly-slug-of-the-title",
  "content": "The full blog post content in Markdown format...",
  "tags": ["tag1", "tag2", "tag3", "tag4"]
}

Ensure the "content" string handles newlines and special characters correctly for JSON parsing.
CRITICAL: Escape all double quotes within the content string as \". Do not use unescaped double quotes inside values.
Return ONLY the JSON object.
`

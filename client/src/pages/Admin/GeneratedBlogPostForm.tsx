import Input from "@/components/Inputs";
import { aiService, type BlogPostIdea } from "@/services/aiService";
import { useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";

interface GeneratedBlogPostFormProps {
  contentParams: BlogPostIdea | null;
  setPostContent: (title: string, content: string) => void;
  handleCloseForm: () => void;
}

const GeneratedBlogPostForm = ({
  contentParams,
  setPostContent,
  handleCloseForm,
}: GeneratedBlogPostFormProps) => {
  const [formData, setFormData] = useState({
    title: contentParams?.title || "",
    tone: contentParams?.tone || "casual",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleGenerateBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, tone } = formData;

    if (!title || !tone) {
      setError("Please fill in all the fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const generatedContent = await aiService.generateBlogPost(title, tone);

      setPostContent(generatedContent.title, generatedContent.content || "");
      handleCloseForm();
    } catch (error) {
      console.error("Error generating blog post:", error);
      setError("Failed to generate blog post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Generate a Blog Post</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Provide a title and tone for the blog post
      </p>

      <form onSubmit={handleGenerateBlogPost} className="flex flex-col gap-3">
        <Input
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          label="Title"
          placeholder="Enter title"
          type="text"
        />

        <Input
          value={formData.tone}
          onChange={(e) => handleChange("tone", e.target.value)}
          label="Tone"
          placeholder="Enter tone"
          type="text"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          className="btn-primary w-full mt-2"
          disabled={isLoading}
        >
          {isLoading && <LuLoaderCircle className="animate-spin text-lg" />}
          {isLoading ? "Generating..." : "Generate Blog Post"}
        </button>
      </form>
    </div>
  );
};

export default GeneratedBlogPostForm;

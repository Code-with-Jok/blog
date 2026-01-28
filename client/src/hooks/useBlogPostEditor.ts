import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { blogService } from "@/services/blogService";
import uploadImage from "@/utils/uploadImage";
import { getToastMessage } from "@/utils/helper";
import { aiService, type BlogPostIdea } from "@/services/aiService";
import type { PostData } from "@/pages/Admin/components/EditorMainForm";

const initialPostData: PostData = {
  id: "",
  title: "",
  content: "",
  coverImage: null,
  coverPreview: null,
  tags: [],
  isDraft: false,
  generatedByAI: false,
};

interface UseBlogPostEditorProps {
  isEdit: boolean;
  postSlug?: string;
}

export const useBlogPostEditor = ({
  isEdit,
  postSlug,
}: UseBlogPostEditorProps) => {
  const navigate = useNavigate();

  const [postData, setPostData] = useState<PostData>(initialPostData);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingIdeas, setLoadingIdeas] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [postIdeas, setPostIdeas] = useState<BlogPostIdea[]>([]);
  const [openBlogPostGenForm, setOpenBlogPostGenForm] = useState<{
    open: boolean;
    data: BlogPostIdea | null;
  }>({
    open: false,
    data: null,
  });

  const handleValueChange = useCallback(
    <K extends keyof PostData>(key: K, value: PostData[K]) => {
      setPostData((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const generateBlogPostIdeas = useCallback(async () => {
    setLoadingIdeas(true);
    try {
      const ideas = await aiService.generateIdeas("React JS, React Native");
      if (ideas && ideas.length > 0) {
        setPostIdeas(ideas);
        setOpenBlogPostGenForm({
          open: false,
          data: null,
        });
      }
    } catch (error) {
      console.error("Error generating blog post ideas:", error);
    } finally {
      setLoadingIdeas(false);
    }
  }, []);

  const getPostDataBySlug = useCallback(async () => {
    if (!postSlug) return;
    try {
      const data = await blogService.getPostBySlug(postSlug);
      if (data) {
        setPostData((prev) => ({
          ...prev,
          id: data._id,
          title: data.title,
          content: data.content,
          coverPreview: data.coverImageUrl,
          tags: data.tags,
          isDraft: data.isDraft,
          generatedByAI: data.generatedByAI,
        }));
      }
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  }, [postSlug]);

  const handleBlogPostPublish = async (isDraft: boolean) => {
    let coverImageUrl = "";

    if (!postData.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!postData.content.trim()) {
      setError("Content is required");
      return;
    }

    if (!isDraft) {
      if (!isEdit && !postData.coverImage) {
        setError("Cover image is required");
        return;
      }
      if (isEdit && !postData.coverImage && !postData.coverPreview) {
        setError("Cover image is required");
        return;
      }

      if (!postData.tags.length) {
        setError("Tags are required");
        return;
      }
    }

    setLoading(true);
    setError("");

    try {
      if (postData.coverImage instanceof File) {
        const imageUrlResponse = await uploadImage(postData.coverImage);
        coverImageUrl = imageUrlResponse.imageUrl ?? "";
      } else {
        coverImageUrl = postData.coverPreview ?? "";
      }

      const reqPayload = {
        title: postData.title,
        content: postData.content,
        coverImageUrl,
        tags: postData.tags,
        isDraft,
        generatedByAI: true,
      };

      const data = isEdit
        ? await blogService.updatePost(postData.id, reqPayload)
        : await blogService.createPost(reqPayload);

      if (data) {
        toast.success(
          getToastMessage(isDraft ? "draft" : isEdit ? "updated" : "published")
        );
        navigate("/admin/posts");
      }
    } catch (error) {
      setError("Failed to publish post");
      console.error("Error uploading cover image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlogPostDelete = async () => {
    try {
      await blogService.deletePost(postData.id);
      toast.success("Post deleted successfully");
      setOpenDeleteAlert(false);
      navigate("/admin/posts");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      getPostDataBySlug();
    }
    generateBlogPostIdeas();
  }, [isEdit, getPostDataBySlug, generateBlogPostIdeas]);

  return {
    postData,
    setPostData,
    error,
    loading,
    loadingIdeas,
    openDeleteAlert,
    setOpenDeleteAlert,
    postIdeas,
    openBlogPostGenForm,
    setOpenBlogPostGenForm,
    handleValueChange,
    handleBlogPostPublish,
    handleBlogPostDelete,
    generateBlogPostIdeas,
  };
};

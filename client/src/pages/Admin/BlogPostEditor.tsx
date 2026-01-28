import DashboardLayout from "@/components/layouts/AdminLayout/DashboardLayout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "@/components/Modal";
import GeneratedBlogPostForm from "./GeneratedBlogPostForm";
import IdeaSidebar from "./components/IdeaSidebar";
import EditorMainForm, { type PostData } from "./components/EditorMainForm";
import { aiService, type BlogPostIdea } from "@/services/aiService";

interface BlogPostEditorProps {
  isEdit?: boolean;
}

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

const BlogPostEditor = ({ isEdit = false }: BlogPostEditorProps) => {
  const navigate = useNavigate();
  const { postSlug = "" } = useParams();

  const [postData, setPostData] = useState<PostData>(initialPostData);

  // States for UI control
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

  const handleValueChange = <K extends keyof PostData>(
    key: K,
    value: PostData[K]
  ) => {
    setPostData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Generate Blog Post Ideas Using AI
  const generateBlogPostIdeas = async () => {
    setLoadingIdeas(true);
    try {
      const ideas = await aiService.generateIdeas("React JS, React Native");
      if (ideas && ideas.length > 0) {
        setPostIdeas(ideas);
        setOpenBlogPostGenForm({
          open: true,
          data: ideas[0],
        });
      }
    } catch (error) {
      console.error("Error generating blog post ideas:", error);
    } finally {
      setLoadingIdeas(false);
    }
  };

  // Handle Blog Post Publish
  const handleBlogPostPublish = async (isDraft: boolean) => {
    // TODO: Implement publish logic
    console.log("Publishing", isDraft, postData);
  };

  // Get Post Data by Slug
  const getPostDataBySlug = async () => {
    // TODO: Fetch post data
  };

  // Handle Blog Post Delete
  const handleBlogPostDelete = async () => {
    // TODO: Implement delete
  };

  useEffect(() => {
    if (isEdit) {
      getPostDataBySlug();
    }
  }, [isEdit]);

  return (
    <DashboardLayout activeMenu="Blog Posts">
      <div className="my-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-4">
          <EditorMainForm
            isEdit={isEdit}
            postData={postData}
            error={error}
            loading={loading}
            onValueChange={handleValueChange}
            onPublish={handleBlogPostPublish}
            onDelete={() => setOpenDeleteAlert(true)}
          />

          {!isEdit && (
            <IdeaSidebar
              postIdeas={postIdeas}
              loadingIdeas={loadingIdeas}
              onGenerateIdeas={generateBlogPostIdeas}
              onSelectIdea={(idea) =>
                setOpenBlogPostGenForm({ open: true, data: idea })
              }
            />
          )}
        </div>
      </div>

      <Modal
        isOpen={openBlogPostGenForm.open}
        onClose={() => setOpenBlogPostGenForm({ open: false, data: null })}
        title="Generate Blog Post"
        hideHeader
      >
        <GeneratedBlogPostForm
          contentParams={openBlogPostGenForm?.data ?? null}
          setPostContent={(title, content) => {
            const postInfo = openBlogPostGenForm?.data ?? null;

            setPostData((prev) => ({
              ...prev,
              title: title || prev.title,
              content: content || prev.content,
              tags: postInfo?.tags ?? [],
              tone: postInfo?.tone ?? "casual",
              generatedByAI: true,
            }));
          }}
          handleCloseForm={() =>
            setOpenBlogPostGenForm({ open: false, data: null })
          }
        />
      </Modal>
    </DashboardLayout>
  );
};

export default BlogPostEditor;

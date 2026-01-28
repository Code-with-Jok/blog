import DashboardLayout from "@/components/layouts/AdminLayout/DashboardLayout";
import { useParams } from "react-router-dom";
import Modal from "@/components/Modal";
import GeneratedBlogPostForm from "./GeneratedBlogPostForm";
import IdeaSidebar from "./components/IdeaSidebar";
import EditorMainForm from "./components/EditorMainForm";
import DeleteAlertContent from "@/components/DeleteAlertContent";
import { useBlogPostEditor } from "@/hooks/useBlogPostEditor";

interface BlogPostEditorProps {
  isEdit?: boolean;
}

const BlogPostEditor = ({ isEdit = false }: BlogPostEditorProps) => {
  const { postSlug = "" } = useParams();

  const {
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
  } = useBlogPostEditor({ isEdit, postSlug });

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

      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Post"
        hideHeader
      >
        <div className="w-[40vw]">
          <DeleteAlertContent
            content="Are you sure you want to delete this post?"
            onDelete={handleBlogPostDelete}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default BlogPostEditor;

import CoverImageSelector from "@/components/Inputs/CoverImageSelector";
import TagInput from "@/components/Inputs/TagInput";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { LuLoaderCircle, LuSave, LuSend, LuTrash2 } from "react-icons/lu";

export interface PostData {
  id: string;
  title: string;
  content: string;
  coverImage: File | null;
  coverPreview: string | null;
  tags: string[];
  isDraft: boolean;
  generatedByAI: boolean;
}

interface EditorMainFormProps {
  isEdit: boolean;
  postData: PostData;
  error: string;
  loading: boolean;
  onValueChange: <K extends keyof PostData>(key: K, value: PostData[K]) => void;
  onPublish: (isDraft: boolean) => void;
  onDelete: () => void;
}

const EditorMainForm = ({
  isEdit,
  postData,
  error,
  loading,
  onValueChange,
  onPublish,
  onDelete,
}: EditorMainFormProps) => {
  return (
    <div className="form-card p-6 col-span-12 md:col-span-8 bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          {!isEdit ? "Create New Post" : "Edit Post"}
        </h2>

        <div className="flex items-center gap-3">
          {isEdit && (
            <button
              disabled={loading}
              className="flex items-center gap-2 text-sm font-medium text-red-600 bg-red-50 px-3 py-2 rounded-md hover:bg-red-100 transition-colors border border-red-100 disabled:opacity-50"
              onClick={onDelete}
            >
              <LuTrash2 />
              <span className="hidden md:block">Delete</span>
            </button>
          )}

          <button
            className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-2 rounded-md hover:bg-emerald-100 transition-colors border border-emerald-100 disabled:opacity-50"
            disabled={loading}
            onClick={() => onPublish(true)}
          >
            <LuSave />
            <span className="hidden md:block">Save Draft</span>
          </button>

          <button
            className="flex items-center gap-2 text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
            disabled={loading}
            onClick={() => onPublish(false)}
          >
            {loading ? (
              <>
                <LuLoaderCircle className="animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <LuSend />
                <span>Publish</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-md text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Post Title
          </label>
          <input
            type="text"
            placeholder="e.g., How to Build a Modern Web App"
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={postData.title}
            onChange={(e) => onValueChange("title", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Cover Image
          </label>
          <CoverImageSelector
            image={postData.coverImage}
            setImage={(file) => onValueChange("coverImage", file)}
            preview={postData.coverPreview}
            setPreview={(url) => onValueChange("coverPreview", url)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Post Content
          </label>
          <div data-color-mode="light" className="prose-editor">
            <MDEditor
              value={postData.content}
              onChange={(val) => onValueChange("content", val || "")}
              height={400}
              preview="edit"
              commands={[
                commands.bold,
                commands.italic,
                commands.strikethrough,
                commands.hr,
                commands.divider,
                commands.quote,
                commands.code,
                commands.link,
                commands.image,
                commands.divider,
                commands.unorderedListCommand,
                commands.orderedListCommand,
                commands.checkedListCommand,
              ]}
            />
          </div>
        </div>

        {/* Tags Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Tags
          </label>
          <TagInput
            tags={postData.tags}
            setTags={(tags) => onValueChange("tags", tags)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorMainForm;

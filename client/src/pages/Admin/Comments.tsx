import DashboardLayout from "@/components/layouts/AdminLayout/DashboardLayout";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";
import DeleteAlertContent from "@/components/DeleteAlertContent";
import { commentService, type Comment } from "@/services/commentService";
import { LuInbox, LuMessageSquare } from "react-icons/lu";
import CommentSidebarItem from "./components/CommentSidebarItem";
import CommentThreadView from "./components/CommentThreadView";

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null
  );

  const [openDeleteAlert, setOpenDeleteAlert] = useState<{
    open: boolean;
    data: string | null;
  }>({
    open: false,
    data: null,
  });

  const getAllComments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await commentService.getAll();
      setComments(data);
      // Auto-select first comment if none selected and data exists
      if (data.length > 0 && !selectedCommentId) {
        setSelectedCommentId(data[0]._id);
      }
    } catch (error) {
      console.log("Error fetching comments:", error);
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  }, [selectedCommentId]);

  // Helper just to refresh layout or selection if necessary, mostly used by child components
  const refreshComments = async () => {
    try {
      const data = await commentService.getAll();
      setComments(data);
    } catch (error) {
      console.log("Silent refresh failed", error);
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await commentService.delete(commentId);
      toast.success("Comment deleted successfully");
      setOpenDeleteAlert({ open: false, data: null });

      // If deleted comment was selected, deselect or select next
      if (selectedCommentId === commentId) {
        setSelectedCommentId(null);
      }

      getAllComments();
    } catch (error) {
      console.log("Error deleting comment:", error);
      toast.error("Failed to delete comment");
    }
  };

  useEffect(() => {
    getAllComments();
  }, [getAllComments]);

  const selectedComment = comments.find((c) => c._id === selectedCommentId);

  return (
    <DashboardLayout activeMenu="Comments">
      <div className="h-[calc(100vh-100px)] p-4">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <LuMessageSquare className="text-blue-600" />
            Comments Manager
          </h2>
        </div>

        {/* Master Detail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100%-60px)]">
          {/* LEFT: Sidebar / Inbox List */}
          <div className="md:col-span-4 lg:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden h-full">
            <div className="p-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">
                Inbox
              </span>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {comments.length}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="p-4 space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-20 bg-slate-100 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : comments.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                  <LuInbox className="size-10 mb-2 opacity-50" />
                  <p className="text-sm">No comments yet</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-50">
                  {comments.map((comment) => (
                    <CommentSidebarItem
                      key={comment._id}
                      comment={comment}
                      isSelected={selectedCommentId === comment._id}
                      onClick={() => setSelectedCommentId(comment._id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Detail View */}
          <div className="md:col-span-8 lg:col-span-9 h-full">
            {selectedComment ? (
              <CommentThreadView
                comment={selectedComment}
                onDelete={(id) => setOpenDeleteAlert({ open: true, data: id })}
                onRefresh={refreshComments}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                  <LuMessageSquare className="size-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-600">
                  Select a conversation
                </h3>
                <p className="max-w-xs text-center text-sm mt-2">
                  Choose a comment from the list to view the thread and basic
                  post info.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Comment"
      >
        <div className="w-full md:w-md">
          <DeleteAlertContent
            content="Are you sure you want to permanently delete this comment? This action cannot be undone."
            onDelete={() =>
              openDeleteAlert.data && deleteComment(openDeleteAlert.data)
            }
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Comments;

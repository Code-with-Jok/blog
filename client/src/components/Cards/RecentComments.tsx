import { type Comment, type BlogPost } from "@/types/api";
import moment from "moment";
import { LuDot } from "react-icons/lu";
import ImagePreview from "../ImagePreview";

interface RecentCommentsProps {
  comments: Comment[];
}

const RecentComments = ({ comments }: RecentCommentsProps) => {
  return (
    <div className="mt-4">
      <ul className="space-y-4">
        {comments.slice(0, 10).map((comment) => {
          const post =
            typeof comment.post === "object"
              ? (comment.post as BlogPost)
              : null;

          return (
            <li
              key={comment._id}
              className="flex gap-4 border-b border-gray-100 pb-4 last:border-none"
            >
              <ImagePreview
                overlayClassName="size-10"
                wrapperClassName="rounded-full"
                className="size-10 rounded-full object-cover"
                src={comment.author?.profileImageUrl ?? ""}
                alt={comment.author?.name ?? "author"}
              />

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="font-medium text-[13px] text-gray-500">
                        @{comment.author?.name}
                      </p>

                      <LuDot className="text-gray-500" />

                      <span className="text-xs text-gray-500 font-medium">
                        {moment(comment.updatedAt).format("Do MMM YYYY")}
                      </span>
                    </div>
                    <p className="text-sm text-black mt-0.5">
                      {comment.content}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <ImagePreview
                    overlayClassName="size-9"
                    wrapperClassName="rounded-lg"
                    className="size-9 object-cover rounded-lg"
                    src={post?.coverImageUrl ?? ""}
                    alt={post?.title ?? "post"}
                  />

                  <p className="font-medium text-[13px] text-gray-500">
                    {post?.title}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentComments;

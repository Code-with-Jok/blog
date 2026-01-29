import BlogPostIdeaCard from "@/components/Cards/BlogPostIdeaCard";
import SkeletonLoader from "react-loading-skeleton";
import { LuSparkle } from "react-icons/lu";
import type { BlogPostIdea } from "@/services/aiService";

interface IdeaSidebarProps {
  postIdeas: BlogPostIdea[];
  loadingIdeas: boolean;
  onGenerateIdeas: () => void;
  onSelectIdea: (idea: BlogPostIdea) => void;
}

const IdeaSidebar = ({
  postIdeas,
  loadingIdeas,
  onGenerateIdeas,
  onSelectIdea,
}: IdeaSidebarProps) => {
  return (
    <div className="form-card p-0 col-span-12 md:col-span-4 bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="flex items-center justify-between p-6 flex-wrap gap-3">
        <h4 className="text-sm md:text-base font-medium inline-flex items-center gap-2">
          <span className="text-sky-600">
            <LuSparkle />
          </span>
          Ideas for your next post
        </h4>
        <button
          className="bg-linear-to-r from-sky-500 to-cyan-400 text-white text-[13px] font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
          onClick={onGenerateIdeas}
        >
          Generate Ideas
        </button>
      </div>
      <div>
        {loadingIdeas ? (
          <div className="p-5">
            <SkeletonLoader />
          </div>
        ) : (
          postIdeas.map((idea, index) => (
            <BlogPostIdeaCard
              key={`idea_${index}`}
              title={idea.title ?? ""}
              description={idea.summary ?? ""}
              tags={idea.tags ?? []}
              tone={idea.tone ?? "casual"}
              onSelect={() => onSelectIdea(idea)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default IdeaSidebar;

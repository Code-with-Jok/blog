interface BlogPostIdeaCardProps {
  title: string;
  description: string;
  tags: string[];
  tone: string;
  onSelect: () => void;
}

const BlogPostIdeaCard = ({
  title,
  description,
  tags,
  tone,
  onSelect,
}: BlogPostIdeaCardProps) => {
  return (
    <div
      className="border-b border-gray-100 hover:bg-gray-100/60 px-6 py-5 cursor-default"
      onClick={onSelect}
    >
      <h3 className="text-sm text-black font-medium">
        {title}
        <span className="text-xs text-yellow-900 bg-yellow-100 px-2 py-0.5 rounded">
          {tone}
        </span>
      </h3>

      <p className="">{description}</p>

      <div className="flex items-center gap-2.5 mt-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="text-xs text-sky-700 bg-sky-100 px-2 py-0.5 rounded"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPostIdeaCard;

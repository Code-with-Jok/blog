import { useState, type KeyboardEvent } from "react";
import { LuTrash2 } from "react-icons/lu";

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagInput = ({ tags, setTags }: TagInputProps) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      const newTag = input.trim();
      // Prevent duplicates
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInput("");
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      e.preventDefault();
      // Remove the last tag if input is empty and backspace is pressed
      setTags(tags.slice(0, tags.length - 1));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-wrap gap-2 items-center border border-gray-300 rounded-md p-2 min-h-[40px] mt-3 bg-white focus-within:border-sky-500 transition-colors">
      {tags.map((tag) => (
        <div
          key={tag}
          className="flex items-center gap-1 bg-sky-100/70 text-sky-700 px-3 py-1.5 rounded text-sm font-medium"
        >
          <span>{tag}</span>
          <button
            type="button"
            className="text-sky-500 hover:text-sky-700 cursor-pointer p-0.5 rounded-full hover:bg-sky-200/50 transition-colors"
            onClick={() => handleRemoveTag(tag)}
            aria-label={`Remove tag ${tag}`}
          >
            <LuTrash2 size={14} />
          </button>
        </div>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          tags.length === 0
            ? "Press Enter or comma to add a tag"
            : "Add more..."
        }
        className="flex-1 border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 min-w-[120px] py-1"
      />
    </div>
  );
};

export default TagInput;

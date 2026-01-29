import { useRef, useEffect } from "react";
import { LuSearch, LuX } from "react-icons/lu";

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClear: () => void;
  autoFocus?: boolean;
}

const SearchInput = ({
  query,
  setQuery,
  onKeyDown,
  onClear,
  autoFocus,
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [autoFocus]);

  return (
    <div className="flex items-center gap-3 p-4 border-b border-gray-100">
      <LuSearch className="text-gray-400 text-xl" />
      <input
        ref={inputRef}
        type="text"
        className="flex-1 text-lg outline-none text-gray-700 placeholder-gray-400"
        placeholder="Search for posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
      />
      {query && (
        <button onClick={onClear} className="text-gray-400 hover:text-gray-600">
          <LuX className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;

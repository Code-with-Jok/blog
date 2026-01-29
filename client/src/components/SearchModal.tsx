import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useTrendingPosts } from "@/hooks/useTrendingPosts";
import { useSearchPosts } from "@/hooks/useSearchPosts";
import SearchInput from "./Search/SearchInput";
import SearchResults from "./Search/SearchResults";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const {
    query,
    setQuery,
    results,
    loading,
    hasSearched,
    searchPosts,
    clearSearch,
  } = useSearchPosts();

  const { trendingPosts } = useTrendingPosts();
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchPosts();
    }
  };

  const navigateToPost = (slug: string) => {
    navigate(`/post/${slug}`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} hideHeader>
      <div className="w-full md:w-[600px] h-[80vh] md:h-[600px] flex flex-col bg-white rounded-lg overflow-hidden">
        <SearchInput
          query={query}
          setQuery={setQuery}
          onKeyDown={handleKeyDown}
          onClear={clearSearch}
          autoFocus={isOpen}
        />

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <SearchResults
            loading={loading}
            results={results}
            hasSearched={hasSearched}
            query={query}
            trendingPosts={trendingPosts}
            onPostClick={navigateToPost}
          />
        </div>
      </div>
    </Modal>
  );
};

export default SearchModal;

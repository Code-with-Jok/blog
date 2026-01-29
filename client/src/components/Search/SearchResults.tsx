import SearchPostItem, { type SearchPostPreview } from "./SearchPostItem";
import { LoadingState, NoResultsState, EmptyState } from "./SearchStateViews";

interface SearchResultsProps {
  loading: boolean;
  results: SearchPostPreview[];
  hasSearched: boolean;
  query: string;
  trendingPosts: SearchPostPreview[];
  onPostClick: (slug: string) => void;
}

const SearchResults = ({
  loading,
  results,
  hasSearched,
  query,
  trendingPosts,
  onPostClick,
}: SearchResultsProps) => {
  if (loading) {
    return <LoadingState />;
  }

  if (results.length > 0) {
    return (
      <div className="space-y-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Found {results.length} results
        </p>
        {results.map((post) => (
          <SearchPostItem key={post._id} post={post} onClick={onPostClick} />
        ))}
      </div>
    );
  }

  if (hasSearched) {
    return <NoResultsState query={query} />;
  }

  if (trendingPosts.length > 0) {
    return (
      <div className="space-y-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Trending Posts
        </p>
        {trendingPosts.map((post) => (
          <SearchPostItem key={post._id} post={post} onClick={onPostClick} />
        ))}
      </div>
    );
  }

  return <EmptyState message="Type something to search..." />;
};

export default SearchResults;

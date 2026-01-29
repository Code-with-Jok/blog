import { LuLoader, LuSearch } from "react-icons/lu";

export const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-40 text-gray-400">
    <LuLoader className="animate-spin text-3xl mb-3 text-indigo-500" />
    <p>Searching...</p>
  </div>
);

export const NoResultsState = ({ query }: { query: string }) => (
  <div className="flex flex-col items-center justify-center h-60 text-center text-gray-400">
    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
      <LuSearch className="text-2xl text-gray-300" />
    </div>
    <p className="text-gray-900 font-medium">No results found</p>
    <p className="text-sm mt-1">
      We couldn&apos;t find anything for &quot;{query}&quot;
    </p>
  </div>
);

export const EmptyState = ({ message }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center h-40 text-center text-gray-400">
    <p className="text-sm">{message || "No posts available"}</p>
  </div>
);

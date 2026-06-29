import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../components/Card";
import { SearchBar } from "../components/SearchBar";
import { useContent } from "../hooks/useContent";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { searchContent } from "../api/search";
import { CreateContentModel } from "../components/CreateContentModel";

function DashboardAll() {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const {
    data: contents = [],
    totalItems,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useContent();

  const { data: searchResults, isFetching: isSearching } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchContent(query),
    enabled: query.trim().length > 1,
    staleTime: 30_000,
  });

  const isSearchActive = query.trim().length > 1;
  const displayed = isSearchActive ? (searchResults ?? []) : contents;

  // Only paginate the default browse view — search results come back as a
  // single unpaginated array from the backend, so there's nothing to scroll-load.
  const sentinelRef = useInfiniteScroll({
    hasNextPage: !isSearchActive && hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <div
      className="min-h-screen bg-[#0B0E14]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Page header */}
      <div className="mb-8">
        <h1
          className="text-2xl font-medium text-[#ECE7DA]"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Everything
        </h1>
        <p className="text-sm text-[#6B7280] mt-0.5">
          {isSearchActive
            ? `${displayed.length} ${displayed.length === 1 ? "result" : "results"}`
            : `${totalItems} ${totalItems === 1 ? "entry" : "entries"}`}
        </p>
      </div>

      {/* Search bar — debounces internally, only updates `query` (and triggers
          a fetch) 300ms after the user stops typing */}
      <SearchBar
        onSearch={setQuery}
        isSearching={isSearching}
        className="mb-8"
      />

      {/* States */}
      {isLoading && (
        <div className="flex items-center gap-2 text-[#6B7280] text-sm">
          <span className="w-4 h-4 border-2 border-[#8B7CF6] border-t-transparent rounded-full animate-spin" />
          Loading your vault…
        </div>
      )}

      {isError && (
        <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          Something went wrong. Try refreshing.
        </div>
      )}

      {!isLoading && !isError && displayed.length === 0 && (
        <div className="text-center py-24">
          <p className="text-[#6B7280] text-sm mb-3">
            {query ? `No results for "${query}"` : "Your vault is empty."}
          </p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayed.map((post) => (
          <Card
            key={post._id}
            id={post._id}
            type={post.type}
            link={post.link}
            title={post.title}
            description={post.description}
            aiSummary={post.aiSummary}
            aiTags={post.aiTags}
            metadataStatus={post.metadataStatus}
            isCompleted={post.isCompleted}
            dueDate={post.dueDate}
            cloudinaryUrl={post.cloudinaryUrl}
          />
        ))}
      </div>

      {/* Infinite scroll sentinel + loading indicator — only relevant for the
          default browse view, not search results */}
      {!isSearchActive && (
        <div ref={sentinelRef} className="flex justify-center py-8">
          {isFetchingNextPage && (
            <span className="w-5 h-5 border-2 border-[#8B7CF6] border-t-transparent rounded-full animate-spin" />
          )}
          {!hasNextPage && contents.length > 0 && <></>}
        </div>
      )}

      <CreateContentModel
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default DashboardAll;

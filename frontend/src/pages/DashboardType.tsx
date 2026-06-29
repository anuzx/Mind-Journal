import { useState } from "react";
import { useParams } from "react-router-dom";
import { useContent } from "../hooks/useContent";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { Card } from "../components/Card";
import { SearchBar } from "../components/SearchBar";

const TYPE_LABELS: Record<string, string> = {
  twitter: "Twitter",
  youtube: "YouTube",
  document: "Documents",
  link: "Links",
  image: "Images",
  note: "Notes",
};

export default function DashboardType() {
  const { type } = useParams<{ type: string }>();
  const {
    data = [],
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useContent();
  const [query, setQuery] = useState("");

  const filtered = data.filter((post) => {
    if (post.type !== type) return false;
    if (query.trim().length <= 1) return true;
    const q = query.trim().toLowerCase();
    return (
      post.title?.toLowerCase().includes(q) ||
      post.description?.toLowerCase().includes(q) ||
      post.aiSummary?.toLowerCase().includes(q) ||
      post.aiTags?.some((tag) => tag.toLowerCase().includes(q))
    );
  });
  const label = TYPE_LABELS[type ?? ""] ?? type;

  const sentinelRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <div
      className="min-h-screen bg-[#0B0E14]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-2xl font-medium text-[#ECE7DA]"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {label}
        </h1>
        {!isLoading && (
          <p className="text-sm text-[#6B7280] mt-0.5">
            {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
          </p>
        )}
      </div>

      {/* Search bar — filters this type's entries client-side, no extra fetch */}
      <SearchBar onSearch={setQuery} className="mb-8" />

      {isLoading && (
        <div className="flex items-center gap-2 text-[#6B7280] text-sm">
          <span className="w-4 h-4 border-2 border-[#8B7CF6] border-t-transparent rounded-full animate-spin" />
          Loading…
        </div>
      )}

      {isError && (
        <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          Something went wrong. Try refreshing.
        </div>
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <div className="text-center py-24">
          <p className="text-[#6B7280] text-sm">
            {query.trim().length > 1
              ? `No results for "${query}"`
              : hasNextPage
                ? "Loading more…"
                : `No ${label?.toLowerCase()} saved yet.`}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((post) => (
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

      {/* Infinite scroll sentinel — keeps pulling more of the full feed so
          this type's filtered list can keep growing */}
      <div ref={sentinelRef} className="flex justify-center py-8">
        {isFetchingNextPage && (
          <span className="w-5 h-5 border-2 border-[#8B7CF6] border-t-transparent rounded-full animate-spin" />
        )}
        {!hasNextPage && data.length > 0 && <></>}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../components/Card";
import { useContent } from "../hooks/useContent";
import { searchContent } from "../api/search";
import { CreateContentModel } from "../components/CreateContentModel";

function DashboardAll() {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { data: contents = [], isLoading, isError } = useContent();

  const { data: searchResults, isFetching: isSearching } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchContent(query),
    enabled: query.trim().length > 1,
    staleTime: 30_000,
  });

  const displayed = query.trim().length > 1 ? (searchResults ?? []) : contents;

  return (
    <div
      className="min-h-screen bg-[#0B0E14]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-medium text-[#ECE7DA]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Everything
          </h1>
          <p className="text-sm text-[#6B7280] mt-0.5">
            {contents.length} {contents.length === 1 ? "entry" : "entries"}
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-[#8B7CF6] hover:bg-[#A395FF] text-[#0B0E14] font-medium transition-all duration-150"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {/* Search bar */}
      <div className="relative mb-8 max-w-lg">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
        <input
          type="text"
          placeholder="Search by title, tag, or feeling…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-full pl-10 pr-4 py-2.5 rounded-lg text-sm
            bg-white/5 border border-white/10
            text-[#ECE7DA] placeholder:text-[#6B7280]
            focus:outline-none focus:border-[#8B7CF6]
            transition-all duration-150
          "
        />
        {isSearching && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-[#8B7CF6] border-t-transparent rounded-full animate-spin" />
        )}
      </div>

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
          {!query && (
            <button
              onClick={() => setShowModal(true)}
              className="text-[#8B7CF6] text-sm hover:text-[#A395FF] transition-colors"
            >
              Add your first entry →
            </button>
          )}
        </div>
      )}

      {/* Grid */}
      <div className="flex flex-wrap gap-4">
        {displayed.map((post) => (
          <Card
            key={post._id}
            id={post._id}
            type={post.type}
            link={post.link}
            title={post.title}
            description={post.description}
            tags={post.tags}
            completed={post.completed}
            dueDate={post.dueDate}
          />
        ))}
      </div>

      <CreateContentModel
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default DashboardAll;

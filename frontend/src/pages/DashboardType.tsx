import { useParams } from "react-router-dom";
import { useContent } from "../hooks/useContent";
import { Card } from "../components/Card";

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
  const { data = [], isLoading, isError } = useContent();

  const filtered = data.filter((post) => post.type === type);
  const label = TYPE_LABELS[type ?? ""] ?? type;

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
            No {label?.toLowerCase()} saved yet.
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-start gap-4">
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
          />
        ))}
      </div>
    </div>
  );
}

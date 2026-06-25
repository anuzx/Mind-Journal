import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Brain } from "lucide-react";
import { Card } from "../components/Card";
import { getSharedVault } from "../api/share";

export default function SharedBrain() {
  const { hash } = useParams<{ hash: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["shared-vault", hash],
    queryFn: () => getSharedVault(hash!),
    enabled: Boolean(hash),
    retry: false,
  });

  return (
    <div
      className="min-h-screen bg-[#0B0E14] px-6 py-10"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,400..600&family=Inter:wght@400;500;600;700&display=swap');`}</style>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-[#8B7CF6]" />
          <span
            className="text-[#ECE7DA] font-medium"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Mind Journal
          </span>
        </div>

        {!isLoading && !isError && data && (
          <p className="text-sm text-[#6B7280] mb-8">
            {data.username}'s shared vault — {data.content.length}{" "}
            {data.content.length === 1 ? "entry" : "entries"}
          </p>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-[#6B7280] text-sm mt-6">
            <span className="w-4 h-4 border-2 border-[#8B7CF6] border-t-transparent rounded-full animate-spin" />
            Loading vault…
          </div>
        )}

        {isError && (
          <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 mt-6">
            {error instanceof Error
              ? error.message
              : "Something went wrong loading this vault."}
          </div>
        )}

        {!isLoading && !isError && data && data.content.length === 0 && (
          <div className="text-center py-24">
            <p className="text-[#6B7280] text-sm">This vault is empty.</p>
          </div>
        )}

        {!isLoading && !isError && data && data.content.length > 0 && (
          <div className="flex flex-wrap items-start gap-4">
            {data.content.map((post) => (
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
        )}
      </div>
    </div>
  );
}
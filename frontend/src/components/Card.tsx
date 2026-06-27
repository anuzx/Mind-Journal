import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  Tag,
  Trash2,
  Share2,
  CheckCircle2,
  Circle,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { deleteContent, toggleComplete } from "../api/content";
import { copyLinkToClipboard } from "../api/share";
import Popup from "./Popup";

interface CardProps {
  id: string;
  title: string;
  link?: string;
  type: "twitter" | "youtube" | "document" | "link" | "note" | "image";
  description: string;
  aiSummary?: string;
  aiTags?: string[];
  metadataStatus?: "pending" | "processing" | "completed" | "failed";
  isCompleted?: boolean;
  dueDate?: string;
  cloudinaryUrl?: string;
}

export function Card({
  id,
  title,
  link,
  type,
  description,
  aiSummary,
  aiTags = [],
  metadataStatus,
  isCompleted = false,
  dueDate,
  cloudinaryUrl,
}: CardProps) {
  const queryClient = useQueryClient();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);

  const { mutate: deleteMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      setShowDeletePopup(false);
    },
    onError: () => alert("Failed to delete"),
  });

  const { mutate: toggleMutation } = useMutation({
    mutationFn: toggleComplete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["content"] }),
  });

  function TwitterEmbed({ link }: { link: string }) {
    useEffect(() => {
      if (
        !document.querySelector(
          'script[src="https://platform.twitter.com/widgets.js"]',
        )
      ) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }, []);

    return (
      <blockquote className="twitter-tweet">
        <a href={link.replace("x.com", "twitter.com")} />
      </blockquote>
    );
  }

  function handleShare() {
    if (link) copyLinkToClipboard(link);
    setShowSharePopup(false);
  }

  const typeColors: Record<string, string> = {
    youtube: "text-red-400 bg-red-400/10 border-red-400/20",
    twitter: "text-sky-400 bg-sky-400/10 border-sky-400/20",
    document: "text-[#F4B400] bg-[#F4B400]/10 border-[#F4B400]/20",
    link: "text-[#8B7CF6] bg-[#8B7CF6]/10 border-[#8B7CF6]/20",
    image: "text-pink-400 bg-pink-400/10 border-pink-400/20",
    note: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  };

  // The displayed body: prefer aiSummary once processing is done,
  // fall back to the user-supplied description.
  const bodyText =
    metadataStatus === "completed" && aiSummary ? aiSummary : description;

  const isProcessing =
    metadataStatus === "pending" || metadataStatus === "processing";

  return (
    <div
      className={`
        relative bg-[#11151D] border rounded-xl p-5 w-72 flex flex-col gap-3
        transition-all duration-200
        ${isCompleted ? "border-white/5 opacity-60" : "border-white/10 hover:border-[#8B7CF6]/40"}
      `}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          {type === "note" && (
            <button
              onClick={() => toggleMutation(id)}
              className="mt-0.5 flex-shrink-0 text-[#8B7CF6] hover:text-[#A395FF] transition-colors"
            >
              {isCompleted ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Circle className="w-4 h-4" />
              )}
            </button>
          )}
          <h3
            className={`text-[#ECE7DA] font-medium text-sm leading-snug truncate ${isCompleted ? "line-through text-[#6B7280]" : ""}`}
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {link && (
            <button
              onClick={() => setShowSharePopup(true)}
              className="text-[#6B7280] hover:text-[#8B7CF6] transition-colors p-1 rounded"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            disabled={isDeleting}
            onClick={() => setShowDeletePopup(true)}
            className="text-[#6B7280] hover:text-red-400 transition-colors p-1 rounded disabled:opacity-30"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Type badge */}
      <span
        className={`self-start text-xs px-2 py-0.5 rounded-full border capitalize ${typeColors[type] ?? typeColors.link}`}
      >
        {type}
      </span>

      {/* AI processing indicator */}
      {isProcessing && (
        <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
          <Loader2 className="w-3 h-3 animate-spin text-[#8B7CF6]" />
          <span>AI summary generating…</span>
        </div>
      )}

      {/* Body text: aiSummary (when ready) or description */}
      {bodyText && (
        <div>
          {metadataStatus === "completed" && aiSummary ? (
            <div>
              <p className="text-[9px] uppercase tracking-widest text-[#8B7CF6] mb-1 font-medium">
                AI Summary
              </p>
              <p className="text-[#9AA0AE] text-xs leading-relaxed line-clamp-4">
                {bodyText}
              </p>
            </div>
          ) : (
            <p className="text-[#9AA0AE] text-xs leading-relaxed line-clamp-3">
              {bodyText}
            </p>
          )}
        </div>
      )}

      {/* Failed metadata notice */}
      {metadataStatus === "failed" && (
        <p className="text-xs text-red-400/70">AI processing failed.</p>
      )}

      {/* Due date */}
      {dueDate && (
        <div className="inline-flex items-center gap-1.5 text-xs text-[#F4B400] border border-[#F4B400]/30 bg-[#F4B400]/10 rounded-full px-2.5 py-1 self-start">
          Due{" "}
          {new Date(dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </div>
      )}

      {/* Embedded content */}
      {type === "youtube" && link && (
        <iframe
          className="w-full rounded-lg aspect-video mt-1"
          src={link.replace("watch", "embed").replace("?v=", "/")}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}

      {type === "twitter" && link && <TwitterEmbed link={link} />}

      {/* Uploaded image preview */}
      {type === "image" && cloudinaryUrl && (
        <img
          src={cloudinaryUrl}
          alt={title}
          className="w-full rounded-lg object-cover max-h-56 mt-1"
          loading="lazy"
        />
      )}

      {/* Link preview — "link" type uses the user-entered link;
          "document" type uses the uploaded file's Cloudinary URL */}
      {type === "link" && link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-[#8B7CF6] hover:text-[#A395FF] transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          <span className="truncate">{link}</span>
        </a>
      )}

      {type === "document" && cloudinaryUrl && (
        <a
          href={cloudinaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-[#8B7CF6] hover:text-[#A395FF] transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          <span className="truncate">View document</span>
        </a>
      )}

      {/* AI Tags */}
      {aiTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {aiTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-xs text-[#ECE7DA] bg-white/5 border border-white/10 rounded-full px-2 py-0.5"
            >
              <Tag className="w-2.5 h-2.5 text-[#F4B400]" />
              {tag}
            </span>
          ))}
        </div>
      )}

      <Popup
        open={showDeletePopup}
        text="Delete this entry? This can't be undone."
        confirmLabel="Delete"
        cancelLabel="Keep it"
        danger
        onConfirm={() => deleteMutation(id)}
        onCancel={() => setShowDeletePopup(false)}
      />
      <Popup
        open={showSharePopup}
        text="Copy this link to clipboard?"
        onConfirm={handleShare}
        onCancel={() => setShowSharePopup(false)}
      />
    </div>
  );
}

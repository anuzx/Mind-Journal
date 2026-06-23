import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { X, Youtube, Twitter, FileText, Link2, StickyNote } from "lucide-react";
import { ContentType, postContent } from "../api/content";
import { Button } from "./Button";
import { Input } from "./Input";

interface CreateContentModelProps {
  open: boolean;
  onClose: () => void;
}

const TYPES: { label: string; value: ContentType; icon: React.ReactNode }[] = [
  {
    label: "YouTube",
    value: ContentType.Youtube,
    icon: <Youtube className="w-3.5 h-3.5" />,
  },
  {
    label: "Twitter",
    value: ContentType.Twitter,
    icon: <X className="w-3.5 h-3.5" />,
  },
  {
    label: "Document",
    value: ContentType.Document,
    icon: <FileText className="w-3.5 h-3.5" />,
  },
  {
    label: "Link",
    value: ContentType.Link, // fixed: was ContentType.Links
    icon: <Link2 className="w-3.5 h-3.5" />,
  },
  {
    label: "Note",
    value: ContentType.Note,
    icon: <StickyNote className="w-3.5 h-3.5" />,
  },
];

export function CreateContentModel({ open, onClose }: CreateContentModelProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);

  const [type, setType] = useState<ContentType>(ContentType.Youtube);

  const queryClient = useQueryClient();

  const { mutate: createContent, isPending } = useMutation({
    mutationFn: postContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      onClose();
    },
    onError: () => alert("Failed to save. Please try again."),
  });

  function addContent() {
    const rawTags = tagsRef.current?.value ?? "";
    const tags = rawTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // Per schema: link required for youtube/twitter/link types
    // description required for note type
    // dueDate only valid for note type
    createContent({
      title: titleRef.current?.value || undefined,
      link: needsLink ? linkRef.current?.value || undefined : undefined,
      description: descriptionRef.current?.value || undefined,
      type,
      tags,
      dueDate:
        type === ContentType.Note
          ? dueDateRef.current?.value || undefined
          : undefined,
    });
  }

  // Schema: link is required for youtube, twitter, link
  const needsLink = [
    ContentType.Youtube,
    ContentType.Twitter,
    ContentType.Link,
  ].includes(type);
  // Schema: description is required for note (show textarea hint)
  const isNote = type === ContentType.Note;

  if (!open) return null;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[#11151D] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-[0_0_80px_-20px_rgba(139,124,246,0.4)]">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-lg font-medium text-[#ECE7DA]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Add to your vault
            </h2>
            <button
              onClick={onClose}
              className="text-[#6B7280] hover:text-[#ECE7DA] transition-colors p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Type selector */}
          <div className="mb-5">
            <p className="text-xs text-[#9AA0AE] uppercase tracking-wide font-medium mb-2">
              Type
            </p>
            <div className="flex flex-wrap gap-2">
              {TYPES.map(({ label, value, icon }) => (
                <button
                  key={value}
                  onClick={() => setType(value)}
                  className={`
                    flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all duration-150
                    ${
                      type === value
                        ? "bg-[#8B7CF6] text-[#0B0E14] border-[#8B7CF6] font-medium"
                        : "bg-white/5 text-[#9AA0AE] border-white/10 hover:border-white/20 hover:text-[#ECE7DA]"
                    }
                  `}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-1">
            {/* Title: optional for note, relevant for all */}
            <Input reference={titleRef} placeholder="Title" label="Title" />

            {/* Link: required for youtube / twitter / link */}
            {needsLink && (
              <Input
                reference={linkRef}
                placeholder="https://..."
                label={`Link ${needsLink ? "(required)" : ""}`}
              />
            )}

            {/* Description: required for note, optional for others */}
            <Input
              reference={descriptionRef}
              placeholder={isNote ? "Write your note…" : "What's this about?"}
              label={`Description${isNote ? " (required)" : ""}`}
            />

            {/* Tags: available for all types */}
            <Input
              reference={tagsRef}
              placeholder="ai, research, todo"
              label="Tags (comma-separated)"
            />

            {/* Due date: only valid for notes per schema */}
            {isNote && (
              <Input
                reference={dueDateRef}
                placeholder=""
                type="date"
                label="Due date (optional)"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="ghost" text="Cancel" onClick={onClose} />
            <Button
              variant="primary"
              text="Save"
              onClick={addContent}
              loading={isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

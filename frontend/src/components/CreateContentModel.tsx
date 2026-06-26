import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { X, Youtube, Image, FileText, Link2, StickyNote } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { ContentType, postContent } from "../api/content";
import { uploadToCloudinary } from "../api/upload";
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
    icon: <FaXTwitter className="w-3.5 h-3.5" />,
  },
  {
    label: "Document",
    value: ContentType.Document,
    icon: <FileText className="w-3.5 h-3.5" />,
  },
  {
    label: "Images",
    value: ContentType.Image,
    icon: <Image className="w-3.5 h-3.5" />,
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
  const titleRef = useRef<HTMLInputElement | null>(null);
  const linkRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const dueDateRef = useRef<HTMLInputElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [type, setType] = useState<ContentType>(ContentType.Youtube);
  const [isUploading, setIsUploading] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: createContent, isPending } = useMutation({
    mutationFn: postContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      onClose();
    },
    onError: () => alert("Failed to save. Please try again."),
  });

  async function addContent() {
    const file = fileRef.current?.files?.[0];

    if (needsFile && !file) {
      alert(`Please choose ${isImage ? "an image" : "a document"} to upload.`);
      return;
    }

    let cloudinaryUrl: string | undefined;
    let publicId: string | undefined;
    let resourceType: "image" | "raw" | undefined;

    if (needsFile && file) {
      setIsUploading(true);
      try {
        const uploaded = await uploadToCloudinary(file);
        cloudinaryUrl = uploaded.cloudinaryUrl;
        publicId = uploaded.publicId;
        resourceType = uploaded.resourceType;
      } catch {
        alert("Failed to upload file. Please try again.");
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    createContent({
      title: titleRef.current?.value || undefined,
      link: needsLink ? linkRef.current?.value || undefined : undefined,
      description: descriptionRef.current?.value || undefined,
      type,
      cloudinaryUrl,
      publicId,
      resourceType,
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
  const isImage = type === ContentType.Image;
  const isDocument = type === ContentType.Document;
  const needsFile = isImage || isDocument;
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
            {needsFile && (
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#ECE7DA]">
                  {isImage ? "Image" : "Document"}
                </label>

                <input
                  ref={fileRef}
                  type="file"
                  accept={
                    isImage ? "image/*" : ".pdf,.doc,.docx,.txt,.ppt,.pptx"
                  }
                  className="
                    bg-white/5
                    border border-white/10
                    rounded-lg
                    px-3 py-2
                    text-sm text-[#ECE7DA]
                    file:bg-[#8B7CF6]
                    file:border-0
                    file:text-[#0B0E14]
                    file:px-3
                    file:py-1
                    file:rounded-md
                    file:mr-3
                  "
                />
              </div>
            )}
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
              text={isUploading ? "Uploading…" : "Save"}
              onClick={addContent}
              loading={isUploading || isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

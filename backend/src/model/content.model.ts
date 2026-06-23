import mongoose, { Schema } from "mongoose";

export const contentTypes = [
  "youtube",
  "twitter",
  "image",
  "document",
  "link",
  "note",
] as const;
export type ContentType = (typeof contentTypes)[number];

// types that do NOT require a `link` — image/document are backed by a
// Cloudinary file instead, and notes have no external source at all
const typesWithoutLink: ContentType[] = ["image", "document", "note"];

// types that ARE backed by an actual Cloudinary upload
const typesWithCloudinaryFile: ContentType[] = ["image", "document"];

const metadataStatuses = [
  "pending",
  "processing",
  "completed",
  "failed",
] as const;
export type MetadataStatus = (typeof metadataStatuses)[number];

const cloudinaryResourceTypes = ["image", "raw"] as const;
export type CloudinaryResourceType = (typeof cloudinaryResourceTypes)[number];

const contentSchema = new Schema(
  {
    link: {
      type: String,
      required: function (this: any) {
        return !typesWithoutLink.includes(this.type);
      },
    },
    type: {
      type: String,
      enum: contentTypes,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },

    // Cloudinary fields — only populated for image / document content,
    // since those are the two types uploaded as files rather than
    // linked or typed directly.
    cloudinaryUrl: {
      type: String,
      required: function (this: any) {
        return typesWithCloudinaryFile.includes(this.type);
      },
    },
    publicId: {
      type: String,
      required: function (this: any) {
        return typesWithCloudinaryFile.includes(this.type);
      },
    },
    resourceType: {
      type: String,
      enum: cloudinaryResourceTypes,
      required: function (this: any) {
        return typesWithCloudinaryFile.includes(this.type);
      },
    },

    // AI-generated fields
    aiSummary: {
      type: String,
      default: "",
    },
    aiTags: {
      type: [String],
      default: [],
    },
    searchText: {
      type: String,
      default: "",
    },
    metadataStatus: {
      type: String,
      enum: metadataStatuses,
      default: "pending",
    },
    metadataError: {
      type: String,
    },
    processingAttempts: {
      type: Number,
      default: 0,
    },

    // Todo-style fields — only meaningful for type "note". Defaults are
    // conditional on `this.type` so other content types don't pick up a
    // stray dueDate/isCompleted just because the schema has the field.
    dueDate: {
      type: Date,
      default: function (this: any) {
        return this.type === "note" ? new Date() : undefined;
      },
    },
    isCompleted: {
      type: Boolean,
      default: function (this: any) {
        return this.type === "note" ? false : undefined;
      },
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

// text index for search
contentSchema.index({ searchText: "text" });

// supports fetching a user's notes/todos sorted or filtered by due date
contentSchema.index({ userId: 1, type: 1, dueDate: 1 });

export const ContentModel = mongoose.model("Content", contentSchema);

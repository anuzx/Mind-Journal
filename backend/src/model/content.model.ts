import mongoose, { Schema } from "mongoose";

export const contentTypes = [
  "youtube",
  "twitter",
  "image",
  "document",
  "link",
] as const;
export type ContentType = (typeof contentTypes)[number];

// types that do NOT require a link
const typesWithoutLink: ContentType[] = ["image", "document"];

const metadataStatuses = [
  "pending",
  "processing",
  "completed",
  "failed",
] as const;
export type MetadataStatus = (typeof metadataStatuses)[number];

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

export const ContentModel = mongoose.model("Content", contentSchema);

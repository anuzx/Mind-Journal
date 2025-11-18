import mongoose, { Schema } from "mongoose";

const contentType = ["image", "video", "article", "audio" , "text"];

const contentSchema = new Schema(
  {
    link: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: contentType,
      requried: true,
    },
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Content = mongoose.model("Content", contentSchema);

import mongoose, { Schema } from "mongoose";

const contentSchema = new Schema(
  {
    link: {
      type: String,
    },
    type: {
      type: String,
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
    },
  },
  { timestamps: true }
);

export const Content = mongoose.model("Content", contentSchema);

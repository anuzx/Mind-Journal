import mongoose, { Schema } from "mongoose";

const contentType = ["youtube", "twitter", ];

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
    description: {
      type: String,
      require: true
    },
    tags: {
  type: [mongoose.Schema.Types.ObjectId],
  ref: "Tag",
  default: []
},

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const ContentModel = mongoose.model("Content", contentSchema);

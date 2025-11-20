import mongoose, { Schema } from "mongoose";

const tagSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

export const TagModel = mongoose.model("Tag", tagSchema);

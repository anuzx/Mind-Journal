import mongoose, { Schema } from "mongoose";

const tagSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

export const Tag = mongoose.model("Tag" , tagSchema)
import { z } from "zod";
import { contentTypes } from "../model/content.model.js";

export const SignupSchema = z.object({
  email: z.email(),
  username: z.string().min(3).max(20),
  password: z.string().min(6),
});

export const SigninSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const ContentSchema = z
  .object({
    type: z.enum(contentTypes),
    title: z.string().trim().optional(),
    description: z.string().trim().optional().default(""),
    link: z.url().optional(),
    cloudinaryUrl: z.url().optional(),
    publicId: z.string().optional(),
    resourceType: z.enum(["image", "raw"]).optional(),
    tweetText: z.string().optional(),
    dueDate: z.coerce.date().optional(),
    isCompleted: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (["youtube", "twitter", "link"].includes(data.type)) {
        return !!data.link;
      }
      return true;
    },
    {
      message: "link is required for youtube, twitter, and link content types",
    },
  )
  .refine(
    (data) => {
      if (["image", "document"].includes(data.type)) {
        return !!data.cloudinaryUrl && !!data.publicId && !!data.resourceType;
      }
      return true;
    },
    {
      message:
        "cloudinaryUrl, publicId, and resourceType are required for image and document content types",
    },
  )
  .refine(
    (data) => {
      if (data.type === "note") {
        return !!data.description && data.description.trim().length > 0;
      }
      return true;
    },
    { message: "description is required for note content type" },
  )
  .refine(
    (data) => {
      if (data.type !== "note") {
        return data.dueDate === undefined && data.isCompleted === undefined;
      }
      return true;
    },
    { message: "dueDate and isCompleted are only valid for note content type" },
  );

export const resetPasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(6),
  confirmPassword: z.string(),
});

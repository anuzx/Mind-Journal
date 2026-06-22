import { z } from "zod";

export const SignupSchema = z.object({
  email: z.email(),
  username: z.string().min(3).max(20),
  password: z.string().min(6),
});

export const SigninSchema = z.object({
  email: z.email(),
  password: z.string(),
});

const typesWithoutLink = ["image", "document"] as const;

export const ContentSchema = z
  .object({
    link: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    type: z.enum(["youtube", "twitter", "image", "document", "link"]),
  })
  .refine(
    (data) =>
      (typesWithoutLink as readonly string[]).includes(data.type) ||
      !!data.link,
    { message: "link is required for this content type", path: ["link"] },
  );

export const resetPasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(6),
  confirmPassword: z.string(),
});

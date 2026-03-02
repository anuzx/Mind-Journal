import { z } from "zod"

export const SignupSchema = z.object({
  email: z.email(),
  username: z.string().min(3).max(20),
  password: z.string().min(6)
})

export const SigninSchema = z.object({
  email: z.email(),
  password: z.string()
});

export const ContentSchema = z.object({
  link: z.string(),
  title: z.string(),
  description: z.string(),
  type: z.enum(["youtube", "twitter"]),
  tags: z.array(z.string())

})

export const resetPasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(6),
  confirmPassword: z.string()
})

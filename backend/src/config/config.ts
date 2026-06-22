import dotenv from "dotenv";
dotenv.config();

const _config = {
  port: process.env.PORT,
  dburl: process.env.MONGODB_URI,
  at_jwt: process.env.ACCESSTOKEN_SECRET as string,
  rt_jwt: process.env.REFRESHTOKEN_SECRET as string,
  env: process.env.NODE_ENV,
  redis_url: process.env.REDIS_URL || "redis://localhost:6379",
  openrouter_api_key: process.env.OPENROUTER_API_KEY!,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY!,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET!,
};

export const config = Object.freeze(_config);

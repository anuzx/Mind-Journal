import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
const app = express();

app.set("trust proxy", 1);

app.use(helmet());

app.use(express.json({ limit: "1mb" }));

const allowedOrigins = [config.frontend_url];
if (config.env !== "production") {
  allowedOrigins.push("http://localhost:5173");
}

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(cookieParser());

import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";

//routes
import shareRouter from "./routes/share.route.js";
import userRouter from "./routes/user.route.js";
import contentRouter from "./routes/content.route.js";
import uploadRouter from "./routes/upload.route.js";
import { config } from "./config/config.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/share", shareRouter);
app.use("/api/v1/upload", uploadRouter);

app.use((req, _res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  (error as any).statusCode = 404;
  next(error);
});

app.use(globalErrorHandler);

export { app };

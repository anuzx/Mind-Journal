import cors from "cors";
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser"
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(cookieParser())
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";

//routes
import mindRouter from "./routes/mind.routes.js";
import userRouter from "./routes/user.routes.js";


app.use("/api/v1/user", userRouter);

app.use("/api/v1/mind", mindRouter);

app.use(globalErrorHandler)

export { app };

import "dotenv/config";
import express from "express";
const app = express();
import { LinkModel } from "./model/link.model.js";
app.use(express.json());
//routes
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/user", userRouter);

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.get("/api/v1/brain/:sharelink", (req, res) => {});

export { app };

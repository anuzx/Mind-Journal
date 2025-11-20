import "dotenv/config";
import express from "express";
const app = express();
import { LinkModel } from "./model/link.model.js";
app.use(express.json());
//routes
import userRouter from "./routes/user.routes.js";
import { ContentModel } from "./model/content.model.js";
import { AuthMiddleware } from "./middlewares/auth.middleware.js";

app.use("/api/v1/user", userRouter);

app.post("/api/v1/brain/share", (req, res) => {});



app.delete("/api/v1/content",AuthMiddleware, async(req, res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        //@ts-expect-error
        userId: req.userId
    })
    res.json({
        message: "Deleted"
    })
});

app.get("/api/v1/brain/:sharelink", (req, res) => {});

export { app };

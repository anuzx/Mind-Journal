import "dotenv/config";
import express from "express";
import cors from "cors"
const app = express();
import { LinkModel } from "./model/link.model.js";
app.use(express.json());
app.use(cors({
   origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));



//routes
import userRouter from "./routes/user.routes.js";
import { ContentModel } from "./model/content.model.js";
import { AuthMiddleware } from "./middlewares/auth.middleware.js";
import { random } from "./utils.js";
import { UserModel } from "./model/users.model.js";

app.use("/api/v1/user", userRouter);

app.delete("/api/v1/user/content", AuthMiddleware, async (req, res) => {
  const contentId = req.body.contentId;

  await ContentModel.deleteMany({
    contentId,

    userId: req.userId,
  });
  res.json({
    message: "Deleted",
  });
});

app.post("/api/v1/mind/share", AuthMiddleware, async (req, res) => {
  const share = req.body.share;

  if (share) {
    const existingLink = await LinkModel.findOne({
      userId: req.userId,
    });

    if (existingLink) {
      res.json({
        hash: existingLink.hash,
      });
      return;
    }

    const hash = random(10);
    await LinkModel.create({
      userId: req.userId,
      hash: hash,
    });
    res.json({
      message: "/share/" + hash,
    });
  } else {
    //if the user wants to disable the url
    LinkModel.deleteOne({
      userId: req.userId,
    });

    res.json({
      message: "removed link",
    });
  }
});

app.get("/api/v1/mind/:sharelink", async (req, res) => {
  const hash = req.params.sharelink;

  const link = await LinkModel.findOne({
    hash,
  });
  if (!link) {
    res.status(404).json({
      message: "link is incorrect",
    });
    return; //early return instead of else
  }

  //if link is correct we will get all the content on that link
  const content = await ContentModel.find({
    userId: link.userId,
  });
  //user information
  const user = await UserModel.findOne({
    _id: link.userId,
  });
  if (!user) {
    res.status(404).json({
      message: "user not found",
    });
    return;
  }
  res.json({
    username: user.username,
    content: content,
  });
});

export { app };

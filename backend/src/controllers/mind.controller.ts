import type { Request, Response } from "express";
import { LinkModel } from "../model/link.model.js";
import { random } from "../utils/utils.js";
import { ContentModel } from "../model/content.model.js";
import { UserModel } from "../model/users.model.js";

export const shareLink = async (req: Request, res: Response) => {
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
}

export const getSharedLink = async (req: Request, res: Response) => {
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
}

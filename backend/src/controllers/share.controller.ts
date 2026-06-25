import type { Request, Response } from "express";
import { LinkModel } from "../model/link.model.js";
import { random } from "../services/link.js";
import { ContentModel } from "../model/content.model.js";
import { UserModel } from "../model/users.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiResponse.js";

export const shareLink = asyncHandler(async (req: Request, res: Response) => {
  const share = req.body.share;

  if (share) {
    const existingLink = await LinkModel.findOne({
      userId: req.userId,
    });

    if (existingLink) {
      res.json(new ApiRes(200, "share link", { hash: existingLink.hash }));
      return;
    }

    const hash = random(10);
    await LinkModel.create({
      userId: req.userId,
      hash: hash,
    });

    res.json(new ApiRes(201, "share link created", { hash }));
    return;
  }

  // user wants to disable the share link
  await LinkModel.deleteOne({
    userId: req.userId,
  });

  res.json(new ApiRes(200, "removed link", null));
});

export const getSharedLink = asyncHandler(
  async (req: Request, res: Response) => {
    const hash = req.params.share;

    const link = await LinkModel.findOne({
      hash,
    });
    if (!link) {
      throw new ApiError("link is incorrect", 404);
    }

    // link is valid — fetch all content belonging to that user
    const content = await ContentModel.find({
      userId: link.userId,
    }).sort({ createdAt: -1 });

    const user = await UserModel.findOne({
      _id: link.userId,
    }).select("-password -refreshToken");

    if (!user) {
      throw new ApiError("user not found", 404);
    }

    res.json(
      new ApiRes(200, "shared vault", {
        username: user.username,
        content,
      }),
    );
  },
);

import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ContentModel } from "../model/content.model.js";
import { ContentSchema } from "../validator/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiResponse.js";
import { metadataQueue } from "../queues/metadata.queue.js";

export const postContent = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = ContentSchema.safeParse(req.body);

  if (!parsedData.success) {
    throw new ApiError("INVALID_REQUEST", 400);
  }

  const { link, description, type, title, tweetText } = parsedData.data;

  // fallback title: use link if user didn't provide one
  // AI will generate a proper title via aiSummary after processing
  const resolvedTitle = title || link || type;

  const content = await ContentModel.create({
    link,
    type,
    title: resolvedTitle,
    description,
    userId: req.userId,
    // metadataStatus defaults to "pending" via schema
  });

  await metadataQueue.add("process-content", {
    contentId: content._id.toString(),
    type,
    link: link ?? "",
    ...(tweetText ? { tweetText } : {}),
  });

  res.status(201).json(new ApiRes(201, "content added", content));
});

export const getContent = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.userId;

  const page = Number(req.query.page) || 1;
  const limit = 8;
  const skip = (page - 1) * limit;

  if (page < 1) {
    throw new ApiError("page number must be greater than 0", 400);
  }

  const content = await ContentModel.find({ userId })
    .populate("userId", "username")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await ContentModel.countDocuments({ userId });

  res.json(
    new ApiRes(200, "All content", {
      content,
      currentPage: page,
      totalItems: total,
    }),
  );
});

export const getContentById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const content = await ContentModel.findOne({ _id: id, userId: req.userId });

    if (!content) {
      throw new ApiError("content not found", 404);
    }

    res.json(new ApiRes(200, "content", content));
  },
);

export const delContent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params; // now from route param, not body

  const deleted = await ContentModel.findOneAndDelete({
    _id: id,
    userId: req.userId,
  });

  if (!deleted) {
    throw new ApiError("content not found", 404);
  }

  res.json(new ApiRes(200, "deleted", null));
});

export const searchContent = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;
    const q = req.query.q as string;

    if (!q || !q.trim()) {
      throw new ApiError("search query is required", 400);
    }

    const results = await ContentModel.find(
      { userId, $text: { $search: q } },
      { score: { $meta: "textScore" } },
    ).sort({ score: { $meta: "textScore" } });

    res.json(new ApiRes(200, "search results", results));
  },
);

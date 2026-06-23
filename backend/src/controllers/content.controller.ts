import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ContentModel } from "../model/content.model.js";
import { ContentSchema } from "../validator/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiResponse.js";
import { metadataQueue } from "../queues/metadata.queue.js";
import { deleteCloudinaryAsset } from "../services/cloudinary.service.js";

const postContent = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = ContentSchema.safeParse(req.body);

  if (!parsedData.success) {
    throw new ApiError("INVALID_REQUEST", 400);
  }

  const {
    link,
    description,
    type,
    title,
    tweetText,
    cloudinaryUrl,
    publicId,
    resourceType,
    dueDate,
    isCompleted,
  } = parsedData.data;

  // fallback title: use link if user didn't provide one
  // AI will generate a proper title via aiSummary after processing
  const resolvedTitle = title || link || type;

  const content = await ContentModel.create({
    link,
    type,
    title: resolvedTitle,
    description,
    cloudinaryUrl,
    publicId,
    resourceType,
    dueDate,
    isCompleted,
    userId: req.userId,
    // metadataStatus defaults to "pending" via schema
  });

  await metadataQueue.add("process-content", {
    contentId: content._id.toString(),
    type,
    link,
    cloudinaryUrl,
    ...(tweetText ? { tweetText } : {}),
  });

  res.status(201).json(new ApiRes(201, "content added", content));
});

const getContent = asyncHandler(async (req: Request, res: Response) => {
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

const getContentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const content = await ContentModel.findOne({ _id: id, userId: req.userId });

  if (!content) {
    throw new ApiError("content not found", 404);
  }

  res.json(new ApiRes(200, "content", content));
});

const delContent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params; // from route param, not body

  const deleted = await ContentModel.findOneAndDelete({
    _id: id,
    userId: req.userId,
  });

  if (!deleted) {
    throw new ApiError("content not found", 404);
  }

  if (deleted.publicId) {
    await deleteCloudinaryAsset(
      deleted.publicId,
      deleted.resourceType ?? "image",
    );
  }

  res.json(new ApiRes(200, "deleted", null));
});

const searchContent = asyncHandler(async (req: Request, res: Response) => {
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
});

const getNotes = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.userId;
  const dateParam = req.query.date as string | undefined;

  const filter: Record<string, unknown> = { userId, type: "note" };

  if (dateParam) {
    const start = new Date(dateParam);
    if (Number.isNaN(start.getTime())) {
      throw new ApiError("invalid date format, expected YYYY-MM-DD", 400);
    }
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    filter.dueDate = { $gte: start, $lt: end };
  }

  const notes = await ContentModel.find(filter).sort({
    dueDate: 1,
    createdAt: 1,
  });

  res.json(new ApiRes(200, "notes", notes));
});

const toggleNoteComplete = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const content = await ContentModel.findOne({ _id: id, userId: req.userId });

  if (!content) {
    throw new ApiError("content not found", 404);
  }

  if (content.type !== "note") {
    throw new ApiError("only note content can be marked complete", 400);
  }

  content.isCompleted = !content.isCompleted;
  await content.save();

  res.json(new ApiRes(200, "note updated", content));
});

export {
  postContent,
  getContent,
  getContentById,
  delContent,
  getNotes,
  toggleNoteComplete,
  searchContent,
};

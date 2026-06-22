import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiResponse.js";
import {
  generateUploadSignature,
  type CloudinaryResourceType,
} from "../services/cloudinary.service.js";

const ALLOWED_RESOURCE_TYPES: CloudinaryResourceType[] = ["image", "raw"];

export const getUploadSignature = asyncHandler(
  async (req: Request, res: Response) => {
    const resourceType = req.query.resourceType as CloudinaryResourceType;

    if (!resourceType || !ALLOWED_RESOURCE_TYPES.includes(resourceType)) {
      throw new ApiError(
        `resourceType must be one of: ${ALLOWED_RESOURCE_TYPES.join(", ")}`,
        400,
      );
    }

    const userId = req.userId;
    if (!userId) {
      throw new ApiError("unauthorized", 401);
    }

    const payload = generateUploadSignature({ userId, resourceType });

    res.json(new ApiRes(200, "upload signature generated", payload));
  },
);

import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { ApiError } from "../utils/ApiError.js";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization; // raw token

  if (!token) {
    throw new ApiError("Authorization token missing", 401);
  }

  try {
    const decoded = jwt.verify(token, config.at_jwt) as { id: string };

    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

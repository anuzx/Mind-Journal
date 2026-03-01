import type { NextFunction, Request, Response } from "express";
import type { HttpError } from "http-errors";
import { config } from "../config/config.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiResponse.js";

const globalErrorHandler = (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {

  if (!(err instanceof ApiError)) {
    return res.status(500).json(new ApiRes(
      500,
      err.message ?? "internal server error",
      null))
  }
  return res.status(err.statusCode).json({
    message: err.message,
    errorStack: config.env === "development" ? err.stack : ""
  })
}

export { globalErrorHandler }

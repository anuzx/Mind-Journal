import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { getUploadSignature } from "../controllers/upload.controller.js";

const router = Router();

// GET /api/upload/signature?resourceType=image|raw
router.get("/signature", AuthMiddleware, getUploadSignature);

export default router;

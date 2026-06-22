import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { getSharedLink, shareLink } from "../controllers/share.controller.js";

const router = Router();

router.route("/").post(AuthMiddleware, shareLink);

router.route("/:share").get(AuthMiddleware, getSharedLink);

export default router;

import { Router } from "express";
import {
  delContent,
  getContent,
  getContentById,
  getNotes,
  postContent,
  searchContent,
  toggleNoteComplete,
} from "../controllers/content.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { contentRateLimit } from "../services/ratelimiter.js";

const router = Router();

router.use(AuthMiddleware, contentRateLimit);

router.route("/").get(getContent).post(postContent);

router.get("/search", searchContent);
router.get("/notes", getNotes);
router.patch("/:id/toggle-complete", toggleNoteComplete);
router.get("/:id", getContentById);
router.delete("/:id", delContent);

export default router;

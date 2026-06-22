import { Router } from "express";
import {
  delContent,
  getContent,
  getContentById,
  postContent,
  searchContent,
} from "../controllers/content.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(AuthMiddleware);

router.route("/").get(getContent).post(postContent);

router.get("/search", searchContent); // must come before /:id
router.get("/:id", getContentById);
router.delete("/:id", delContent);

export default router;

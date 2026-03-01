import { Router } from "express";
import { delContent, getContent, postContent, signIn, signUp } from "../controllers/user.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { loginRateLimit } from "../utils/ratelimiter.js";

const router = Router();

router.route("/signup").post(signUp)
router.route("/signin").post(loginRateLimit, signIn)
router.route("/content")
  .get(AuthMiddleware, getContent)
  .post(AuthMiddleware, postContent)
  .delete(AuthMiddleware, delContent)


export default router;

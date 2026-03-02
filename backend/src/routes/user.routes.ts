import { Router } from "express";
import { delContent, getContent, logOut, postContent, refreshAccessToken, resetPassword, signIn, signUp } from "../controllers/user.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { loginRateLimit, resetPassRateLimit } from "../utils/ratelimiter.js";

const router = Router();

router.route("/signup").post(signUp)
router.route("/signin").post(loginRateLimit, signIn)
router.route("/content")
  .get(AuthMiddleware, getContent)
  .post(AuthMiddleware, postContent)
  .delete(AuthMiddleware, delContent)

router.post("/logout", AuthMiddleware, logOut)
router.patch("/me/reset-password", AuthMiddleware, resetPassRateLimit, resetPassword)
router.post("/refresh-access-token", refreshAccessToken)
export default router;

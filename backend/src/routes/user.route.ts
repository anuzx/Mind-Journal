import { Router } from "express";
import {
  logOut,
  refreshAccessToken,
  resetPassword,
  signIn,
  signUp,
} from "../controllers/user.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { loginRateLimit, resetPassRateLimit } from "../services/ratelimiter.js";

const router = Router();

router.route("/signup").post(signUp);
router.route("/signin").post(loginRateLimit, signIn);

router.post("/refresh-access-token", refreshAccessToken);

router.post("/logout", AuthMiddleware, logOut);

router.patch(
  "/me/reset-password",
  AuthMiddleware,
  resetPassRateLimit,
  resetPassword,
);

export default router;

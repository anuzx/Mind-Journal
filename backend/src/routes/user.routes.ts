import { Router } from "express";
import {  getContent, postContent, signIn, signUp } from "../controllers/user.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/signup").post(signUp)
router.route("/signin").post(signIn)
router.route("/content").post(AuthMiddleware, postContent)
router.route("/content").get(AuthMiddleware , getContent )


export default router;
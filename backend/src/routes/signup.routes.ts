import { Router } from "express";
import { signUp } from "../controllers/signup.controller.js";

const router = Router();

router.route("/signup").post(signUp)

export default router;
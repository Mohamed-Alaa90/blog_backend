import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import photoUpload from "../middlewares/photoUpload.js";
import { createPost } from "../controllers/postController.js";

const router = Router();

router.route("/").post(verifyToken, photoUpload.single("image"), createPost);

export default router;

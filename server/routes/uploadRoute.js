import { Router } from "express";
import { uploadImage, deleteImage } from "../controllers/uploadController.js";
import photoUpload from "../middlewares/photoUpload.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

// /api/upload
router.route("/").post(verifyToken, photoUpload.single("image"), uploadImage);

// /api/upload/:id
router.route("/:id").delete(verifyToken, deleteImage);

export default router;

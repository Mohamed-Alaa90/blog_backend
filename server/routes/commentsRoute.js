import { Router } from "express";
import {
    createComment,
    updateComment,
    deleteComment,
} from "../controllers/commentController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

// /api/comments
router.route("/").post(verifyToken, createComment);

// /api/comments/:id
router
    .route("/:id")
    .put(verifyToken, updateComment)
    .delete(verifyToken, deleteComment);

export default router;

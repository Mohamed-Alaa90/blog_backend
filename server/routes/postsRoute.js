import { Router } from "express";
import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
} from "../controllers/postController.js";

const router = Router();

// /api/posts
router.route("/").post(createPost).get(getAllPosts);

// /api/posts/:id
router.route("/:id").get(getPostById).put(updatePost).delete(deletePost);

export default router;

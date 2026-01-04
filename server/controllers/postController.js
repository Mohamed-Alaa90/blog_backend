import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";
import {
    createPostValidation,
    updatePostValidation,
} from "../validation/postValidation.js";

/**
 * @description Create a new post
 * @router /api/posts
 * @method POST
 * @access private
 */
export const createPost = asyncHandler(async (req, res) => {
    const { error } = createPostValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const post = await Post.create(req.body);

    res.status(201).json({
        success: true,
        data: post,
    });
});

/**
 * @description Get all posts
 * @router /api/posts
 * @method GET
 * @access public
 */
export const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        count: posts.length,
        data: posts,
    });
});

/**
 * @description Get single post by ID
 * @router /api/posts/:id
 * @method GET
 * @access public
 */
export const getPostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({
        success: true,
        data: post,
    });
});

/**
 * @description Update post by ID
 * @router /api/posts/:id
 * @method PUT
 * @access private
 */
export const updatePost = asyncHandler(async (req, res) => {
    const { error } = updatePostValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                title: req.body.title,
                content: req.body.content,
                summary: req.body.summary,
                article_type: req.body.article_type,
                image_url: req.body.image_url,
                post_type: req.body.post_type,
            },
        },
        { new: true }
    );

    res.status(200).json({
        success: true,
        data: updatedPost,
    });
});

/**
 * @description Delete post by ID
 * @router /api/posts/:id
 * @method DELETE
 * @access private
 */
export const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Post deleted successfully",
    });
});

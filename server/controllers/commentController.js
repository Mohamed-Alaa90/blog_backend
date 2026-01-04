import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";
import User from "../models/User.js";

/**
 * @description Create a comment
 * @router /api/comments
 * @method POST
 * @access private
 */
export const createComment = asyncHandler(async (req, res) => {
    const { postId, text } = req.body;

    if (!text) {
        return res.status(400).json({ message: "Text is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    const user = await User.findById(req.user.id);

    const newComment = {
        user: req.user.id,
        username: user.username, // storing username for easier display
        text,
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json(post);
});

/**
 * @description Update a comment
 * @router /api/comments/:id
 * @method PUT
 * @access private
 */
export const updateComment = asyncHandler(async (req, res) => {
    const { postId, text } = req.body;
    const commentId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }

    // Check if user is owner of the comment
    if (comment.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "Access denied, only owner can edit" });
    }

    comment.text = text || comment.text;
    await post.save();

    res.status(200).json(post);
});

/**
 * @description Delete a comment
 * @router /api/comments/:id
 * @method DELETE
 * @access private
 */
export const deleteComment = asyncHandler(async (req, res) => {
    const { postId } = req.body; // Need postId to find the document first
    const commentId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }

    // Allow deletion if user is owner OR user is Admin
    if (req.user.isAdmin || comment.user.toString() === req.user.id) {
        await Post.findByIdAndUpdate(postId, {
            $pull: { comments: { _id: commentId } }
        }, { new: true });

        // Fetch updated post to return
        const updatedPost = await Post.findById(postId);
        res.status(200).json(updatedPost);
    } else {
        res.status(403).json({ message: "Access denied, not allowed" });
    }
});

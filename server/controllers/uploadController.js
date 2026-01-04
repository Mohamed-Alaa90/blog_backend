import ImageKit from "imagekit";
import asyncHandler from "express-async-handler";
import image_kit from "../config/imageKit.js";



/**
 * @description Upload Image
 * @router /api/upload
 * @method POST
 * @access private
 */
export const uploadImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No image provided" });
    }

    const result = await image_kit.upload({
        file: req.file.buffer, // required
        fileName: req.file.originalname, // required
    });

    res.status(200).json(result);
});

/**
 * @description Delete Image
 * @router /api/upload/:id
 * @method DELETE
 * @access private
 */
export const deleteImage = asyncHandler(async (req, res) => {
    const imageId = req.params.id;
    await image_kit.deleteFile(imageId);
    res.status(200).json({ message: "Image deleted successfully" });
});

import Joi from "joi";

export const createPostValidation = (obj) => {
    const schema = Joi.object({
        user: Joi.string().trim().required(),
        title: Joi.string().trim().min(3).max(200).required(),
        content: Joi.string().trim(),
        summary: Joi.string().trim(),
        article_type: Joi.string().trim(),
        image_url: Joi.array().items(Joi.string()),
        post_type: Joi.string()
            .valid("text", "image", "text_with_image")
            .required(),
    });
    return schema.validate(obj);
};

export const updatePostValidation = (obj) => {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200),
        content: Joi.string().trim(),
        summary: Joi.string().trim(),
        article_type: Joi.string().trim(),
        image_url: Joi.array().items(Joi.string()),
        post_type: Joi.string().valid("text", "image", "text_with_image"),
    });
    return schema.validate(obj);
};

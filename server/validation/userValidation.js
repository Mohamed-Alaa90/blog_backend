import Joi from "joi";


export const validateUpdateUser = (obj) => {
    const schema = Joi.object({
        abortEarly: false,
        username: Joi.string().trim(),
        password: Joi.string().trim().min(8),
        bio: Joi.string().trim(),
    });
    return schema.validate(obj);
}
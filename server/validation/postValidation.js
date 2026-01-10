import Joi from "joi";

export const createPostValidation = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200).required(),
    description: Joi.string().trim().required(),
    category: Joi.string().trim().required(),
  });
  return schema.validate(obj);
};

export const updatePostValidation = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200),
    description: Joi.string().trim().min(10),
    category: Joi.string().trim(),
  });
  return schema.validate(obj);
};

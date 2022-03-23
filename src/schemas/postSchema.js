import Joi from "joi";

const postSchema = Joi.object({
  link: Joi.string().required(),
  postText: Joi.string()
});

export default postSchema;

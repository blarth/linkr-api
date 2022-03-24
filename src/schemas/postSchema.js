import Joi from "joi";

const postSchema = Joi.object({
  link: Joi.string().uri().required(),
  postText: Joi.string()
});

export default postSchema;

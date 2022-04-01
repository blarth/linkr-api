import joi from "joi";

const commentSchema = joi.object({
  comment: joi.string().required(),
});

export default commentSchema;

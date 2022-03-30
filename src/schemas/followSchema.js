import joi from "joi";

const followSchema = joi.object({
  followedUserId: joi.required(),
});

export default followSchema;

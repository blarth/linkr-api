import Joi from "joi";

const signupSchema = Joi.object({
  email: Joi.email().required(),
  password: Joi.string().required(),
  username: Joi.string().required(),
  picture: Joi.uri().required(),
});

export default signupSchema;

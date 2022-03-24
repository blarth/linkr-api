import Joi from "joi";

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  username: Joi.string().required(),
  image: Joi.string()
    .uri()
    .pattern(/(https?:\/\/.*\.(?:png|jpg|jpeg|jfif|gif))/i)
    .required(),
});

export default signupSchema;

import Joi from "joi";

const signinSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export default signinSchema;

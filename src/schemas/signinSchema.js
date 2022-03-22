import Joi from "joi";

const signinSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.email().required(),
});

export default signinSchema;

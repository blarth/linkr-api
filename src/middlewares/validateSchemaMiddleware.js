export default function validateSchemaMiddleware(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      console.log(validation.error.message);
      return res.status(422).send(validation.error.message);
    }
    next();
  };
}

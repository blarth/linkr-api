import { Router } from "express";
import { signin } from "../controllers/authController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import signinSchema from "../schemas/signinSchema.js";

const authRouter = Router();
authRouter.post("/signin", validateSchemaMiddleware(signinSchema), signin);
export default authRouter;

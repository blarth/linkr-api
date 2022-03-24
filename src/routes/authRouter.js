import { Router } from "express";
import { signin, signout } from "../controllers/authController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import signinSchema from "../schemas/signinSchema.js";

const authRouter = Router();
authRouter.post("/signin", validateSchemaMiddleware(signinSchema), signin);
authRouter.delete("/signout", validateTokenMiddleware, signout);
export default authRouter;

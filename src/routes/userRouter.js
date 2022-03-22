import { Router } from "express";
import { createUser } from "../controllers/usersController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import signupSchema from "../schemas/signupSchema.js";

const userRouter = Router();
userRouter.post("/signup", validateSchemaMiddleware(signupSchema), createUser);
export default userRouter;

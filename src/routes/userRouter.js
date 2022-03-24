import { Router } from "express";
import { createUser, getUser } from "../controllers/usersController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import signupSchema from "../schemas/signupSchema.js";

const userRouter = Router();
userRouter.post("/signup", validateSchemaMiddleware(signupSchema), createUser);
userRouter.get("/users", validateTokenMiddleware, getUser);
export default userRouter;

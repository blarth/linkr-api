import { Router } from "express";
import {
  createUser,
  followUser,
  getFollower,
  getUser,
} from "../controllers/usersController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import followSchema from "../schemas/followSchema.js";
import signupSchema from "../schemas/signupSchema.js";

const userRouter = Router();
userRouter.post("/signup", validateSchemaMiddleware(signupSchema), createUser);
userRouter.get("/users", validateTokenMiddleware, getUser);
userRouter.post(
  "/users/follow",
  validateTokenMiddleware,
  validateSchemaMiddleware(followSchema),
  followUser
);
userRouter.get("/users/follow/:id", validateTokenMiddleware, getFollower);
export default userRouter;

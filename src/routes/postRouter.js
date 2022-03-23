import { Router } from "express";
import { postLink } from "../controllers/postController.js";
import postSchema from "../schemas/postSchema.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";

const postRouter = Router();

postRouter.post(
  "/timeline",
  validateTokenMiddleware,
  validateSchemaMiddleware(postSchema),
  postLink
);

export default postRouter;

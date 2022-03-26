import { Router } from "express";
import { postLink, posts, postsById } from "../controllers/postController.js";
import postSchema from "../schemas/postSchema.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import hashtagsRegex from "../middlewares/validateHashtagMiddleware.js";

const postRouter = Router();



postRouter.get("/timeline", validateTokenMiddleware, posts)

postRouter.post(
  "/timeline",
  validateTokenMiddleware,
  validateSchemaMiddleware(postSchema),
  hashtagsRegex,
  postLink
);

postRouter.get("/user/:id" , validateTokenMiddleware, postsById)


export default postRouter;

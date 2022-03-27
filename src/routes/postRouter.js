import { Router } from "express";
import {
  likePost,
  postLink,
  posts,
  postsById,
  editPost
} from "../controllers/postController.js";
import postSchema from "../schemas/postSchema.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import hashtagsRegex from "../middlewares/validateHashtagMiddleware.js";

const postRouter = Router();

postRouter.get("/timeline", validateTokenMiddleware, posts);

postRouter.post(
  "/timeline",
  validateTokenMiddleware,
  validateSchemaMiddleware(postSchema),
  hashtagsRegex,
  postLink
);

postRouter.put("/posts/:id/:status", validateTokenMiddleware, likePost);
postRouter.get("/user/:id", validateTokenMiddleware, postsById);

postRouter.patch("/posts/edit/:id", validateTokenMiddleware, validateSchemaMiddleware(postSchema), hashtagsRegex, editPost)

export default postRouter;

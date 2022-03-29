import { Router } from "express";
import {
  getAllLikes,
  likePost,
  postLink,
  posts,
  postsByHashtag,
  postsById,
  editPost,
  deletePosts
} from "../controllers/postController.js";
import postSchema from "../schemas/postSchema.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import hashtagsRegex from "../middlewares/validateHashtagMiddleware.js";


const postRouter = Router();

postRouter.get("/timeline/:offset?", validateTokenMiddleware, posts);

postRouter.post(
  "/timeline",
  validateTokenMiddleware,
  validateSchemaMiddleware(postSchema),
  hashtagsRegex,
  postLink
);

postRouter.put("/posts/:id/:status", validateTokenMiddleware, likePost);
postRouter.get(
  "/posts/hashtags/:name",
  validateTokenMiddleware,
  postsByHashtag
);
postRouter.get("/user/:id", validateTokenMiddleware, postsById);
postRouter.delete("/deletepost/:id", validateTokenMiddleware, deletePosts);


postRouter.patch("/posts/edit/:id", validateTokenMiddleware, validateSchemaMiddleware(postSchema), hashtagsRegex, editPost)
postRouter.get("/likes/:id", getAllLikes)

export default postRouter;

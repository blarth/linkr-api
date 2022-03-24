import { Router } from "express";
import { postLink, posts } from "../controllers/postController.js";
import postSchema from "../schemas/postSchema.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";

const postRouter = Router();


postRouter.get("/timeline", validateTokenMiddleware, posts)

postRouter.post(
  "/timeline",
  validateTokenMiddleware,
  validateSchemaMiddleware(postSchema),
  postLink
);


export default postRouter;

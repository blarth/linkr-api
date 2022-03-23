import { Router } from "express";
import { postLink, posts } from "../controllers/postController.js";
import postSchema from "../schemas/postSchema.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddlewares.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";


const postRouter = Router();

postRouter.post("/timeline", validateTokenMiddleware, validateSchemaMiddleware(postSchema),postLink);
postRouter.get("/timeline", validateTokenMiddleware, posts)

export default postRouter;

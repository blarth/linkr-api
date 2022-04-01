import { Router } from "express";
import { getComments, postComments } from "../controllers/commentController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js"
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import commentSchema from "../schemas/commentSchema.js";
const commentRouter = Router();

commentRouter.get("/comments/:id", validateTokenMiddleware, getComments);
commentRouter.post("/comments/:id", validateTokenMiddleware,validateSchemaMiddleware(commentSchema),postComments);

export default commentRouter;
import { Router } from "express";
import { getComments } from "../controllers/commentController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const commentRouter = Router();

commentRouter.get("/comments/:id", validateTokenMiddleware, getComments);

export default commentRouter;
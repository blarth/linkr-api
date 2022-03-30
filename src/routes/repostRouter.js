import { Router } from "express";
import { createReposts, reposts } from "../controllers/postController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";


const repostRouter = Router();

repostRouter.post("/repost/:id", validateTokenMiddleware, createReposts);
repostRouter.get("/repost/:offset", validateTokenMiddleware, reposts)

export default repostRouter;
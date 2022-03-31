import { Router } from "express";
import { createReposts } from "../controllers/repostController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";


const repostRouter = Router();

repostRouter.post("/repost/:id", validateTokenMiddleware, createReposts);
/* repostRouter.get("/repost/:offset", validateTokenMiddleware, reposts) */
/* repostRouter.get("/repost/:id", validateTokenMiddleware, getNumberReposts) */
export default repostRouter;
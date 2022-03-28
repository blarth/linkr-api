import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";
import hashtagsRouter from "./hashtagsRouter.js";
import searchBarRouter from "./searchBarRouter.js";

const router = Router();
router.use(authRouter);
router.use(userRouter);
router.use(postRouter);
router.use(hashtagsRouter);
router.use(searchBarRouter);

export default router;

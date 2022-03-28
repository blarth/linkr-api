import { Router } from "express";
import { getTrendingHashtags } from "../controllers/hashtagsController.js";

const hashtagsRouter = Router();

hashtagsRouter.get("/hashtags", getTrendingHashtags);

export default hashtagsRouter;

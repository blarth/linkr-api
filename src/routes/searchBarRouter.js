import { Router } from "express";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { getSearchBar } from "../controllers/searchBarController.js";

const searchBarRouter = Router();
searchBarRouter.get("/searchbar/:name", validateTokenMiddleware, getSearchBar);


export default searchBarRouter;

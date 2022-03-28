import { Router } from "express";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { searchBarUsers } from "../controllers/searchBarController.js";

const searchBarRouter = Router();
searchBarRouter.get("/searchbar/:name", validateTokenMiddleware, searchBarUsers);


export default searchBarRouter;

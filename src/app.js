import cors from "cors";
import express, { json } from "express";
import router from "./routes/index.js";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(json());
app.use(router);

export default router;

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port " + process.env.PORT);
});

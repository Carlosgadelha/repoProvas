import cors from "cors";
import express from "express";
import "express-async-errors";

import { errorHandlerMiddleware } from "./src/middlewares/errorMiddleware.js";
import router from "./src/routers/index.js";



const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandlerMiddleware);

export default app;

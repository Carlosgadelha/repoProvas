import { Router } from "express";
import { createTest, testPerCategories } from "../controllers/testsController.js";

const testRouter = Router();

testRouter.post("/test", createTest )
testRouter.get("/testPerCategories", testPerCategories)

export default testRouter;
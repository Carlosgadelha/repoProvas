import { Router } from "express";
import { createTest, testPerCategories, testPerTeachers } from "../controllers/testsController.js";
import { validateToken } from "../middlewares/validateToken.js";

const testRouter = Router();

testRouter.post("/test", createTest )
testRouter.get("/testPerCategories", validateToken, testPerCategories)
testRouter.get("/testPerTeachers",validateToken, testPerTeachers)

export default testRouter;
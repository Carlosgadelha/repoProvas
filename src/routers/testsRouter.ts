import { Router } from "express";
import { createTest, testPerCategories, testPerTeachers } from "../controllers/testsController.js";

const testRouter = Router();

testRouter.post("/test", createTest )
testRouter.get("/testPerCategories", testPerCategories)
testRouter.get("/testPerTeachers", testPerTeachers)

export default testRouter;
import { Router } from "express";
import testRouter from "./testsRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter)
router.use(testRouter)

export default router;
import { Router } from "express";
import { createUser, login } from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { loginSchema, userSchema } from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post("/signup", validateSchemaMiddleware(userSchema), createUser )
userRouter.post("/signin", validateSchemaMiddleware(loginSchema),login )

export default userRouter;
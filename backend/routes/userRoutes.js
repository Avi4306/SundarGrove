import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", authMiddleware, getProfile);

export default userRouter;
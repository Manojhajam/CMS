import express from "express";
import { userControllers } from "../controllers/userControllers.js";

const userRouter = express.Router()

userRouter.route("/register").get(userControllers)

export default userRouter;
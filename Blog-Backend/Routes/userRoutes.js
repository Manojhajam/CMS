import express from "express";
import { register, login } from "../Controllers/userControllers.js";

const userRouter = express.Router()

userRouter.route("/register").get(register)
userRouter.route("/login").post(login)

export default userRouter;
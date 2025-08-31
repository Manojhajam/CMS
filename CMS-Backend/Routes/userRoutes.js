import express from "express";
import { register, login, updateUser, deleteUser } from "../Controllers/userControllers.js";
import { checkAuthorization } from "../middleware/checkAuthorization.js";

const userRouter = express.Router()

userRouter.route("/register").post(register)
userRouter.route("/login").post(login)
userRouter
  .route("/:userId")
  .put(checkAuthorization, updateUser)
  .delete(checkAuthorization, deleteUser)

export default userRouter;
import express from "express";
import { register, login, updateUser, deleteUser, getProfile, changePassword } from "../Controllers/userControllers.js";
import { checkAuthorization } from "../middleware/checkAuthorization.js";

const userRouter = express.Router()

userRouter.route("/register").post(register)
userRouter.route("/login").post(login)
userRouter.route("/profile").get(checkAuthorization, getProfile);
userRouter
  .route("/:userId")
  .put(checkAuthorization, updateUser)
  .delete(checkAuthorization, deleteUser)
  .patch(checkAuthorization, changePassword)
  

export default userRouter;
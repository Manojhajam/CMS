import express from "express";
import { checkAuthorization } from "../middleware/checkAuthorization.js";
import { createNewFaculty, createNewStudent } from "../Controllers/adminControllers.js";
import { adminLevelPermissions } from "../middleware/checkPermmission.js";
import { updateUser } from "../Controllers/userControllers.js";

const adminRouter = express.Router();

adminRouter
  .route("/students")
  .post(checkAuthorization, adminLevelPermissions, createNewStudent);

adminRouter.route("/faculty")
  .post(checkAuthorization, adminLevelPermissions, createNewFaculty);

adminRouter.route("/:userId").put(checkAuthorization, adminLevelPermissions, updateUser)


export default adminRouter;

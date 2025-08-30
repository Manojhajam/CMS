import express from "express";
import { checkAuthorization } from "../middleware/checkAuthorization.js";
import { createNewFaculty, createNewStudent } from "../Controllers/adminControllers.js";
import { adminLevelPermissions } from "../middleware/checkPermmission.js";

const adminRouter = express.Router();

adminRouter
  .route("/students")
  .post(checkAuthorization, adminLevelPermissions, createNewStudent);

adminRouter.route("/faculty").post(checkAuthorization, adminLevelPermissions, createNewFaculty);

export default adminRouter;

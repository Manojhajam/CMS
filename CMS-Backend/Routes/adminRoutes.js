import express from "express";
import { checkAuthorization } from "../middleware/checkAuthorization.js";
import {
  createNewFaculty,
  createNewStudent,
  getDashboardData,
  getStudentDetails,
} from "../Controllers/adminControllers.js";
import { adminLevelPermissions } from "../middleware/checkPermmission.js";
import { updateUser } from "../Controllers/userControllers.js";

const adminRouter = express.Router();

adminRouter
  .route("/students")
  .post(checkAuthorization, adminLevelPermissions, createNewStudent)
  .get(checkAuthorization, adminLevelPermissions, getStudentDetails);
adminRouter
  .route("/countdata")
  .get(checkAuthorization, adminLevelPermissions, getDashboardData);

adminRouter
  .route("/faculty")
  .post(checkAuthorization, adminLevelPermissions, createNewFaculty);

export default adminRouter;

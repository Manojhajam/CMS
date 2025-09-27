import express from "express";
import { checkAuthorization } from "../middleware/checkAuthorization.js";
import {
  createNewFaculty,
  createNewStudent,
  getDashboardData,
  getFaculty,
  getMembers,
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
adminRouter.route("/members").get(checkAuthorization,adminLevelPermissions, getMembers)
adminRouter
  .route("/faculty")
  .post(checkAuthorization, adminLevelPermissions, createNewFaculty)
  .get(checkAuthorization, adminLevelPermissions, getFaculty)

export default adminRouter;

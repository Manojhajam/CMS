import express from "express";
import { createCourse, getCourse, markAttendence, studyMaterial } from "../Controllers/courseControllers.js";
import { adminLevelPermissions, checkFacultyLevelPermissions } from "../middleware/checkPermmission.js";
import { checkAuthorization } from "../middleware/checkAuthorization.js";

const courseRouter = express.Router();

courseRouter.route("/").post(checkAuthorization, adminLevelPermissions, createCourse)
    .get(getCourse)

courseRouter.route("/:courseId/attendance").put(checkAuthorization, checkFacultyLevelPermissions, markAttendence)

courseRouter.route("/:courseId/materials").post(checkAuthorization, checkFacultyLevelPermissions, markAttendence)

courseRouter.route("/:courseId/materials").post(checkAuthorization, studyMaterial)

export default courseRouter;

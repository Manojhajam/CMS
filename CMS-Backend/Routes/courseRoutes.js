import express from "express";
import { createCourse, getCourse, studyMaterial, updateCourse } from "../Controllers/courseControllers.js";
import { adminLevelPermissions, checkFacultyLevelPermissions } from "../middleware/checkPermmission.js";
import { checkAuthorization } from "../middleware/checkAuthorization.js";
import { upload } from "../middleware/multer.middleware.js";

const courseRouter = express.Router();

courseRouter.route("/").post(checkAuthorization, adminLevelPermissions, createCourse)
    .get(getCourse)

// courseRouter.route("/:courseId/attendance").put(checkAuthorization, checkFacultyLevelPermissions, markAttendence)

courseRouter.route("/:courseId").put(checkAuthorization,adminLevelPermissions,updateCourse);
courseRouter.route("/:courseId/materials").post(checkAuthorization,upload.single("file"), studyMaterial)

export default courseRouter;

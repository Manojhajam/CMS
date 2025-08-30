import express from "express";
import { createCourse } from "../Controllers/courseControllers.js";
import { adminLevelPermissions } from "../middleware/checkPermmission.js";
import { checkAuthorization } from "../middleware/checkAuthorization.js";

const courseRouter = express.Router();

courseRouter.route("/").post(checkAuthorization, adminLevelPermissions, createCourse);

export default courseRouter;

import express from "express";
import { checkAuthorization } from "../middleware/checkAuthorization.js";
import {
  enrolledCourse,
  viewAttendance,
} from "../Controllers/studentControllers.js";

const studentRouter = express.Router();

studentRouter.route("/courses").get(checkAuthorization, enrolledCourse);

studentRouter.route("/attendance").get(checkAuthorization, viewAttendance);

export default studentRouter;

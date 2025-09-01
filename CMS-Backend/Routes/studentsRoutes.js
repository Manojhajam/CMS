import express from "express";
import { checkAuthorization } from "../middleware/checkAuthorization.js";
import { enrolledCourse } from "../Controllers/studentControllers.js";


const studentRouter = express.Router()

studentRouter.route("/courses").get(checkAuthorization, enrolledCourse)



export default studentRouter;
import express from "express"
import { getFacultyCourses } from "../Controllers/facultyControllers.js"
import { checkFacultyAdminLevelPermissions } from "../middleware/checkPermmission.js"
import { checkAuthorization } from "../middleware/checkAuthorization.js"

const facultyRouter = express.Router()

facultyRouter.route("/").get(checkAuthorization, getFacultyCourses)

export default facultyRouter
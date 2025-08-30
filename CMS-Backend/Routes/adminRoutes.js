import express from "express"
import { checkAuthorization } from "../middleware/checkAuthorization.js";
import { createStudent } from "../Controllers/adminControllers.js";
import { adminLevelPermissions } from "../middleware/checkPermmission.js";

const adminRouter = express.Router();

adminRouter.route("/students").post(checkAuthorization,adminLevelPermissions, createStudent)

export default adminRouter;
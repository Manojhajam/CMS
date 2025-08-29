import express from "express";
import { createStudent } from "../Controllers/studentControllers.js";
import { checkAuthorization } from "../middleware/checkAuthorization.js";


const studentRouter = express.Router()

studentRouter.route("/").post(checkAuthorization, createStudent)

export default studentRouter;
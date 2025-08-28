import express from "express";
import { createStudent } from "../Controllers/studentControllers.js";

const studentRouter = express.Router()

studentRouter.route("/").post(createStudent)

export default studentRouter;
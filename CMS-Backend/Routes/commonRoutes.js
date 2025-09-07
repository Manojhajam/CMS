import express from 'express'
import { courseDetails } from '../Controllers/commonControllers.js';

const commonRoutes = express.Router();


commonRoutes.route("/:courseId").get(courseDetails)

export default commonRoutes
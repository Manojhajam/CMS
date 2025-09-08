import express from "express";
import {adminLevelPermissions} from "../middleware/checkPermmission.js"
import { createNotification, getNotifications } from "../Controllers/notificationControllers.js";
import { checkAuthorization } from "../middleware/checkAuthorization.js";

const notificationRoutes = express.Router();

notificationRoutes
  .route("/notifications")
  .get(checkAuthorization, getNotifications)
  .post(checkAuthorization, createNotification);


export default notificationRoutes;

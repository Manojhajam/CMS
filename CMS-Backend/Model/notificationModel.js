import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  targetRole: {
    type: String,
    enum: ["All", "Student", "Faculty", "Admin"],
    default: "All",
  }, // who should see this notification
  createdAt: { type: Date, default: Date.now },
});

export const notificationModel = mongoose.model(
  "Notification",
  notificationSchema
);

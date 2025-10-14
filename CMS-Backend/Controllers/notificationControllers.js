import { notificationModel } from "../Model/notificationModel.js";

export const createNotification = async (req, res) => {
  try {
    const user = req.user; // from checkAuthorization middleware
    const { message,subject, targetRole } = req.body;

    // only admin (or faculty if you want) can create notifications
    if (user.role !== "admin" && user.role !== "faculty") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to create notifications",
      });
    }

    const notification = await notificationModel.create({
      message,
      subject,
      targetRole: targetRole || "All",
      createdBy: user._id,
    });

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: notification,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const user = req.user; // from checkAuthorization middleware

    // Fetch notifications for user role or system-wide
    const notifications = await notificationModel
      .find({
        $or: [{ targetRole: "All" }, { targetRole: user.role }],
      })
      .populate("createdBy")
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

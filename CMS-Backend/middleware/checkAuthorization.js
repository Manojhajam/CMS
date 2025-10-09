import jwt from "jsonwebtoken";
import { userModel } from "../Model/userModel.js";

export const checkAuthorization = async (req, res, next) => {
  try {
    // const token = req.headers.token;
    const token = req.headers.authorization?.split(" ").pop();
    // console.log(token)

    if (!token) {
      res.status(400).json({
        success: false,
        message: "Seems like you have been logged out!!",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(decoded);

    if (!decoded._id) {
      res.status(400).json({
        success: false,
        message: "You are unauthorized!!",
      });
    }

    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Invalid User or User not found!",
      });
    }

    req.user = user;
    next();
      
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

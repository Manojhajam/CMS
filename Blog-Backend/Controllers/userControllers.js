import { userModel } from "../Model/userModel.js";

export const register = async (req, res) => {
  try {
    const { name, email } = req.body;

    const findemail = await userModel.findOne({ email });
    if (findemail) {
      return res.status(400).json({
        success: false,
        message: `User with email ${email} already exists`,
      });
    }
    const User = await userModel.create({
      name,
      email,
    });

    return res.status(200).json({
      success: true,
      message: User,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = (req, res) => {
  res.send("This is Login Routes");
};

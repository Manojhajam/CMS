import { userModel } from "../Model/userModel.js";


export const register = async (req, res) => {
  try {
      const reqBody = req.body;
      const email = reqBody.email;

    const findemail = await userModel.findOne({ email });
    if (findemail) {
      return res.status(400).json({
        success: false,
        message: `User with email ${email} already exists`,
      });
    }
      const User = await userModel.create(reqBody);
      
      const userData = {
          name: User.name,
          email: User.email,
          role: User.role
      }

    return res.status(200).json({
      success: true,
        data: userData,
      message: `Dear ${User.name} Welcome to College Management System!`
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login =async (req, res) => {
  try {
      const reqBody = req.body;
      const email = reqBody.email;

      const foundUser =await userModel.findOne({ email })
      if (!foundUser) {
          res.status(403).json({
              success: false,
              message: "invalid Credentials"
          })
      }

      const ispassworMatched = await foundUser.isPasswordValid(
        reqBody.password
      );

      if (!ispassworMatched) {
          return res.status(200).json({
              success: true,
              message: `Password doesn't matched`
          })
      }

        const userData = {
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
      };

      return res.status(200).json({
        success: true,
        data: userData,
        message: `Welcome back ${foundUser.name}`
      });
    


  

  } catch (error) {
    console.log(error)
  }
};

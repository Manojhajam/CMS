import { userModel } from "../Model/userModel.js";
import { generateToken } from "../utils/generateToken.js";


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
              message: `Invalid Credentails`
          })
    }
    
    const token = await generateToken({ _id: foundUser?._id });

    if (!token) {
      res.status(400).json({
        success: false,
        message: "Something went wrong!!"
      })
    }

        const userData = {
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        token
      };

      return res.status(200).json({
        success: true,
        data: userData,
        message: `Welcome back ${foundUser.name}`
      });
    


  

  } catch (error) {
    console.log(error)
     res.status(500).json({
       success: false,
       message: error.message,
     });
  }
};

export const updateUser = async (req, res) => {
try {
  const { userId } = req.params;

  const reqBody = req.body;

  const founduser = await userModel.findById(userId);
  if (!founduser) {
    return res.status(404).json({
      success: false,
      message: `User with ${userId} not found!`,
    });
  }

  if (founduser._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "You cannot update this user!",
    });
  }

  // ❌ Prevent password update (but continue with other fields)
  // if (reqBody.password) {
  //   delete reqBody.password;
  // }



  if (reqBody.password) {
   return res.status(403).json({
      success: false,
      message: "you cant update password",
    });
  }

  const updatedUser = await userModel.findByIdAndUpdate(userId, reqBody, {
    new: true,
  });

  res.status(200).json({
    success: true,
    data: updatedUser,
    message: "User updaated Successfully!!",
  });
} catch (error) {
  console.log(error);
  res.status(500).json({
    success: false,
    message: error.message,
  });
}
}

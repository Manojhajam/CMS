import { loginuserSchema, userModel, userregisterSchema } from "../Model/userModel.js";
import { generateToken } from "../utils/generateToken.js";


export const register = async (req, res) => {
  try {
      // const reqBody = req.body;
    // const email = reqBody.email;
    
    const validateData = userregisterSchema.parse(req.body)

    const existingUser = await userModel.findOne({ email: validateData.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `User with email ${validateData.email} already exists`,
      });
    }
      const User = await userModel.create(validateData);
      
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

    //Handling Zod validation errors
        if (error.errors) {
          return res.status(400).json({
            success: false,
            errors: error.errors.map((e) => e.message),
          });
        }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login =async (req, res) => {
  try {
      // const reqBody = req.body;
    // const email = reqBody.email;
    
    const validateData = loginuserSchema.parse(req.body);

    const foundUser = await userModel.findOne({ email: validateData.email })
    
      if (!foundUser) {
        return res.status(403).json({
              success: false,
              message: "invalid Credentials"
          })
      }

      const ispasswordMatched = await foundUser.isPasswordValid(validateData.password);

      if (!ispasswordMatched) {
          return res.status(401).json({
              success: false,
              message: `Invalid Credentails`
          })
    }
    
    const token = await generateToken({ _id: foundUser._id });

    if (!token) {
     return res.status(400).json({
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

       res.status(200).json({
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



export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const founduser = await userModel.findById(userId)
    if (!founduser) {
      return res.status(403).json({
        success: false,
        message: `User with ${userId} not found!`
      })
    }
    
    const deletedUser = await userModel.findByIdAndDelete(userId)
    return res.status(200).json({
      success: true,
      data: deletedUser,
      message: `User ${founduser.name} deleted successfully!!`,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export const getProfile = async (req, res) => {
  
  try {
    const user = req.user.toObject();       //.toObject() converts the Mongoose document into a plain JavaScript object

    delete user.password;

    res.status(200).json({
      success: true,
      data: user
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
export const adminLevelPermissions = (req, res, next) => {
   try {
     const user = req.user;

     if (user.role !== "admin") {
      return res.status(403).json({
         success: false,
         message: "You are not authorized user to perform this action",
       });
     }
     next();
   } catch (error) {
       console.log(error)
       res.status(500).json({
           success: false,
           message: error.message
       })
   }
}

export const checkFacultyLevelPermissions = (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "faculty") {
      return res.status(403).json({
        success: false,
        message: "You are not aauthorized user to perform this action"
      })
    }

    next();
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const checkFacultyAdminLevelPermissions = (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "Staff" && user.role !== "Admin") {
      return res.json({
        success: false,
        message: "You don`t have authorization  to perform this action!",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
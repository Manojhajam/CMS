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
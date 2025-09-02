import { facultyModel } from "../Model/facultyModel.js";

export const getFacultyCourses =async (req, res) =>{
   try {
       const reqBody = req.body;
       
       const user = req.user;

       if (user.role !== "faculty") {
           return res.status(403).json({
             success: false,
             message: "You are not authorized to view faculty courses",
           });
       }

       const facultyCourses = await facultyModel
         .findOne({ userId: user._id })
           .populate("courses");
       
       if (!facultyCourses) {
         return res.status(404).json({
           success: false,
           message: "No faculty record found for this user",
         });
       }
       
       res.status(200).json({
         success: true,
         message: `Courses taught by ${user?.name}`,
         data: facultyCourses.courses,
       });

   } catch (error) {
     console.log(error);
     res.status(500).json({
       success: false,
       message: error.message,
     });
   }
}

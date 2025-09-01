import { courseModel } from "../Model/coureseModel.js"


export const enrolledCourse =async (req, res) => {
 try {
   const User = req.user;

   const courses = await courseModel.find({ students: User._id })
   

if (!courses || courses.length === 0) {
  return res.status(404).json({
    success: false,
    message: "No enrolled courses found for this user",
  });
}

      res.status(200).json({
         success: true,
         data: courses
     })
     
 } catch (error) {
    console.log(error)
     res.status(500).json({
         success: false,
         message: error.message
    })
 }   
}
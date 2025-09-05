import { courseModel } from "../Model/coureseModel.js";
import { studentModel } from "../Model/studentModel.js";

export const enrolledCourse = async (req, res) => {
  try {
    const User = req.user;

    const courses = await courseModel.find({ students: User._id });

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No enrolled courses found for this user",
      });
    }

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const viewAttendance = async (req, res) => {
  try {
    const User = req.user;

    const student = await studentModel.find({ userId: User._id });

    if (!student) {
      return res.status(403).json({
        success: false,
        mesaage: "Student not found!"
      })
    }

    res.status(200).json({
      success: true,
      message: "successful"
    })

    console.log(student);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

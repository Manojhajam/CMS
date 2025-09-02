import { courseModel } from "../Model/coureseModel.js";
import { studentModel } from "../Model/studentModel.js";
import { userModel } from "../Model/userModel.js";

export const createCourse = async (req, res) => {
  try {
    const reqBody = req.body;

    const course = await courseModel.create(reqBody);

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCourse = async (req, res) => {
  try {
    const getCourse = await courseModel.find();

    res.status(200).json({
      success: true,
      data: getCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const markAttendence = async (req, res) => {
  try {
    const {  studentId, status } = req.body;
    const { courseId } = req.params;

      const student = await studentModel.findById(studentId);
      console.log(student)

    if (!student) {
      return res.status(403).json({
        success: false,
        message: "Student not found!",
      });
    }

    // find the attendence record for this course

    const attendanceRecord = student.attendance.find(
      (a) => a.courseId.toString() === courseId
    );

    if (!attendanceRecord) {
      // If not exist push a new one
      student.push({
        courseId: courseId,
        presentDays: status === "present" ? 1 : 0,
        totalDays: 1,
      });
    } else {
      //Update Existing records
      attendanceRecord.totalDays += 1;
      if (status === "present") {
        attendanceRecord.presentDays += 1;
      }
    }

    await student.save();

    res.status(200).json({
      success: true,
      message: "Attendance marked successfully",
      data: student,
    });
      
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

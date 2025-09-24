import { success } from "zod";
import { facultyModel } from "../Model/facultyModel.js";
import { studentModel } from "../Model/studentModel.js";
import {courseModel} from "../Model/coureseModel.js"

export const createNewStudent = async (req, res) => {
  try {
    const reqBody = req.body;

     if (!reqBody.userId) {
       return res.status(400).json({
         success: false,
         message: "userId is required to create a student",
       });
     }
    const userExists = await userModel.findById(reqBody.userId);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: `User with id ${reqBody.userId} not found`,
      });
    }

    const student = await studentModel.create(reqBody);

    const studentData = {
      name: student.userId,
      rollNumber: student.rollNumber,
      department: student.department,
      courses: student.courses,
      attendance: student.attendance,
    };

    res.status(200).json({
      success: true,
      data: studentData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const createNewFaculty = async (req, res) => {
  try {
    const reqBody = req.body;

    const faculty = await facultyModel.create(reqBody);

   

    res.status(200).json({
      success: true,
      data: faculty,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getStudentDetails = async(req, res) =>{
  try {
    const students = await studentModel.find();

    res.status(200).json({
      success: true,
      data: students
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const getDashboardData = async (req, res) => {
  try {
    const studentCount = await studentModel.countDocuments();
    const facultyCount = await facultyModel.countDocuments();
    const courseCount = await courseModel.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        studentCount,
        facultyCount,
        courseCount
      }
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

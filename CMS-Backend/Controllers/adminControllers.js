import { studentModel } from "../Model/studentModel.js";


export const createStudent = async (req, res) => {
  try {
    const reqBody = req.body;

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
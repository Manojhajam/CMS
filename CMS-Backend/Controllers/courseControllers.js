import { success } from "zod";
import { courseModel } from "../Model/coureseModel.js";
import { materialModel } from "../Model/materialsModel.js";
import { studentModel } from "../Model/studentModel.js";
import { userModel } from "../Model/userModel.js";
import uploadOnCloudinary from "../utils/cloudinary.js"

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
    const getCourse = await courseModel.find().populate({
      path: "students",
      populate: {
        path: "userId", // populate inside Student
        model: "User",
      },
    });

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

// export const markAttendence = async (req, res) => {
//   try {
//     const { studentId, status } = req.body;
//     const { courseId } = req.params;

//     const student = await studentModel.findById(studentId);

//     if (!student) {
//       return res.status(403).json({
//         success: false,
//         message: "Student not found!",
//       });
//     }

//     // find the attendence record for this course

//     const attendanceRecord = student.attendance.find(
//       (a) => a.courseId.toString() === courseId
//     );

//     if (!attendanceRecord) {
//       // If not exist push a new one
//       student.push({
//         courseId: courseId,
//         presentDays: status === "present" ? 1 : 0,
//         totalDays: 1,
//       });
//     } else {
//       //Update Existing records
//       attendanceRecord.totalDays += 1;
//       if (status === "present") {
//         attendanceRecord.presentDays += 1;
//       }
//     }

//     await student.save();

//     res.status(200).json({
//       success: true,
//       message: "Attendance marked successfully",
//       data: student,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const updateCourse = async (req, res) => {
  try {
    const {courseId} = req.params;
    const reqBody = req.body;

    const foundCourse = await courseModel.findById(courseId)
    if (!foundCourse) {
      return res.status(403).json({
        success: false,
        message: "Course not found!"
      })
    }

    const Updatedcourse = await courseModel.findByIdAndUpdate(courseId, reqBody, { new: true });

    return res.status(200).json({
      success: true,
      data: Updatedcourse,
      message: "Course updated successfully!!"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const foundCourse = await courseModel.findById(courseId);
    if (!foundCourse) {
      return res.status(403).json({
        success: false,
        message: "Course not found!",
      });
    }

    const deleteCourse = await courseModel.findByIdAndDelete(courseId)

    res.status(200).json({
      success: true,
      message: `${foundCourse.name} is deleted!`
    })
  } catch (error) {
    console.log(error);
      res.status(500).json({
        success: false,
        message: error.message
      })
    
  }
}

export const studyMaterial = async (req, res) => {
  try {
    const { courseId } = req.params; // course id
    const { title, description, fileType } = req.body;
    const user = req.user; // from middleware (checkAuthorization)

    // only faculty or admin can upload
    if (user.role !== "faculty" && user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only faculty or admin can upload course materials!",
      });
    }

    // check course exists
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    //File exitstance check
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded!",
      });
    }

    //Upload file to cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

    if (!cloudinaryResponse) {
      return res.status(400).json({
        success: false,
        message: "File upload failed. Please try again.",
      });
    }


    // create material
    const material = await materialModel.create({
      courseId: courseId,
      uploadedBy: user._id,
      title,
      description,
      fileUrl: cloudinaryResponse.secure_url,
      fileType: fileType || cloudinaryResponse.format,
    });

    res.status(201).json({
      success: true,
      message: "Material uploaded successfully",
      data: material,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

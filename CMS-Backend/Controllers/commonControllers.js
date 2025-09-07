import { courseModel } from "../Model/coureseModel.js";

export const courseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await courseModel
      .findById(courseId)
      .populate("students", "rollNumber department userId") // populate student docs
      .populate("facultyId", "name department userId"); // show faculty info

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found!"
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import { courseModel } from "../Model/coureseModel.js";

export const courseDetails = async (req, res) => {
    const { courseId } = req.params;

    const course =await courseModel.findById(courseId);

    if (!course) {
        return res.status(403).json({
            success: false,
            message: "Course not found!"
        })
    }

    res.status(200).json({
        success: true,
        data: course
    })
}
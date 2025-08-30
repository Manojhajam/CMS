import {courseModel} from '../Model/coureseModel.js'

export const createCourse = async (req, res) => {
    try {
        const reqBody = req.body;

        const course = await courseModel.create(reqBody)

        res.status(200).json({
            success: true,
            data: course
       })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}
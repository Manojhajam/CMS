import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId

const materialsSchema = new Schema({
    courseId: { type: ObjectId, ref: "Course" },
    uploadedBy: { type: ObjectId, ref: "User" },
    title: String,
    description: String,
    fileUrl: String,
    fileType: { type: String, enum: ["pdf", "ppt", "doc", "video", "link"] },
    uploadAt: {type: Date, default: Date.now}
})

export const materialModel = mongoose.model("Material", materialsSchema)
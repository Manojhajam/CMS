import mongoose, { Schema } from "mongoose"
const ObjectId = mongoose.Schema.Types.ObjectId;

const courseSchema = new Schema({
  name: String,
  code: String,
  department: String,
  facultyId: { type: ObjectId, ref: "Faculty" },
  students: [{ type: ObjectId, ref: "Student" }],
});

export const courseModel = mongoose.model("Course", courseSchema)
import mongoose, { Schema } from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const facultySchema = new Schema({
  userId: { type: ObjectId, ref: "User" },
  employeeId: String,
  department: String,
  courses: [{ type: ObjectId, ref: "Course" }],
});

export const facultyModel = mongoose.model("Faculty", facultySchema);

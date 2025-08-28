import mongoose, { Schema } from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const studentschema = new Schema({
  userId: { type: ObjectId, ref: "User" },
  rollNumber: Number,
  department: String,
  
  // A student can enroll in multiple courses → make it an array
  courses: [{ type: ObjectId, ref: "Courses" }],
  attendance: [
    {
      courseId: { type: ObjectId, ref: "Course" },
      presentDays: { type: Number, default: 0 },
      totalDays: { type: Number, default: 0 },
    },
    ],
    grades: [{
        courseId: { type: ObjectId, ref: "Course" },
        grade: String
  }]
});

export const studentModel = mongoose.model("Student",studentschema)

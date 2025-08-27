import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["admin", "faculty", "student"],
    default: "student",
  },
});

export const userModel = mongoose.model("users", userSchema);

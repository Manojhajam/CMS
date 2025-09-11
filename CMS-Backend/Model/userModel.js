import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { z } from "zod";

export const userregisterSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be less than 50 characters"),

  email: z.string().email("Invalid email format"),

  password: z.string().trim().min(6, "Password must be at least 6 characters long"),

  role: z.enum(["admin", "faculty", "student"]).optional(), // optional → default will be set in DB
});

export const loginuserSchema = z.object({

  email: z.string().email("Invalid email format"),

  password: z.string().trim().min(6, "Password must be at least 6 characters long")
});



const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "faculty", "student"],
    default: "student",
  },
});


userSchema.methods.isPasswordValid = async function (password) {//password coming from login when called
  const hashedPassword = this.password; // password stored in DB
  const result = await bcrypt.compare(password, hashedPassword);
  return result; // true if match, false otherwise
};

userSchema.pre("save", async function (next) {
    // Without this check, every time you call .save() on a user document—even if you just update the name or email—the pre-save hook will hash the password again. This will break login because the password gets double-hashed.
  if (!this.isModified("password")) {       
    return next();
  }

  const password = this.password;
  const saltrounds = 10;
  const salt = await bcrypt.genSalt(saltrounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  this.password = hashedPassword;
});

export const userModel = mongoose.model("User", userSchema);

import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.method("ispassworValid", async (oassword) => {
    const hashedPassword = this.password;
    const result = await bcrypt.compare(password, hashedPassword)
    return result;
})

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

export const userModel = mongoose.model("users", userSchema);

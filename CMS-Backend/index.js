import express from "express"
import userRouter from "./Routes/userRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv"
import studentRouter from "./Routes/studentsRoutes.js";
import adminRouter from "./Routes/adminRoutes.js";
import courseRouter from "./Routes/courseRoutes.js";
const app = express();
const PORT = 5000;


app.use(express.json());

dotenv.config();

app.use("/api/auth", userRouter)
// app.use("/api/students", studentRouter)
app.use("/api/admin", adminRouter)

app.use("/api/courses", courseRouter);





app.get("/test", (req, res) => {
    res.send("This is test route!!")
})


const connectTodb =async () => {
    const response = await mongoose.connect("mongodb://localhost:27017/CMS")
    console.log(`Connected to Db : ${response.connection.name}`)
}
connectTodb();

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})
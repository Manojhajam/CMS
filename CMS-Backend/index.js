import express from "express"
import cors from "cors"
import userRouter from "./Routes/userRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv"
import studentRouter from "./Routes/studentsRoutes.js";
import adminRouter from "./Routes/adminRoutes.js";
import courseRouter from "./Routes/courseRoutes.js";
import facultyRouter from "./Routes/facultyRouter.js";
import commonRoutes from "./Routes/commonRoutes.js";
import notificationRoutes from "./Routes/notificationRoutes.js";
const app = express();
const PORT = 5000;


app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // If you need cookies or authentication headers
  })
);


dotenv.config();



app.use("/api/auth", userRouter)
app.use("/api/courses", courseRouter);
app.use("/api/common", commonRoutes);
app.use("/api/admin", adminRouter)
app.use("/api/faculty", facultyRouter)
app.use("/api/students", studentRouter)
app.use("/api/notification", notificationRoutes)






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
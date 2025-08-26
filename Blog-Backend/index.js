import express from "express"
import userRouter from "./Routes/userRoutes.js";
import mongoose from "mongoose";
const app = express();
const PORT = 5000;




app.use("/api/auth", userRouter)





app.get("/test", (req, res) => {
    res.send("This is test route!!")
})


const connectTodb =async () => {
    const response = await mongoose.connect("mongodb://localhost:27017/Blog")
    console.log(`Connected to Db : ${response.connection.name}`)
}
connectTodb();

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})
import express from "express"
import userRouter from "./Routes/userRoutes.js";
const app = express();
const PORT = 5000;




app.use("/api/auth", userRouter)

app.get("/test", (req, res) => {
    res.send("This is test route!!")
})

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})
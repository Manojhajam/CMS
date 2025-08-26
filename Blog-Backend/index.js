import express from "express"
const app = express();
const PORT = 5000;

app.get("/test", (req, res) => {
    res.send("This is test route!!")
})

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})
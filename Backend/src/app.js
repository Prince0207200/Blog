
import express from "express"

import cookieParser from "cookie-parser"

const app = express();



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())


// routes

import userRouter from "./Routes/user.route.js"
app.get("/", (req, res) => {
    console.log("Backend is running");
    res.send("Backend is running at container port 5000!");
});

// routes declaration
app.use("/api/v1/users", userRouter)

export { app }
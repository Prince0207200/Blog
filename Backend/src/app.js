import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; // ✅ Import CORS

const app = express();

// ✅ Apply CORS before routes and other middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import userRouter from "./Routes/user.route.js";

app.get("/", (req, res) => {
  console.log("Backend is running");
  res.send("Backend is running at container port 5000!");
});

// Routes declaration
app.use("/api/v1/users", userRouter);

export { app };

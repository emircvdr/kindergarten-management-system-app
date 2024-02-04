import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/student.js";
import preliminaryInterviewRoutes from "./routes/preliminaryInterview.js";
import auth from "./routes/auth.js";
import teacher from "./routes/teacher.js";
import classes from "./routes/classes.js";
import employee from "./routes/employee.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    author: "Pedasoft",
    message: "Kindergarten Management System API!",
  });
});

app.use("/student", studentRoutes);
app.use("/preliminaryInterview", preliminaryInterviewRoutes);
app.use("/auth", auth);
app.use("/teacher", teacher);
app.use("/classes", classes);
app.use("/employee", employee);
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

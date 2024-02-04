import express from "express";
import {
  getStudents,
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/student.js";
const router = express.Router();

router.get("/", getStudents);
router.post("/", createStudent);
router.get("/:id", getStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;

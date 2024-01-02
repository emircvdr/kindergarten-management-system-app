import express from "express";
import { getStudents, createStudent, getStudent } from "../controllers/student.js";
const router = express.Router();

router.get("/", getStudents);
router.post("/", createStudent);
router.get("/:id", getStudent);

export default router;
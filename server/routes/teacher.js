import express from "express";
import {
  getTeachers,
  createTeacher,
  getTeacher,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacher.js";

const router = express.Router();

router.get("/", getTeachers);
router.post("/", createTeacher);
router.get("/:id", getTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;

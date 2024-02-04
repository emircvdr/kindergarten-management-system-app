import express from "express";
import {
  getClasses,
  createClass,
  getClass,
  updateClass,
  deleteClass,
} from "../controllers/classes.js";

const router = express.Router();

router.get("/", getClasses);
router.post("/", createClass);
router.get("/:id", getClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

export default router;

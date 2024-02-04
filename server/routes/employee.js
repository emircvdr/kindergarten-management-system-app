import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.js";

const router = express.Router();

router.get("/", getEmployees);
router.post("/", createEmployee);
router.get("/:id", getEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;

import express from "express";
import {
  getPreliminaryInterviews,
  createPreliminaryInterview,
  getPreliminaryInterview,
  updatePreliminaryInterview,
  deletePreliminaryInterview,
} from "../controllers/preliminaryInterview.js";
const router = express.Router();

router.get("/", getPreliminaryInterviews);
router.post("/", createPreliminaryInterview);
router.get("/:id", getPreliminaryInterview);
router.put("/:id", updatePreliminaryInterview);
router.delete("/:id", deletePreliminaryInterview);

export default router;

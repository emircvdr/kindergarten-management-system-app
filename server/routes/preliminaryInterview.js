import express from "express";
import {
  getPreliminaryInterviews,
  createPreliminaryInterview,
} from "../controllers/preliminaryInterview.js";
const router = express.Router();

router.get("/", getPreliminaryInterviews);
router.post("/", createPreliminaryInterview);

export default router;

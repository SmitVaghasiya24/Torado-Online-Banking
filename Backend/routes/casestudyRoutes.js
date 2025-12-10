import express from "express";
import { addCaseStudy, getCaseStudies, getCaseStudyBySlug, updateCaseStudy, deleteCaseStudy } from "../controllers/casestudyController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import getMulterUploader from '../middleware/upload.js';

const router = express.Router();

const upload = getMulterUploader("case-studies");


router.post("/add_case_study", verifyToken, upload.single("thumbnail"), addCaseStudy);
router.get("/get_case_study", getCaseStudies);
router.get("/get_case_study/slug/:slug", getCaseStudyBySlug);
router.put("/update_case_study/:id", verifyToken, upload.single("thumbnail"), updateCaseStudy);
router.delete("/delete_case_study/:id", verifyToken, deleteCaseStudy);


export default router;

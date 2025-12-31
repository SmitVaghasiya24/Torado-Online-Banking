import express from "express";
import { addCaseStudy, getCaseStudies, getCaseStudyBySlug, updateCaseStudy, deleteCaseStudy, updateCaseStudyStatus } from "../controllers/casestudyController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import getMulterUploader from '../middleware/upload.js';
import authorize from "../middleware/authorizeRole.js";

const router = express.Router();

const upload = getMulterUploader("case-studies");


router.post("/add_case_study", verifyToken, authorize(["superadmin", "admin", "content_manager"]), upload.single("thumbnail"), addCaseStudy);
router.get("/get_case_study", getCaseStudies);
router.get("/get_case_study/slug/:slug", getCaseStudyBySlug);
router.put("/update_case_study/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), upload.single("thumbnail"), updateCaseStudy);
router.delete("/delete_case_study/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), deleteCaseStudy);
router.patch("/update_case_study_status/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), updateCaseStudyStatus);



export default router;

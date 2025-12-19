import express from "express";
import { addMortgageApplication, getMortgageApplications } from "../controllers/mortgageapplyController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/mortgage_application", verifyToken, addMortgageApplication);
router.get("/get_mortgage_application", getMortgageApplications);

export default router;

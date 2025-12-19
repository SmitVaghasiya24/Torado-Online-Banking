import express from "express";
import { addLoanApplication,getAllLoanApplications } from "../controllers/loanApplication.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/loan_application", verifyToken, addLoanApplication);
router.get("/get_loan_application", getAllLoanApplications);

export default router;

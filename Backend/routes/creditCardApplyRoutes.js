import express from "express";
import { addCreditCardApplication,getAllCreditCardApplications } from "../controllers/creditCardApplyController.js";
import {verifyToken} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/credit_card_apply", verifyToken, addCreditCardApplication);
router.get("/get_credit_card_apply", getAllCreditCardApplications);

export default router;

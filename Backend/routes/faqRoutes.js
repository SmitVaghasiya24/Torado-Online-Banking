import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { addFaq, getAllFaqs, getFaqsByCategory, updateFaq, deleteFaq } from "../controllers/faqController.js";

const router = express.Router();

router.post("/add_faq", verifyToken, addFaq);
router.get("/all_faq", getAllFaqs);
router.get("/category_faq/:category_id", getFaqsByCategory);
router.put("/update_faq/:id", verifyToken, updateFaq);
router.delete("/delete_faq/:id", verifyToken, deleteFaq);

export default router;

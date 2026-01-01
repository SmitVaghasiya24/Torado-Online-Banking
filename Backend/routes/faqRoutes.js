import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorizeRole.js";
import { addFaq, getAllFaqs, getAllFaqForAdmin, getFaqById, getFaqsByCategory, updateFaq, deleteFaq, updateFaqStatus } from "../controllers/faqController.js";

const router = express.Router();

router.post("/add_faq", verifyToken, authorize(["superadmin", "admin", "content_manager"]), addFaq);
router.get("/all_faq", getAllFaqs);
router.get("/category_faq/:category_id", getFaqsByCategory);
router.get("/get_all_faq", getAllFaqForAdmin);
router.get("/get_faq/:id", getFaqById);
router.put("/update_faq/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), updateFaq);
router.delete("/delete_faq/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), deleteFaq);
router.patch("/update_faq_status/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), updateFaqStatus);

export default router;

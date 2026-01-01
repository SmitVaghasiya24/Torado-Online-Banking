import express from "express";
import { addFaqCategory, getAllFaqCategories, updateFaqCategory, deleteFaqCategory, updateFaqcatStatus } from "../controllers/faqcatController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorizeRole.js";

const router = express.Router();

router.post("/add_faq_category", verifyToken, authorize(["superadmin", "admin", "content_manager"]), addFaqCategory);
router.get("/get_faq_category", getAllFaqCategories);
router.put("/update_faq_category/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), updateFaqCategory);
router.delete("/delete_faq_category/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), deleteFaqCategory);
router.patch("/update_faq_category_status/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), updateFaqcatStatus);


export default router;

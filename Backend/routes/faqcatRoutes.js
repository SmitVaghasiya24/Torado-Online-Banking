import express from "express";
import { addFaqCategory,getAllFaqCategories ,updateFaqCategory,deleteFaqCategory} from "../controllers/faqcatController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add_faq_category", verifyToken, addFaqCategory);
router.get("/get_faq_category", getAllFaqCategories);
router.put("/update_faq_category/:id", verifyToken, updateFaqCategory);
router.delete("/delete_faq_category/:id", verifyToken, deleteFaqCategory);


export default router;

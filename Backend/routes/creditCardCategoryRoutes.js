import express from "express";
import { addCreditCardCategory, getCategoryById,getCreditCardCategoriesAdmin, getCreditCardCategoriesUser, updateCreditCardCategory, deleteCreditCardCategory, updateCreditCardCategoryStatus } from "../controllers/creditCardCategoryController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import getMulterUploader from '../middleware/upload.js';
import authorize from "../middleware/authorizeRole.js";

const router = express.Router();

const upload = getMulterUploader("credit-card-category-icons");


router.post("/admin/add_category", verifyToken, authorize(["superadmin", "admin"]), upload.single("icon"), addCreditCardCategory);
router.get("/admin/get_category", getCreditCardCategoriesAdmin);
router.get("/admin/get_category_id/:id", getCategoryById);
router.get("/get_category", getCreditCardCategoriesUser);
router.put("/admin/update_category/:id", verifyToken, authorize(["superadmin", "admin"]), upload.single("icon"), updateCreditCardCategory);
router.patch("/admin/update_category_status/:id", verifyToken, authorize(["superadmin", "admin"]), upload.single("icon"), updateCreditCardCategoryStatus);
router.delete("/admin/delete_category/:id", verifyToken, authorize(["superadmin", "admin"]), deleteCreditCardCategory);

export default router;  

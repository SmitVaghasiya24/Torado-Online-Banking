import express from "express";
import { addCreditCardCategory ,getCreditCardCategoriesAdmin,getCreditCardCategoriesUser,updateCreditCardCategory,deleteCreditCardCategory} from "../controllers/creditCardCategoryController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import getMulterUploader from '../middleware/upload.js';

const router = express.Router();

const upload = getMulterUploader("credit-card-category-icons");


router.post("/admin/add_category", verifyToken,upload.single("icon"), addCreditCardCategory);
router.get("/admin/get_category", getCreditCardCategoriesAdmin);
router.get("/get_category", getCreditCardCategoriesUser);
router.put("/admin/update_category/:id",verifyToken,upload.single("icon"), updateCreditCardCategory);
router.delete("/admin/delete_category/:id",verifyToken, deleteCreditCardCategory);

export default router;  

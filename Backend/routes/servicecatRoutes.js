import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { addServiceCategory, getAllServiceCategories, getCategoryBySlug, updateServiceCategory, deleteServiceCategory, updateServiceCategoryStatus } from "../controllers/servicecatController.js";
import authorize from '../middleware/authorizeRole.js'
const router = express.Router();

router.post("/add_service_category", verifyToken, authorize(["superadmin", "admin", "content_manager"]), addServiceCategory);
router.get("/get_service_category", getAllServiceCategories);
router.get("/service_category/:slug", getCategoryBySlug);
router.put("/update_service_category/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), updateServiceCategory);
router.delete("/delete_service_category/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), deleteServiceCategory);
router.patch("/update_service_category_status/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), updateServiceCategoryStatus);


export default router;

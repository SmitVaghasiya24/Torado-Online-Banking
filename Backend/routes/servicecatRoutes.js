import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { addServiceCategory, getAllServiceCategories, getCategoryBySlug, updateServiceCategory, deleteServiceCategory } from "../controllers/servicecatController.js";

const router = express.Router();

router.post("/add_service_category", verifyToken, addServiceCategory);
router.get("/get_service_category", getAllServiceCategories);
router.get("/service_category/:slug", getCategoryBySlug);
router.put("/update_service_category/:id", verifyToken, updateServiceCategory);
router.delete("/delete_service_category/:id", verifyToken, deleteServiceCategory);


export default router;

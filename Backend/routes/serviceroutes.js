import express from "express";
import { addService, getServices, getServiceBySlug, updateService, deleteService } from "../controllers/serviceController.js";
import getMulterUploader from '../middleware/upload.js';
import { verifyToken } from "../middleware/authMiddleware.js";


const upload = getMulterUploader("services");

const router = express.Router();

router.post("/add_service", verifyToken, upload.single("thumbnail"), addService);
router.get("/get_service", getServices);
router.get("/get_service/slug/:slug", getServiceBySlug);
router.put("/update_service/:id", verifyToken, upload.single("thumbnail"), updateService);
router.delete("/delete_service/:id", verifyToken, deleteService);



export default router;
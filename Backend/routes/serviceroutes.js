import express from "express";
import { addService, getServices, getServiceBySlug, updateService, deleteService, updateServiceStatus } from "../controllers/serviceController.js";
import getMulterUploader from '../middleware/upload.js';
import { verifyToken } from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorizeRole.js";


const upload = getMulterUploader("services");

const router = express.Router();

router.post("/add_service", verifyToken, authorize(["superadmin", "admin", "content_manager"]), upload.single("thumbnail"), addService);
router.get("/get_service", getServices);
router.get("/get_service/slug/:slug", getServiceBySlug);
router.put("/update_service/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), upload.single("thumbnail"), updateService);
router.delete("/delete_service/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), deleteService);
router.patch("/update_service_status/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), updateServiceStatus);


export default router;
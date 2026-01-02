import express from "express";
import { addManagementMember, getManagementTeam,getManagementById, updateManagementStatus, updateManagementMember, deleteManagementMember } from "../controllers/managementController.js";
import getMulterUploader from '../middleware/upload.js';
import { verifyToken } from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorizeRole.js";

const upload = getMulterUploader("team");


const router = express.Router();

router.post("/add_management", verifyToken,authorize(["superadmin", "admin"]),  upload.single('image'), addManagementMember);
router.get("/get_management", getManagementTeam);
router.get("/get_management_id/:id", getManagementById);
router.patch("/update_management_status/:id", verifyToken,authorize(["superadmin", "admin"]),  updateManagementStatus);
router.put("/update_management/:id", verifyToken, upload.single('image'),authorize(["superadmin", "admin"]),  updateManagementMember);
router.delete("/delete_management/:id", verifyToken, authorize(["superadmin", "admin"]), deleteManagementMember);


export default router;
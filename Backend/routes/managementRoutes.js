import express from "express";
import { addManagementMember, getManagementTeam, updateManagementStatus, updateManagementMember, deleteManagementMember } from "../controllers/managementController.js";
import getMulterUploader from '../middleware/upload.js';
import { verifyToken } from "../middleware/authMiddleware.js";

const upload = getMulterUploader("team");


const router = express.Router();

router.post("/add_management", verifyToken, upload.single('image'), addManagementMember);
router.get("/get_management", getManagementTeam);
router.patch("/status/:id", verifyToken, updateManagementStatus);
router.put("/update_management/:id", verifyToken, upload.single('image'), updateManagementMember);
router.delete("/delete_management/:id", verifyToken, deleteManagementMember);


export default router;

import express from "express";
import { adminSignup, getAllAdmin, getPendingAdmin, loginAdmin, approveAdmin, rejectAdmin, deleteAdmin,getAdminCount,getPendingAdminCount } from "../controllers/adminController.js";
import { verifyToken, isSuperadmin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post("/signup", adminSignup);
router.get("/admin", getAllAdmin);
router.get("/pending_admin", getPendingAdmin);
router.post("/login", loginAdmin);
router.patch("/approve/:id", verifyToken, isSuperadmin, approveAdmin);
router.patch("/reject/:id", verifyToken, isSuperadmin, rejectAdmin);
router.delete("/delete/:id", verifyToken, isSuperadmin, deleteAdmin);
router.get('/get_admin_count',getAdminCount)
router.get('/get_pending_admin_count',getPendingAdminCount)


export default router;

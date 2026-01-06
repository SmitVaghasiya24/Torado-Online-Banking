import express from "express";
import { addMortgageRate, getMortgageRates, getMortgageRateById,getAllMortgageRates, updateMortgageRate, deleteMortgageRate, updateMortgageRateStatus } from "../controllers/mortgageRateController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorizeRole.js";

const router = express.Router();

router.post("/admin/add_mortgage_rate", verifyToken, authorize(["superadmin", "admin", "content_manager"]), addMortgageRate);
router.get("/admin/get_mortgage_rate", getAllMortgageRates);
router.get("/admin/get_mortgage_rate_id/:id", getMortgageRateById);
router.get("/get_mortgage_rate", getMortgageRates);
router.put("/admin/update_mortgage_rate/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), updateMortgageRate);
router.patch("/admin/update_mortgage_rate_status/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), updateMortgageRateStatus);
router.delete("/admin/delete_mortgage_rate/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), deleteMortgageRate);

export default router;

import express from "express";
import { addMortgageRate, getMortgageRates, getAllMortgageRates, updateMortgageRate, deleteMortgageRate } from "../controllers/mortgageRateController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/admin/add_mortgage_rate", verifyToken, addMortgageRate);
router.get("/admin/get_mortgage_rate", getAllMortgageRates);
router.get("/get_mortgage_rate", getMortgageRates);
router.put("/admin/update_mortgage_rate/:id", verifyToken, updateMortgageRate);
router.delete("/admin/delete_mortgage_rate/:id", verifyToken, deleteMortgageRate);

export default router;

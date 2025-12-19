import express from "express";
import { addOpenAccount, getAllOpenAccounts } from "../controllers/openaccountController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/open_account", verifyToken, addOpenAccount);
router.get("/get_open_account", getAllOpenAccounts);

export default router;

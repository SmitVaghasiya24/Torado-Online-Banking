import express from "express";
import { addCreditCard, getAllCreditCardsAdmin, getCreditCardBySlug, getActiveCreditCardsUser, getCreditCardByIdAdmin, updateCreditCardAdmin, deleteCreditCardAdmin } from "../controllers/creditCardController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import getMulterUploader from '../middleware/upload.js';

const router = express.Router();

const upload = getMulterUploader("credit-cards");

router.post("/admin/add_credit_card", verifyToken, upload.single("card_image"), addCreditCard);
router.get("/admin/get_credit_card", getAllCreditCardsAdmin);
router.get("/admin/get_credit_card/:id", getCreditCardByIdAdmin);
router.get("/get_credit_card", getActiveCreditCardsUser);
router.get("/get_credit_card/:slug", getCreditCardBySlug);
router.put("/admin/update_credit_card/:id", verifyToken, upload.single("card_image"), updateCreditCardAdmin);
router.delete("/admin/delete_credit_card/:id", verifyToken, deleteCreditCardAdmin);

export default router;
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { addContactInfo, getContactInfo, updateContactInfo, deleteContactInfo,addContactMessage ,getContactMessages} from "../controllers/contactController.js";

const router = express.Router();

router.post("/add_contact", verifyToken, addContactInfo);
router.get("/get_contact", getContactInfo);
router.put("/update_contact/:id", verifyToken, updateContactInfo);
router.delete("/delete_contact/:id", verifyToken, deleteContactInfo);

router.post("/add_message", verifyToken, addContactMessage);
router.get("/get_messages", verifyToken, getContactMessages);




export default router;
import express from "express";
import { addDocument, getDocuments, updateDocument, deleteDocument } from "../controllers/documentControllertemp.js";
import getMulterUploader from '../middleware/upload.js';
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

const upload = getMulterUploader("documents");


router.post("/admin/add_document", verifyToken, upload.single("pdf"), addDocument);
router.get("/get_document", getDocuments);
router.put("/update_document/:id", verifyToken, upload.single("pdf"), updateDocument);
router.delete("/delete_document/:id", verifyToken, deleteDocument);

export default router;
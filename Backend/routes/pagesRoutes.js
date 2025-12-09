import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

import { addPage, getPageBySlug } from "../controllers/pagesController.js";

const router = express.Router();

router.post("/add", verifyToken, addPage);
router.get("/get_page/:slug", getPageBySlug);


export default router;

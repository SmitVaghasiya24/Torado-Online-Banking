import express from "express";
import { addNews, getAllNews, getNewsBySlug, updateNews, deleteNews, updateNewsStatus } from "../controllers/newsController.js";
import getMulterUploader from '../middleware/upload.js';
import { verifyToken } from "../middleware/authMiddleware.js";
import authorize from '../middleware/authorizeRole.js'

const upload = getMulterUploader("news");

const router = express.Router();

router.post("/add_news", verifyToken, authorize(["superadmin", "admin", "content_manager"]), upload.single("thumbnail"), addNews);
router.get("/get_news", getAllNews);
router.get("/get_news/slug/:slug", getNewsBySlug);
router.put("/update_news/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), upload.single("thumbnail"), updateNews);
router.delete("/delete_news/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), deleteNews);
router.patch("/update_news_status/:id",verifyToken, authorize(["superadmin", "admin", "content_manager"]), updateNewsStatus)


export default router;
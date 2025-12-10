import express from "express";
import { addNews, getAllNews, getNewsBySlug, updateNews,deleteNews} from "../controllers/newsController.js";
import getMulterUploader from '../middleware/upload.js';
import { verifyToken } from "../middleware/authMiddleware.js";


const upload = getMulterUploader("news");

const router = express.Router();

router.post("/add_news", verifyToken, upload.single("thumbnail"), addNews);
router.get("/get_news", getAllNews);
router.get("/get_news/slug/:slug", getNewsBySlug);
router.put("/update_news/:id", verifyToken, upload.single("thumbnail"), updateNews);
router.delete("/delete_news/:id", verifyToken, deleteNews);


export default router;
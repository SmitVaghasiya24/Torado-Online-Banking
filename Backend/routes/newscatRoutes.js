import express from "express";
import {
    addNewsCategory, getNewsCategories, updateNewsCategory, deleteNewsCategory, updateNewsCategoryStatus,
    addNewsTag, getNewsTags, updateNewsTag, deleteNewsTag, updateNewsTagStatus
} from "../controllers/newscatController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorizeRole.js";

const router = express.Router();

router.post("/add_news_category", verifyToken, authorize(["superadmin", "admin", "content_manager"]), addNewsCategory);
router.get("/get_news_category", getNewsCategories);
router.put("/update_news_category/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), updateNewsCategory);
router.delete("/delete_news_category/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), deleteNewsCategory);
router.patch("/update_category_status/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), updateNewsCategoryStatus);


router.post("/add_news_tag", verifyToken, authorize(["superadmin", "admin", "content_manager"]), addNewsTag);
router.get("/get_news_tag", getNewsTags);
router.put("/update_news_tag/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), updateNewsTag);
router.delete("/delete_news_tag/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), deleteNewsTag);
router.patch("/update_tag_status/:id", verifyToken, authorize(["superadmin", "admin", "content_manager"]), updateNewsTagStatus);



export default router;
import express from "express";
import {
    addNewsCategory, getNewsCategories, updateNewsCategory, deleteNewsCategory,
    addNewsTag, getNewsTags, updateNewsTag, deleteNewsTag
} from "../controllers/newscatController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add_category", verifyToken, addNewsCategory);
router.get("/get_category", getNewsCategories);
router.put("/update_category/:id", verifyToken, updateNewsCategory);
router.delete("/delete_category/:id", verifyToken, deleteNewsCategory);

router.post("/add_tag", verifyToken, addNewsTag);
router.get("/get_tag", getNewsTags);
router.put("/update_tag/:id", verifyToken, updateNewsTag);
router.delete("/delete_tag/:id", verifyToken, deleteNewsTag);



export default router;
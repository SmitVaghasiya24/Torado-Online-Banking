import express from "express";
import { addNewsComment ,getNewsComments} from "../controllers/NewsCommentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add_comment", verifyToken, addNewsComment);
router.get("/comments/:news_id", getNewsComments);

export default router;

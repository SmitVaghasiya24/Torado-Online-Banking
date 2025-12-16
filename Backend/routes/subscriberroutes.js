import express from "express";
import {subscribe,getAllSubscribers} from "../controllers/subscribercontroller.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/subscribe", verifyToken,subscribe);
router.get("/get_subscribe",getAllSubscribers);

export default router;

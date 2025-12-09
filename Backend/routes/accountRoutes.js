import express from "express";
import { addAccount } from "../controllers/accountController.js";

const router = express.Router();

router.post("/add_account", addAccount);

export default router;

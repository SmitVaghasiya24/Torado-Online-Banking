import express from "express";
import { addUser, loginUser, forgotPassword } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", addUser);
router.post("/login", loginUser);
router.post("/forgot_password", forgotPassword);


export default router;

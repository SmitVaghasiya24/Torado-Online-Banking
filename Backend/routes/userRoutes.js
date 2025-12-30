import express from "express";
import db from '../config/db.js'
import { addUser, loginUser, forgotPassword,getUserCount } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", addUser);
router.post("/login", loginUser);
router.post("/forgot_password", forgotPassword);
router.get("/get_user_count", getUserCount);

router.get("/me", verifyToken, async (req, res) => {
    const [rows] = await db.query(
        `
    SELECT 
      u.user_id,
      u.login_id,
      u.status,
      a.account_number,
      a.card_number,
      a.balance
    FROM tbl_users u
    LEFT JOIN tbl_accounts a ON a.user_id = u.user_id
    WHERE u.user_id = ?
    `,
        [req.user_id]
    );

    if (rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
});



export default router;

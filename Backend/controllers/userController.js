import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addUser = async (req, res, next) => {
  try {
    const {
      account_number,
      login_id,
      password,
      confirm_password,
      ssn,
      dob,
      created_by
    } = req.body;

    if (!account_number || !login_id || !password || !confirm_password || !ssn || !dob) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ message: "Password and Confirm Password do not match" });
    }

    let accRows;

    // -----------------------------------
    // ⭐ MODE 1: User entered LAST 6 digits only
    // -----------------------------------
    if (account_number.length === 6) {
      [accRows] = await db.query(
        "SELECT id, user_id FROM tbl_accounts WHERE RIGHT(account_number, 6) = ?",
        [account_number]
      );
    }
    // -----------------------------------
    // ⭐ MODE 2: User entered FULL account number
    // -----------------------------------
    else {
      [accRows] = await db.query(
        "SELECT id, user_id FROM tbl_accounts WHERE account_number = ?",
        [account_number]
      );
    }

    if (accRows.length === 0) {
      return res.status(400).json({ message: "Account not found" });
    }

    if (accRows[0].user_id) {
      return res.status(400).json({ message: "This account is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "CALL sp_add_user(?, ?, ?, ?, ?)",
      [login_id, hashedPassword, ssn, dob, created_by || null]
    );

    const [rows] = await db.query(
      "SELECT user_id, login_id, ssn, dob, status FROM tbl_users WHERE login_id = ?",
      [login_id]
    );

    const user = rows[0];

    if (!user) {
      return res.status(500).json({ message: "User was added but not found" });
    }

    await db.query(
      "UPDATE tbl_accounts SET user_id = ? WHERE id = ?",
      [user.user_id, accRows[0].id]
    );

    return res.status(201).json({
      success: true,
      message: "User registered and account linked successfully",
      user
    });

  } catch (error) {
    console.error("Error in addUser controller:", error);
    next(error);
  }
};




export const loginUser = async (req, res, next) => {
  try {
    const { card_number, login_id, password } = req.body;

    if (!card_number || !login_id || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const [accountResult] = await db.query(
      "SELECT user_id FROM tbl_accounts WHERE card_number = ?",
      [card_number]
    );

    if (accountResult.length === 0) {
      return res.status(400).json({ message: "Invalid card number" });
    }

    const userId = accountResult[0].user_id;

    const [userResult] = await db.query(
      "SELECT user_id, login_id, password, status FROM tbl_users WHERE user_id = ?",
      [userId]
    );

    if (userResult.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = userResult[0];

    if (user.login_id !== login_id) {
      return res.status(400).json({ message: "Invalid Login ID" });
    }

    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    if (user.status !== "active") {
      return res.status(403).json({ message: "Account is inactive" });
    }

    const token = jwt.sign(
      { user_id: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        user_id: user.user_id,
        login_id: user.login_id,
        status: user.status
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    next(err);
  }
};





export const forgotPassword = async (req, res, next) => {
  try {
    const { card_number, login_id, ssn, new_password, confirm_password } = req.body;

    if (!card_number || !login_id || !ssn || !new_password || !confirm_password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (new_password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const [accRows] = await db.query(
      "SELECT user_id FROM tbl_accounts WHERE card_number = ?",
      [card_number]
    );

    if (accRows.length === 0) {
      return res.status(400).json({ message: "Invalid card number" });
    }

    const userId = accRows[0].user_id;

    const [userRows] = await db.query(
      "SELECT user_id, login_id, ssn, password FROM tbl_users WHERE user_id = ?",
      [userId]
    );

    if (userRows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = userRows[0];

    if (user.login_id !== login_id) {
      return res.status(400).json({ message: "Invalid Login ID" });
    }

    if (user.ssn !== ssn) {
      return res.status(400).json({ message: "SSN does not match" });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    await db.query(
      "UPDATE tbl_users SET password = ?, updated_at = NOW() WHERE user_id = ?",
      [hashedPassword, userId]
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successful"
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    next(error);
  }
};

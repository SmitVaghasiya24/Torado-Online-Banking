import db from "../config/db.js";

export const addAccount = async (req, res, next) => {
  try {
    const { user_id, account_number, card_number, balance, created_by } = req.body;

    if (!account_number || !card_number) {
      return res.status(400).json({
        success: false,
        message: "Account number and card number are required"
      });
    }

    const finalBalance = balance || 0.00;
    const creator = created_by || null;

    await db.query(
      "CALL sp_add_account(?, ?, ?, ?, ?)",
      [user_id || null, account_number, card_number, finalBalance, creator]
    );

    const [result] = await db.query(
      "SELECT id, user_id, account_number, card_number, balance, status, created_at, updated_at FROM tbl_accounts WHERE account_number = ?",
      [account_number]
    );

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      account: result[0]
    });

  } catch (error) {
    console.error("Error in addAccount controller:", error);
    next(error);
  }
};

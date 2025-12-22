import db from "../config/db.js";

export const addMortgageRate = async (req, res, next) => {
    try {
        const {
            mortgage_type,
            rate,
            apr,
            point,
            monthly_payment,
            status = "approved",
        } = req.body;

        const created_by = req.admin_id || null;

        if (
            !mortgage_type ||
            !rate ||
            !apr ||
            !point ||
            !monthly_payment
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }

        await db.execute(
            `CALL sp_add_mortgage_rate(?,?,?,?,?,?,?)`,
            [
                mortgage_type,
                rate,
                apr,
                point,
                monthly_payment,
                status,
                created_by,
            ]
        );

        const [rows] = await db.execute(
            `SELECT * 
       FROM tbl_mortgage_rates 
       ORDER BY id DESC 
       LIMIT 1`
        );

        return res.status(201).json({
            success: true,
            message: "Mortgage rate added successfully",
            data: rows[0],
        });

    } catch (error) {
        console.error("Add Mortgage Rate Error:", error);
        next(error);
    }
};





// for user
export const getMortgageRates = async (req, res, next) => {
    try {
        const [result] = await db.execute(
            `CALL sp_get_mortgage_rates()`
        );

        const rates = result[0];

        return res.status(200).json({
            success: true,
            message: "Mortgage rate fetched successfully",
            data: rates,
        });

    } catch (error) {
        console.error("Get Mortgage Rates Error:", error);
        next(error);
    }
};



// for admin
export const getAllMortgageRates = async (req, res, next) => {
    try {
        const [result] = await db.execute(
            `CALL sp_get_all_mortgage_rates()`
        );


        const rates = result[0];

        return res.status(200).json({
            success: true,
            message: "Mortgage rate fetched successfully",
            data: rates,
        });

    } catch (error) {
        console.error("Get All Mortgage Rates Error:", error);
        next(error);
    }
};





export const updateMortgageRate = async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            mortgage_type,
            rate,
            apr,
            point,
            monthly_payment,
            status,
        } = req.body;

        const updated_by = req.admin_id || null;

        if (
            !id ||
            !mortgage_type ||
            !rate ||
            !apr ||
            !point ||
            !monthly_payment ||
            !status
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }

        await db.execute(
            `CALL sp_update_mortgage_rate(?,?,?,?,?,?,?,?)`,
            [
                id,
                mortgage_type,
                rate,
                apr,
                point,
                monthly_payment,
                status,
                updated_by,
            ]
        );

        const [rows] = await db.execute(
            `SELECT * FROM tbl_mortgage_rates WHERE id = ?`,
            [id]
        );

        return res.status(200).json({
            success: true,
            message: "Mortgage rate updated successfully",
            data: rows[0],
        });

    } catch (error) {
        console.error("Update Mortgage Rate Error:", error);
        next(error);
    }
};







export const deleteMortgageRate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated_by = req.admin_id || null;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Mortgage rate ID is required",
      });
    }

    const [check] = await db.execute(
      `SELECT id FROM tbl_mortgage_rates WHERE id = ?`,
      [id]
    );

    if (check.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Mortgage rate not found",
      });
    }

    await db.execute(
      `CALL sp_delete_mortgage_rate(?, ?)`,
      [id, updated_by]
    );

    return res.status(200).json({
      success: true,
      message: "Mortgage rate deleted successfully",
      id: Number(id),
    });

  } catch (error) {
    console.error("Delete Mortgage Rate Error:", error);
    next(error);
  }
};

import db from "../config/db.js";


export const addFaq = async (req, res, next) => {
    try {
        const { category_id, question, answer, status } = req.body;
        const created_by = req.admin_id;

        if (!category_id) {
            return res.status(400).json({ message: "Category is required" });
        }

        if (!question) {
            return res.status(400).json({ message: "Question is required" });
        }

        if (!answer) {
            return res.status(400).json({ message: "Answer is required" });
        }

        const [result] = await db.query(
            "CALL sp_add_faq(?, ?, ?, ?, ?)",
            [category_id, question, answer, status || "active", created_by]
        );

        const inserted_id = result[0][0].inserted_id;

        return res.status(200).json({
            message: "FAQ added successfully",
            data: {
                id: inserted_id,
                category_id,
                question,
                answer,
                status: status || "active"
            }
        });

    } catch (error) {
        console.error("Error adding FAQ:", error);
        next(error)
    }
};



export const getAllFaqs = async (req, res, next) => {
    try {
        const [rows] = await db.query("CALL sp_get_all_faqs()");

        return res.status(200).json({
            message: "FAQs fetched successfully",
            data: rows[0]
        });

    } catch (error) {
        console.error("Error fetching FAQs:", error);
        next(error)
    }
};


export const getAllFaqForAdmin = async (req, res, next) => {
    try {
        const [rows] = await db.execute(`
      SELECT 
        f.id,
        f.category_id,
        c.name AS category_name,
        f.question,
        f.answer,
        f.status,
        f.created_at,
        f.updated_at
      FROM tbl_faqs f
      LEFT JOIN tbl_faq_categories c 
        ON c.id = f.category_id
      ORDER BY f.id DESC
    `);

        return res.status(200).json({
            success: true,
            message: "FAQs fetched successfully",
            data: rows,
        });
    } catch (error) {
        console.error("Get all FAQs error:", error);
        next(error);
    }
};



export const getFaqsByCategory = async (req, res) => {
    try {
        const { category_id } = req.params;

        const [rows] = await db.query(
            "CALL sp_get_faqs_by_category(?)",
            [category_id]
        );

        return res.status(200).json({
            message: "FAQs fetched successfully",
            data: rows[0]
        });

    } catch (error) {
        console.error("Error fetching FAQs by category:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};







export const updateFaq = async (req, res) => {
    try {
        const { id } = req.params;
        const { category_id, question, answer, status } = req.body;
        const updated_by = req.admin_id;

        if (!category_id || !question || !answer) {
            return res.status(400).json({
                message: "Category, question and answer are required"
            });
        }

        const [result] = await db.query(
            "CALL sp_update_faq(?, ?, ?, ?, ?, ?)",
            [id, category_id, question, answer, status || "active", updated_by]
        );

        const affected = result[0][0].affected_rows;

        if (affected === 0) {
            return res.status(404).json({ message: "FAQ not found" });
        }

        return res.status(200).json({
            message: "FAQ updated successfully",
            data: {
                id,
                category_id,
                question,
                answer,
                status: status || "active"
            }
        });

    } catch (error) {
        console.error("Error updating FAQ:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};







export const deleteFaq = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            "CALL sp_delete_faq(?)",
            [id]
        );

        const affected = result[0][0].affected_rows;

        if (affected === 0) {
            return res.status(404).json({ message: "FAQ not found" });
        }

        return res.status(200).json({
            message: "FAQ permanently deleted"
        });

    } catch (error) {
        console.error("Error deleting FAQ:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


export const updateFaqStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated_by = req.admin_id;

        if (!id || !status) {
            return res.status(400).json({
                success: false,
                message: "FAQ id and status are required",
            });
        }

        if (!["active", "inactive"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value",
            });
        }

        const [result] = await db.execute(
            `
      UPDATE tbl_faqs
      SET status = ?, updated_by = ?, updated_at = NOW()
      WHERE id = ?
      `,
            [status, updated_by, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "FAQ not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "FAQ status updated successfully",
        });
    } catch (error) {
        console.error("Update FAQ status error:", error);
        next(error);
    }
};

export const getFaqById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "FAQ ID is required",
            });
        }

        const [rows] = await db.query(
            "SELECT * FROM tbl_faqs WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "FAQ not found",
            });
        }

        res.status(200).json({
            success: true,
            data: rows[0],
        });
    } catch (error) {
        console.error("Get FAQ by ID error:", error);
        next(error)
    }
};

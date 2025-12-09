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

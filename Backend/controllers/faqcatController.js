import db from "../config/db.js";

export const addFaqCategory = async (req, res) => {
    try {
        const { name, status } = req.body;
        const created_by = req.admin_id;

        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }

        const [result] = await db.query(
            "CALL sp_add_faq_category(?, ?, ?)",
            [name, status || "active", created_by]
        );

        const inserted_id = result[0][0].inserted_id;

        return res.status(200).json({
            message: "FAQ category added successfully",
            data: {
                id: inserted_id,
                name,
                status: status || "active"
            }
        });

    } catch (error) {
        console.error("Error adding FAQ category:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};




export const getAllFaqCategories = async (req, res) => {
    try {
        const [rows] = await db.query("CALL sp_get_all_faq_categories()");

        return res.status(200).json({
            message: "FAQ categories fetched successfully",
            data: rows[0]
        });

    } catch (error) {
        console.error("Error fetching FAQ categories:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};




export const updateFaqCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;
        const updated_by = req.admin_id;

        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }

        const [result] = await db.query(
            "CALL sp_update_faq_category(?, ?, ?, ?)",
            [id, name, status || "active", updated_by]
        );

        const affected = result[0][0].affected_rows;

        if (affected === 0) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({
            message: "FAQ category updated successfully",
            data: {
                id,
                name,
                status: status || "active"
            }
        });

    } catch (error) {
        console.error("Error updating FAQ category:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};





export const deleteFaqCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            "CALL sp_delete_faq_category(?)",
            [id]
        );

        const affected = result[0][0].affected_rows;

        if (affected === 0) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({
            message: "FAQ category deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting FAQ category:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

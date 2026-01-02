import db from "../config/db.js";
import slugify from "slugify";

export const addServiceCategory = async (req, res, next) => {
    try {
        const { name, status } = req.body;
        const created_by = req.admin_id;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }

        let slug = slugify(name, { lower: true, strict: true });
        let finalSlug = slug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute(
                "SELECT id FROM tbl_service_categories WHERE slug = ?",
                [finalSlug]
            );

            if (existing.length === 0) break;

            finalSlug = `${slug}-${count}`;
            count++;
        }

        const [result] = await db.query(
            "CALL sp_add_service_category(?, ?, ?, ?)",
            [name, finalSlug, status || "active", created_by]
        );

        const inserted_id = result?.[0]?.[0]?.inserted_id;

        return res.status(201).json({
            success: true,
            message: "Service category added successfully",
            data: {
                id: inserted_id,
                name,
                slug: finalSlug,
                status: status || "active"
            }
        });

    } catch (error) {
        console.error("Error adding service category:", error);
        next(error);
    }
};



export const getAllServiceCategories = async (req, res) => {
    try {
        const [result] = await db.query("CALL sp_get_all_service_categories()");

        const categories = result[0];

        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: categories
        });

    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};



export const getCategoryBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const [result] = await db.query(
            "CALL sp_get_service_category_by_slug(?)",
            [slug]
        );

        const category = result[0][0];

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            data: category
        });

    } catch (error) {
        console.error("Error fetching category by slug:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};



export const updateServiceCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;
        const updated_by = req.admin_id;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }

        let slug = slugify(name, { lower: true, strict: true });
        let finalSlug = slug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute(
                "SELECT id FROM tbl_service_categories WHERE slug = ? AND id != ?",
                [finalSlug, id]
            );

            if (existing.length === 0) break;

            finalSlug = `${slug}-${count}`;
            count++;
        }

        const [result] = await db.query(
            "CALL sp_update_service_category(?, ?, ?, ?, ?)",
            [id, name, finalSlug, status || "active", updated_by]
        );

        const affected = result?.[0]?.[0]?.affected_rows;

        if (affected === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        const [updated] = await db.query(
            "SELECT id, name, slug, status FROM tbl_service_categories WHERE id = ?",
            [id]
        );

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: updated[0]
        });

    } catch (error) {
        console.error("Error updating category:", error);
        next(error);
    }
};



export const deleteServiceCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            "CALL sp_delete_service_category(?)",
            [id]
        );

        const affected = result?.[0]?.[0]?.affected_rows;

        if (affected === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};




export const updateServiceCategoryStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated_by = req.admin_id;

        if (!id || !status) {
            return res.status(400).json({
                success: false,
                message: "Category id and status are required",
            });
        }

        if (!["active", "inactive"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value",
            });
        }

        const [existing] = await db.query(
            "SELECT id FROM tbl_service_categories WHERE id = ?",
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Service category not found",
            });
        }

        await db.query(
            "UPDATE tbl_service_categories SET status = ?,updated_by = ?, updated_at = NOW() WHERE id = ?",
            [status, updated_by, id]
        );

        return res.status(200).json({
            success: true,
            message: "Service category status updated successfully",
        });
    } catch (error) {
        console.error("Update service category status error:", error);
        next(error)
    }
};

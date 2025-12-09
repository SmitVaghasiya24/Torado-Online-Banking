import slugify from "slugify";
import db from "../config/db.js";

export const addPage = async (req, res) => {
    try {
        const { title, content, status } = req.body;
        const created_by = req.admin_id;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        let slug = slugify(title, { lower: true, strict: true });

        let finalSlug = slug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute(
                "SELECT id FROM tbl_pages WHERE slug = ?",
                [finalSlug]
            );

            if (existing.length === 0) break;

            finalSlug = `${slug}-${count}`;
            count++;
        }

        const [result] = await db.query(
            "CALL sp_add_page(?, ?, ?, ?, ?)",
            [finalSlug, title, content, status || "active", created_by]
        );

        const inserted_id = result[0][0].inserted_id;

        return res.status(200).json({
            message: "Page added successfully",
            data: {
                id: inserted_id,
                slug: finalSlug,
                title,
                content,
                status: status || "active"
            }
        });

    } catch (error) {
        console.error("Error adding page:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};






export const getPageBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const [rows] = await db.query(
            "CALL sp_get_page_by_slug(?)",
            [slug]
        );

        if (!rows[0] || rows[0].length === 0) {
            return res.status(404).json({
                message: "Page not found"
            });
        }

        return res.status(200).json({
            message: "Page fetched successfully",
            data: rows[0][0]
        });

    } catch (error) {
        console.error("Error fetching page:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

import db from "../config/db.js";
import slugify from "slugify";

export const addNewsCategory = async (req, res, next) => {
    try {
        const { name, status } = req.body;
        const created_by = req.admin_id;

        let baseSlug = slugify(name, { lower: true, strict: true });
        let finalSlug = baseSlug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute(
                "SELECT id FROM tbl_news_categories WHERE slug = ?",
                [finalSlug]
            );
            if (existing.length === 0) break;

            finalSlug = `${baseSlug}-${count}`;
            count++;
        }

        const finalStatus = status || "active";

        const [rows] = await db.query(
            "CALL sp_insert_news_category(?, ?, ?, ?)",
            [name, finalSlug, finalStatus, created_by]
        );

        res.status(200).json({
            success: true,
            message: "Category added successfully",
            data: { name, slug: finalSlug, status: finalStatus }
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};



export const getNewsCategories = async (req, res, next) => {
    try {
        const [rows] = await db.query("CALL sp_get_news_categories()");
        res.status(200).json({
            success: true,
            message: "Category Fetched Succesfully",
            data: rows[0]
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};




export const updateNewsCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;

        const updated_by = req.admin_id;

        let baseSlug = slugify(name, { lower: true, strict: true });
        let finalSlug = baseSlug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute(
                "SELECT id FROM tbl_news_categories WHERE slug = ? AND id != ?",
                [finalSlug, id]
            );

            if (existing.length === 0) break;

            finalSlug = `${baseSlug}-${count}`;
            count++;
        }

        const finalStatus = status || "active";
        await db.query(
            "CALL sp_update_news_category(?, ?, ?, ?, ?)",
            [id, name, finalSlug, finalStatus, updated_by]
        );

        const [updated] = await db.execute(
            "SELECT * FROM tbl_news_categories WHERE id = ?",
            [id]
        );

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: updated[0]
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};





export const deleteNewsCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [oldData] = await db.execute(
            "SELECT id FROM tbl_news_categories WHERE id = ?",
            [id]
        );

        if (oldData.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        await db.query("CALL sp_delete_news_category(?)", [id]);

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};










export const addNewsTag = async (req, res, next) => {
    try {
        const { name, status } = req.body;
        const created_by = req.admin_id;

        let baseSlug = slugify(name, { lower: true, strict: true });
        let finalSlug = baseSlug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute(
                "SELECT id FROM tbl_news_tags WHERE slug = ?",
                [finalSlug]
            );

            if (existing.length === 0) break;

            finalSlug = `${baseSlug}-${count}`;
            count++;
        }

        const finalStatus = status || "active";

        const [rows] = await db.query(
            "CALL sp_insert_news_tag(?, ?, ?, ?)",
            [name, finalSlug, finalStatus, created_by]
        );

        const insertedId = rows[0][0].tag_id;

        const [newTag] = await db.execute(
            "SELECT * FROM tbl_news_tags WHERE id = ?",
            [insertedId]
        );

        res.status(200).json({
            success: true,
            message: "Tag added successfully",
            data: newTag[0]
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};



export const getNewsTags = async (req, res, next) => {
    try {
        const [rows] = await db.query("CALL sp_get_news_tags()");

        res.status(200).json({
            success: true,
            data: rows[0]  
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};





export const updateNewsTag = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;

        const updated_by = req.admin_id;

        let baseSlug = slugify(name, { lower: true, strict: true });
        let finalSlug = baseSlug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute(
                "SELECT id FROM tbl_news_tags WHERE slug = ? AND id != ?",
                [finalSlug, id]
            );

            if (existing.length === 0) break;

            finalSlug = `${baseSlug}-${count}`;
            count++;
        }

        const finalStatus = status || "active";

        await db.query(
            "CALL sp_update_news_tag(?, ?, ?, ?, ?)",
            [id, name, finalSlug, finalStatus, updated_by]
        );

        const [updated] = await db.execute(
            "SELECT * FROM tbl_news_tags WHERE id = ?",
            [id]
        );

        res.status(200).json({
            success: true,
            message: "Tag updated successfully",
            data: updated[0]
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};



export const deleteNewsTag = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [oldTag] = await db.execute(
            "SELECT id FROM tbl_news_tags WHERE id = ?",
            [id]
        );

        if (oldTag.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Tag not found"
            });
        }

        await db.query("CALL sp_delete_news_tag(?)", [id]);

        res.status(200).json({
            success: true,
            message: "Tag deleted successfully"
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};

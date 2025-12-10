import db from "../config/db.js";
import slugify from "slugify";

export const addNews = async (req, res, next) => {
    try {
        const {
            title,
            short_description,
            content,
            published_date,
            category_id,
            author,
            status,
            tags
        } = req.body;

        const created_by = req.admin_id;

        let baseSlug = slugify(title, { lower: true, strict: true });
        let finalSlug = baseSlug;
        let count = 1;

        while (true) {
            const [exist] = await db.execute(
                "SELECT id FROM tbl_news WHERE slug = ?",
                [finalSlug]
            );
            if (exist.length === 0) break;
            finalSlug = `${baseSlug}-${count}`;
            count++;
        }

        const [adminData] = await db.execute(
            "SELECT name FROM tbl_admins WHERE admin_id = ?",
            [created_by]
        );

        const adminName = adminData.length ? adminData[0].name : "Admin";

        const finalAuthor =
            author && author.trim() !== "" ? author.trim() : adminName;

        const thumbnail = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/news/${req.file.filename}`
            : null;

        const finalStatus = status || "active";

        const [result] = await db.query(
            "CALL sp_insert_news(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                title,
                finalSlug,
                short_description,
                content,
                published_date,
                thumbnail,
                category_id,
                finalAuthor,
                finalStatus,
                created_by
            ]
        );

        const newsId = result[0][0].news_id;

        if (tags && Array.isArray(tags)) {
            for (let tagId of tags) {
                await db.execute(
                    "INSERT INTO tbl_news_tags_map (news_id, tag_id) VALUES (?, ?)",
                    [newsId, tagId]
                );
            }
        }

        const [insertedNews] = await db.execute(
            "SELECT * FROM tbl_news WHERE id = ?",
            [newsId]
        );

        res.status(200).json({
            success: true,
            message: "News added successfully",
            data: insertedNews[0]
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


export const getAllNews = async (req, res) => {
    try {
        const [rows] = await db.query("CALL sp_get_all_news()");


        const newsList = rows[0];

        return res.status(200).json({
            success: true,
            data: newsList
        });

    } catch (error) {
        console.error("Error fetching news:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};




export const getNewsBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const [rows] = await db.query("CALL sp_get_news_by_slug(?)", [slug]);

        const news = rows[0][0];

        if (!news) {
            return res.status(404).json({
                success: false,
                message: "News not found"
            });
        }

        res.status(200).json({
            success: true,
            data: news
        });
    } catch (error) {
        console.log(error);
        next(error)
    }
};











import fs from "fs";
import path from "path";

export const updateNews = async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            title,
            short_description,
            content,
            published_date,
            category_id,
            author,
            status,
            tags
        } = req.body;

        const updated_by = req.admin_id;

        const [oldRows] = await db.execute(
            "SELECT * FROM tbl_news WHERE id = ?",
            [id]
        );

        if (oldRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "News not found"
            });
        }

        const oldData = oldRows[0];

        let baseSlug = slugify(title, { lower: true, strict: true });
        let finalSlug = baseSlug;

        if (title !== oldData.title) {
            let count = 1;
            while (true) {
                const [exist] = await db.execute(
                    "SELECT id FROM tbl_news WHERE slug = ? AND id != ?",
                    [finalSlug, id]
                );
                if (exist.length === 0) break;

                finalSlug = `${baseSlug}-${count}`;
                count++;
            }
        } else {
            finalSlug = oldData.slug;
        }

        let newThumbnail = oldData.thumbnail;

        if (req.file) {
            newThumbnail = `${req.protocol}://${req.get("host")}/uploads/services/${req.file.filename}`;

            if (oldData.thumbnail) {
                const filePath = path.join(
                    "uploads/services",
                    oldData.thumbnail.split("/").pop()
                );

                fs.unlink(filePath, err => {
                    if (err) console.log("Old file delete error:", err);
                });
            }
        }

        const finalAuthor = author && author.trim() !== "" ? author : oldData.author;
        const finalStatus = status || oldData.status;

        const [result] = await db.query(
            "CALL sp_update_news(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                id,
                title,
                finalSlug,
                short_description,
                content,
                published_date,
                newThumbnail,
                category_id,
                finalAuthor,
                finalStatus,
                updated_by
            ]
        );

        if (tags && Array.isArray(tags)) {
            await db.execute("DELETE FROM tbl_news_tags_map WHERE news_id = ?", [id]);

            for (let tagId of tags) {
                await db.execute(
                    "INSERT INTO tbl_news_tags_map (news_id, tag_id) VALUES (?, ?)",
                    [id, tagId]
                );
            }
        }

        const [updatedNews] = await db.execute(
            "SELECT * FROM tbl_news WHERE id = ?",
            [id]
        );

        res.status(200).json({
            success: true,
            message: "News updated successfully",
            data: updatedNews[0]
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};






export const deleteNews = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [rows] = await db.execute(
            "SELECT * FROM tbl_news WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "News not found"
            });
        }

        const newsData = rows[0];

        const [result] = await db.query("CALL sp_delete_news(?)", [id]);
        const affected = result[0][0].affected_rows;

        if (affected === 0) {
            return res.status(400).json({
                success: false,
                message: "Failed to delete news"
            });
        }

        if (newsData.thumbnail) {
            const imageName = newsData.thumbnail.split("/").pop();
            const filePath = path.join("uploads/services", imageName);

            fs.unlink(filePath, err => {
                if (err) console.log("Image delete error:", err);
            });
        }

        res.status(200).json({
            success: true,
            message: "News deleted successfully"
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};

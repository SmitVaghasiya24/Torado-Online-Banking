import db from "../config/db.js";
import slugify from "slugify";
import fs from "fs";
import path from "path";

export const addCaseStudy = async (req, res, next) => {
    try {
        const {
            title,
            client,
            sector,
            location,
            overview,
            status
        } = req.body;

        const created_by = req.admin_id;

        let baseSlug = slugify(title, { lower: true, strict: true });
        let finalSlug = baseSlug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute(
                "SELECT id FROM tbl_case_studies WHERE slug = ?",
                [finalSlug]
            );
            if (existing.length === 0) break;
            finalSlug = `${baseSlug}-${count}`;
            count++;
        }

        const thumbnail = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/case-studies/${req.file.filename}`
            : null;

        const finalStatus = status || "active";

        const [rows] = await db.query(
            "CALL sp_insert_case_study(?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                title,
                finalSlug,
                thumbnail,
                client,
                sector,
                location,
                overview,
                finalStatus,
                created_by
            ]
        );

        const [newRecord] = await db.execute(
            "SELECT * FROM tbl_case_studies WHERE slug = ? LIMIT 1",
            [finalSlug]
        );

        res.status(200).json({
            success: true,
            message: "Case study added successfully",
            data: newRecord[0]
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};



export const getCaseStudies = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const offset = (page - 1) * limit;

        const [rows] = await db.query(
            "CALL sp_get_case_studies(?, ?)",
            [limit, offset]
        );

        const caseStudies = rows[0];
        const total = rows[1][0].total;

        res.status(200).json({
            success: true,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            },
            data: caseStudies,

        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};




export const getCaseStudyBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const [rows] = await db.query(
            "CALL sp_get_case_study_by_slug(?)",
            [slug]
        );

        const record = rows[0][0];

        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Case study not found"
            });
        }

        res.status(200).json({
            success: true,
            data: record
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};






export const updateCaseStudy = async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            title,
            client,
            sector,
            location,
            overview,
            status
        } = req.body;

        const updated_by = req.admin_id;

        const [oldDataRows] = await db.execute(
            "SELECT thumbnail FROM tbl_case_studies WHERE id = ?",
            [id]
        );

        if (oldDataRows.length === 0) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }

        const oldThumbnailUrl = oldDataRows[0].thumbnail;

        let baseSlug = slugify(title, { lower: true, strict: true });
        let finalSlug = baseSlug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute(
                "SELECT id FROM tbl_case_studies WHERE slug = ? AND id != ?",
                [finalSlug, id]
            );
            if (existing.length === 0) break;

            finalSlug = `${baseSlug}-${count}`;
            count++;
        }

        let thumbnail;

        if (req.file) {
            thumbnail = `${req.protocol}://${req.get("host")}/uploads/case-studies/${req.file.filename}`;

            if (oldThumbnailUrl) {
                const filePath = oldThumbnailUrl.replace(`${req.protocol}://${req.get("host")}`, ".");
                fs.unlink(filePath, (err) => {
                    if (err) console.log("Old image delete error:", err);
                });
            }
        } else {
            thumbnail = oldThumbnailUrl;
        }

        const finalStatus = status || "active";

        await db.query(
            "CALL sp_update_case_study(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                id,
                title,
                finalSlug,
                thumbnail,
                client,
                sector,
                location,
                overview,
                finalStatus,
                updated_by
            ]
        );

        const [updatedRecord] = await db.execute(
            "SELECT * FROM tbl_case_studies WHERE id = ? LIMIT 1",
            [id]
        );

        res.status(200).json({
            success: true,
            message: "Case study updated successfully",
            data: updatedRecord[0]
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};




export const deleteCaseStudy = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [oldData] = await db.execute(
            "SELECT thumbnail FROM tbl_case_studies WHERE id = ?",
            [id]
        );

        if (oldData.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Case study not found"
            });
        }

        const oldThumbnailUrl = oldData[0].thumbnail;

        if (oldThumbnailUrl) {
            const filePath = oldThumbnailUrl.replace(
                `${req.protocol}://${req.get("host")}`,
                "."
            );

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log("Image delete error:", err);
                }
            });
        }
        await db.query("CALL sp_delete_case_study(?)", [id]);

        res.status(200).json({
            success: true,
            message: "Case study deleted successfully"
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};

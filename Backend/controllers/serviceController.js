import fs from "fs";
import path from "path";
import db from "../config/db.js";
import slugify from "slugify";


export const addService = async (req, res, next) => {
    try {
        const { category_id, title, short_description, status } = req.body;
        const created_by = req.admin_id;

        const thumbnail = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/services/${req.file.filename}`
            : null;

        let slug = slugify(title, { lower: true, strict: true });
        let finalSlug = slug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute(
                "SELECT id FROM tbl_services WHERE slug = ?",
                [finalSlug]
            );
            if (existing.length === 0) break;

            finalSlug = `${slug}-${count}`;
            count++;
        }

        const [rows] = await db.query(
            "CALL sp_add_service(?, ?, ?, ?, ?, ?, ?)",
            [
                category_id || null,
                title,
                finalSlug,
                short_description || null,
                thumbnail,
                status || "active",
                created_by || null
            ]
        );

        const result = rows[0][0];

        return res.status(200).json({
            success: true,
            message: result.message,
            inserted_id: result.inserted_id,
            data: {
                id: result.inserted_id,
                category_id,
                title,
                slug: finalSlug,
                short_description,
                thumbnail,
                status,
                created_by
            }
        });

    } catch (error) {
        console.error("Add Service Error:", error);
        next(error);
    }
};


export const getServices = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const [rows] = await db.query("CALL sp_get_services(?, ?)", [
            limit,
            offset
        ]);


        const total = rows[0][0].total;
        const services = rows[1];

        const totalPages = Math.ceil(total / limit);

        return res.status(200).json({
            success: true,
            page,
            limit,
            total,
            totalPages,
            data: services
        });
    } catch (error) {
        console.error("Get Services Error:", error);
        next(error);
    }
};


export const getServiceBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const [rows] = await db.query(
            "CALL sp_get_service_by_slug(?)",
            [slug]
        );

        const service = rows[0][0];

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: service
        });

    } catch (error) {
        console.error("Fetch Service Error:", error);
        next(error);
    }
};



export const updateService = async (req, res, next) => {
    try {
        const { category_id, title, short_description, status } = req.body;
        const updated_by = req.admin_id;
        const service_id = req.params.id;

        if (!req.body || !title) {
            return res.status(400).json({ success: false, message: "Invalid request body" });
        }

        const [oldData] = await db.execute(
            "SELECT thumbnail FROM tbl_services WHERE id = ?",
            [service_id]
        );

        if (oldData.length === 0) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }

        const oldThumbnail = oldData[0].thumbnail;

        const newThumbnail = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/services/${req.file.filename}`
            : oldThumbnail;

        if (req.file && oldThumbnail) {
            const oldPath = path.join("uploads/services", path.basename(oldThumbnail));
            fs.unlink(oldPath, () => { });
        }

        const slug = slugify(title, { lower: true, strict: true });

        const [slugCheck] = await db.execute(
            "SELECT id FROM tbl_services WHERE slug = ? AND id != ?",
            [slug, service_id]
        );

        if (slugCheck.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Service with same title already exists",
            });
        }

        await db.query(
            "CALL sp_update_service(?, ?, ?, ?, ?, ?, ?, ?)",
            [
                service_id,
                category_id || null,
                title,
                slug,
                short_description || null,
                newThumbnail,
                status || "active",
                updated_by
            ]
        );

        const [updatedRows] = await db.execute(
            `SELECT 
          s.id,
          s.category_id,
          c.name AS category_name,
          s.title,
          s.slug,
          s.short_description,
          s.thumbnail,
          s.status,
          s.created_by,
          s.updated_by,
          s.created_at,
          s.updated_at
       FROM tbl_services s
       LEFT JOIN tbl_service_categories c ON s.category_id = c.id
       WHERE s.id = ?`,
            [service_id]
        );

        const updatedService = updatedRows[0];

        return res.status(200).json({
            success: true,
            message: "Service updated successfully",
            data: updatedService
        });

    } catch (error) {
        console.error("Update Service Error:", error);
        next(error);
    }
};




export const deleteService = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [rows] = await db.execute(
            "SELECT thumbnail FROM tbl_services WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }

        const oldThumbnail = rows[0].thumbnail;

        const [spResult] = await db.query("CALL sp_delete_service(?)", [id]);

        const result = spResult[0][0];

        if (oldThumbnail) {
            const imagePath = path.join("uploads/services", path.basename(oldThumbnail));
            fs.unlink(imagePath, () => { });
        }

        return res.status(200).json({
            success: true,
            message: result.message,
            deleted_id: result.deleted_id
        });

    } catch (error) {
        console.error("Delete Service Error:", error);
        next(error);
    }
};





export const updateServiceStatus = async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    const adminId = req.admin_id;

    if (!id || !status) {
        return res.status(400).json({
            success: false,
            message: "Service ID and status are required",
        });
    }

    if (!["active", "inactive"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid status value",
        });
    }

    try {
        const [result] = await db.query(
            `UPDATE tbl_services 
       SET status = ?, updated_by = ?, updated_at = NOW()
       WHERE id = ?`,
            [status, adminId, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        return res.json({
            success: true,
            message: "Service status updated successfully",
        });
    } catch (error) {
        console.error("Update service status error:", error);
        next(error)
    }
};

import db from "../config/db.js";
import fs from "fs";
import path from "path";
import slugify from "slugify";


export const addCreditCardCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required",
            });
        }

        let baseSlug = slugify(name, { lower: true, strict: true });
        let finalSlug = baseSlug;
        let count = 1;

        while (true) {
            const [exist] = await db.execute(
                "SELECT id FROM tbl_credit_card_categories WHERE slug = ?",
                [finalSlug]
            );

            if (exist.length === 0) break;

            finalSlug = `${baseSlug}-${count}`;
            count++;
        }

        const created_by = req.admin_id || null;

        const icon = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/credit-card-category-icons/${req.file.filename}`
            : null;

        await db.execute(
            "CALL sp_add_credit_card_category(?, ?, ?, ?)",
            [name, finalSlug, icon, created_by]
        );

        return res.status(201).json({
            success: true,
            message: "Credit card category added successfully",
            data: {
                name,
                slug: finalSlug,
                icon,
            },
        });

    } catch (error) {
        console.error("Add credit card category error:", error);
        next(error)
    }
};





export const getCreditCardCategoriesAdmin = async (req, res, next) => {
    try {
        const [result] = await db.execute(
            "CALL sp_get_credit_card_categories_admin()"
        );

        const categories = result[0];

        return res.status(200).json({
            success: true,
            message: "Credit card categories fetched successfully",
            data: categories,
        });

    } catch (error) {
        console.error("Get credit card categories admin error:", error);
        next(error)
    }
};








export const getCreditCardCategoriesUser = async (req, res, next) => {
    try {
        const [result] = await db.execute(
            "CALL sp_get_credit_card_categories_user()"
        );

        const categories = result[0];

        return res.status(200).json({
            success: true,
            message: "Credit card categories fetched successfully",
            data: categories,
        });

    } catch (error) {
        console.error("Get credit card categories user error:", error);

        next(error)
    }
};




export const updateCreditCardCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body || {};


        if (!id || !name) {
            return res.status(400).json({
                success: false,
                message: "Category id and name are required",
            });
        }

        const finalStatus = status || "active";

        const [existingResult] = await db.execute(
            "SELECT icon FROM tbl_credit_card_categories WHERE id = ?",
            [id]
        );

        if (existingResult.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        const oldIcon = existingResult[0].icon;

        let baseSlug = slugify(name, { lower: true, strict: true });
        let finalSlug = baseSlug;
        let count = 1;

        while (true) {
            const [exist] = await db.execute(
                "SELECT id FROM tbl_credit_card_categories WHERE slug = ? AND id != ?",
                [finalSlug, id]
            );
            if (exist.length === 0) break;
            finalSlug = `${baseSlug}-${count}`;
            count++;
        }

        let icon = oldIcon;

        if (req.file) {
            icon = `${req.protocol}://${req.get("host")}/uploads/credit-card-icons/${req.file.filename}`;

            if (oldIcon) {
                const oldPath = path.join(
                    process.cwd(),
                    oldIcon.replace(`${req.protocol}://${req.get("host")}/`, "")
                );

                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
        }

        const updated_by = req.admin_id || null;

        await db.execute(
            "CALL sp_update_credit_card_category(?, ?, ?, ?, ?, ?)",
            [id, name, finalSlug, icon, finalStatus, updated_by]
        );

        return res.status(200).json({
            success: true,
            message: "Credit card category updated successfully",
            data: {
                id,
                name,
                slug: finalSlug,
                icon,
                status: finalStatus,
            },
        });

    } catch (error) {
        console.error("Update credit card category error:", error);
        next(error);
    }
};




export const deleteCreditCardCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Category id is required",
            });
        }

        const updated_by = req.admin_id || null;

        const [existing] = await db.execute(
            "SELECT icon FROM tbl_credit_card_categories WHERE id = ?",
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        const icon = existing[0].icon;

        await db.execute(
            "CALL sp_delete_credit_card_category(?, ?)",
            [id, updated_by]
        );

        if (icon) {
            const filePath = path.join(
                process.cwd(),
                icon.replace(`${req.protocol}://${req.get("host")}/`, "")
            );

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        return res.status(200).json({
            success: true,
            message: "Credit card category deleted successfully",
        });

    } catch (error) {
        console.error("Delete credit card category error:", error);
        next(error);
    }
};

import db from "../config/db.js";
import slugify from "slugify";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addCreditCard = async (req, res, next) => {
    try {
        const {
            category_id,
            title,
            subtitle,
            rating,
            total_reviews,
            max_cashback_percent,
            intro_bonus_amount,
            selected_category_cashback,
            other_purchase_cashback,
            annual_fee,
            annual_fee_note,
            intro_apr_percent,
            intro_apr_months,
            is_featured
        } = req.body;

        const created_by = req.admin_id || null;


        let baseSlug = slugify(title, { lower: true, strict: true });
        let finalSlug = baseSlug;
        let count = 1;

        while (true) {
            const [exist] = await db.execute(
                "SELECT id FROM tbl_credit_cards WHERE slug = ?",
                [finalSlug]
            );

            if (exist.length === 0) break;

            finalSlug = `${baseSlug}-${count}`;
            count++;
        }

        const card_image = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/credit-cards/${req.file.filename}`
            : null;


        const [result] = await db.execute(
            `CALL sp_add_credit_card(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                category_id,
                title,
                finalSlug,
                subtitle,
                rating || 0,
                total_reviews || 0,
                max_cashback_percent,
                intro_bonus_amount,
                selected_category_cashback,
                other_purchase_cashback,
                annual_fee || 0,
                annual_fee_note,
                intro_apr_percent,
                intro_apr_months,
                card_image,
                is_featured || false,
                created_by
            ]
        );

        const [card] = await db.execute(
            `SELECT 
                c.*, 
                cat.name AS category_name, 
                cat.slug AS category_slug
             FROM tbl_credit_cards c
             JOIN tbl_credit_card_categories cat 
               ON cat.id = c.category_id
             WHERE c.slug = ?`,
            [finalSlug]
        );

        res.status(201).json({
            success: true,
            message: "Credit card added successfully",
            data: card[0]
        });

    } catch (error) {
        next(error);
        console.log(error);

    }
};








export const getAllCreditCardsAdmin = async (req, res, next) => {
    try {
        const [result] = await db.execute(
            "CALL sp_admin_get_all_credit_cards()"
        );

        const cards = result[0];

        res.json({
            success: true,
            data: cards
        });

    } catch (error) {
        next(error);
    }
};



export const getActiveCreditCardsUser = async (req, res, next) => {
    try {
        const [result] = await db.execute(
            "CALL sp_user_get_active_credit_cards()"
        );

        res.json({
            success: true,
            message: "Credit Card Fetched Succesfully",
            data: result[0]
        });

    } catch (error) {
        next(error);
    }
};





export const getCreditCardByIdAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Credit card id is required"
            });
        }

        const [result] = await db.execute(
            "CALL sp_admin_get_credit_card_by_id(?)",
            [Number(id)]
        );

        const card = result[0];

        if (!card || card.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Credit card not found"
            });
        }

        res.status(200).json({
            success: true,
            data: card[0]
        });

    } catch (error) {
        next(error);
    }
};




export const getCreditCardBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        if (!slug) {
            return res.status(400).json({
                success: false,
                message: "Slug is required",
            });
        }

        const [rows] = await db.query(
            "CALL sp_get_credit_card_by_slug(?)",
            [slug]
        );

        const card = rows[0]?.[0];

        if (!card) {
            return res.status(404).json({
                success: false,
                message: "Credit card not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: card,
        });

    } catch (error) {
        console.error("Get Credit Card By Slug Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};



export const updateCreditCardAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Credit card id is required"
            });
        }

        const {
            category_id,
            title,
            subtitle,
            rating,
            total_reviews,
            max_cashback_percent,
            intro_bonus_amount,
            selected_category_cashback,
            other_purchase_cashback,
            annual_fee,
            annual_fee_note,
            intro_apr_percent,
            intro_apr_months,
            is_featured
        } = req.body;

        const [oldResult] = await db.execute(
            "CALL sp_admin_get_credit_card_by_id(?)",
            [Number(id)]
        );

        const oldCard = oldResult[0]?.[0];

        if (!oldCard) {
            return res.status(404).json({
                success: false,
                message: "Credit card not found"
            });
        }

        let finalSlug = oldCard.slug;

        if (title && title !== oldCard.title) {
            let baseSlug = slugify(title, { lower: true, strict: true });
            finalSlug = baseSlug;
            let count = 1;

            while (true) {
                const [exist] = await db.execute(
                    "SELECT id FROM tbl_credit_cards WHERE slug = ? AND id != ?",
                    [finalSlug, id]
                );

                if (exist.length === 0) break;

                finalSlug = `${baseSlug}-${count}`;
                count++;
            }
        }

        let card_image = null;

        if (req.file) {
            card_image = `${req.protocol}://${req.get("host")}/uploads/credit-cards/${req.file.filename}`;

            if (oldCard.card_image) {
                const oldImagePath = path.join(
                    __dirname,
                    "..",
                    oldCard.card_image.replace(`${req.protocol}://${req.get("host")}/`, "")
                );

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        const isFeaturedValue =
            is_featured === true ||
                is_featured === "true" ||
                is_featured === 1 ||
                is_featured === "1"
                ? 1
                : 0;

        const updated_by = req.admin_id || null;

        await db.execute(
            "CALL sp_admin_update_credit_card(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
                Number(id),
                category_id,
                title,
                finalSlug,
                subtitle,
                rating || 0,
                total_reviews || 0,
                max_cashback_percent,
                intro_bonus_amount,
                selected_category_cashback,
                other_purchase_cashback,
                annual_fee || 0,
                annual_fee_note,
                intro_apr_percent,
                intro_apr_months,
                card_image,
                isFeaturedValue,
                updated_by
            ]
        );

        const [updatedResult] = await db.execute(
            "CALL sp_admin_get_credit_card_by_id(?)",
            [Number(id)]
        );

        res.json({
            success: true,
            message: "Credit card updated successfully",
            data: updatedResult[0][0]
        });

    } catch (error) {
        next(error);
        console.log(error);
    }
};



export const deleteCreditCardAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Credit card id is required",
            });
        }

        await db.execute(
            "CALL sp_admin_delete_credit_card(?)",
            [Number(id)]
        );

        return res.status(200).json({
            success: true,
            message: "Credit card deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};



export const updateCreditCardStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated_by = req.admin_id;


        if (!["active", "inactive"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value",
            });
        }

        const [existing] = await db.query(
            "SELECT id FROM tbl_credit_cards WHERE id = ?",
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Credit card not found",
            });
        }

        await db.query(
            `UPDATE tbl_credit_cards SET status = ?, updated_by = ?,updated_at = NOW()  WHERE id = ?`,
            [status, updated_by, id]
        );

        res.status(200).json({
            success: true,
            message: "Credit card status updated successfully",
        });
    } catch (error) {
        next(error);
    }
};

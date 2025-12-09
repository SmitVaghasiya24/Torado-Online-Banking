import db from "../config/db.js";
import fs from "fs";
import path from "path";


export const addManagementMember = async (req, res, next) => {
    try {
        const { name, position, description } = req.body;
        const created_by = req.admin_id;

        const imageUrl = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/team/${req.file.filename}`
            : null;

        if (!name || !position || !imageUrl) {
            return res.status(400).json({
                success: false,
                message: "Name, position, and image are required"
            });
        }

        const [spResult] = await db.query(
            "CALL sp_add_management_team(?, ?, ?, ?, ?)",
            [
                name,
                position,
                imageUrl,
                description || null,
                created_by || null
            ]
        );

        const insertedId = spResult?.[0]?.[0]?.id;

        if (!insertedId) {
            return res.status(500).json({
                success: false,
                message: "Member created but ID not returned"
            });
        }

        const [memberRows] = await db.query(
            "SELECT * FROM tbl_management_team WHERE id = ?",
            [insertedId]
        );

        return res.status(201).json({
            success: true,
            message: "Management member added successfully",
            member: memberRows[0]
        });

    } catch (error) {
        console.error("Error in addManagementMember:", error);
        next(error);
    }
};






export const getManagementTeam = async (req, res, next) => {
    try {
        const status = req.query.status || "all";

        const [spResult] = await db.query(
            "CALL sp_get_management_team(?)",
            [status]
        );

        const members = spResult[0];

        return res.status(200).json({
            success: true,
            count: members.length,
            members
        });

    } catch (error) {
        console.error("Error in getManagementTeam:", error);
        next(error);
    }
};



export const updateManagementStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated_by = req.admin_id;

        if (!status || !["active", "inactive"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be 'active' or 'inactive'"
            });
        }

        const [result] = await db.query(
            "CALL sp_update_management_status(?, ?, ?)",
            [id, status, updated_by]
        );

        const affected = result[0][0].affected_rows;

        if (affected === 0) {
            return res.status(404).json({
                success: false,
                message: "Member not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Status updated successfully",
            data: { id, status }
        });

    } catch (error) {
        console.error("Error in updateManagementStatus:", error);
        next(error);
    }
};



export const updateManagementMember = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, position, description } = req.body;
        const updated_by = req.admin_id;

        const [oldDataRows] = await db.query(
            "SELECT * FROM tbl_management_team WHERE id = ?",
            [id]
        );

        if (oldDataRows.length === 0) {
            return res.status(404).json({ message: "Member not found" });
        }

        const oldData = oldDataRows[0];

        const newImageUrl = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/team/${req.file.filename}`
            : oldData.image;

        if (req.file && oldData.image) {
            const oldImagePath = path.join(
                "uploads",
                "team",
                oldData.image.split("/team/")[1]
            );

            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.log("Old image delete error:", err);
                } else {
                    console.log("Old image deleted:", oldImagePath);
                }
            });
        }

        await db.query(
            "CALL sp_update_management_team(?, ?, ?, ?, ?, ?)",
            [
                id,
                name || oldData.name,
                position || oldData.position,
                newImageUrl,
                description || oldData.description,
                updated_by
            ]
        );

        res.status(200).json({
            success: true,
            message: "Management member updated successfully"
        });

    } catch (error) {
        console.error("Error in updateManagementMember:", error);
        next(error);
    }
};







export const deleteManagementMember = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [rows] = await db.query(
            "SELECT * FROM tbl_management_team WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Member not found"
            });
        }

        const member = rows[0];
        if (member.image) {
            const fileName = member.image.split("/team/")[1];
            const filePath = path.join("uploads", "team", fileName);

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log("Image delete error:", err);
                } else {
                    console.log("Image deleted:", filePath);
                }
            });
        }

        const [spResult] = await db.query(
            "CALL sp_delete_management_member(?)",
            [id]
        );

        const affected = spResult?.[0]?.[0]?.affected;

        if (affected === 0) {
            return res.status(400).json({
                success: false,
                message: "Deletion failed"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Management member deleted successfully"
        });

    } catch (error) {
        console.error("Error in deleteManagementMember:", error);
        next(error);
    }
};

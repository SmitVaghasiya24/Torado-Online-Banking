import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

export const adminSignup = async (req, res, next) => {
    try {
        const { name, email, password, role, created_by } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required"
            });
        }

        const [existing] = await db.execute(
            "SELECT admin_id FROM tbl_admins WHERE email = ?",
            [email]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 6 characters, include one uppercase letter and one special character"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const finalRole = role || "admin";

        const [superAdmins] = await db.execute(
            "SELECT admin_id FROM tbl_admins WHERE role = 'superadmin' AND status = 'approved'"
        );

        let status = "pending";

        if (finalRole === "superadmin" && superAdmins.length === 0) {
            status = "approved";
        }

        const [spResult] = await db.query(
            "CALL sp_add_admin(?, ?, ?, ?, ?, ?)",
            [
                name,
                email,
                hashedPassword,
                finalRole,
                status,
                created_by || null
            ]
        );

        const admin_id = spResult?.[0]?.[0]?.admin_id;

        if (!admin_id) {
            return res.status(500).json({
                success: false,
                message: "Admin created but ID not returned"
            });
        }

        return res.status(201).json({
            success: true,
            message:
                status === "approved"
                    ? "Superadmin registered successfully. Full access granted."
                    : `${finalRole} registered successfully. Waiting for superadmin approval.`,
            admin: {
                admin_id,
                name,
                email,
                role: finalRole,
                status
            }
        });

    } catch (error) {
        console.error("Admin Signup Error:", error);
        next(error);
    }
};



export const getPendingAdmin = async (req, res, next) => {
    try {
        const [spResult] = await db.query("CALL sp_get_pending_admins()");
        const admins = spResult[0];

        res.status(200).json({
            success: true,
            message: "Pending Admin Fetched Succesfully",
            count: admins.length,
            admins
        });

    } catch (error) {
        next(error);
    }
};



export const getAllAdmin = async (req, res, next) => {
    try {
        const [spResult] = await db.query("CALL sp_get_all_admins()");
        const admins = spResult[0];

        res.status(200).json({
            success: true,
            message: "Admin Fetched Succesfully",
            count: admins.length,
            admins
        });

    } catch (error) {
        next(error);
    }
};






export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [spResult] = await db.query(
            "CALL sp_admin_login(?)",
            [email]
        );

        const admins = spResult[0];

        if (admins.length === 0) {
            return res.status(400).json({ message: "Admin not found" });
        }

        const admin = admins[0];

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        if (admin.status !== "approved") {
            return res.status(403).json({
                message: "Your account is not approved by superadmin yet."
            });
        }

        const token = jwt.sign(
            { id: admin.admin_id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            admin: {
                admin_id: admin.admin_id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};



export const approveAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated_by = req.admin_id;

        const [result] = await db.query(
            "CALL sp_approve_admin(?, ?)",
            [id, updated_by]
        );

        return res.status(200).json({
            success: true,
            message: "Admin approved successfully"
        });

    } catch (err) {
        console.log(err);
        next(err);
    }
};



export const rejectAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated_by = req.admin_id;

        const [result] = await db.query(
            "CALL sp_reject_admin(?, ?)",
            [id, updated_by]
        );

        return res.status(200).json({
            success: true,
            message: "Admin rejected successfully"
        });

    } catch (err) {
        console.log(err);
        next(err);
    }
};




export const deleteAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            "CALL sp_delete_admin(?)",
            [id]
        );

        return res.status(200).json({
            success: true,
            message: "Admin deleted successfully"
        });

    } catch (err) {
        console.log(err);
        next(err);
    }
};




export const getAdminCount = async (req, res) => {
    try {
        const query = "SELECT COUNT(*) AS totalAdmins FROM tbl_admins";

        const [rows] = await db.query(query);

        return res.status(200).json({
            success: true,
            totalAdmins: rows[0].totalAdmins,
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};




export const getPendingAdminCount = async (req, res) => {
    try {
        const query =
            "SELECT COUNT(*) AS pendingAdmins FROM tbl_admins WHERE status = 'pending'";

        const [rows] = await db.query(query);

        return res.status(200).json({
            success: true,
            pendingAdmins: rows[0].pendingAdmins,
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

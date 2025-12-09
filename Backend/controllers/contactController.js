import db from "../config/db.js";

export const addContactInfo = async (req, res, next) => {
    try {
        const {
            address,
            phone,
            email,
            service_hours,
            banking_phone,
            mortgage_phone,
            credit_card_phone,
            personal_loan_phone,
            status
        } = req.body;

        const created_by = req.admin_id;

        if (!address) {
            return res.status(400).json({
                success: false,
                message: "Address is required"
            });
        }

        const phoneJson = Array.isArray(phone) ? JSON.stringify(phone) : phone;
        const emailJson = Array.isArray(email) ? JSON.stringify(email) : email;

        const [result] = await db.query(
            "CALL sp_add_contact_info(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                address,
                phoneJson,
                emailJson,
                service_hours,
                banking_phone,
                mortgage_phone,
                credit_card_phone,
                personal_loan_phone,
                status || "active",
                created_by
            ]
        );

        const insertedId = result?.[0]?.[0]?.inserted_id;

        return res.status(201).json({
            success: true,
            message: "Contact info added successfully",
            data: {
                id: insertedId,
                address,
                phone: phoneJson,
                email: emailJson,
                service_hours,
                banking_phone,
                mortgage_phone,
                credit_card_phone,
                personal_loan_phone,
                status: status || "active"
            }
        });

    } catch (error) {
        console.error("Error adding contact info:", error);
        next(error)
    }
};




export const getContactInfo = async (req, res, next) => {
    try {
        const [rows] = await db.query("CALL sp_get_contact_info()");

        const data = rows[0][0];

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Contact information not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contact information fetched successfully",
            data
        });

    } catch (error) {
        console.error("Error fetching contact info:", error);
        next(error);
    }
};




export const updateContactInfo = async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            address,
            phone,
            email,
            service_hours,
            banking_phone,
            mortgage_phone,
            credit_card_phone,
            personal_loan_phone,
            status
        } = req.body;

        const updated_by = req.admin_id;

        if (!address) {
            return res.status(400).json({
                success: false,
                message: "Address is required"
            });
        }

        const phoneJson = Array.isArray(phone) ? JSON.stringify(phone) : phone;
        const emailJson = Array.isArray(email) ? JSON.stringify(email) : email;

        const [result] = await db.query(
            "CALL sp_update_contact_info(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                id,
                address,
                phoneJson,
                emailJson,
                service_hours,
                banking_phone,
                mortgage_phone,
                credit_card_phone,
                personal_loan_phone,
                status || "active",
                updated_by
            ]
        );

        const affectedRows = result?.[0]?.[0]?.affected_rows;

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Contact info not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contact info updated successfully",
            data: {
                id,
                address,
                phone: phoneJson,
                email: emailJson,
                service_hours,
                banking_phone,
                mortgage_phone,
                credit_card_phone,
                personal_loan_phone,
                status: status || "active"
            }
        });

    } catch (error) {
        console.error("Error updating contact info:", error);
        next(error);
    }
};





export const deleteContactInfo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated_by = req.admin_id;

        const [result] = await db.query(
            "CALL sp_delete_contact_info(?, ?)",
            [id, updated_by]
        );

        const affected = result?.[0]?.[0]?.affected_rows;

        if (affected === 0) {
            return res.status(404).json({
                success: false,
                message: "Contact info not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contact info deleted (soft) successfully"
        });

    } catch (error) {
        console.error("Error deleting contact info:", error);
        next(error);
    }
};




export const addContactMessage = async (req, res, next) => {
    try {
        const {
            name,
            email,
            phone,
            subject,
            message,
            agreed_terms
        } = req.body;

        const user_id = req.user_id || null;
        const created_by = req.admin_id || null;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email, subject, and message are required"
            });
        }

        const agreed = agreed_terms ? 1 : 0;

        const [result] = await db.query(
            "CALL sp_add_contact_message(?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                user_id,
                name,
                email,
                phone || null,
                subject,
                message,
                agreed,
                "active",
                created_by
            ]
        );

        const insertedId = result?.[0]?.[0]?.inserted_id;

        return res.status(201).json({
            success: true,
            message: "Message submitted successfully",
            data: {
                id: insertedId,
                user_id,
                name,
                email,
                phone,
                subject,
                message,
                agreed_terms: agreed
            }
        });

    } catch (error) {
        console.error("Error adding contact message:", error);
        next(error);
    }
};



export const getContactMessages = async (req, res, next) => {
    try {
        const [rows] = await db.query("CALL sp_get_contact_messages()");

        const data = rows[0];

        return res.status(200).json({
            success: true,
            message: "Messages fetched successfully",
            data
        });

    } catch (error) {
        console.error("Error fetching contact messages:", error);
        next(error);
    }
};

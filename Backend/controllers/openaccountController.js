import db from "../config/db.js";

export const addOpenAccount = async (req, res, next) => {
    try {
        const {
            first_name,
            middle_name,
            last_name,
            taxpayer_type,
            taxpayer_number,
            id_type,
            id_number,
            state_of_issue,
            id_expiration_date,
            date_of_birth,
            citizenship,
            email,
            phone_number,
            home_address_1,
            home_address_2,
            city,
            state,
            zip_code,
            profession,
            terms_accepted
        } = req.body;

        const user_id = req.user_id;

        if (
            !first_name ||
            !last_name ||
            !taxpayer_type ||
            !taxpayer_number ||
            !id_type ||
            !id_number ||
            !state_of_issue ||
            !id_expiration_date ||
            !date_of_birth ||
            !citizenship ||
            !email ||
            !phone_number ||
            !home_address_1 ||
            !city ||
            !state ||
            !zip_code ||
            !profession ||
            !terms_accepted
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be filled"
            });
        }

        const [rows] = await db.execute(
            "CALL sp_add_open_account(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
                user_id,
                first_name,
                middle_name || null,
                last_name,
                taxpayer_type,
                taxpayer_number,
                id_type,
                id_number,
                state_of_issue,
                id_expiration_date,
                date_of_birth,
                citizenship,
                email,
                phone_number,
                home_address_1,
                home_address_2 || null,
                city,
                state,
                zip_code,
                profession,
                terms_accepted ? 1 : 0,
                user_id
            ]
        );

        const insertedId = rows?.[0]?.[0]?.inserted_id || null;

        return res.status(201).json({
            success: true,
            message: "Account application submitted successfully",
            application_id: insertedId
        });
    } catch (error) {
        console.error("Add open account error:", error);
        next(error);
    }
};





export const getAllOpenAccounts = async (req, res, next) => {
    try {
        const [rows] = await db.execute(
            "CALL sp_get_all_open_accounts()"
        );

        return res.status(200).json({
            success: true,
            message: "Account Details Fetched Succesfully",
            data: rows[0]
        });
    } catch (error) {
        console.error("Get open accounts error:", error);
        next(error);
    }
};

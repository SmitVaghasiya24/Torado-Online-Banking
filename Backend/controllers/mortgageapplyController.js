import db from "../config/db.js";

export const addMortgageApplication = async (req, res, next) => {
    try {
        const {
            request_type,
            interested_purchase_home,
            interested_move_mortgage,
            interested_refinance,
            full_name,
            date_of_birth,
            ssn,
            marital_status,
            home_address,
            unit_optional,
            city,
            province,
            postal_code,
            telephone_number,
            email,
            gross_annual_income,
            down_payment_amount,
            terms_confirmed
        } = req.body;

        const user_id = req.user_id || null;
        const created_by = req.user_id || null;

        if (
            !request_type ||
            !full_name ||
            !date_of_birth ||
            !ssn ||
            !marital_status ||
            !home_address ||
            !city ||
            !province ||
            !postal_code ||
            !telephone_number ||
            !email ||
            !gross_annual_income ||
            !terms_confirmed
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be filled"
            });
        }

        const [rows] = await db.execute(
            `CALL sp_add_mortgage_application(
        ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
      )`,
            [
                user_id,
                request_type,
                interested_purchase_home || 0,
                interested_move_mortgage || 0,
                interested_refinance || 0,
                full_name,
                date_of_birth,
                ssn,
                marital_status,
                home_address,
                unit_optional || null,
                city,
                province,
                postal_code,
                telephone_number,
                email,
                gross_annual_income,
                down_payment_amount || null,
                terms_confirmed,
                created_by
            ]
        );

        const insertedId = rows?.[0]?.[0]?.inserted_id || null;

        return res.status(201).json({
            success: true,
            message: "Mortgage application submitted successfully",
            application_id: insertedId
        });
    } catch (error) {
        console.error("Add mortgage application error:", error);
        next(error);
    }
};





export const getMortgageApplications = async (req, res, next) => {
    try {
        const [rows] = await db.execute(
            "CALL sp_get_mortgage_applications()"
        );

        const data = rows?.[0] || [];

        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        console.error("Get mortgage applications error:", error);
        next(error);
    }
};

import db from "../config/db.js";

export const addLoanApplication = async (req, res, next) => {
    try {
        const {
            first_name,
            date_of_birth,
            telephone,
            email,
            marital_status,
            home_address,
            city,
            postal_code,
            profession,
            organization_name,
            monthly_income,
            desired_amount,
            loan_tenure_month,
            existing_loan_tenure_month
        } = req.body;

        const user_id = req.user_id;

        if (
            !first_name ||
            !date_of_birth ||
            !telephone ||
            !email ||
            !marital_status ||
            !home_address ||
            !city ||
            !postal_code ||
            !profession ||
            !monthly_income ||
            !desired_amount ||
            !loan_tenure_month
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be filled"
            });
        }

        const [rows] = await db.execute(
            "CALL sp_add_loan_application(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
                user_id,
                first_name,
                date_of_birth,
                telephone,
                email,
                marital_status,
                home_address,
                city,
                postal_code,
                profession,
                organization_name || null,
                monthly_income,
                desired_amount,
                loan_tenure_month,
                existing_loan_tenure_month || null,
                user_id
            ]
        );

        const insertedId = rows?.[0]?.[0]?.inserted_id || null;

        return res.status(201).json({
            success: true,
            message: "Loan application submitted successfully",
            application_id: insertedId
        });
    } catch (error) {
        console.error("Add loan application error:", error);
        next(error);
    }
};






export const getAllLoanApplications = async (req, res, next) => {
    try {
        const [rows] = await db.execute(
            "CALL sp_get_all_loan_applications()"
        );

        return res.status(200).json({
            success: true,
            message:"Loan Application Fetched Succesfully",
            data: rows[0]
        });
    } catch (error) {
        console.error("Get all loan applications error:", error);
        next(error);
    }
};
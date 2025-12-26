import CreditCardApply from "../models/CreditCardApply.js";

export const addCreditCardApplication = async (req, res, next) => {
    try {
        const userId = req.user_id;

        if (!req.body.first_name || !req.body.last_name || !req.body.email) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing",
            });
        }

        if (!req.body.terms_accepted) {
            return res.status(400).json({
                success: false,
                message: "You must accept terms and conditions",
            });
        }

       

        const application = await CreditCardApply.create({
            user_id: userId,
            ...req.body,
            created_by: userId,
        });

        res.status(201).json({
            success: true,
            message: "Credit card application submitted successfully",
            data: application,
        });
    } catch (error) {
        console.error("Credit card apply error:", error);
        next(error)
    }
};




export const getAllCreditCardApplications = async (req, res, next) => {
    try {
        const applications = await CreditCardApply.findAll({
            order: [["created_at", "DESC"]],
        });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications,
        });
    } catch (error) {
        next(error);
    }
};
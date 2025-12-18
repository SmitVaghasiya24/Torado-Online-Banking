import db from "../config/db.js";

export const addNewsComment = async (req, res, next) => {
    try {
        const {
            news_id,
            name,
            email,
            phone,
            website,
            comment
        } = req.body;

        const created_by = req.user_id;


        if (!news_id || !name || !email || !comment) {
            return res.status(400).json({
                success: false,
                message: "News, Name, Email and Comment are required"
            });
        }


        await db.query(
            "CALL sp_add_news_comment(?, ?, ?, ?, ?, ?, ?)",
            [
                news_id,
                name,
                email,
                phone || null,
                website || null,
                comment,
                created_by
            ]
        );

        res.status(201).json({
            success: true,
            message: "Comment submitted successfully"
        });

    } catch (error) {
        console.error("Add news comment error:", error);
        next(error);
    }
};







export const getNewsComments = async (req, res, next) => {
    try {
        const { news_id } = req.params;

        if (!news_id) {
            return res.status(400).json({
                success: false,
                message: "News ID is required"
            });
        }

        const [rows] = await db.query(
            "CALL sp_get_news_comments(?)",
            [news_id]
        );

        res.status(200).json({
            success: true,
            data: rows[0]
        });

    } catch (error) {
        console.error("Get news comments error:", error);
        next(error);
    }
};

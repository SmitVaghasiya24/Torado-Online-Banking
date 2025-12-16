import db from "../config/db.js";

export const subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        const created_by = req.user_id;


        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        const ipAddress =
            req.headers["x-forwarded-for"]?.split(",")[0] ||
            req.socket.remoteAddress ||
            null;

        const createdBy = req.user_id || req.admin_id || null;

        const query = `
  INSERT INTO tbl_subscribers (
    email,
    status,
    ip_address,
    created_by
  )
  VALUES (?, 'active', ?, ?)
  ON DUPLICATE KEY UPDATE
    status = 'active',
    unsubscribed_at = NULL,
    ip_address = VALUES(ip_address),
    updated_by = VALUES(created_by),
    updated_at = CURRENT_TIMESTAMP
`;

        await db.execute(query, [email, ipAddress, created_by]);


        res.status(200).json({
            success: true,
            message: "Subscribed successfully",
        });
    } catch (error) {
        console.error("Subscribe error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};




export const getAllSubscribers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || null;
        const status = req.query.status || null;

        const [result] = await db.query(
            "CALL sp_get_subscribers(?, ?, ?, ?)",
            [page, limit, search, status]
        );

        const total = result[0][0].total;
        const data = result[1];

        res.json({
            success: true,
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Fetch subscribers error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

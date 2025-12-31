export default function authorize(allowedRoles = []) {
    return (req, res, next) => {
        if (!req.admin_role) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Admin Login required.",
            });
        }

        if (
            allowedRoles.length > 0 &&
            !allowedRoles.includes(req.admin_role)
        ) {
            return res.status(403).json({
                success: false,
                message: "Forbidden. You do not have permission.",
            });
        }

        next();
    };
}

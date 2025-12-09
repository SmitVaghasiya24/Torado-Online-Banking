import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id) {
      req.admin_id = decoded.id;
      req.admin_role = decoded.role || null;
      req.admin_email = decoded.email || null;
    }

    if (decoded.user_id) {
      req.user_id = decoded.user_id;
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};


export const isSuperadmin = (req, res, next) => {
  if (req.admin_role !== "superadmin") {
    return res.status(403).json({ message: "Access denied. Only superadmin allowed." });
  }
  next();
};

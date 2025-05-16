const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    console.log("authMiddleware called...");

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token required for access" });
    }

    try {
        const decoded = await jwt.verify(token, process.env.MY_TOKEN);
        console.log("Decoded Token:", decoded);
        req.user = decoded;        // Save decoded user info (email, role)
        req.role = decoded.role;
        req.userId = decoded.id;  
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token", error: err.message });
    }
};

const adminOnly = async (req, res, next) => {
    if (req.role === "admin") {
        return next();
    }
    return res.status(403).json({ message: "You are not authorized to access this endpoint" });
};

module.exports = {
    authMiddleware,
    adminOnly
};

const express = require("express");
const router = express.Router();
const inquiryController = require("../controllers/inquiry.controller");
const { authMiddleware, adminOnly } = require("../middlewares/auth.middleware");

// Route to create a new inquiry
router.post("/", authMiddleware, inquiryController.createInquiry);

// Route to get all inquiries (for admins only)
router.get("/", authMiddleware, adminOnly, inquiryController.getAllInquiries);

// Route to get a specific inquiry by userId
router.get("/:userId", authMiddleware, inquiryController.getUserInquiries);

module.exports = {
    router
};

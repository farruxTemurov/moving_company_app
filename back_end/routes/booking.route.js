const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");
const { authMiddleware, adminOnly } = require("../middlewares/auth.middleware");

// Route to create a new booking
router.post("/", authMiddleware, bookingController.createBooking);

// Route to get all bookings (for admins only)
router.get("/", authMiddleware, adminOnly, bookingController.getAllBookings);

// Route to get all bookings by user (for customers to view their own bookings)
router.get("/:userId", authMiddleware, bookingController.getUserBookings);

// Update booking status (admin only)
router.put("/status/:id", authMiddleware, adminOnly, bookingController.updateBookingStatus);

module.exports = {
    router
};

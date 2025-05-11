// controllers/bookingController.js
const bookingService = require('../services/booking.service');

const createBooking = async (req, res) => {
    try {
        const booking = req.body;
        const result = await bookingService.createBooking(booking);
        res.json({ msg: 'Booking created successfully', data: result });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const result = await bookingService.getAllBookings();
        res.json(result);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await bookingService.getUserBookings(userId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const result = await bookingService.updateBookingStatus(id, status);
        res.json({ msg: 'Booking status updated', data: result });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getUserBookings,
    updateBookingStatus,
};

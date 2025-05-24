const bookingService = require('../services/booking.service');
const mongoose = require('mongoose');

const createBooking = async (req, res) => {
    try {
        const { source, destination, date } = req.body;
        const userId = req.user.id;

        // Validate required fields
        if (!source || !destination || !date) {
            return res.status(400).json({ msg: 'Source, Destination, and Date are required' });
        }

        // Prepare booking data as per your model
        const booking = {
            userId,
            source,
            destination,
            date: new Date(date),
            amount: 0, // Placeholder, you can update it later based on distance etc.
            status: "Pending"
        };

        const result = await bookingService.createBooking(booking);
        res.status(201).json({ msg: 'Booking created successfully', data: result });
    } catch (error) {
        console.error('Booking Error:', error);
        res.status(500).json({ msg: 'Server error. Please try again later.' });
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

        if (!status) {
            return res.status(400).json({ msg: 'Status is required' });
        }

        // ✅ Validate bookingId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'Invalid booking ID' });
        }

        const result = await bookingService.updateBookingStatus(id, status);

        // ✅ Handle case where booking is not found
        if (!result) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

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

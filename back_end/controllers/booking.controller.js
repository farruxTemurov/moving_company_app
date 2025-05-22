const bookingService = require('../services/booking.service');

const createBooking = async (req, res) => {
    try {
        const { fromAddress, toAddress, date } = req.body;
        const userId = req.user.id;

        // Validate required fields
        if (!fromAddress || !toAddress || !date) {
            return res.status(400).json({ msg: 'From Address, To Address, and Date are required' });
        }

        // Construct the booking data according to your model
        const booking = {
            userId,
            source: fromAddress,
            destination: toAddress,
            date: new Date(date),
            amount: 0 // You can calculate actual amount later if needed
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

const BookingModel = require("../models/booking.model");
const mongoose = require('mongoose');

const createBooking = async (bookingData) => {
    const newBooking = new BookingModel(bookingData);
    const result = await newBooking.save();
    return result;
};

const getAllBookings = async () => {
    const result = await BookingModel.find().populate("userId");
    return result;
};

const getBookingsByUserId = async (userId) => {
    const result = await BookingModel.find({ userId: mongoose.Types.ObjectId(userId) });
    return result;
};

const updateBookingStatus = async (bookingId, status) => {
    const result = await BookingModel.findByIdAndUpdate(
        bookingId,
        { status },
        { new: true }
    );
    return result;
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingsByUserId,
    updateBookingStatus
};

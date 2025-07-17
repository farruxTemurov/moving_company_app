const bookingRepository = require('../repositories/booking.repository');

const createBooking = async (bookingData) => {
    const result = await bookingRepository.createBooking(bookingData);
    return result;
};

const getAllBookings = async () => {
    const result = await bookingRepository.getAllBookings();
    return result;
};

const getUserBookings = async (userId) => {
    const result = await bookingRepository.getBookingsByUserId(userId);
    return result;
};

const updateBookingStatus = async (bookingId, status) => {
    const result = await bookingRepository.updateBookingStatus(bookingId, status);
    return result;
};

module.exports = {
    createBooking,
    getAllBookings,
    getUserBookings,
    updateBookingStatus
};

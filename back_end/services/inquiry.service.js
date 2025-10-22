const inquiryRepository = require('../repositories/inquiry.repository');

const createInquiry = async (inquiryData) => {
    const result = await inquiryRepository.createInquiry(inquiryData);
    return result;
};

const getAllInquiries = async () => {
    const result = await inquiryRepository.getAllInquiries();
    return result;
};

const getInquiriesByUserId = async (userId) => {
    return await inquiryRepository.getInquiriesByUserId(userId);
};

const addQuoteToInquiry = async (inquiryId, quote) => {
    const result = await inquiryRepository.addQuote(inquiryId, quote);
    return result;
};

module.exports = {
    createInquiry,
    getAllInquiries,
    getInquiriesByUserId,
    addQuoteToInquiry
};

// services/inquiry.service.js
const inquiryRepository = require('../repositories/inquiry.repository');

const createInquiry = async (inquiryData) => {
    const result = await inquiryRepository.createInquiry(inquiryData);
    return result;
};

const getAllInquiries = async () => {
    const result = await inquiryRepository.getAllInquiries();
    return result;
};

const getInquiryById = async (inquiryId) => {
    const result = await inquiryRepository.getInquiryById(inquiryId);
    return result;
};

const addQuoteToInquiry = async (inquiryId, quote) => {
    const result = await inquiryRepository.addQuote(inquiryId, quote);
    return result;
};

module.exports = {
    createInquiry,
    getAllInquiries,
    getInquiryById,
    addQuoteToInquiry
};

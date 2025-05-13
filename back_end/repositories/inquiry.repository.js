// repositories/inquiry.repository.js
const InquiryModel = require("../models/inquiry.model");

const createInquiry = async (inquiryData) => {
    const newInquiry = new InquiryModel(inquiryData);
    const result = await newInquiry.save();
    return result;
};

const getAllInquiries = async () => {
    const result = await InquiryModel.find().populate("userId");
    return result;
};

const getInquiryById = async (inquiryId) => {
    const result = await InquiryModel.findById(inquiryId);
    return result;
};

const addQuote = async (inquiryId, quote) => {
    const result = await InquiryModel.findByIdAndUpdate(
        inquiryId,
        { quote },
        { new: true }
    );
    return result;
};

module.exports = {
    createInquiry,
    getAllInquiries,
    getInquiryById,
    addQuote
};

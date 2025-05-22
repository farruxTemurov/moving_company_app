// repositories/inquiry.repository.js
const mongoose = require("mongoose");
const InquiryModel = require("../models/inquiry.model");

const createInquiry = async (inquiryData) => {
    const newInquiry = new InquiryModel(inquiryData);
    const result = await newInquiry.save();
    return result;
};

const getAllInquiries = async () => {
    // const result = await InquiryModel.find().populate("userId");
    const result = await InquiryModel.find();
    return result;
};

const getInquiriesByUserId = async (userId) => {
    const objectId = new mongoose.Types.ObjectId(userId);
    const result = await InquiryModel.find({ userId: objectId }).populate("userId");
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
    getInquiriesByUserId,
    addQuote
};

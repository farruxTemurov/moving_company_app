const mongoose = require('mongoose');

const inquirySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // This must match the model name you used in userModel
        required: true
    },
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    details: {
        type: String
    },
    quote: {
        type: Number // This will be filled by admin after reviewing inquiry
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const inquiryModel = mongoose.model("inquiries", inquirySchema);
module.exports = inquiryModel;

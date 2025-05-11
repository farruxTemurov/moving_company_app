// controllers/inquiryController.js
const inquiryService = require('../services/inquiry.service');

const createInquiry = async (req, res) => {
    try {
        const inquiry = req.body;
        const result = await inquiryService.createInquiry(inquiry);
        res.json({ msg: 'Inquiry submitted successfully', data: result });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getAllInquiries = async (req, res) => {
    try {
        const result = await inquiryService.getAllInquiries();
        res.json(result);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getInquiryById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await inquiryService.getInquiryById(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const updateInquiryWithQuote = async (req, res) => {
    try {
        const { id } = req.params;
        const { quote } = req.body;
        const result = await inquiryService.addQuoteToInquiry(id, quote);
        res.json({ msg: 'Quote added to inquiry', data: result });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    createInquiry,
    getAllInquiries,
    getInquiryById,
    updateInquiryWithQuote,
};

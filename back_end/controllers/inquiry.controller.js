// controllers/inquiryController.js
const inquiryService = require('../services/inquiry.service');

const createInquiry = async (req, res) => {
    try {
        const { source, destination, date, name, email, phone } = req.body;
        const userId = req.user.id; // assuming your auth middleware adds req.user

        // Validate required fields
        if (!source || !destination || !date) {
            return res.status(400).json({ msg: 'Source, destination, and date are required' });
        }

        // Construct inquiry object to match schema
        const inquiry = {
            userId,
            source,
            destination,
            date: new Date(date),
            details: `Name: ${name}, Email: ${email}, Phone: ${phone}`,
            quote: 0
        };

        const result = await inquiryService.createInquiry(inquiry);
        res.status(201).json({ msg: 'Inquiry submitted successfully', data: result });
    } catch (error) {
        console.error('Inquiry submission failed:', error);
        res.status(500).json({ msg: 'Server error. Please try again later.' });
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

const getInquiriesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;  // Extract userId from URL params
        const result = await inquiryService.getInquiriesByUserId(userId); // Fetch inquiries by userId
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
    getInquiriesByUserId,
    updateInquiryWithQuote,
};

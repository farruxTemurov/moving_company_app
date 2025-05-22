// src/pages/InquiryForm.jsx
import { useState } from "react";
import axios from "../utils/axiosInstance";

export default function InquiryForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        fromAddress: "",
        toAddress: "",
        movingDate: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await axios.post("/inquiries", form);
            setSuccess("Inquiry submitted successfully!");
            setForm({
                name: "",
                email: "",
                phone: "",
                fromAddress: "",
                toAddress: "",
                movingDate: "",
            });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to submit inquiry");
        }
        setLoading(false);
    };

    return (
        <div className="max-w-lg mx-auto p-6 shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Submit Your Moving Inquiry</h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            {success && <p className="text-green-600 mb-4">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
                <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
                <input
                    name="fromAddress"
                    type="text"
                    placeholder="From Address"
                    value={form.fromAddress}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
                <input
                    name="toAddress"
                    type="text"
                    placeholder="To Address"
                    value={form.toAddress}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
                <input
                    name="movingDate"
                    type="date"
                    placeholder="Moving Date"
                    value={form.movingDate}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full"
                >
                    {loading ? "Submitting..." : "Submit Inquiry"}
                </button>
            </form>
        </div>
    );
}

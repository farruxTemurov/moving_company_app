import { useState } from "react";
import axios from "../utils/axiosInstance";

export default function InquiryForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        source: "",
        destination: "",
        date: "",
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
                source: "",
                destination: "",
                date: "",
            });
        } catch (err) {
            setError(err.response?.data?.msg || "Failed to submit inquiry");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-6 text-indigo-600">
                Submit Your Moving Inquiry
            </h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            {success && <p className="text-green-600 mb-4">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-5">
                <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="input input-bordered border border-gray-400 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="input input-bordered border border-gray-400 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
                <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className="input input-bordered border border-gray-400 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
                <input
                    name="source"
                    type="text"
                    placeholder="From Address"
                    value={form.source}
                    onChange={handleChange}
                    className="input input-bordered border border-gray-400 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
                <input
                    name="destination"
                    type="text"
                    placeholder="To Address"
                    value={form.destination}
                    onChange={handleChange}
                    className="input input-bordered border border-gray-400 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
                <input
                    name="date"
                    type="date"
                    placeholder="Moving Date"
                    value={form.date}
                    onChange={handleChange}
                    className="input input-bordered border border-gray-400 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full transition duration-300"
                >
                    {loading ? "Submitting..." : "Submit Inquiry"}
                </button>
            </form>
        </div>
    );
}

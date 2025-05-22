// src/pages/BookingPage.jsx
import { useState } from "react";
import axios from "../utils/axiosInstance";

export default function BookingPage() {
    const [form, setForm] = useState({
        source: "",        // changed from fromAddress
        destination: "",   // changed from toAddress
        date: "",
        serviceType: "Standard",
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
            await axios.post("/bookings", form);
            setSuccess("Booking successful!");
            setForm({
                source: "",
                destination: "",
                date: "",
                serviceType: "Standard",
            });
        } catch (err) {
            setError(err.response?.data?.message || "Booking failed");
        }
        setLoading(false);
    };

    return (
        <div className="max-w-lg mx-auto p-6 shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Book Your Move</h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            {success && <p className="text-green-600 mb-4">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="source"               // changed here
                    type="text"
                    placeholder="From Address"
                    value={form.source}         // changed here
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
                <input
                    name="destination"          // changed here
                    type="text"
                    placeholder="To Address"
                    value={form.destination}    // changed here
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
                <input
                    name="date"
                    type="date"
                    placeholder="Moving Date"
                    value={form.date}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
                <select
                    name="serviceType"
                    value={form.serviceType}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                >
                    <option value="Standard">Standard</option>
                    <option value="Express">Express</option>
                    <option value="Premium">Premium</option>
                </select>
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full"
                >
                    {loading ? "Booking..." : "Book Now"}
                </button>
            </form>
        </div>
    );
}

import { useState } from "react";
import axios from "../utils/axiosInstance";

export default function BookingPage() {
    const [form, setForm] = useState({
        source: "",
        destination: "",
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
        <div className="max-w-lg mx-auto p-8 shadow-lg rounded-lg bg-white">
            <h2 className="text-3xl font-extrabold mb-6 text-indigo-600">Book Your Move</h2>

            {error && (
                <p className="bg-red-100 text-red-700 border border-red-300 rounded-md p-3 mb-6">
                    {error}
                </p>
            )}
            {success && (
                <p className="bg-green-100 text-green-700 border border-green-300 rounded-md p-3 mb-6">
                    {success}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <input
                    name="source"
                    type="text"
                    placeholder="From Address"
                    value={form.source}
                    onChange={handleChange}
                    className="input input-bordered border border-gray-400 rounded-md w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />

                <input
                    name="destination"
                    type="text"
                    placeholder="To Address"
                    value={form.destination}
                    onChange={handleChange}
                    className="input input-bordered border border-gray-400 rounded-md w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />

                <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    className="input input-bordered border border-gray-400 rounded-md w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />

                <select
                    name="serviceType"
                    value={form.serviceType}
                    onChange={handleChange}
                    className="select select-bordered border border-gray-400 rounded-md w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="Standard">Standard</option>
                    <option value="Express">Express</option>
                    <option value="Premium">Premium</option>
                </select>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full transition duration-300"
                >
                    {loading ? "Booking..." : "Book Now"}
                </button>
            </form>
        </div>
    );
}

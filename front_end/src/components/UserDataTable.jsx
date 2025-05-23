import { useContext, useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { AuthContext } from "../context/AuthContext";

const UserDataTable = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [inquiries, setInquiries] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const [bookingRes, inquiryRes] = await Promise.all([
                    axios.get(`/bookings/${user._id}`),
                    axios.get(`/inquiries/${user._id}`),
                ]);
                setBookings(bookingRes.data);
                setInquiries(inquiryRes.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch your data.");
            }
        };

        if (user?._id) fetchUserData();
    }, [user]);

    return (
        <div className="mt-8 space-y-8">
            {error && <p className="text-red-500">{error}</p>}

            <section>
                <h3 className="text-xl font-semibold mb-2">Your Inquiries</h3>
                {inquiries.length === 0 ? (
                    <p>No inquiries yet.</p>
                ) : (
                    <table className="table-auto w-full border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-1">From</th>
                                <th className="border px-2 py-1">To</th>
                                <th className="border px-2 py-1">Date</th>
                                <th className="border px-2 py-1">Quote</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.map((inq) => (
                                <tr key={inq._id}>
                                    <td className="border px-2 py-1">{inq.source}</td>
                                    <td className="border px-2 py-1">{inq.destination}</td>
                                    <td className="border px-2 py-1">
                                        {inq.date ? new Date(inq.date).toLocaleDateString() : ""}
                                    </td>
                                    <td className="border px-2 py-1">{inq.quote || "Pending"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>

            <section>
                <h3 className="text-xl font-semibold mb-2">Your Bookings</h3>
                {bookings.length === 0 ? (
                    <p>No bookings yet.</p>
                ) : (
                    <table className="table-auto w-full border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-1">From</th>
                                <th className="border px-2 py-1">To</th>
                                <th className="border px-2 py-1">Date</th>
                                <th className="border px-2 py-1">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((bk) => (
                                <tr key={bk._id}>
                                    <td className="border px-2 py-1">{bk.source}</td>
                                    <td className="border px-2 py-1">{bk.destination}</td>
                                    <td className="border px-2 py-1">
                                        {bk.date ? new Date(bk.date).toLocaleDateString() : ""}
                                    </td>
                                    <td className="border px-2 py-1">{bk.status || "Pending"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
};

export default UserDataTable;

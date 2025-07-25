import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import BookingPage from "./BookingPage";
import InquiryForm from "./InquiryForm";
import axios from "../utils/axiosInstance";

const parseDetails = (details) => {
  const result = { name: "", email: "", phone: "" };
  if (!details) return result;

  details.split(",").forEach((part) => {
    const [key, value] = part.split(":").map((s) => s.trim());
    if (key && value) {
      if (key.toLowerCase() === "name") result.name = value;
      else if (key.toLowerCase() === "email") result.email = value;
      else if (key.toLowerCase() === "phone") result.phone = value;
    }
  });

  return result;
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [inquiries, setInquiries] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (isAdmin) {
      const fetchData = async () => {
        try {
          const [inquiryRes, bookingRes] = await Promise.all([
            axios.get("/inquiries"),
            axios.get("/bookings"),
          ]);
          setInquiries(inquiryRes.data);
          setBookings(bookingRes.data);
        } catch (err) {
          setError("Failed to fetch data. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [isAdmin]);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-blue-600 font-semibold animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-blue-600">
          Welcome, <span className="text-green-500">{user?.email}</span>
        </h1>
      </div>

      {isAdmin ? (
        <>
          <h2 className="text-3xl font-bold text-purple-600">Admin Dashboard</h2>

          {error && (
            <p className="text-red-600 bg-red-100 p-3 rounded shadow-sm">{error}</p>
          )}

          <section className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold mb-4 border-b-2 border-blue-300 pb-2">
              Customer Inquiries
            </h3>
            {inquiries.length === 0 ? (
              <p className="text-gray-500 italic">No inquiries found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                  <thead className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                    <tr>
                      <th className="border px-4 py-3">Name</th>
                      <th className="border px-4 py-3">Email</th>
                      <th className="border px-4 py-3">Phone</th>
                      <th className="border px-4 py-3">From</th>
                      <th className="border px-4 py-3">To</th>
                      <th className="border px-4 py-3">Moving Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inq) => {
                      const { name, email, phone } = parseDetails(inq.details);
                      return (
                        <tr
                          key={inq._id}
                          className="even:bg-gray-100 hover:bg-green-50 transition-colors"
                        >
                          <td className="border px-4 py-2">{name}</td>
                          <td className="border px-4 py-2">{email}</td>
                          <td className="border px-4 py-2">{phone}</td>
                          <td className="border px-4 py-2">{inq.source || inq.fromAddress}</td>
                          <td className="border px-4 py-2">{inq.destination || inq.toAddress}</td>
                          <td className="border px-4 py-2">
                            {inq.date ? new Date(inq.date).toLocaleDateString() : inq.movingDate}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold mb-4 border-b-2 border-green-400 pb-2">
              Customer Bookings
            </h3>
            {bookings.length === 0 ? (
              <p className="text-gray-500 italic">No bookings found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                  <thead className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                    <tr>
                      <th className="border px-4 py-3">From</th>
                      <th className="border px-4 py-3">To</th>
                      <th className="border px-4 py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((bk) => (
                      <tr
                        key={bk._id}
                        className="even:bg-gray-100 hover:bg-purple-50 transition-colors"
                      >
                        <td className="border px-4 py-2">{bk.source}</td>
                        <td className="border px-4 py-2">{bk.destination}</td>
                        <td className="border px-4 py-2">
                          {bk.date ? new Date(bk.date).toLocaleDateString() : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-600 mb-6">User Dashboard</h2>
          <div className="space-y-8">
            <BookingPage />
            <InquiryForm />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

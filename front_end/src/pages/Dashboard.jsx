// src/pages/Dashboard.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import BookingPage from "./BookingPage";
import InquiryForm from "./InquiryForm";
import axios from "../utils/axiosInstance";
import UserDataTable from "../components/UserDataTable";

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
  const { user, logout } = useContext(AuthContext);
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
        <p className="text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Welcome, {user?.email}</h1>
        <button onClick={logout} className="btn btn-secondary">
          Logout
        </button>
      </div>

      {isAdmin ? (
        <>
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>

          {error && <p className="text-red-600">{error}</p>}

          <section>
            <h3 className="text-xl font-medium mb-2">Customer Inquiries</h3>
            {inquiries.length === 0 ? (
              <p>No inquiries found.</p>
            ) : (
              <table className="table-auto w-full border">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border px-2 py-1">Name</th>
                    <th className="border px-2 py-1">Email</th>
                    <th className="border px-2 py-1">Phone</th>
                    <th className="border px-2 py-1">From</th>
                    <th className="border px-2 py-1">To</th>
                    <th className="border px-2 py-1">Moving Date</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inq) => {
                    const { name, email, phone } = parseDetails(inq.details);
                    return (
                      <tr key={inq._id}>
                        <td className="border px-2 py-1">{name}</td><td className="border px-2 py-1">{email}</td><td className="border px-2 py-1">{phone}</td><td className="border px-2 py-1">{inq.source || inq.fromAddress}</td><td className="border px-2 py-1">{inq.destination || inq.toAddress}</td><td className="border px-2 py-1">{inq.date ? new Date(inq.date).toLocaleDateString() : inq.movingDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </section>

          <section>
            <h3 className="text-xl font-medium mt-6 mb-2">Customer Bookings</h3>
            {bookings.length === 0 ? (
              <p>No bookings found.</p>
            ) : (
              <table className="table-auto w-full border">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border px-2 py-1">From</th>
                    <th className="border px-2 py-1">To</th>
                    <th className="border px-2 py-1">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((bk) => (
                    <tr key={bk._id}>
                      <td className="border px-2 py-1">{bk.source}</td><td className="border px-2 py-1">{bk.destination}</td><td className="border px-2 py-1">{bk.date ? new Date(bk.date).toLocaleDateString() : ""}</td>
                    </tr>
                  ))}

                </tbody>
              </table>
            )}
          </section>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold">User Dashboard</h2>
          <BookingPage />
          <InquiryForm />
          <UserDataTable />
        </>
      )}
    </div>
  );
};

export default Dashboard;

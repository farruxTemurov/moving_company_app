import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/signUp`,
        form
      );

      if (response.status === 201) {
        alert("Registration successful! Please login.");
        setForm({ name: "", email: "", password: "" });
        navigate("/login");
      } else {
        setError("Unexpected response from server");
      }
    } catch (err) {
      console.error("Signup Error:", err);

      if (err.response) {
        if (err.response.status === 409) {
          setError(err.response.data.msg || "Email already exists.");
        } else {
          setError(err.response.data.msg || "Server error occurred.");
        }
      } else {
        setError("Network error or server not reachable.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl mb-4 font-semibold text-indigo-700">Register</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="input input-bordered w-full border border-gray-400 rounded-md pl-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="input input-bordered w-full border border-gray-400 rounded-md pl-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="input input-bordered w-full border border-gray-400 rounded-md pl-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="btn bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2 rounded-md mx-auto block"
          style={{ borderRadius: "0.5rem" }}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

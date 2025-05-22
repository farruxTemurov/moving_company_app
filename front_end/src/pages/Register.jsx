import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      } else {
        setError("Unexpected response from server");
      }
    } catch (err) {
      console.error("Signup Error:", err);

      if (err.response) {
        if (err.response.status === 409) {
          // Email already exists
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
    <div className="max-w-md mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Name"
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
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

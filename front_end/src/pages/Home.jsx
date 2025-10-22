// src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-10  mt-10 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-4xl font-extrabold mb-6 text-indigo-600">
        Welcome to Packers & Movers
      </h1>
      <p className="mb-8 text-lg text-gray-700">
        We help you move safely and quickly.
      </p>
      <div className="space-x-6">
        <Link to="/login" className="btn bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg transition">
          Login
        </Link>
        <Link to="/register" className="btn bg-purple-800 hover:bg-purple-900 text-white font-bold px-8 py-3 rounded-lg transition">
          Register
        </Link>
      </div>
    </div>
  );
}


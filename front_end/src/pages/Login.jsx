import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const res = await axios.post("http://localhost:3001/api/users/signIn", {
        email,
        password,
      });

      const token = res.data.token;
      if (!token) throw new Error("No token received");

      login(token); // update context user state

      // Decode token to get user role (basic decoding)
      const decoded = JSON.parse(atob(token.split('.')[1]));
      const role = decoded.role;

      // Navigate based on role (here both go to /dashboard, adjust if needed)
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl mb-4 font-semibold text-indigo-700">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md mx-auto block"
          style={{ borderRadius: "0.5rem" }} 
        >
          Login
        </button>

      </form>
      {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
    </div>
  );
};

export default Login;

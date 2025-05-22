// import { useState, useContext, useEffect } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const { login, user } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");

//         try {
//             const res = await axios.post(
//                 import.meta.env.VITE_API_BASE_URL + "/users/signIn",
//                 { email, password }
//             );

//             const token = res.data.token;
//             console.log("Response from backend:", res.data);

//             if (token) {
//                 login(token); // updates user state
//             } else {
//                 setError("Invalid login response");
//             }
//         } catch (err) {
//             console.error("Login error full object:", err);
//             setError(err.response?.data?.message || "Login failed");
//         }
//     };

//     useEffect(() => {
//         if (user) {
//             console.log("User set in context, navigating to dashboard...");
//             navigate("/dashboard");
//         }
//     }, [user, navigate]);

//     return (
//         <div className="login-container max-w-md mx-auto mt-10 p-6 border rounded shadow">
//             <h2 className="text-2xl mb-4">Login</h2>
//             {error && <p className="text-red-600 mb-2">{error}</p>}
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label className="block mb-1" htmlFor="email">Email</label>
//                     <input
//                         id="email"
//                         type="email"
//                         required
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="input input-bordered w-full"
//                     />
//                 </div>
//                 <div>
//                     <label className="block mb-1" htmlFor="password">Password</label>
//                     <input
//                         id="password"
//                         type="password"
//                         required
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="input input-bordered w-full"
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary w-full">
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Login;
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ⬅️ Required to call backend

const Login = () => {
  const { login, user } = useContext(AuthContext);
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
      login(token); // ⬅️ This updates the context (user info available now)

      const decoded = JSON.parse(atob(token.split('.')[1]));
      const role = decoded.role;

      // Wait a moment for context to update
      setTimeout(() => {
        if (role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 100);

    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default Login;

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    console.log("ProtectedRoute user:", user);

    if (!user) {
        // Not logged in, redirect to login page
        return <Navigate to="/login" replace />;
    }

    // Logged in, show children
    return children;
};

export default ProtectedRoute;

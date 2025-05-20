import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl mb-4">Welcome, {user.email}</h1>
            <button
                onClick={logout}
                className="btn btn-secondary"
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;

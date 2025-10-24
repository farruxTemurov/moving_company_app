import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();             // this handles clearing token + resetting user
    navigate("/login");   // redirect after logout
  };

  return (
    <header className="bg-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-sky-700">
        Packers & Movers
      </Link>

      <nav className="space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-semibold underline text-sky-700"
              : "hover:underline hover:text-sky-600 text-gray-700"
          }
        >
          Home
        </NavLink>

        {!user && (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold underline text-sky-700"
                  : "hover:underline hover:text-sky-600 text-gray-700"
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold underline text-sky-700"
                  : "hover:underline hover:text-sky-600 text-gray-700"
              }
            >
              Register
            </NavLink>
          </>
        )}

        {user && (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold underline text-sky-700"
                  : "hover:underline hover:text-sky-600 text-gray-700"
              }
            >
              Dashboard
            </NavLink>

            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline btn-sky ml-4"
              type="button"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

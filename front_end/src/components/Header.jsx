import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-base-200 p-4 flex justify-between items-center shadow">
      <Link to="/" className="text-xl font-bold">
        Packers & Movers
      </Link>

      <nav className="space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-bold underline" : "hover:underline"
          }
        >
          Home
        </NavLink>

        {!user && (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "font-bold underline" : "hover:underline"
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "font-bold underline" : "hover:underline"
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
                isActive ? "font-bold underline" : "hover:underline"
              }
            >
              Dashboard
            </NavLink>

            <button
              onClick={handleLogout}
              className="btn btn-sm btn-error ml-4"
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

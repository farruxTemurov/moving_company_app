import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // 👈 Correct named import

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token); // 👈 Use named import here
                if (decoded.exp * 1000 > Date.now()) {
                    setUser({
                        id: decoded.id,
                        email: decoded.email,
                        role: decoded.role,
                    });
                } else {
                    localStorage.removeItem("token");
                }
            } catch {
                localStorage.removeItem("token");
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        try {
            const decoded = jwtDecode(token); // 👈 Same here
            setUser({
                id: decoded.id,
                email: decoded.email,
                role: decoded.role,
            });
        } catch {
            setUser(null);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

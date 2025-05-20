import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const decodeToken = async (token) => {
    const jwt_decode = await import("jwt-decode");
    // jwt_decode.default contains the actual function
    return jwt_decode.default(token);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            decodeToken(token).then(decoded => {
                if (decoded.exp * 1000 > Date.now()) {
                    setUser({ id: decoded.id, email: decoded.email, role: decoded.role });
                } else {
                    localStorage.removeItem("token");
                }
            }).catch(() => localStorage.removeItem("token"));
        }
    }, []);

    const login = async (token) => {
        localStorage.setItem("token", token);
        try {
            const decoded = await decodeToken(token);
            console.log("Setting user with decoded token", decoded);
            const newUser = { id: decoded.id, email: decoded.email, role: decoded.role };
            console.log("Decoded user in login():", newUser); 
            setUser(newUser);
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

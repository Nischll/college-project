import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    role: null, // "admin" or "user"
  });

  const login = (role) => {
    setUser({ isAuthenticated: true, role }); // Set role on login
  };

  const logout = () => {
    setUser({ isAuthenticated: false, role: null }); // Reset on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

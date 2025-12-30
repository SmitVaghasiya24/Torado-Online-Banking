import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("adminData");
      if (storedData) {
        const parsed = JSON.parse(storedData);
        setAdmin(parsed.admin || null);
        setToken(parsed.token || null);
      }
    } catch (error) {
      console.error("Failed to parse auth data", error);
      localStorage.removeItem("adminData");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (authData) => {
    if (!authData?.token || !authData?.admin) return;

    const dataToStore = {
      admin: authData.admin,
      token: authData.token,
    };

    localStorage.setItem("adminData", JSON.stringify(dataToStore));
    setAdmin(authData.admin);
    setToken(authData.token);
  };

  const logout = () => {
    localStorage.removeItem("adminData");
    setAdmin(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const adminAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

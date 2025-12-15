import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      fetchMe(storedToken);
    } else {
      setLoading(false);
    }
  }, []);
  const fetchMe = async (authToken) => {
    try {
      const res = await axios.get("http://localhost:5000/api/me", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        payload
      );

      const { token } = res.data;

      localStorage.setItem("token", token);
      setToken(token);

      await fetchMe(token);

      toast.success("Login successful");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  const register = async (payload) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/signup",
        payload
      );

      const { token } = res.data;

      localStorage.setItem("token", token);
      setToken(token);

      await fetchMe(token);

      toast.success("Account created successfully");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

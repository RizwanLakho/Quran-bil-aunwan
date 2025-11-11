import React, { createContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Check saved login from localStorage
    return AuthService.getCurrentUser();
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await AuthService.login({ email, password });

      if (response.user) {
        setUser(response.user);
        return { success: true, user: response.user };
      }

      return { success: false, message: "Login failed" };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, passwordConfirmation) => {
    try {
      setLoading(true);
      setError(null);

      const response = await AuthService.register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      if (response.user) {
        setUser(response.user);
        return { success: true, user: response.user };
      }

      return { success: false, message: "Registration failed" };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await AuthService.logout();
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
      // Still clear user state even if API call fails
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value = { user, login, register, logout, loading, error };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Check saved login from localStorage
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    // Fake user credentials
    const fakeUser = {
      email: "test@example.com",
      password: "123456",
    };

    if (email === fakeUser.email && password === fakeUser.password) {
      setUser(fakeUser);
      localStorage.setItem("user", JSON.stringify(fakeUser));
      return true; // login success
    }
    return false; // login fail
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

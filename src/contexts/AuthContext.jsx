import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Read from localStorage on init
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
      }
    }
    setLoading(false);
  }, []);

  async function registerUser(email, password, name, phone) {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      email,
      password,
      name,
      phone
    });
    
    // Auto-login
    localStorage.setItem("token", data.token);
    const userPayload = {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role
    };
    localStorage.setItem("user", JSON.stringify(userPayload));
    setCurrentUser(userPayload);
    return data;
  }

  async function login(email, password) {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      email,
      password
    });

    localStorage.setItem("token", data.token);
    const userPayload = {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role
    };
    localStorage.setItem("user", JSON.stringify(userPayload));
    setCurrentUser(userPayload);
    return data;
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
  }

  const value = {
    currentUser,
    loading,
    registerUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

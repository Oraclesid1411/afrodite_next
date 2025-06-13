'use client';

import { useContext, createContext, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { apiUrl } from "../config/apiUrl.js";

const AuthContext = createContext();

axios.defaults.withCredentials = true;

const AuthProvider = ({ children }) => {
  const router = useRouter();

  // États initialisés temporairement (safe SSR)
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticatedA, setIsAuthenticatedA] = useState(false);
  const [currentUser, setUser] = useState(null);
  const [currentAdmin, setAdmin] = useState(null);
  const [token, setToken] = useState("");
  const [tokenA, setTokenA] = useState("");

  // Charger les données du localStorage APRÈS montage
  useEffect(() => {
    const adminFlag = localStorage.getItem("isAdmin") === "true";
    const isAuth = !!localStorage.getItem("site");
    const isAuthA = localStorage.getItem("isAuthenticated") === "true";

    const userData = JSON.parse(localStorage.getItem("user"));
    const adminData = JSON.parse(localStorage.getItem("admin"));
    const siteToken = localStorage.getItem("site") || "";
    const adminToken = localStorage.getItem("adminToken") || "";

   
    setIsAdmin(adminFlag);
    setIsAuthenticated(isAuth);
    setIsAuthenticatedA(isAuthA);
    setUser(userData);
    setAdmin(adminData);
    setToken(siteToken);
    setTokenA(adminToken);

  }, []);

  const saveToLocalStorage = (userData, userToken) => {
    if (userData && userToken) {
      setIsAuthenticated(true);
      localStorage.setItem("site", userToken);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setToken(userToken);
    }
  };

  const saveToLocalStorageA = (adminData, adminToken) => {
    if (adminData && adminToken) {
      setIsAuthenticatedA(true);
      localStorage.setItem("adminToken", adminToken);
      localStorage.setItem("admin", JSON.stringify(adminData));
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAdmin", "true");
      setAdmin(adminData);
      setTokenA(adminToken);
      setIsAdmin(true);
    }
  };

  const login = async (inputs, redirectTo = "/") => {
    try {
      let res;
      if (redirectTo === "/manager") {
        res = await axios.post(`${apiUrl}/auth/login_manager`, inputs);
      } else {
        res = await axios.post(`${apiUrl}/auth/login`, inputs);
      }

      if (res?.data) {
        const { token, user, loginStatus } = res.data;

        if (loginStatus !== false) {
          if (user?.role !== 1) {
            saveToLocalStorage(user, token);
            return {
              data: { ...user, password: undefined },
              loginStatus: true,
              redirect_path: redirectTo,
            };
          } else {
            saveToLocalStorageA(user, token);
            router.push("/admin");
          }
        } else {
          return { data: res.data, loginStatus: false };
        }
      }
    } catch (err) {
      console.error(err);
      return { error: err.response?.data || "An error occurred" };
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    setIsAuthenticated(false);
    localStorage.removeItem("site");
    localStorage.removeItem("user");
    router.push("/login");
  };

  // Synchroniser currentUser => localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }

    
    // alert('bebeb')
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        token,
        currentUser,
        login,
        logout,
        saveToLocalStorage,
        isAdmin,
        isAuthenticatedA,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);

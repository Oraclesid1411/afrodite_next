import React, { createContext, useContext, useState ,useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import axios from "axios";
// Création du contexte Admin
const AdminContext = createContext();

const apiUrl = 'https://apiafro.aafrodites.com/'
axios.defaults.withCredentials = true;

const AdminProvider = ({ children }) => {

  
 
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );
  const [currentAdmin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const navigate = useNavigate();
 

  // Fonction pour sauvegarder les données admin dans le localStorage
  const saveToLocalStorage = (adminData, adminToken) => {
    if (adminData && adminToken) {
      setIsAuthenticated(true);
      localStorage.setItem("adminToken", adminToken);
      localStorage.setItem("admin", JSON.stringify(adminData));

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAdmin", "true");

      setAdmin(adminData);
      setToken(adminToken);
    }
  };

  // Fonction pour se connecter en tant qu'administrateur
   
  const login = async (inputs, redirectTo = "/admin") => {
    try {

      console.log("inputs")
      console.log(inputs)
      const res = await axios.post(`${apiUrl}/auth/login`, inputs);
      console.log("redirectTo")
      console.log(redirectTo)
      // return false;
      if (res?.data) {
        const { token, user, loginStatus } = res.data;
  
        if (loginStatus !== false && user?.role === 1) {
          // Enregistrer l'administrateur et le token
          saveToLocalStorage(user, token);
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("isAdmin", "true");
          setIsAdmin(true);
          navigate(redirectTo);
        } else if (user?.role !== 1) {
          return { error: "Vous n'avez pas les autorisations d'administrateur." };
        } else {
          return { data: res.data }; // Retourne l'erreur spécifique du backend
        }
      } else {
        throw new Error("Réponse inattendue de l'API");
      }
    } catch (err) {
      console.error("Erreur de connexion admin:", err);
      return {
        error: err.response?.data?.message || "Une erreur réseau s'est produite",
      };
    }
  };
  

  // Fonction pour déconnecter l'administrateur
  const logout = () => {
    setAdmin(null);
    setToken("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
    setIsAuthenticated(false);
    setIsAdmin(false);
    // Nettoyer le localStorage
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    navigate("/");
  };

   // Synchroniser `currentAdmin` avec `localStorage`
   useEffect(() => {
    
    if (currentAdmin && token) {
      const auth = localStorage.getItem("isAuthenticated") === "true";
      const admin = localStorage.getItem("isAdmin") === "true";
   
      localStorage.setItem("admin", JSON.stringify(currentAdmin));
      setIsAuthenticated(auth);
      setIsAdmin(admin);
    } else {

      console.log('set false')
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, [currentAdmin, token]);
   
  return (
    <AdminContext.Provider value={{ 
      isAuthenticated,
      setIsAuthenticated,
      token,
      currentAdmin,
      login,
      logout,
      saveToLocalStorage,
      isAdmin
     }}>
      {children}
    </AdminContext.Provider>
  );
};


export default AdminProvider;
// Hook pour utiliser le contexte Admin
export const useAdmin = () => useContext(AdminContext);

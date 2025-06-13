import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthenticateContext";
// // import AuthProvider from "../Context/AuthenticateContext";
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   const location = useLocation();

//   console.log("isAuthenticated")
//   console.log(isAuthenticated)
//   if (!isAuthenticated) {
//     // Passer la page d'origine dans l'état
//     console.log(location.pathname)
//     console.log("location.pathname")
//     return <Navigate to="/login" replace state={{ from: location.pathname }} />;
//   }

//   return children;
// };

// export default ProtectedRoute;


const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
  
    if (!isAuthenticated) {
      // Redirection si non authentifié
      return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }
  
    return children;
  };
  
  export default ProtectedRoute;
  
import React from 'react';
import { Navigate ,useLocation} from 'react-router-dom'; 

const AdminRoute = ({ children,isAdmin, isAuthenticatedA  }) => {

 
  const location = useLocation();
  // Si l'utilisateur n'est pas connecté ou n'est pas admin
   // Affiche une phase de chargement si les états ne sont pas encore synchronisés
   if (isAuthenticatedA === null || isAdmin === null) {
    return <div>Loading...</div>;
  }


  console.log(isAdmin)
  
  console.log(isAuthenticatedA)

  if (!isAuthenticatedA || !isAdmin) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
 

  return children;
};

export default AdminRoute;

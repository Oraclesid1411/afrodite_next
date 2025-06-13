import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import AdminAuthenticateContext from "../Context/AdminAuthenticateContext.jsx";
const AuthContext = createContext();

    const apiUrl = 'https://apiafro.aafrodites.com/'
    axios.defaults.withCredentials = true;
    


const AuthProvider = ({ children }) => {
  
//  localStorage.clear();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("site") // Vérifie si un token existe
  );
  const [currentUser, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
   // Fonction pour sauvegarder les données dans le localStorage
   const saveToLocalStorage = (userData, userToken) => {
    if (userData && userToken) {
      // Sauvegarder dans le localStorage
       setIsAuthenticated(true);
      localStorage.setItem("site", userToken);
      localStorage.setItem("user", JSON.stringify(userData));

     // Mettre à jour les états
      setUser(userData);
      setToken(userToken);
    }
  };
  const login = async (inputs, redirectTo = "/") => {

    console.log("redirectTo b")
    console.log(redirectTo)
    try {

    //   toast.info('connexion en cours' , {
    //     position: "top-center",
    //     autoClose: 3000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //     // transition: Bounce,
    // // });
    // console.log(redirectTo)
    // return false;
    if(redirectTo === "/manager"){
          console.log('manager')
          var res = await axios.post(`${apiUrl}/auth/login_manager`, inputs);
          // console.log(res)
          // return false;
    }
    else{
        res = await axios.post(`${apiUrl}/auth/login`, inputs);
    
    }
    //  console.log(res)
    //  return false;
      //  setTimeout(() => {
        if (res.data?.loginStatus !== false) {
          // Enregistrer l'utilisateur et le token
          const token = res.data?.token;
  
          setUser(res.data.user);
          setToken(token);
          setIsAuthenticated(true);
  
          localStorage.setItem("site", token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
                      // notification
                    // toast.success('connexion réussie' , {
                    //               position: "top-center",
                    //               autoClose: 3000,
                    //               hideProgressBar: true,
                    //               closeOnClick: true,
                    //               pauseOnHover: true,
                    //               draggable: true,
                    //               progress: undefined,
                    //               theme: "light",
                    //               // transition: Bounce,
                    //           });
          // Redirection
          // navigate(redirectTo);
           // On exclut le mot de passe avant de stocker les données de l'utilisateur
             const { password, ...userWithoutPassword } = res.data.user;
                // setUserData({ ...data, user: userWithoutPassword });
          return { data: userWithoutPassword ,
            loginStatus : true,
             redirect_path : redirectTo }; // Retourne l'erreur du backend
        } else {
          return { data: res.data ,loginStatus : false }; // Retourne l'erreur du backend
        }
      // }, 3500); // Délai de 3 secondes
     
    } catch (err) {
      console.error(err);
      return { error: err.response?.data || "An error occurred" };
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    setIsAuthenticated(false);

    // Nettoyer le localStorage
    localStorage.removeItem("site");
    localStorage.removeItem("user");

    navigate("/login");
  };



  // Synchroniser `currentUser` avec `localStorage`
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
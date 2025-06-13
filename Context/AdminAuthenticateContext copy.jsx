import { useContext, createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminAuthContext = createContext();

    const apiUrl = 'http://fsapi.fashionecos.com'
axios.defaults.withCredentials = true;


const AdminAuthProvider = ({ children }) => {
 
//  effacer les données du local storage
//  localStorage.clear();


  var [currentAdmin, setAdmin] = useState(
    null
  ); 
 
  const [Erreur, setError] = useState(
    null
  ); 
  
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [role, setRole] = useState(localStorage.getItem("adminRole") || "");


  const login = async (inputs) => {
    try {
        
    
      //  const apiUrl = 'http://localhost:8000'

      
        const res = await axios.post(`${apiUrl}/admin/Adminlogin` , inputs);
     
        const token = res.data?.token;
        const role_admin = "admin";
        
        // console.log('res.data')
        // console.log(res.data)
        // console.log(res.data.loginStatus)
        // console.log(res.data.Error)
        // console.log('res.data')

    
      if (res.data?.loginStatus == true) {

        // console.log('res.data.user')
      
        //  console.log(token)
        //  console.log(role_admin)

        // console.log('res.data.user')

        setAdmin(res.data.user);
        setToken(token);
        setRole(role_admin);
      
        localStorage.setItem("adminToken", token);
        
        localStorage.setItem('adminRole', role);
        // navigate("/");
        return ({data: res.data});
      }
      else{
        console.log('erreur de connexion')
      }
    //   throw new Error(res.message);
    
      setError(null);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setAdmin(null);
    setToken("");
    setRole("");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    // navigate("/login");
  };
        
        useEffect(() => {
      
            localStorage.setItem("admin", JSON.stringify(currentAdmin));

        }, [currentAdmin]);

  return (
    <AdminAuthContext.Provider value={{ token,role, currentAdmin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );

};

export default AdminAuthProvider;

export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};
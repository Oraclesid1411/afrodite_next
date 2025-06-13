// import React from 'react'

import { useState } from 'react'
   import { useAdmin } from '../Context/AdminContext.jsx';

import Loader from './Loader.jsx';
import axios from 'axios'
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
     
 const [values, setValues] = useState({
    pseudo: '',
    password: ''
 })
const [error, setError] = useState(null)
const [loading, setLoading] = useState(false);
const navigate = useNavigate()
axios.defaults.withCredentials = true;
// const { setAdminUser } = useAdmin(); // Met à jour l'utilisateur admin dans le contexte
 

// const { login } = useContext(AuthContext);
// const { login } = useAdmin(); // Accès à la fonction `login` via le contexte

const auth = useAdmin();
const location = useLocation(); 
console.log(location)

  // Récupérer la page demandée ou une page par défaut
  const redirectTo = location.state?.from || "/";
  console.log(redirectTo)
// const previousPath = location.state?.previousPath; 
  const handleSubmit = async (e) => {
   
    e.preventDefault();
    try {
       
        //   return false;
            if (values.pseudo !== "" && values.password !== "") {
                setLoading(true); // Active le loader
                const login_res = await auth.login(values ,redirectTo);
                
                console.log("login_res")
                console.log(login_res)
                // return false;
                if (login_res?.error) {
                  setError(login_res.error); // Affiche l'erreur si le backend en retourne une
                }
                   setTimeout(() => {
                    setLoading(false); // Désactive le loader après la requête
                    if(login_res){
                  
                        if(login_res?.data?.loginStatus === true){
                            // message de notification
                            toast.success('connexion réussie' , {
                                position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                // transition: Bounce,
                            });
                            
                            // redirect après quelque secondes
                            setTimeout(() => {
                                // navigate('/'); // Remplacez '/next-page' par la route cible
                              }, 3000); // Délai de 5 secondes
    
                        }
                        else{
                            toast.error('échec de connexion réessayez!',
                                {
                                    position: "top-center",
                                    autoClose: 3000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                }
    
                            );
                            // message d'erreeur
    
                        }
                        
                      }
                  }, 3500); // Délai de 3 secondes


                  
             
              
                // si page de login rediriger vers accueil 
                // sinon rester sur la page
                return;
              
            } 
            else{
                setLoading(false); // Désactive le loader après la requête
            }
      } 
      catch (err) {
        console.error("Erreur lors de la connexion:", err);
        setError("Une erreur s'est produite. Veuillez réessayer.");
      } finally {
        setLoading(false); // Désactive le chargement
      }
  

  };
  return (
    <div className="body-wrapper">
        {location.state?.from && (
        <p>Veuillez vous connecter pour accéder à {location.state.from}.</p>
        )}
         {loading && <Loader />} {/* Affiche le loader si l'état loading est true */}
        <main id="MainContent" className="content-for-layout">
       
        <ToastContainer className="toast_style"/>
            <div className="login-page mt-100">
                <div className="container">
                    <form onSubmit={handleSubmit} className="login-form common-form mx-auto">
                        <div className="section-header mb-3">
                            <h3 className="section-heading text-center">Connexion admin</h3>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <fieldset>
                                    <label className="label"><strong>Pseudo</strong></label>
                                    <input type="text"   name='pseudo' autoComplete='off' placeholder='votre pseudo'
                     onChange={(e) => setValues({...values, pseudo : e.target.value})} className="form-control form-control-lg" />

                                  
                                </fieldset>
                            </div>
                            <div className="col-12">
                                <fieldset>
                                    <label className="label"><strong>Mot de passe</strong></label>
                                    <input type="password"  name='password' autoComplete='off' placeholder='votre mot de passe'
                     onChange={(e) => setValues({...values, password : e.target.value})} className="form-control form-control-lg" />

                                   
                                </fieldset>
                            </div>
                            <div className="col-12 mt-3">
                               
                                <Link to='/forgetPass'><a href="" className="text_14 d-block">Mot de passe oublié?</a></Link>
                           
                                <button type="submit" className="btn-primary d-block mt-2 btn-signin">CONNEXION</button>

                                <hr/>
                              
                                 {/* <Link to='/register'><a href="" className="text_14 d-block">Vous n'avez pas encore de compte? <u> Créez ici !</u></a></Link> */}
                           <div className="text-center w-100">
                           <Link to='/'><a href="" className="text_14 d-block">retour à l'accueil</a></Link>
                           
                           </div>
                               
                            </div>
                        </div>
                    </form>
                </div>
            </div>            
        </main>
    </div>
  )
}

export default AdminLogin

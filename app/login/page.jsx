'use client';

// import React from 'react'

import { useState } from 'react'
   
import { useAuth } from "../../Context/AuthenticateContext.jsx";

import Loader from '../../components/Loader';
import axios from 'axios'

import { usePathname, useSearchParams, useRouter   } from "next/navigation";
import Link from 'next/link';
// import { useNavigate, Link, useLocation } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome ,faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
     
    const searchParams = useSearchParams();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

 const [values, setValues] = useState({
    pseudo: '',
    password: ''
 })
const [error, setError] = useState(null)
const [loading, setLoading] = useState(false);
// const navigate = useNavigate()
// const router = useRouter();
axios.defaults.withCredentials = true;

 const auth = useAuth();

// const { login } = useContext(AuthContext);


// const location = useLocation(); 
// console.log("location.state") 
// console.log(location.state)

const location = usePathname();  
 // Récupérer l'URL de la page précédente (state.from)
 const redirectTo = searchParams.get('from') || '/';
//  const redirectTo = location.state?.from || '/'; // Si aucun state, rediriger vers la page d'accueil
  
//  console.log("Redirection depuis :", redirectTo); // Afficher l'URL de la page précédente
 
  // Récupérer la page demandée ou une page par défaut
//   const redirectTo = location.state?.from || "/";

//   console.log("redirectTo")
//   console.log(redirectTo)


// const previousPath = location.state?.previousPath; 
  const handleSubmit = async (e) => {
   
    e.preventDefault();
    try {
        // console.log(values.pseudo)
        // console.log(values.password)
        //   return false;
        const loadingToast = toast.info('connexion en cours' , {
            position: "top-center",
            autoClose: false, // Ne ferme pas la notification automatiquement
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            // transition: Bounce,
        });
            if (values.pseudo !== "" && values.password !== "") {
                // setLoading(true); // Active le loader
                  const login_res = await auth.login(values ,redirectTo);
                
                     if(login_res){
                   toast.dismiss(loadingToast);
                        if(login_res?.loginStatus === true){
                            // message de notification
                            toast.success('connexion réussie' , {
                                position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                // transition: Bounce,
                            });
                            
                         setTimeout(() => {
                                const query = new URLSearchParams({
                                  currentpage: '/login',
                                  token: login_res?.data?.token || '',
                                }).toString();
                              
                                router.push(`${redirectTo}?${query}`);
                              }, 3000);
    
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
                //   }, 3500); // Délai de 3 secondes


                  
             
              
                // si page de login rediriger vers accueil 
                // sinon rester sur la page
                return;
              
            } 
            else{
                setLoading(false); // Désactive le loader après la requête
            }
      } catch (err) {
        setError(err.response.data);
      }
  
  };
  return (
    <div className="body-wrapper">
        {/* {location.state?.from && (
        <p>Veuillez vous connecter pour accéder à {location.state.from}.</p>
        )} */}
         {loading && <Loader />} {/* Affiche le loader si l'état loading est true */}
        <main id="MainContent" className="content-for-layout">
       
        <ToastContainer className="toast_style"/>
            <div className="login-page mt-100">
                <div className="container">
                    <form onSubmit={handleSubmit} className="login-form common-form mx-auto">
                        <div className="section-header mb-3">
                            <h3 className="section-heading text-center">Connexion</h3>
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
                                    <input 
                                      type={showPassword ? 'text' : 'password'}
                                        name='password' autoComplete='off' placeholder='votre mot de passe'
                     onChange={(e) => setValues({...values, password : e.target.value})}
                      className="form-control form-control-lg" style = {{maxWidth : "90%",marginRight : ".75em" , display : "inline-block"}} />

<FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              className="relative"
              style={{
                // border : "1px solid red" ,
                // height : "100%",
                fontSize : "17px",
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#999',
              }}
            />
                                </fieldset>
                            </div>
                            <div className="col-12 mt-3">
                            <Link href="/forgotpass" className="text_14 d-block">
  Mot de passe oublié ?
</Link>
                                {/* <Link to='/forgotpass'><a href="" className="text_14 d-block">Mot de passe oublié?</a></Link> */}
                           
                                <button type="submit" className="btn-primary d-block mt-2 btn-signin">CONNEXION</button>

                                <hr/>
                        <Link href="/register" className="text_14 d-block">
                                Vous n'avez pas encore de compte? <u> Créez ici !</u>
                              
                        </Link>
          <div className="text-center w-100 mt-3">
                           <Link href="/" className="text_14 d-block">
  <FontAwesomeIcon icon={faHome} className="cst_icon mx-0" /> retour à l'accueil
</Link>
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

export default Login

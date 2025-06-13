import { useState } from "react";

// import $ from "jquery";
import { useAuth } from "../Context/AuthenticateContext.jsx";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
// import EcosMoney from './EcosMoney'
// import Test_c from './Test_c';
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
// import Locations from "./Locations.jsx";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';

// import ValidationRegister from "../Validations/validateRegister.jsx"

// import { useForm } from "react-hook-form";
// import * as Yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { registerUser } from "../services/authService";

const RegisterAdmin = () => {


  const auth_fct = useAuth();
// console.log(auth_fct)

  
  const navigate = useNavigate()
   const apiUrl = 'https://apiafro.aafrodites.com'
  
   const redirectTo = location.state?.from || "/admin";
  // const apiUrl = 'https://fsapi.fashionecos.com'
  

  const [phone, setPhone] = useState("");
  const [business_phone, setPhone_business] = useState("");
  const [values, setValues] = useState({
    pseudo : '',
    tel : '',
    // email_user : '',
    password : '',
    password1 : ''
  })

  const [businessValues, setBusinessValues] = useState({
    compagnie: '',
    domaineCompagnie: '',
    // business_tel: '',
    mail_compagnie: '',
    website_compagnie: ''
  })



  const [errors, setErrors] = useState({})

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  
  const handleCompagnieInput = (e) => {
    setBusinessValues({ ...businessValues, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const loadingToast =  toast.info('création de compte en cours' , {
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

    // user
    const user_phone_number = document.querySelector(".react-international-phone-input[name='user_tel']" ).value;
    
    const split_usernumber = user_phone_number.split(" ");

    // businness
    
  


    var user_values = {};
    user_values = {
    pseudo : values.pseudo,
    password : values.password,
    indicatif : split_usernumber[0],
    number : split_usernumber[1],

   }
   console.log(activate_fonction)
   
   var busy_values = {};

   if(activate_fonction === "now"){

    const busy_phone_number = document.querySelector(".react-international-phone-input[name='business_tel']" ).value;
    
    const split_busynumber = busy_phone_number.split(" ");
    busy_values = {
      set : 1,
      nom : businessValues.compagnie,
      domaine : businessValues.domaineCompagnie,
      email : businessValues.mail_compagnie,
      website : businessValues.website_compagnie,
  
      indicatif : split_busynumber[0],
      number : split_busynumber[1],
  
     }
   }
   
  
  //  console.log(values)
   console.log(busy_values)
   console.log(user_values)


  //  return false;
   try {
    await axios
      .post(`${apiUrl}/auth/registerAdmin`,
                [
                       {user : user_values},
                       {busy : busy_values},
                ]
         )
      .then((result) => {

      
      
         
        //  setTimeout(() => {
          if(result){
            toast.dismiss(loadingToast);

            console.log(result)

            // return false;
            const msge =  result?.data[1]?.data[0]?.msg
            if(result?.data[0]?.Status === false){
          
  
                // echec de la creation du compte
                if(result?.data[1]?.data[1]?.code === 0){
  
                    // console.log(msge)
                    toast.error(msge + " , réessayez", {
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
                 
    
               }
  
               // pseudo existant
              else if(result?.data[1]?.data[1]?.code === 2){
  
                console.log(msge)
                toast.warning(msge + " , éssayez un autre" , {
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
  
             }
  
            
         
  
           
  
           
  
          
  
           }
           else if(result?.data[0]?.Status === true){
            // compte crée avce succès
            console.log(msge)
            console.log(result.data[1]?.data[2]?.user)
            console.log(result.data[1]?.data[2]?.token)
            // return false;

            if(result?.data[1]?.data[1]?.code === 1){

             setTimeout(() => {
            
              console.log(result.data)
                 auth_fct?.saveToLocalStorage(
                  result.data[1]?.data[2]?.user  ,
                   result.data[1]?.data[2]?.token)

                   toast.success('compte crée avec succès' , {
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
                  
                  setTimeout(() => {
                 navigate(redirectTo, 
                   { state: { previousPath: location.pathname ,
                     data: result.data[1]?.data[2]?.user,
                               currentpage : "/register"}});
            
                  });
                }, 3000); // Délai de 5 secondes
          

           }
           else if(result?.data[1]?.data[1]?.code === 0){

                  setTimeout(() => {
            
                    //  console.log(auth_fct?.set_user(result.data))

                     toast.success('compte crée avec succès' , {
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
                    navigate(redirectTo, 
                      { state: { previousPath: location.pathname ,
                        data: result.data[1]?.data[2]?.user,
                                  currentpage : "/register"}});
               
                 });
          

           }


          
        

         }

          }
        });
        // }, 3500); // Délai de 3 secondes
         
  } catch (err) {
    console.log("erreur");
    // setError(err.response.data);
  }

    return false;

   
    console.log(setErrors(ValidationRegister(values)))
    setErrors(ValidationRegister(values))


    console.log("email : " + errors.email_user)
    console.log("password : " + errors.password)
    console.log("pseudo : " + errors.pseudo)
    if(errors.email_user === '' && errors.password === '' && errors.pseudo===''){
      axios.post('http://localhost:8081/register',values)
      .then(res =>{
        navigate('/');
      })
      .catch(err => console.log(err))
    }

  }

  const [activate_fonction, setactivate_fonction] = useState(null);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
   
    if(checked === true){
      const split_name = name.split("_");
      setactivate_fonction(split_name[1]);
    }
    else{
      setactivate_fonction(null);
    }
   
  };
  const handleMultiCheckboxChange = (event) => {
    const { name, checked } = event.target;

    console.log(event.target)
    console.log(checked)
    // const split_name = name.split("_");
    if(checked === true){
      setCheckedItems((prevCheckedItems) => ({
        ...prevCheckedItems,
        [name]: checked,
      }));
    }
    else{
      setCheckedItems((prevCheckedItems) => ({
        ...prevCheckedItems,
        // [name]: checked,
      }));

    }
   


    console.log(name)
  };
  const handleArtisanChange = (event) => {
    const { name, checked } = event.target;
  

    if(checked === true){
      const split_name = name.split("_");
      setartisan(split_name[1]);
    }
    else{
      setartisan(null);
    }
    
  }

  const [isOpen, setIsOpen] = useState(true);
  const [isOpen_d, setIsOpen_d] = useState(true);
  const [isOpen_b, setIsOpen_b] = useState(true);
  const [isOpen_c, setIsOpen_c] = useState(true);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const toggleAccordion_d = () => {
    setIsOpen_d(!isOpen_d);
  };
  const toggleAccordion_b = () => {
    setIsOpen_b(!isOpen_b);
  };

  const toggleAccordion_c = () => {
    setIsOpen_c(!isOpen_c);
  };




  return (
    <div className="body-wrapper">
      <main id="MainContent" className="content-for-layout">
      <ToastContainer className="toast_style"/>
        <div className="auth-page">
          <div className="container">
            <form
              onSubmit={handleSubmit}
              className="login-form common-form mx-auto"
            >
                 <div className="row">
                      <div>
                       
                              <div className="section-header ">
                                <div className="text-center">
                                    <h2 className="text-center">Création de compte Admin</h2>
                                </div>
                              </div>
                       
                     
                          <div>
                          {/* <div className="col-12">
                            <fieldset>
                              <label className="label">Email</label>
                              <input
                              type="email"
                              name="email_user" 
                              value={values.email_user}
                              onChange={handleInput}
                              className="form-control form-control-lg"
                              />
                              {errors.email_user && <span className="text-danger"> {errors.email_user}</span>}
                            </fieldset>
                          </div> */}
                          <div className="col-12">
                                    <fieldset>
                                    <label className="label">Numéro de téléphone</label>
                                    <PhoneInput
                                        id="user_tel"
                                        defaultCountry="tg"
                                        name="user_tel"
                                        value={phone}
                                        onChange={(phone) => setPhone(phone)}
                                    />
                                 </fieldset>
                                </div>
                          <div className="col-12">
                            <fieldset>
                              <label className="label">Votre Pseudo</label>
                              <input
                                type="text"
                                name="pseudo"
                                value={values.pseudo}
                                autoComplete="off"
                                placeholder="votre pseudo"
                                onChange={handleInput}

                                className="form-control form-control-lg"
                              />
                              {errors.pseudo && <span className="text-danger"> {errors.pseudo}</span>}

                            </fieldset>
                          </div>
                        
                          <div className="col-12">
                            <fieldset>
                              <label className="label">Mot de passe</label>
                              <input
                                type="password"
                                name="password"
                                value={values.password}
                                autoComplete="off"
                                placeholder=""
                                onChange={handleInput}
                                className="form-control form-control-lg"
                              />
                              {errors.password && <span className="text-danger"> {errors.password}</span>}

                            </fieldset>
                          </div>

                          <div className="col-12 mb-3">
                            <fieldset>
                              <label className="label">Confirmer le mot de passe</label>
                              <input
                                type="password"
                                name="password1"
                                value={values.password1}
                                autoComplete="off"
                                placeholder=""
                                onChange={handleInput}

                                className="form-control form-control-lg"
                              />
                                {errors.password1 && <span className="text-danger"> {errors.password1}</span>}

                            </fieldset>
                          </div>

                          </div>
                        
                      </div>
               
              </div>
              <hr className="cst_hr " style={{display : "none"}}/>
              <div className="row" style={{display : "none"}}>
                 {/* <EcosMoneyCompo /> */}
                 <div className="container mt-3">
       
                    <div className="row">
                      <div style={{ border: '1px solid #ccc', marginBottom: '10px' }}>
                        
                          <div className="section-header">
                          <h6 className="mt-3 text-center">Compte business</h6>
                        </div>
                        
                        
                          <div style={{ padding: '10px' }}>
                            <div className="flex_center">
                            <div className="fit_content">
                                <div className="React__checkbox">
                                  <label>                              
                                    <span className="React__checkbox--span" /> Activer maintenant
                                  </label>
                                  <input 
                                          type="checkbox" 
                                          className="React__checkbox--input"
                                           name="activer_now" 
                                           checked={activate_fonction === "now" || false}
                                          onChange={handleCheckboxChange}
                                    />
                                </div>
                              </div>
                             

                            </div>
                           

                                    {activate_fonction === "now" 
                                    
                                    
                                    ?
                                    <div className="row activate_em">

                                    <div className="col-12">
                                      <fieldset>
                                         <label className="label">
                                          Nom de votre compagnie
                                        </label>
                                        <input
                                          type="text"
                                          name="compagnie"
                                          autoComplete="off"
                                          placeholder="Votre compagnie"
                                          value={businessValues.compagnie}
                                          onChange={handleCompagnieInput}
                                          className="form-control form-control-lg"
                                        />
                                      </fieldset>
                                    </div>
                                    <div className="col-12">
                                      <fieldset>
                                         <label className="label">
                                         Domaine d'activité
                                        </label>
                                        <input
                                          type="text"
                                          name="domaineCompagnie"
                                          autoComplete="off"
                                          placeholder="Votre domaine d'activité"
                                          className="form-control form-control-lg"
                                          value={businessValues.domaineCompagnie}
                                          onChange={handleCompagnieInput}
                                        />
                                      </fieldset>
                                    </div>

                                    <div className="col-12">
                                      <fieldset>
                                        <label className="label">Numéro de téléphone de la compagnie</label>
                                        <PhoneInput
                                         value={business_phone}
                                         onChange={(business_phone) => setPhone_business(business_phone)}
                                          
                                          defaultCountry="tg"
                                          name="business_tel"
                                        />
                                      </fieldset>
                                    </div>

                                    <div className="col-12">
                                      <fieldset>
                                        <label className="label">Adresse mail de la compagnie (email) </label>
                                        <input
                                          type="email"
                                          name="mail_compagnie"
                                          autoComplete="off"
                                          placeholder="Email"
                                          className="form-control form-control-lg"
                                          value={businessValues.mail_compagnie}
                                          onChange={handleCompagnieInput}
                                        />
                                      </fieldset>
                                    </div>

                                    <div className="col-12">
                                      <fieldset>
                                        <label className="label">Site web de la compagnie</label>
                                        <input
                                          type="text"
                                          name="website_compagnie"
                                          autoComplete="off"
                                          placeholder="Site Web"
                                          className="form-control form-control-lg"
                                          value={businessValues.website_compagnie}
                                          onChange={handleCompagnieInput}
                                        />
                                      </fieldset>
                                    </div>
                                  </div>
                                     
                                                            
                                     : null
                                     
                                     
                                     
                                     
                                     }
                          </div>
                        
                      </div>
                    
                    
                    </div>  
                </div>
              </div>
              
               
             
               {/* submit button */}
              <div className="row">
              <div className="col-12 mt-3">
                  <button
                    type="submit"
                    className="btn-primary d-block mt-4 btn-signin"
                  >
                    créer compte
                  </button>

                  <hr />
             <Link to='/admin'>
                             
                                                   
                           <a href="" className="text_14 d-block">
                           <FontAwesomeIcon icon={faHome} className="cst_icon mx-0" /> Retour à l'accueil</a></Link>                           
                  
                </div>
              </div>

              
             
              </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterAdmin;

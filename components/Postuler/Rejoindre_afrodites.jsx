import React from 'react'

import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect ,useRef  } from "react"; 

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { FaChevronLeft, FaChevronRight, FaChevronDown , faSpinner, faCheck  } from 'react-icons/fa';

import Locations from '../../Components/Locations.jsx';
import { useAuth } from "../../Context/AuthenticateContext.jsx";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faChevronLeft,faCheckDouble, faImage,faRepeat, faPlus, faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Header_menu from '../../Components/Header_menu.jsx';
import FixedMenu from '../../Components/FixedMenu.jsx';
import moment from 'moment';
import requestPermission from '../../sevices/NotificationService.js';

function Rejoindre_afrodites() {

    
 
  const location = useLocation();
  
      const auth = useAuth(); 
      const user_info = auth.currentUser 
    
      const navigate = useNavigate()
       const apiUrl = 'https://apiafro.aafrodites.com'
       const goback = () => {
        navigate(-1); // Navigue en arrière dans l'historique
      };
      // get now


         const [newuser, setNewUser] = useState(0);
        
         const [newuserdata, setNewUserData] = useState(0); 
         const link_url = location?.pathname.split('/');
     
  const [phone1, setPhone1] = useState("");

  const [phone2, setPhone2] = useState("");
     
      
  
  //  const [formData, setFormData] = useState({
  //    postulant: {
  //      nom: "",
  //      prenom: "",
  //      pseudo: "",
  //   //    date_naissance: "",
  //   //      taille: "",
  //   //    poids: "",
  //   //    indication: "",
      
  //    }
  //    ,
  //    fashion: {
     
  //      experimented: null,
        
  //    },
  //    role: {
      
  //      socialMedia: "",
  //      followers: null,
  //    },
  //    host: {
  //      temps_experience: "",
      
  //    },
  //  });

const [formData, setFormData] = useState({
    postulant: {
      nom: "",
      prenom: "",
      pseudo: "",
      code_1: "",
      tel1: "",
      code_2: "",
      tel2: ""
    },
    fashion: {
      experimented: null,
    },
    role: {
      socialMedia: "",
      followers: null,
    },
    host: {
      temps_experience: "",
    },
  });

  const [auth_Ids, setAuth_ids] = useState({
    auth: {
      pseudo: "",
      pass: "",
     
    }   }); 
  
    // console.log("auth_Ids")
    // console.log(auth_Ids)
   const handleInputChange = (type, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };
  
  
    
      const [isModalOpen, setIsModalOpen] = useState(false);
        // Fonction pour fermer le modal
        const closeModal = () => {
          setIsModalOpen(false);
        //   setModalContent('');
          // Supprimer le hash dans l'URL
          window.history.pushState(null, '', location.pathname);

          console.log('navigate to accueil')
          navigate('/')
        };
      
        // Surveillance du changement d'URL (pour détecter le bouton retour du navigateur)
        useEffect(() => {
          const handlePopState = () => {
            if (isModalOpen) {
              closeModal();
            }
          };
          
          window.addEventListener('popstate', handlePopState);
      
          return () => {
            window.removeEventListener('popstate', handlePopState);
          };
        }, [isModalOpen, location]);

         // Fonction pour mettre à jour formData
  const updatePhoneNumbers = () => {
    // Extraction du code et du numéro de téléphone pour phone1 et phone2
    // const number1 = phone1.split(" "); // Assurez-vous que l'espace sépare correctement le code et le numéro
    // const number2 = phone2.split(" ");

    const telnum1 = document.querySelector(".react-international-phone-input[name='phone1']" ).value;
    const number1 = telnum1.split(" ");
    const telnum2 = document.querySelector(".react-international-phone-input[name='phone2']" ).value;
    const number2 = telnum2.split(" ");

    // Mise à jour de formData
    setFormData((prevState) => ({
      ...prevState,
      postulant: {
        ...prevState.postulant,
        code_1: number1[0] || "", // Si phone1 est vide, on met une chaîne vide pour éviter les erreurs
        tel1: number1[1] || "",
        code_2: number2[0] || "",
        tel2: number2[1] || "",
      },
    }));
  };

  // Utilisation de useEffect pour mettre à jour formData quand phone1 ou phone2 change
  useEffect(() => {
    updatePhoneNumbers();
  }, [phone1, phone2]); // Si phone1 ou phone2 change, updatePhoneNumbers sera appelé

      
        const handleSubmit = async (e) => {
            e.preventDefault();
           const data_token = await requestPermission();

          //  console.log("data_token")
          //  console.log(data_token)
          //   return false;
            const type_join = parseInt(link_url[2])

            // Obtenir la date et l'heure actuelles et les formater pour MySQL
const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');

console.log(formattedDate); // Exemple : 2025-01-14 15:45:30

//  return false;

    const data_postulant = {
      data: formData?.postulant,
      type : type_join,
      date : formattedDate,
      FCMtoken : data_token
    };

    // const param = { data_postulant, userid: 1 }; // Exemple avec un utilisateur

    const userid = user_info?.id;
 
    const param = {data_postulant , userid }
 
    // console.log("param")
    // console.log(param)

    // return false;
    const loadingToast = toast.info('demande en cours...', {
      position: "top-center",
      autoClose: false, // Ne ferme pas la notification automatiquement
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });

        try {

           await axios
            .post(`${apiUrl}/postulant/join_data`,
              param
              )
            .then((result) => {
        
          
            
                if(result){
                   // Dismiss la notification de "sauvegarde en cours"
                    toast.dismiss(loadingToast);
                    console.log("result")
                    console.log(result)

                    // return false;
                  

                    // affciher une notif
                    // setIsNotification(true)
                    if(result?.data?.msg){
                      toast.error(result?.data?.msg, {
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
                    else{
                      toast.success('demande soumis avec succès' , {
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
                      
                      setIsModalOpen(true)
                      if(result.data?.user != null && result.data?.token != null){
                        // Sauvegarder les données du user dans le localStorage
                        const   user   = result.data?.user; // Assurez-vous que `response.data.user` contient l'ID, le pseudo et le password
                        const  token = result.data?.token; // Assurez-vous que `response.data.user` contient l'ID, le pseudo et le password
                       
                        setAuth_ids((prevState) => ({
                          ...prevState,
                          auth: {
                           
                            pseudo: result.data?.pseudo || "", // Si phone1 est vide, on met une chaîne vide pour éviter les erreurs
                            pass: result.data?.pass || "-",
                            
                          },
                        }));
                        // // ajouter les identifiants de connexion
                        // console.log("result.data")
                        // console.log(token)
                        // console.log(user)
                        setNewUserData([user , result.data?.pass])
                         auth.saveToLocalStorage(user ,token);
                      setNewUser(1)
                        // console.log(auth)
                        // localStorage.setItem("site", token);
                        // localStorage.setItem("user", JSON.stringify(user));
                       }

                    }
                  
                    

                   
                
      
                }
              }); 
              
        } catch (err) {
          console.log("erreur");
          // setError(err.response.data);
        }      
         
          };  

    
   
 
  return (
    <>
    <Header_menu />
     <ToastContainer className="toast_style"/>
     <div className='container modal_cstm bg-white'>
     <div className="full_box">
        <div className="content_zone">
          
            {/* <div className="form_zone"> */}
            <div className="title_box">
                <FontAwesomeIcon onClick={goback} icon={faChevronLeft} className="mx-1 cst_icon" />
                  <label>Rejoindre Afrodite</label>
            </div>
            <form onSubmit={handleSubmit} autoComplete="off">
            <label
             className="input_label"
             >
                <span>
                Nom 
                </span>
                <div className="float_data">
                <input
              className="input_value"
                type="text"
                value={formData.postulant.nom}
                onChange={(e) => handleInputChange("postulant", "nom", e.target.value)}
              />
              {/* <label className="obligat"> *</label> */}

            </div>
            
            
            </label>
            <label
             className="input_label"
             >
                <span>
                prénom 
                </span>
                <div className="float_data">
                <input
              className="input_value"
                type="text"
                value={formData.postulant.prenom}
                onChange={(e) => handleInputChange("postulant", "prenom", e.target.value)}
              />
                {/* <label className="obligat"> *</label> */}

            </div>
            
             
            </label>
             <label
                          className="input_label"
                          >
                              <span>
                            Tél
                            </span>
                            <div className="float_data">
                            <PhoneInput
                                       className="input_value"
                                                                                id="phone1"
                                                                                            defaultCountry="tg"
                                                                                            autoComplete = "off"
                                                                                            name="phone1"
                                                                                            value={phone1}
                                                                                            onChange={(phone1) => setPhone1(phone1)}
                                                                                          />
                          
            
                        </div>
                        
                         
                        </label>
                        <label
                          className="input_label"
                          >
                              <span>
                            whatsapp
                            </span>
                            <div className="float_data">
                            <PhoneInput
                                          className="input_value"
                                                                             id="phone2"
                                                                                            defaultCountry="tg"
                                                                                             autoComplete = "off"
                                                                                            name="phone2"
                                                                                            value={phone2}
                                                                                            onChange={(phone2) => setPhone2(phone2)}
                                                                                          />
            
                        </div>
                         
                            {/* <label className="float_msg"> (optionnel)</label> */}
                        </label>

                        <p className='reminder_msg'> * envoyervos Informations via lesquelles Afrodites peut vous contacter!</p>

                        <div className="btn_container">
      <button type="submit" className='submit_btn'>
        envoyer
      </button>
      </div>
  
             </form>

            {/* </div> */}

        </div>

    </div>

    {isModalOpen && (
        <div className="modal_customs">
          <div className="modal_customs-content">
            <button className="close_cstom-btn" onClick={closeModal}>
              ×
            </button>
            <h2>
            notification
              
              </h2>
            <div>
            <p className='data_info'>
                Afrodite vient de recevoir vos informations!
                <br/>
                Elle vous contactera via vos numéros!
               <br/>
              
            </p>
              <div className='auth_box'>
                <label>vous disposez d'un compte afrodites</label>
                <label className='danger_msg'>(*) sauvegarder vos identifiants</label>
                <label className='id_auth'>pseudo: <span>{auth_Ids?.auth?.pseudo}</span></label>
                <label  className='id_auth'>mot de passe: <span>{auth_Ids?.auth?.pass}</span> </label>

              </div>

            <p>

               {/* les identifiants */}
               Merci!!!
            </p>
            </div>

            <div className="btn_container">
                <button className="close_btn" onClick={closeModal}>
                    fermer
                </button>


            </div>
          </div>
        </div>
      )}


     </div>
   
    <FixedMenu />
        

    </>
  )
}

export default Rejoindre_afrodites
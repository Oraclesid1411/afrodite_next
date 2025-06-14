import React , { useState } from 'react'
import moment from 'moment';
import requestPermission from '../../sevices/NotificationService.js';

import axios from "axios";
import { useAuth } from "../../Context/AuthenticateContext.jsx";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useNavigate, Link, useLocation } from "react-router-dom";

import { FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa';

const apiUrl = "https://apiafro.aafrodites.com";


function CreerProfil() {

      const auth = useAuth(); 
          const user_info = auth.currentUser 
          const location = useLocation();
          const { demande } = location.state || {}; // Évite l'erreur si state est undefined
        
          console.log("demande")
          console.log(demande)
  const navigate = useNavigate();
  // États pour les deux numéros (téléphone et WhatsApp)
  const handleBackClick = () => {
    navigate(-1);  // Retourne à la page précédente  // Retourne à la page précédente
  };
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        date_naissance: "",
        age: "",
        indicatif_phone: "",
        telephone: "",
        indicatif_whatsapp: "",
        whatsapp: "",
        email: "",
        
      });
      const [phone, setPhone] = useState(formData.telephone || "");
      const [whatsapp, setWhatsapp] = useState(formData.whatsapp || "");
    
//       // Gestion du changement pour le téléphone principal
//   const handlePhoneChange = (value) => {
//     setPhone(value || ""); // Assure une valeur par défaut
//     setFormData((prev) => ({
//       ...prev,
//       telephone: value || "",
//       indicatif_phone: value ? value.split(" ")[0] : "+228", // Préfixe Togo par défaut
//     }));
//   };

//   // Gestion du changement pour le numéro WhatsApp
//   const handleWhatsappChange = (value) => {
//     setWhatsapp(value || ""); // Assure une valeur par défaut
//     setFormData((prev) => ({
//       ...prev,
//       whatsapp: value || "",
//       indicatif_whatsapp: value ? value.split(" ")[0] : "+228", // Préfixe Togo par défaut
//     }));
//   };

 // Fonction pour extraire l'indicatif et le numéro
 const extractPhoneDetails = (fullNumber) => {
    if (!fullNumber) return { indicatif: "+228", numero: "" }; // Par défaut : indicatif Togo

    const match = fullNumber.match(/(\+\d{1,3})\s*(\d+)/); // Extrait l'indicatif et le numéro
    return match
      ? { indicatif: match[1], numero: match[2] }
      : { indicatif: "+228", numero: fullNumber };
  };

  // Gestion du changement pour le téléphone principal
  const handlePhoneChange = (value) => {
    setPhone(value || "");
    const { indicatif, numero } = extractPhoneDetails(value);

    setFormData((prev) => ({
      ...prev,
      indicatif_phone: indicatif,
      telephone: numero,
    }));
  };

  // Gestion du changement pour le numéro WhatsApp
  const handleWhatsappChange = (value) => {
    setWhatsapp(value || "");
    const { indicatif, numero } = extractPhoneDetails(value);

    setFormData((prev) => ({
      ...prev,
      indicatif_whatsapp: indicatif,
      whatsapp: numero,
    }));
  };

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const calculateAge = (dateString) => {
            const today = new Date();
            const birthDate = new Date(dateString);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
        
            // Vérifier si l'anniversaire est passé cette année
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
              age--;
            }
        
            return age;
          };
          setFormData((prev) => {
            const updatedData = {
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            };
        
            // Si le champ modifié est la date de naissance, calculer et mettre à jour l'âge
            if (name === "date_naissance") {
                console.log(updatedData)
              updatedData.age = value ? calculateAge(value) : "";
            }
        
            return updatedData;
          });
       

        
      };
      
    
       // Fonction pour gérer les changements dans PhoneInput
//   const handlePhoneChange = (value, type) => {
//     if (!value) {
//       // Si aucun numéro n'est fourni
//       setFormData((prev) => ({
//         ...prev,
//         postulant: {
//           ...prev.postulant,
//           [type === "phone" ? "indicatif_phone" : "indicatif_whatsapp"]: "",
//           [type === "phone" ? "telephone" : "whatsapp"]: "",
//         },
//       }));
//       return;
//     }

//     try {
//       // Extraction de l'indicatif et du numéro (par ex. via libphonenumber-js)
//       const indicatif = value.slice(0, value.indexOf(" ")); // Partie avant le premier espace
//       const numero = value.slice(value.indexOf(" ") + 1); // Partie après l'espace

//       setFormData((prev) => ({
//         ...prev,
//         [type === "phone" ? "indicatif_phone" : "indicatif_whatsapp"]: indicatif,
//         [type === "phone" ? "telephone" : "whatsapp"]: numero,
   
       
//       }));
//     } catch (error) {
//       console.error("Erreur lors de la mise à jour du numéro :", error);
//     }
//   }; 
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const data_token = await requestPermission();
  // Obtenir la date et l'heure actuelles et les formater pour MySQL
const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');

console.log(formattedDate); // Exemple : 2025-01-14 15:45:30

const data_joiner = {
    data: formData,
    // type : type_join,
    date : formattedDate,
    FCMtoken : data_token
  };

  const userid = user_info?.id;
 
  const param = {data_joiner , userid }

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
         .post(`${apiUrl}/auth/creerProfil`,
           param
           )
         .then((result) => {
     
       
         
             if(result){
                // Dismiss la notification de "sauvegarde en cours"
                 toast.dismiss(loadingToast);
                 console.log("result")
                 console.log(result)
    

                 navigate("/profile" ,{state : {demande : demande}});  // Retourne à la page précédente  // Retourne à la page précédente
 
                 return false;
               

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
    
      const handleReset = () => {
        setFormData({
          nom: "",
          prenom: "",
          dateNaissance1: "",
         
        });
      };

      
  return (
    <>
       <ToastContainer className="toast_style"/>
       <button 
                      onClick={handleBackClick} 
                      // style={backButtonStyle}
                      className='back_cmoponent'>
                       <FaChevronLeft size={10} />
                    </button>
    <div className='creer_profil'>
       
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto border rounded shadow">
      <h2 className="title  mb-4"> mon profil afrodite</h2>
        <label
          className="input_label"
          >
             <span>
             nom 
             </span>
             <div className="float_data">
             <input   className="input_value" name="nom" type="text" placeholder="" value={formData.nom} onChange={handleChange} />
    
             {/* <label className="obligat"> *</label> */}

         </div>
         
          
         </label>

         <label
          className="input_label"
          >
             <span> prénom  </span>
             <div className="float_data">
             <input   className="input_value" name="prenom" type="text" placeholder="" value={formData.prenom} onChange={handleChange} />
    
             {/* <label className="obligat"> *</label> */}

         </div>
         
          
         </label>
       
       <label
          className="input_label"
          >
             <span>
             date de naissance 
             </span>
             <div className="float_data">
             <input className="input_value" name="date_naissance" type="date" placeholder="" value={formData.date_naissance} onChange={handleChange} />
    
             {/* <label className="obligat"> *</label> */}

         </div>
         
          
         </label>
         <label className="input_label"  >
             <span>
             votre age 
             </span>
             <div className="float_data">
             <input
           className="input_value"
            type="number"
            name="age"
             value={formData.age}
             readOnly
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
          autoComplete="off"
          defaultCountry="TG" // Sélectionne le Togo par défaut
          name="phone1"
          value={phone || "+228"} // Si vide, affiche le préfixe togolais
          onChange={handlePhoneChange}
          international
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
          id="whatsapp"
          autoComplete="off"
          defaultCountry="TG"
          name="whatsapp"
          value={whatsapp || "+228"} // Si vide, affiche le préfixe togolais
          onChange={handleWhatsappChange}
          international
        />
     
              </div>
               
                  {/* <label className="float_msg"> (optionnel)</label> */}
              </label>
              <label
           className="input_label"
           >
               <span>
             email
             </span>
             <div className="float_data">

         <input
            className="input_value"
          
             name="email"
              type="email"
             placeholder='votre adresse email'
             value={formData.email}
             onChange={handleChange}
           />
             {/* <label className="obligat"> *</label> */}

         </div>
          
             {/* <label className="float_msg"> (optionnel)</label> */}
         </label>
      <div className="button_box mt-4 w-100">
        <button type="submit" className="btn btn-primary">créer</button>
        <button type="button" onClick={handleReset} className="btn btn-secondary">Annuler</button>
      </div>
    </form>
    </div>
    </>
  )
}

export default CreerProfil
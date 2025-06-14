import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect ,useRef  } from "react"; 
// import Header_banner from '../Components/Header_banner';   
import { FaChevronLeft } from 'react-icons/fa';
import parsePhoneNumber from "libphonenumber-js";

import Locations from '../../Components/Locations.jsx';
import { useAuth } from "../../Context/AuthenticateContext.jsx";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import requestPermission from '../../sevices/NotificationService.js';

import moment from 'moment';
import {
  faInstagram,
  faFacebook,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
 
import { motion } from "framer-motion";

import CountrySelector from "../../Components/CountrySelector.jsx";
import Locations_entity from "../../Components/Locations_entity.jsx";
function Creerfranchises() {

  const auth = useAuth(); 
  const user_info = auth.currentUser 
  const [newSave, setNewSave] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = "https://apiafro.aafrodites.com";

  const link_url = location?.pathname.split("/");


  const [auth_Ids, setAuth_ids] = useState({
    auth: {
      pseudo: "",
      pass: "",
     
    }  
   }); 
  

    const [phone1, setPhone1] = useState("");
    const [phone2, setPhone2] = useState("");
    const [phone3, setPhone3] = useState("");
    
    
    const [phone4, setPhone4] = useState("");
    const [phone5, setPhone5] = useState("");
    const [phone6, setPhone6] = useState("");

    const [taille_m, settaille_m] = useState("1");
    const [taille_cm, settaille_cm] = useState("00");

    const [add_img, setAddimg] = useState(0); 
    const [add_img_b , setAddimg_b] = useState(0); 


    // declaration des parametres pour les images
    const [upload_img, setUpload_img] = useState([]);   
    const [images_gallery_boxshow, setimages_gallery_boxshow] = useState(false);   
     
    
    // declaration des parametres pour les videos
    const [upload_video, setUpload_video] = useState(null);
    const [videos_gallery_boxshow, setVideos_gallery_boxshow] = useState(false);
    
    // options caméra
    const videoRef = useRef(null);
    const canvasRef = useRef(null); 
    
      // State pour gérer les images
      const closeModal_notif = () => {
        navigate("/profile")
      };

    const [images, setImages] = useState([]);
    const [imagespath, setImagespath] = useState([]);
    
    const [formData, setFormData] = useState({
      person: {
        nom: "",
        prenom: "",
        quartier: "",
        // date_naissance: "",
        cni: "",
        nationalite: "",
        pays: "",
        ville: "",
        indication: "",
        indicatif_phone: "",
        telephone: "",
        indicatif_whatsapp: "",
        whatsapp: "", 
         indicatif_telegram: "",
         telegram: "",
        email: "",
        // disponible: "",
        // disponibilites: "",
        // soirsWeekends: "",
        // experience: "",
       
      }
      ,

      franchise : {
        nom : "",
        franchise:"",
        pays: "",
        ville: "",
        quartier: "",
        indication: "",
        indicatif_phone: "",
        telephone: "",
        indicatif_whatsapp: "",
        whatsapp: "", 
        indicatif_telegram: "",
        telegram: "",
        email: "",
       
      }
       
    });
    const [video, setvideo] = useState([]);
    const zones = ["face", 
      
       "profile",
       "entier",
        // "buste",
        //  "pied", 
         ]
      const [imagesModels, setImagesModel] = useState({
        face: null,
        dos: null,
        profile: null,
        entier: null,
        buste: null,
        pied: null,
      }); // Stocke les images pour chaque zone
    const [currentZone, setCurrentZone] = useState(null); // Zone en cours d'édition
    
    const [dropdownZone, setDropdownZone] = useState(null); // Stocke la zone du dropdown
    const [longPressTimeout, setLongPressTimeout] = useState(null); // Gère le timer pour l'appui long
      
    // locations listes
    const [locationData, setLocationData] = useState({
      pays: '',
      ville: '',
      quartier: '',
    });
  
    // Gérer les changements de sélection
  
    const handleBackClick = () => {
      navigate(-1);  // Retourne à la page précédente  // Retourne à la page précédente
    };
  
    const handleLocationChange = (data) => {
      setLocationData(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        person: {
          ...prevFormData.person,
          pays: data.pays || "",
          ville: data.ville || "",
          quartier: data.quartier || "",
        },
      }));
    
      console.log('Valeurs sélectionnées:', data);
    };
    const handleLocationChange_b = (data) => {
      // setLocationData(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        franchise: {
          ...prevFormData.franchise,
          pays: data.pays || "",
          ville: data.ville || "",
          quartier: data.quartier || "",
        
        },
      }));
    
      console.log('Valeurs sélectionnées:', data);
    };
    const handleCountrySelect = (country) => {
      console.log("Pays sélectionné :", country);
    };
    


  useEffect(() => {
    const fetchData = async () => {
      const category = parseInt(link_url[2], 10);
      const userid = 1; // Replace with actual user ID
      const params = { userid, categ: category };

      try {
        const response = await axios.post(`${apiUrl}/postulant/info`, params);
        if (response.data?.length > 0) {
          navigate("/etatcandidature");
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
      }
    };

    fetchData();
  }, []);

  // Fonction pour gérer les changements dans PhoneInput
  const handlePhoneChange = (value, type) => {
 
    if (!value) {
      // Si aucun numéro n'est fourni
    

      setFormData((prev) => ({
        ...prev,
        person: {
          ...prev.person,
          [`indicatif_${type}`]: "",
          [type]: "",
         
        },
      }));
      
      return;
    }

    try {
      // Extraction de l'indicatif et du numéro (par ex. via libphonenumber-js)
       const phoneNumber = parsePhoneNumber(value); // Parser le numéro
          if (!phoneNumber) throw new Error("Numéro invalide");
      
          const indicatif = `+${phoneNumber.countryCallingCode}`; // Ex: "+228"
          const numero = phoneNumber.nationalNumber; // Ex: "90123456"
      
      setFormData((prev) => ({
        ...prev,
        person: {
          ...prev.person,
          [type === "phone"
            ? "indicatif_phone"
            : type === "whatsapp"
            ? "indicatif_whatsapp"
            : "indicatif_telegram"]: indicatif,
          [type === "phone"
            ? "telephone"
            : type === "whatsapp"
            ? "whatsapp"
            : "telegram"]: numero,
        },
      }));
    } catch (error) {
      console.error("Erreur lors de la mise à jour du numéro :", error);
    }
  };

  const handlePhoneChange_b = (value, type) => {
 
    if (!value) {
      // Si aucun numéro n'est fourni
    

      setFormData((prev) => ({
        ...prev,
        franchise: {
          ...prev.franchise,
          [`indicatif_${type}`]: "",
          [type]: "",
         
        },
      }));
      
      return;
    }

    try {
      // Extraction de l'indicatif et du numéro (par ex. via libphonenumber-js)
       const phoneNumber = parsePhoneNumber(value); // Parser le numéro
          if (!phoneNumber) throw new Error("Numéro invalide");
      
          const indicatif = `+${phoneNumber.countryCallingCode}`; // Ex: "+228"
          const numero = phoneNumber.nationalNumber; // Ex: "90123456"
      
      setFormData((prev) => ({
        ...prev,
        franchise: {
          ...prev.franchise,
          [type === "phone"
            ? "indicatif_phone"
            : type === "whatsapp"
            ? "indicatif_whatsapp"
            : "indicatif_telegram"]: indicatif,
          [type === "phone"
            ? "telephone"
            : type === "whatsapp"
            ? "whatsapp"
            : "telegram"]: numero,
        },
      }));
    } catch (error) {
      console.error("Erreur lors de la mise à jour du numéro :", error);
    }
  };
  const handleInputChange = (type, field, value) => {
    // Fonction pour calculer l'âge
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
        [type]: {
          ...prev[type],
          [field]: value,
        },
      };
  
      // Si le champ modifié est la date de naissance, calculer et mettre à jour l'âge
      if (field === "date_naissance") {
        updatedData[type].age = value ? calculateAge(value) : "";
      }
  
      return updatedData;
    });
  };
  
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  
    const [cameraActive, setCameraActive] = useState(false);
      const [mediaStream, setMediaStream] = useState(null);
     
        const startCamera = async () => {
      
       try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
        // setimages_gallery_boxshow(false);
        closeModal()
      } catch (error) {
        console.error("Erreur lors de l'accès à la caméra :", error);
      }
    };
    
    // Fonction pour arrêter la caméra
    const stopCamera = () => {
      
       if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
        setMediaStream(null);
        setCameraActive(false);
      }
    };
 
    // Démarrage automatique de la caméra lorsque l'interface s'ouvre
     useEffect(() => {
      if (cameraActive) {
        startCamera();
      }
  
      // Arrêter la caméra lorsque l'interface est fermée
      return () => stopCamera();
    }, [cameraActive ]);
  
  const closeModal = () => setAddimg(0);
   
   // Fonction pour gérer la soumission (Postuler)
   const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    if (isSubmitting) return; // Bloque l'exécution si déjà en cours de soumission
    console.log(formData)

    
    const loadingToast = toast.info('demande en cours...', {
      position: "top-center",
      autoClose: false, // Ne ferme pas la notification automatiquement
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
    setNewSave(1)
    if (isSubmitting) return; // Bloque l'exécution si déjà en cours de soumission
    // console.log(formData)
    const data_token = await requestPermission();

     const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');

console.log(formattedDate); // Exemple : 2025-01-14 15:45:30
const userid = user_info?.id;
console.log(userid)


const param = {
  user : userid,
  data: formData,
  // files : imgs_save,
  date : formattedDate,
  FCMtoken : data_token
};

console.log("param")
console.log(param)
    // return false;
    try {

      await axios
       .post(`${apiUrl}/franchises/creer_franchise`,
        param
         )
       .then((result) => {
   
     
             console.log(result)

       return false;
           if(result){
              // Dismiss la notification de "sauvegarde en cours"
               toast.dismiss(loadingToast);
             
                if(result?.data?.old_user != ""){
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
                  
                  // setIsSubmitting(false); 
                     setIsModalOpen(true)

                  setIsSubmitting(false); 
 
                }
                else{
                  toast.success('franchise crée avec succès' , {
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
                  
                 //  setIsModalOpen(true)
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
                 
                    // setNewUserData([user , result.data?.pass])
                     auth.saveToLocalStorage(user ,token);
                  // setNewUser(1)
                  setIsModalOpen(true)

                  setIsSubmitting(false); 
 
                        }
 
                }

              //  }

               return false;
               // affciher une notif
               // setIsNotification(true)
           
             
               

              
           
 
           }

         }); 
         
   } catch (err) {
     console.log("erreur");
     
   }  
  
};
  return (

    <>
    <ToastContainer className="toast_style"/>
      
     <div className="container form_bg pt-3 mx-auto p-4 bg-white">
            <button 
              onClick={handleBackClick} 
              // style={backButtonStyle}
              className='back_cmoponent'>
               <FaChevronLeft size={10} />
            </button>
     
      <form autoComplete='off' className='business_form' style={{ maxWidth: "600px", margin: "auto" }}>
   
      <div className="mb-1 border rounded px-0">
        
         
            <div className="tab-content text-center my-1">
           
           <div className="input_group">
           <div className="text-center w-100">
            
            <label htmlFor=""> infos de la franchise</label>
          </div>
         <label className="input_label">
            <div className="line_data">
                <div className="half_col">
              

              <input className="input_value" type="text"
                   placeholder="nom de la franchise"
                   value={formData.franchise.nom}
                   onChange={(e) => handleInputChange("franchise", "nom", e.target.value)}
            />
            
              
          
               </div>
          
              <div className="half_col">
             
                <input
            className="input_value"
              type="text"
                placeholder="matricule franchise"
                value={formData.franchise.matricule}
             onChange={(e) => handleInputChange("franchise", "matricule", e.target.value)}
            />
             
           
           
        
             </div>
            </div>
          
         </label>

        
             <div className="line_data">
            
               <div className="half_col">
               <PhoneInput
    className="phone_input"
    id="phone4"
    disableCountryCode={true} // Désactive l'affichage de l'indicatif
 
    autoComplete="off"
    defaultCountry="tg"
    name="phone4"
    // inputProps={{
    //   placeholder: "Entrez votre numéro de téléphone...",
    // }}

    placeholder={phone4.trim() === "" ? "Téléphone" : "123"}

    // inputProps={{
    //   placeholder: phone4.trim() === "" ? "Téléphone" : "123", // Affiche "Téléphone" si le champ est vide
    // }}
    value={phone4}

    onChange={(value) => handlePhoneChange_b(value, "phone")}
  />
     phone: {phone4.trim() }      
          
             </div>
          
             <div className="half_col">
              

              <PhoneInput
                            className="phone_input"
                           id="phone5"
                           autoComplete='off'
                           defaultCountry="tg"
                           name="phone5"
                           value={phone5}
                                                                              //  value={`${formData.postulant.indicatif_whatsapp} ${formData.postulant.whatsapp}`.trim()}
                          onChange={(value) => handlePhoneChange_b(value, "whatsapp")}
  
                         />
              
                
            
             </div>
            </div>
          
        
         
           

             <div className="line_data locationbox">
             <div className="half_col">
             
             <PhoneInput
                         className="phone_input"
                                                            id="phone6"
                                                            autoComplete='off'
                                                                           defaultCountry="tg"
                                                                           name="phone6"
                                                                           value={phone6}
                                                                          //  value={`${formData.postulant.indicatif_whatsapp} ${formData.postulant.whatsapp}`.trim()}
                                                                           onChange={(value) => handlePhoneChange_b(value, "telegram")}
                                                                      
                                                                          //  onChange={(phone2) => setPhone2(phone2)}
            />
           </div>

           <Locations_entity className="inline_zone"
               inputdata ={{ 
                           
                              pays_name : 'pays',

                              ville_name: 'ville',
                             //  quartier_name: 'quartier'
               }} 
              onChange={handleLocationChange_b}
                                                                           
             />

       <div className="half_col">
             
             <input
               className="input_value"
           
              type="email"
              placeholder='adresse email'
              value={formData.franchise.email}
              onChange={(e) => handleInputChange("franchise", "email", e.target.value)}
           />
             
        </div>
       </div>
         
      
      

       <div className=" hide flex justify-center items-center h-screen">
      <CountrySelector onSelect={handleCountrySelect} />
    </div>                                                                   
      
       
         
           
         
</div>
            
            </div>
         
        </div>
        <div className=" border rounded px-0">
          
         
          <div className="tab-content text-center">
         
         <div className="input_group">
         <div className="text-center w-100">
            
            <label htmlFor=""> infos du proprietaire</label>
          </div>
       <label className="input_label">
          <div className="line_data">
              <div className="half_col">
            

            <input className="input_value" type="text"
                 placeholder="votre nom"
                 value={formData.person.nom}
                 onChange={(e) => handleInputChange("person", "nom", e.target.value)}
          />
          
            
        
             </div>
        
            <div className="half_col">
           
              <input
          className="input_value"
            type="text"
              placeholder="votre prénom"
              value={formData.person.prenom}
           onChange={(e) => handleInputChange("person", "prenom", e.target.value)}
          />
           
         
         
      
           </div>
          </div>
        
       </label>

      
       <label className="input_label">
          <div className="line_data">
          <div className="half_col">
            
            <input className="input_value" type="text"
                placeholder=" n° carte d'identité "
                value={formData.person.cni}
                onChange={(e) => handleInputChange("person", "cni", e.target.value)}             
           />
          
             </div>
             <div className="half_col">
           
           <PhoneInput

             className="phone_input"
             id="phone1"
             autoComplete='off'
             defaultCountry="tg"
             name="phone1"
             value={phone1}
             onChange={(value) => handlePhoneChange(value, "phone")}

          />
        
           </div>
        
           
          </div>
        
       </label>
       
       <div className="line_data">
          <div className="half_col">
            

          <PhoneInput
                        className="phone_input"
                       id="phone2"
                       autoComplete='off'
                       defaultCountry="tg"
                       name="phone2"
                       value={phone2}
                                                                          //  value={`${formData.postulant.indicatif_whatsapp} ${formData.postulant.whatsapp}`.trim()}
                      onChange={(value) => handlePhoneChange(value, "whatsapp")}

                     />
          
            
        
         </div>
        
           <div className="half_col">
           
             <PhoneInput
                         className="phone_input"
                                                            id="phone3"
                                                            autoComplete='off'
                                                                           defaultCountry="tg"
                                                                           name="phone3"
                                                                           value={phone3}
                                                                          //  value={`${formData.postulant.indicatif_whatsapp} ${formData.postulant.whatsapp}`.trim()}
                                                                           onChange={(value) => handlePhoneChange(value, "telegram")}
                                                                      
                                                                          //  onChange={(phone2) => setPhone2(phone2)}
            />
           </div>
         </div>

      <div className="line_data locationbox">
         <Locations className="inline_zone"
             inputdata ={{ 
                         
                            pays_name : 'pays',

                            ville_name: 'ville',
                           //  quartier_name: 'quartier'
             }} 
            onChange={handleLocationChange}
                                                                         
           />

     <div className="half_col">
           
           <input
             className="input_value"
         
            type="email"
            placeholder='votre adresse email'
            value={formData.person.email}
            onChange={(e) => handleInputChange("person", "email", e.target.value)}
         />
           
      </div>
     </div>
    
     <div className=" hide flex justify-center items-center h-screen">
    <CountrySelector onSelect={handleCountrySelect} />
  </div>                                                                   
    
     
       
         
       
</div>
          
          </div>
       
      </div>
    

      {/* Submit Button */}
      <div className="mt-3 text-center">
    
        <button 
          onClick={handleSubmit}
        disabled={isSubmitting} // Bloque le bouton pendant le traitement
        className="bg-primary text-white py-2 px-2 rounded hover:bg-primary">
        valider
        </button>
      </div>

      </form>
    </div>

    
    {isModalOpen && (
          <div className="modal-overlay upper_box" style={{backgroundColor : "rgba(12,12,12,.9)"}} onClick={closeModal_notif}>
          <motion.div
            className="modal-content_b"
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn modal_content_close" onClick={closeModal_notif}>&times;</button>
            
            <div>
            <p className='data_info'>
               vous avez créer votre franchise afrodites avec succès!
                <br/>
               vous disposez désormais le droit de: .........!
               <br/>
              
            </p>

            {auth_Ids?.auth?.pseudo && 
            (
              <>
                 <div className='auth_box'>
                <label>vous disposez d'un compte afrodites</label>
                <label className='danger_msg'>(*) sauvegarder vos identifiants</label>
                <label className='id_auth'>pseudo: <span>{auth_Ids?.auth?.pseudo}</span></label>
                <label  className='id_auth'>mot de passe: <span>{auth_Ids?.auth?.pass}</span> </label>

              </div>
              </>
            )
            
            }
           

            <p>

               {/* les identifiants */}
               Merci!!!
            </p>

            {/* <button className="close-btn modal_content_close" onClick={closeModal}>&times;</button> */}
          
            </div>
          </motion.div>
        </div>
      )}
    
    </>
   
  );
}

export default Creerfranchises;

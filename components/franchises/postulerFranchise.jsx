import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect ,useRef  } from "react"; 
// import Header_banner from '../Components/Header_banner';   
import { FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa';

import Locations from '../../Components/Locations.jsx';
import { useAuth } from "../../Context/AuthenticateContext.jsx";



import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import moment from 'moment';
import requestPermission from '../../sevices/NotificationService.js';


import parsePhoneNumber from "libphonenumber-js";
import { motion } from "framer-motion";

// import CountrySelector from "../../Components/CountrySelector.jsx";
function PostulerModels() {
      const navigate = useNavigate();
      const location = useLocation();
      const apiUrl = "https://apiafro.aafrodites.com";

      const auth = useAuth(); 
      const user_info = auth.currentUser 
      const [newSave, setNewSave] = useState(0);
      const [isModalOpen, setIsModalOpen] = useState(true);

       const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);
        useEffect(() => {
   
        const userid = user_info?.id;
          const params = { userid };
      
          const fetchData = async () => {
            try {
                if (userid != undefined) {

                 
                  // récupérer les infos de postulant
    const dataPostulant = await axios.post(`${apiUrl}/postulant/etatcandidature`, params);
    console.log("dataPostulant")                  
    console.log(dataPostulant)
            if((dataPostulant.data.length > 0) && (newSave === 0)){

                   navigate("/etatcandidature"); // Redirection si aucune donnée
             
             }

                  // return false;
               
              } 
              // setLoading(false);
            } catch (err) {
              console.error("Erreur lors de la récupération des données :", err);
              setLoading(false);
            }
          };
      
          fetchData();
        }, [user_info]);


        const closeModal_notif = () => setIsModalOpen(false);
   
        const closeWelcomeModal = () => setIsWelcomeModalOpen(false);

        // useEffect(() => {
        //   const timer = setTimeout(() => {
        //     setIsWelcomeModalOpen(false);
        //   }, 5000); // Ferme après 5 secondes
      
        //   return () => clearTimeout(timer); // Nettoyage si le composant est démonté
        // }, []);
      
  const link_url = location?.pathname.split("/");
  const categoryMap = {
    1: "mannequin",
    2: "hoteHotesse",
    3: "influenceur",
  };

 
   const [newuser, setNewUser] = useState(0);
         
         const [newuserdata, setNewUserData] = useState(0); 
      
  
    const [auth_Ids, setAuth_ids] = useState({
      auth: {
        pseudo: "",
        pass: "",
       
      }   }); 
    

      
    const [formData, setFormData] = useState({
      postulant: {
        nom: "",
        prenom: "",
        pseudo: "",
        date_naissance: "",
        age: "",
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
        disponible: "",
        disponibilites: "",
        soirsWeekends: "",
        experience: "",
       
      }
      ,
      mannequin: {
        // postuler: 0,
        etat_candidature: false,
        taille: "",
        tatouagePiercing: null,
        old_mannequin: null,
        // poids: "",
        // tourPoitrine: "",
        // tourTaille: "",
        // tourHanches: "",
        // pointure: "",
        // couleurYeux: "",
        // couleurCheveux: "",
        // typeCheveux: "",
        // teint: "",
        // particularites: "",
        // experience: "",
        // formationPose: "",
        // langues: "",
        photos: null,
        videoPresentation: null,
        reseauxSociaux: "",
         
      },
     
      hotesse: {
        etat_candidature: false,
        taille: "",
        couleurCheveux: "",
        couleurYeux: "",
        poids: "",
        uniforme: "",
        dernierDiplome: "",
        formationAccueil: "",
        langues: "",
        outilsInformatique: "",
        experiences: "",
        qualites: "",
        motivation: "",
        stress: "",
        photoRecente: null,
        cv: null,
        oldhotesse: null,
        lettreMotivation: null,
        certificats: null,
       
      },
      influenceur: {
        etat_candidature: false,
        oldinfluenceur : null,
        instagram: {
          lien: "",
          abonnés: "",
          tauxEngagement: "",
        },
        tiktok: {
          lien: "",
          abonnés: "",
          tauxEngagement: "",
        },
        youtube: {
          lien: "",
          abonnés: "",
          tauxEngagement: "",
        },
        facebook: {
          lien: "",
          abonnés: "",
          tauxEngagement: "",
        },
        // autresReseaux: "",
        style: "",
        specialisation: "",
        collaborations: "",
        audience: "",
        meilleursPosts: "",
        videoPresentation: "",
        statistiques: "",
        motivation: "",
        disponibiliteCollaboration: "",
      },
    });
    const [phone1, setPhone1] = useState("");
    const [phone2, setPhone2] = useState("");
    const [phone3, setPhone3] = useState("");
    
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
      
    const [images, setImages] = useState([]);
    const [imagespath, setImagespath] = useState([]);
    
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
  
    // const handleLocationChange = (data) => {
    //   setLocationData(data);
    //   console.log('Valeurs sélectionnées:', data);
    // };

    const handleLocationChange = (data) => {
      setLocationData(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        postulant: {
          ...prevFormData.postulant,
          pays: data.pays || "",
          ville: data.ville || "",
        },
      }));
    
      console.log("Valeurs sélectionnées:", data);
    };
  
    const handleCountrySelect = (country) => {
      console.log("Pays sélectionné :", country);
    };
    
  const [selectedTypes, setSelectedTypes] = useState({
    mannequin: false,
    hotesse: false,
    influenceur: false,
  });

  useEffect(() => {
    const category = categoryMap[link_url[2]];
    if (category) {
      setSelectedTypes((prevState) => ({
        ...prevState,
        [category]: true,
      }));
    }
  }, []);

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
        postulant: {
          ...prev.postulant,
          [`indicatif_${type}`]: "",
          [type]: "",
        },
        // postulant: {
        //   ...prev.postulant,
        //   [type === "phone" ? "indicatif_phone" : "indicatif_whatsapp"]: "",
        //   [type === "phone" ? "telephone" : "whatsapp"]: "",
        // },
      }));
      return;
    }

    try {

      console.log("tel num")
      console.log(value)
      const phoneNumber = parsePhoneNumber(value); // Parser le numéro
      if (!phoneNumber) throw new Error("Numéro invalide");
  
      const indicatif = `+${phoneNumber.countryCallingCode}`; // Ex: "+228"
      const numero = phoneNumber.nationalNumber; // Ex: "90123456"
  
      console.log("Indicatif :", indicatif);
      console.log("Numéro :", numero);
      // Extraction de l'indicatif et du numéro (par ex. via libphonenumber-js)
      // const indicatif = value.slice(0, value.indexOf(" ")); // Partie avant le premier espace
      // const numero = value.slice(value.indexOf(" ") + 1); // Partie après l'espace

      setFormData((prev) => ({
        ...prev,
        postulant: {
          ...prev.postulant,
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
        // },
          
          // [type === "phone" ? "indicatif_phone" : "indicatif_whatsapp"]: indicatif,
          // [type === "phone" ? "telephone" : "whatsapp"]: numero,
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

  

  // Fonction pour gérer la soumission (Postuler)
  const handleSubmit = async (event) => {
  
    event.preventDefault(); // Empêche le comportement par défaut du bouton
  
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
    console.log(formData)
    const data_token = await requestPermission();

const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');

console.log(formattedDate); // Exemple : 2025-01-14 15:45:30
const userid = user_info?.id;
console.log(userid)
// return false;

    const imgs_save = await next_option(); // Attend que la fonction résolve la promesse
    setIsSubmitting(true); // Indique que le formulaire est en cours de traitement
    // const param = {imgs_save , formData }

    const data_postulant = {
      user : userid,
      data: formData,
      files : imgs_save,
      date : formattedDate,
      FCMtoken : data_token
    };
    // console.log(formData)
   

    console.log("data_postulant")
      console.log(data_postulant)

    // return false;
  
    try {

      await axios
       .post(`${apiUrl}/postulant/devenir_afrodite`,
        data_postulant
         )
       .then((result) => {
   
     
       console.log(result)
      //  return false;
           if(result){
              // Dismiss la notification de "sauvegarde en cours"
               toast.dismiss(loadingToast);
               console.log("result")
               console.log(result)

               if(result?.data?.user === undefined){
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

                setNewUser(0)
                setIsModalOpen(true)

                setIsSubmitting(false); 
 
               }
               else{
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
                  
                  setIsSubmitting(false); 
 
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
                  
                 //  setIsModalOpen(true)
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
                 
                    setNewUserData([user , result.data?.pass])
                     auth.saveToLocalStorage(user ,token);
                  setNewUser(1)
                  setIsModalOpen(true)

                  setIsSubmitting(false); 
 
                        }
 
                }

               }

               return false;
               // affciher une notif
               // setIsNotification(true)
           
             
               

              
           
 
           }
         }); 
         
   } catch (err) {
     console.log("erreur");
     // setError(err.response.data);
   }   
  
  };


   
 
  return (

    <>
      <ToastContainer className="toast_style"/>
        {/* Modal de bienvenue (fermeture auto après 5s) */}
        {isWelcomeModalOpen && (
        <div className="modal-overlay" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }} onClick={closeWelcomeModal}>
          <motion.div
            className="modal-content"
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2>Bienvenue sur Afrodite!</h2>
            <p>Nous sommes ravis de vous voir ici. Profitez de votre expérience!</p>
          </motion.div>
        </div>
      )}
     <div className="container form_bg pt-3 mx-auto p-4 bg-white">
            <button 
              onClick={handleBackClick} 
              // style={backButtonStyle}
              className='back_cmoponent'>
               <FaChevronLeft size={20} />
            </button>
      {/* <label className="bg_title ">
        Formulaire de candidature
      </label> */}
      <form autoComplete='off' className='candidature_form' style={{ maxWidth: "600px", margin: "auto" }}>
   
        <div className="mb-6 border rounded px-0">
          
         
            <div className="tab-content text-center">


            {/* <label>
          
               <span className='title_label'>
                    informations générales
               </span>
           </label> */}

           <div className="input_group">

           <h6 className=" text-center">Informations Personnelles</h6>


            <div className="line_data">
            <div className="half_col">
              

              <input className="input_value" type="text"
              placeholder="votre nom"
              value={formData.postulant.nom}
 
              onChange={(e) => handleInputChange("postulant", "nom", e.target.value)}
            />
            
              
          
               </div>
          
             <div className="half_col">
             
                <input
            className="input_value"
              type="text"
                placeholder="votre prénom"
              value={formData.postulant.prenom}
              onChange={(e) => handleInputChange("postulant", "prenom", e.target.value)}
            />
             
           
           
        
             </div>
            </div>
          
            <div className="line_data">
            <div className="half_col">
            <input
              className="input_value"
              type="text"
              placeholder="Né(e) le jj/mm/aaaa"
              value={formData.postulant.date_naissance}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              onChange={(e) => handleInputChange("postulant", "date_naissance", e.target.value)}
            />

            {/* <input
            className="input_value"
             placeholder="né(e) le jj/mm/aaaa"
             type="date"
             value={formData.postulant.date_naissance}
             onChange={(e) => handleInputChange("postulant", "date_naissance", e.target.value)}
           /> */}
            
              
          
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
           {/* <input
            className="input_value"
              type="text"
                placeholder="votre prénom"
              value={formData.postulant.prenom}
              onChange={(e) => handleInputChange("postulant", "prenom", e.target.value)}
            /> */}
             </div>
            </div>
     
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
                                                                        
                                                                            //  onChange={(phone2) => setPhone2(phone2)}
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

            <div className="line_data">
            <div className="half_col">
              

            <input
            className="input_value"
          
             type="email"
             placeholder='votre adresse email'
             value={formData.postulant.email}
             onChange={(e) => handleInputChange("postulant", "email", e.target.value)}
           />
            
              
          
           </div>
          
            


            </div>
        
           
         
         
</div>
            
            </div>
         
        </div>

        <div className="input_group mt-3">

           <h6 className=" text-center">Informations Professionnelles</h6>


           
           <div className="line_data">
            <div className="half_col">
              

              <input className="input_value" type="text"
              placeholder="Nom Structure"
              value={formData.postulant.nom}
 
              onChange={(e) => handleInputChange("postulant", "nom", e.target.value)}
            />
            
              
          
               </div>
          
             <div className="half_col">
             
              <PhoneInput

                  className="phone_input"
                  id="phone1"
                  autoComplete='off'
                  defaultCountry="tg"
                  name="phoneS1"
                  value={phone1}
                  onChange={(value) => handlePhoneChange(value, "phone")}
                  
                      
                  />
             </div>

             <div className="half-col">
             <div className="line_data locationbox text-center">
              <p className="fw-bold">Localisation</p>
                  <Locations className="inline_zone"
                        inputdata ={{ 
                                    
                                        pays_name : 'pays',

                                        ville_name: 'ville',
                                      //  quartier_name: 'quartier'
                        }} 
                    onChange={handleLocationChange}
                                                                                          
                                                                                    
                    />

            <p className="fw-bold">Position Géographique (GPS) </p>

           </div>
             </div>

             

            </div>



        </div>



     
      {/* Submit Button */}
      <div className="mt-5 text-center">
      {/* <button 
        onClick={handleSave}
      disabled={isSubmitting} // Bloque le bouton pendant le traitement
      className="bg-success mx-2 text-white py-2 px-2 rounded hover:bg-success">
           Sauvegarder
        </button> */}
        <button 
          onClick={handleSubmit}
        disabled={isSubmitting} // Bloque le bouton pendant le traitement
        className="bg-primary text-white py-2 px-2 rounded hover:bg-primary">
         Soumettre la demande
        </button>
      </div>

      </form>
    </div>

    {isModalOpen && (
          <div className="modal-overlay" style={{backgroundColor : "hsla(0, 0.00%, 4.70%, 0.90)"}} onClick={closeModal_notif}>
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

            {/* <button className="close-btn modal_content_close" onClick={closeModal}>&times;</button> */}
          
            </div>
          </motion.div>
        </div>
      )}

 
    </>
   
  );
}

export default PostulerModels;

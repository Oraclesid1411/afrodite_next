import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect ,useRef  } from "react"; 
// import Header_banner from '../Components/Header_banner';   
import { FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import * as Select from "@radix-ui/react-select";
import { FaSignal, FaCar } from "react-icons/fa";
// import { ChevronDown } from "lucide-react";

// import { CheckSquare, Square } from "lucide-react";
import { FaWhatsapp, FaTelegram } from "react-icons/fa";
import Locations from '../../Components/Locations.jsx';
import { useAuth } from "../../Context/AuthenticateContext.jsx";
import face_image from  "/assets/icone_person/face.webp";

import plain_pied_image from  "/assets/icone_person/pp.webp";

import profil_image from  "/assets/icone_person/profil.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faCamera,faCheckDouble, faImage,faRepeat, faPlus, faTimes, faEdit, faTrash, faKitchenSet } from '@fortawesome/free-solid-svg-icons'

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faXTwitter, faFacebook, faLinkedin, faYoutube, faWhatsapp, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';

import imageCompression from 'browser-image-compression';

import moment from 'moment';
import requestPermission from '../../sevices/NotificationService.js';

import {
  faInstagram,
  faFacebook,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import parsePhoneNumber from "libphonenumber-js";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import CountrySelector from "../../Components/CountrySelector.jsx";
function PostulerModels() {
      const navigate = useNavigate();
      const location = useLocation();
      const apiUrl = "https://apiafro.aafrodites.com";

      const [isOpen_more, setIsOpen_more] = useState(false);
    const [selectedOption_more, setSelectedOption_more] = useState(""); // Stocke l'option sélectionnée
  const dropdownRef_more = useRef(null);

      const auth = useAuth(); 
      const user_info = auth.currentUser 
      const [newSave, setNewSave] = useState(0);
      const [contacter_afrodites, setContacter_afrodites] = useState(0);

      const [date, setDate] = useState({ day: "", month: "", year: "" });
      const dayRef = useRef(null);
      const monthRef = useRef(null);
      const yearRef = useRef(null);

      const handleChange_setdate = (e) => {
        const { name, value } = e.target;
        if (!/^\d*$/.test(value)) return; // Bloque les caractères non numériques
    
        setDate((prev) => {
          const newDate = { ...prev, [name]: value };
    
          if (name === "day" && value.length === 2) monthRef.current.focus();
          if (name === "month" && value.length === 2) yearRef.current.focus();
          
          return newDate;
        });
      };
    
      const handleBackspace_setdate = (e) => {
        if (e.key === "Backspace") {
          if (e.target.name === "month" && date.month === "") dayRef.current.focus();
          if (e.target.name === "year" && date.year === "") monthRef.current.focus();
        }
      };
    
      console.log(date)
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
        mannequin_clip: null,

        mannequin_photos: null,

        mannequin_podium: null,

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
      formation: [], // Initialisation des formations sélectionnées
    });


     // Met à jour `date_naissance` dès que les trois champs sont remplis
  useEffect(() => {
    if (date.day.length === 2 && date.month.length === 2 && date.year.length === 4) {
      const formattedDate = `${date.day}-${date.month}-${date.year}`;
      setFormData((prev) => ({
        ...prev,
        postulant: {
          ...prev.postulant,
          date_naissance: formattedDate,
        },
      }));
    }
  }, [date, setFormData]);
    console.log("formData")
    console.log(formData)
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
  const link_url = location?.pathname.split("/");
  const categoryMap = {
    1: "mannequin",
    2: "hoteHotesse",
    3: "influenceur",
  };
  
  const [selectedCategories, setSelectedCategories] = useState([]);

  const mannequin_list = {
    "mannequin_clip": [
    
    ]
    ,
    "mannequin_photos": [
   
  ]
    ,
  
    "mannequin_podium": [],
  };

  
  const [whatsapp, setWhatsapp] = useState(false);
  const [telegram, setTelegram] = useState(false);
  const [extraOption, setExtraOption] = useState("");
  const [extraChecked, setExtraChecked] = useState(false);

  // const [selectedCode, setSelectedCode] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [whatsapp, setWhatsapp] = useState(false);
  // const [telegram, setTelegram] = useState(false);
  // const [extraChecked, setExtraChecked] = useState(false);

  const countryCodes = [
    {name : "tg" , code: "+228"},
    { name: "fr", code: "+33" },

    { name: "bg", code: "+32" },
    { name: "Sui", code: "+41" },
    { name: "Cnd", code: "+1" },
    { name: "rci", code: "+225" },
  ];

  const [selectedCode, setSelectedCode] = useState(countryCodes[0].code);
  const [phone_ind, setPhone_ind] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


   // Gestion du changement de téléphone
   const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setFormData((prev) => ({
      ...prev,
      postulant: {
        ...prev.postulant,
        indicatif_phone: "00" + phone_ind,
        telephone: value,
      },
    }));
  };

  // Gestion du changement d'indicatif
  const handleCodeChange = (e) => {
    const value = e.target.value;
    setSelectedCode(value);
    setFormData((prev) => ({
      ...prev,
      postulant: {
        ...prev.postulant,
        indicatif_phone: value,
      },
    }));
  };

  // Gestion des cases à cocher (comportement radio)
 
  const handleCheckboxChange_phone = (network) => {

    console.log("network")
    console.log(network)
    setWhatsapp((prev) => (network === "whatsapp" ? !prev : false));
    setTelegram((prev) => (network === "telegram" ? !prev : false));
   
  //   if(extraChecked){

  //   if (network === "signal" || network === "viber") {
     
  //     setExtraOption(network);
  //   } else {
  //     // setExtraChecked(false);
  //     setExtraOption(""); // Réaffiche le select en réinitialisant la valeur
  //   }

  // }
  
    setExtraChecked((prev) => ((network === "signal") || (network === "viber") ? !prev : false));
     // setSelectedNetwork((prev) => (prev === network ? null : network));

     if(extraChecked){
          //  alert("decoche")
           setExtraOption(""); 
      // if (network === "signal" || network === "viber") {
       
      //   setExtraOption(network);
      // } else {
      //   // setExtraChecked(false);
      //   setExtraOption(""); // Réaffiche le select en réinitialisant la valeur
      // }
  
    }
    setFormData((prev) => ({
      ...prev,
      postulant: {
        ...prev.postulant,
        indicatif_whatsapp: network === "whatsapp" ? (prev.postulant.indicatif_whatsapp ? "" : "00"+ phone_ind) : "",
        whatsapp: network === "whatsapp" ? (prev.postulant.whatsapp ? "" : phoneNumber) : "",
        indicatif_telegram: network === "telegram" ? (prev.postulant.indicatif_telegram ? "" : "00"+ phone_ind) : "",
        telegram: network === "telegram" ? (prev.postulant.telegram ? "" : phoneNumber) : "",
      
        indicatif_extra: network !== "whatsapp" && network !== "telegram" ? (prev.postulant.indicatif_extra ? "" : "00"+ phone_ind) : "",
        number_extra: network !== "whatsapp" && network !== "telegram" ? (prev.postulant.number_extra ? "" : phoneNumber) : "",
     
      },
    }));


    // setFormData((prev) => ({
    //   ...prev,
    //   postulant: {
    //     ...prev.postulant,
    //     indicatif_whatsapp: network === "whatsapp" ? selectedCode : "",
    //     whatsapp: network === "whatsapp" ? phoneNumber : "",
    //     indicatif_telegram: network === "telegram" ? selectedCode : "",
    //     telegram: network === "telegram" ? phoneNumber : "",
    //   },
    // }));
  };

  const handleSelectChange = (e) => {
    const selectedNetwork = e.target.value;
  
    setExtraOption(selectedNetwork);
    // setExtraChecked(true); // Cocher automatiquement
  
    // Mise à jour des données du formulaire
    handleCheckboxChange_phone(selectedNetwork);
  };
  // const handleSelectChange = (e) => {
  //   setExtraOption(e.target.value);
  //   handleCheckboxChange_phone(e.target.value)
  //   // setExtraChecked(true); // Coche automatiquement la case quand on sélectionne une option
  // };

  const handleCheckboxChange_extra = () => {
    if (extraChecked) {
      setExtraChecked(false);
      setExtraOption(""); // Réinitialise extraOption quand on décoche
    } else {
      setExtraChecked(true);
    }
  };
  // const handleSelectChange = (event) => {
  //   const selected = event.target.value;
  //   setExtraOption(selected);
  //   setExtraChecked(true);
  // };
  // const mannequin_list = {
  //   "catwalk" , "podium" , "detail" ,  "test",
   
  // }
const categories = {
  "form_mannequinnat": [
    "former_marche",
    "former_pose",
    "former_gestion_regard",
    "former_tenue_sur_scene",
    "former_adaptation_mode_de_vie",
  "meet_afrodite_former_mannequinnat",
  ]
  ,
  "form_hotesse": [
   "former_technique_accueil",
    "former_posture_gesture_elegante",
    "former_gestion_stress_evenementiel",
    "former_presentation_prise_parole",
    "former_gestion_situation_difficile_client",
     "meet_afrodite_hotesse_accueil" 
]
  ,
  "form_influenceur": [
    "former_strategie_contenu_rxsx",
    "former_faire_audience",
    "former_monetisation_collaboration_avec_marque",
    "former_montage_video",
    "former_algorithe_rxsx",
    "meet_afrodite_influenceur"
  ]
  ,
  "form_maquillage_esthetique": [
    "former_technique_maquillage_base",
    "former_maquillage_pro",
    "former_soin_peau",
    "choisir_bons_produits",
    "technique_coiffure",
    "meet_afrodite_maquillage"
  ]
  ,
  "form_casting_selfconfiance": [
    "former_preparer_casting_audition",
    "former_faire_book",
    "former_selfconfiance",
    "former_travail_voix",
    "former_simulation_casting",
    "meet_afrodite_former_selfconfiance"
 ]
  ,
  "form_etiquette_image": [
    "former_creer_image_pro",
    "former_code_vestimentaire",
    "former_technique_networking_gestion_image_pro",
    "former_gestion_attitude_interaction_avec_client",
    "meet_afrodite_etiquette_image"
  ]
  ,
  "form_fitness": [
    "former_training_physique_mannequin",
    "former_bonne_nutrition_equilibre_alimentaire",
    "former_ameliorer_posture_endurance",
    "former_yoga_relaxation",
    "meet_afrodite_former_fitness"
  ],
  "meet_afrodite_formation": [],
};

// Gérer la sélection des catégories
const handleCategoryChange = (category) => {

  // console.log("formData.formation:", formData.formation);

  // console.log("category")
  // console.log(category)
  setSelectedCategories((prev) =>
    prev.includes(category)
      ? prev.filter((c) => c !== category)
      : [...prev, category]
  );

  console.log()
  setFormData((prevData) => {
    const isCategorySelected = prevData.formation.some((item) => item.category === category);

    if (isCategorySelected) {
      // Supprimer la catégorie et toutes ses sous-catégories
      return {
        ...prevData,
        formation: prevData.formation.filter((item) => item.category !== category),
      };
    } else {
      // Ajouter une nouvelle catégorie avec un tableau vide pour ses sous-catégories
      return {
        ...prevData,
        formation: [...prevData.formation, { category, subCategories: [] }],
      };
    }
  });

  
};


const handleCategoryChange_b = (category , sub_categ) => {

  console.log("formData.formation:", formData.formation);

  console.log(category)
  console.log(sub_categ)

  setFormData((prevData) => {
    const formationCopy = [...prevData.formation];
    const categoryIndex = formationCopy.findIndex((item) => item.category === category);

    if (categoryIndex !== -1) {
      let subCategories = formationCopy[categoryIndex].subCategories;

      if (subCategories.includes(sub_categ)) {
        // Supprimer la sous-catégorie si elle est déjà présente
        subCategories = subCategories.filter((sc) => sc !== sub_categ);
      } else {
        // Ajouter la sous-catégorie
        subCategories = [...subCategories, sub_categ];
      }

      // Mettre à jour la catégorie dans le tableau
      formationCopy[categoryIndex] = { ...formationCopy[categoryIndex], subCategories };

      return { ...prevData, formation: formationCopy };
    }

    return prevData;
  });

  // setSelectedCategories((prev) =>
  //   prev.includes(category)
  //     ? prev.filter((c) => c !== category)
  //     : [...prev, category]
  // );

  // setFormData((prevData) => ({
  //   ...prevData,
  //   formation: prevData.formation.includes(category)
  //     ? prevData.formation.filter((c) => c !== category)
  //     : [...prevData.formation, category],
  //   subFormation: {
  //     ...prevData.subFormation,
  //     [category]: prevData.subFormation?.[category]?.includes(sub_categ)
  //       ? prevData.subFormation[category].filter((sc) => sc !== sub_categ)
  //       : [...(prevData.subFormation?.[category] || []), sub_categ],
  //   },
  // })); 
};

const handleCheckboxChange_c = (categoryType, category) => {
  setFormData((prev) => ({
    ...prev,
    [categoryType]: {
      ...prev[categoryType],
      [category]: prev[categoryType][category] ? null : "actif", // Ajoute ou enlève "actif"
    },
  }));
};


// const handleCategoryChange_b = (category , sub_categ) => {

//   console.log("formData.formation:", formData.formation);

//   console.log(category)
//   console.log(sub_categ)

//   setFormData((prevData) => {
//     const formationCopy = [...prevData.formation];
//     const categoryIndex = formationCopy.findIndex((item) => item.category === category);

//     if (categoryIndex !== -1) {
//       let subCategories = formationCopy[categoryIndex].subCategories;

//       if (subCategories.includes(sub_categ)) {
//         // Supprimer la sous-catégorie si elle est déjà présente
//         subCategories = subCategories.filter((sc) => sc !== sub_categ);
//       } else {
//         // Ajouter la sous-catégorie
//         subCategories = [...subCategories, sub_categ];
//       }

//       // Mettre à jour la catégorie dans le tableau
//       formationCopy[categoryIndex] = { ...formationCopy[categoryIndex], subCategories };

//       return { ...prevData, formation: formationCopy };
//     }

//     return prevData;
//   });

//   // setSelectedCategories((prev) =>
//   //   prev.includes(category)
//   //     ? prev.filter((c) => c !== category)
//   //     : [...prev, category]
//   // );

//   // setFormData((prevData) => ({
//   //   ...prevData,
//   //   formation: prevData.formation.includes(category)
//   //     ? prevData.formation.filter((c) => c !== category)
//   //     : [...prevData.formation, category],
//   //   subFormation: {
//   //     ...prevData.subFormation,
//   //     [category]: prevData.subFormation?.[category]?.includes(sub_categ)
//   //       ? prevData.subFormation[category].filter((sc) => sc !== sub_categ)
//   //       : [...(prevData.subFormation?.[category] || []), sub_categ],
//   //   },
//   // })); 
// };

  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
   
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newuser, setNewUser] = useState(0);
  const [newuserdata, setNewUserData] = useState(0); 
  const closeWelcomeModal = () => setIsWelcomeModalOpen(false);

   useEffect(() => {

        setIsWelcomeModalOpen(true)
        
          const timer = setTimeout(() => {
            setIsWelcomeModalOpen(false);
          }, 5000); // Ferme après 5 secondes
      
          return () => clearTimeout(timer); // Nettoyage si le composant est démonté
        }, []);
      
    const [auth_Ids, setAuth_ids] = useState({
      auth: {
        pseudo: "",
        pass: "",
       
      }   }); 
    
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
    // const [upload_video, setUpload_video] = useState(null);
    // const [videos_gallery_boxshow, setVideos_gallery_boxshow] = useState(false);
    
    // options caméra
    const videoRef = useRef(null);
    const canvasRef = useRef(null); 
    
      // State pour gérer les images
      
    const [images, setImages] = useState([]);
    const [imagespath, setImagespath] = useState([]);
    
    // const [video, setvideo] = useState([]);
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
  
    // const handleCountrySelect = (country) => {
    //   console.log("Pays sélectionné :", country);
    // };
    
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
  
  const handleCheckboxChange = (type, field, value) => {
    setSelectedTypes((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));



    // setSelectedTypes((prev) => ({
    //   ...prev,
    //   [type]: {
    //     ...prev[type],
    //     [field]: prev[type][field] === value ? null : value,
    //   },
    // }));
    console.log(type)


    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: {
        ...prevFormData[type],
        etat_candidature: !selectedTypes[type], // Ajoute ou met à jour le champ
      },
    }));
  };
  const handleCheckboxChange_b = (type, field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [field]: prevState[type][field] === value ? null : value, // Basculer entre la valeur sélectionnée et null
      },
    }));
  };
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  
    const [cameraActive, setCameraActive] = useState(false);
    const [isFrontCamera, setIsFrontCamera] = useState(true); // Exemple avec un hook d'état

    const [capturedImage, setCapturedImage] = useState(null);
      const [mediaStream, setMediaStream] = useState(null);
     
      // console.log(isFrontCamera)
    // Fonction pour démarrer la caméra
    const startCamera = async () => {
      
    // e.preventDefault(); // Empêche le comportement par défaut
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
      
    // e.preventDefault(); // Empêche le comportement par défaut
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
        setMediaStream(null);
        setCameraActive(false);
      }
    };

    
  // Fonction pour capturer l'image
  const captureImage = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut

    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Convertir en base64
      const image = canvas.toDataURL("image/png");
      setCapturedImage(image);
      stopCamera(); // Stopper la caméra après capture
    }
  };

  // Fonction pour réinitialiser (reprendre la caméra)
  const resetCapture = (e) => {
    // alert('reset')
    e.preventDefault(); // Empêche le comportement par défaut

    setCapturedImage(null);
    startCamera();
  };

  // Fonction pour passer à l'étape suivante
  const proceed = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut

    // console.log("Image capturée :", capturedImage);


    // alert("Image sauvegardée !");
    // Implémentez la logique pour l'étape suivante
    // setCapturedFiles(capturedImage)
    setCapturedImage(null);
    setCameraActive(false);

    setImagesModel((prev) => ({
      ...prev,
      [currentZone]:capturedImage, // Associe l'image choisie à la zone actuelle
    }));

    setImages((prev) => {
      // Copie l'état précédent pour modification
      const updatedImages = { ...prev };

      // Remplace uniquement le path de currentZone
    
// Vérifie si `path` existe déjà
if (updatedImages.path) {
 
  // Vérifie si l'indice correspondant à la zone actuelle existe déjà
  if (zones.indexOf(currentZone) < updatedImages.path.length) {
    // Remplace uniquement le path pour l'index correspondant
    updatedImages.path = updatedImages.path.map((imgPath, index) => {
      if (index === zones.indexOf(currentZone)) {
       
        return capturedImage; // Remplace par la nouvelle image
      }
      return imgPath; // Conserve les autres images
    });
  } else {
    // Ajoute un nouveau path si l'indice n'existe pas encore
    console.log("Ajout d'un nouveau path pour currentZone:", currentZone);
    updatedImages.path[zones.indexOf(currentZone)] = capturedImage;
  }
} else {
  // Si `path` n'existe pas, initialise avec l'image actuelle
  console.log("Initialisation de updatedImages.path avec la première image");
  updatedImages.path = [];
  updatedImages.path[zones.indexOf(currentZone)] = capturedImage;
}

      return updatedImages; // Retourne le tableau mis à jour
    });
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
  
  const closeModal_notif = () => {
    navigate("/profile")
  };
  const Addimgs = (zone) => {

    // e.preventDefault(); // Empêche le comportement par défaut
    console.log(zone);
    
  setCurrentZone(zone);
    setAddimg(1);
    // if(images_gallery_boxshow === true){
    //   setimages_gallery_boxshow(false)

    // }

  };
  const slidetozone = (zone , e) => {

    console.log(zone);
    e.preventDefault(); // Empêche le comportement par défaut


  };
  const compressImage = async (file, maxWidth, maxHeight) => {
    const options = {
      maxWidthOrHeight: Math.max(maxWidth, maxHeight),
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  };
  function base64ToFile(base64String, filename) {
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new File([u8arr], filename, { type: mime });
  }
   const next_option = async () => {
    
    //  const formData_b = new FormData();
console.log('next')
setimages_gallery_boxshow(false)

console.log("images")
console.log(images)
if (!images?.path || images.path.length === 0) {
  console.error("Aucune image à télécharger");
  return;
}

const formData = new FormData();
  const tab_file = [];
// Parcourir toutes les images
for (let index = 0; index < images.path.length; index++) {
  const base64Image = images.path[index];
  const originalFileName = `image-${index + 1}.jpeg`;

  // Ajouter un timestamp pour rendre le nom unique
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  const uniqueFileName = `${originalFileName.split(".")[0]}_${timestamp}.jpeg`;

  try {
    // Convertir l'image Base64 en fichier
    const file = base64ToFile(base64Image, uniqueFileName);
    // console.log(file)
    tab_file.push(file)
    if (file.size > 350000) {
      // Compresser les images avec des tailles max spécifiques
      const [desktopImage] = await Promise.all([
        compressImage(file, 1920, 1080), // Desktop haute qualité
       ]);

      formData.append("files", desktopImage, uniqueFileName); // Original
       } else {

      
      
      // Ne pas compresser si la taille est déjà inférieure à 500 Ko
      formData.append("files", file, uniqueFileName); // Original
     
      // formData.append("files", file, `${uniqueFileName}_thumbnail_desktop`);
      // formData.append("files", file, `${uniqueFileName}_thumbnail_mobile`);
    }

  } catch (compressionError) {
    console.error(`Erreur lors de la compression de l'image ${uniqueFileName} :`, compressionError);
    continue; // Continuer avec les autres images même en cas d'erreur
  }
}

// images?.path.forEach((file) => formData_b.append('images', file));

        // console.log(tab_file)

        // return false;
        try {
          const response = await axios.post(`${apiUrl}/uploadfiles/savefiles_postulant`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Important
            },
            withCredentials: true, // Si nécessaire
          });
          console.log("response.data");
          console.log(response.data);
          setImagespath(response.data?.files)
          return response.data?.files;
        } catch (error) {
          console.error("Erreur lors de l'upload :", error.response?.data || error.message);
        }
 
   };
  const cancel_action  = async () => {
    
    //  const formData_b = new FormData();
console.log('next')
setimages_gallery_boxshow(false)

console.log(images) 
  };
  // Gérer l'import depuis la galerie
  const handleFileInput = (e) => {
    
    e.preventDefault(); // Empêche le comportement par défaut
    const file = e.target.files[0];
    if (file) {

     
      console.log("imagesModels")
      console.log(imagesModels)
    
      const reader = new FileReader();
      reader.onload = () => {
        const newImagePath = reader.result; // Le path de la nouvelle image
        setImagesModel((prev) => ({
          ...prev,
          [currentZone]: reader.result, // Associe l'image choisie à la zone actuelle
        }));
          // Mise à jour de l'image dans le tableau images (remplacement)
      setImages((prev) => {
        // Copie l'état précédent pour modification
        const updatedImages = { ...prev };

        // Remplace uniquement le path de currentZone
      
  // Vérifie si `path` existe déjà
  if (updatedImages.path) {
    console.log("updatedImages.path avant modification:", updatedImages.path);

    // Vérifie si l'indice correspondant à la zone actuelle existe déjà
    if (zones.indexOf(currentZone) < updatedImages.path.length) {
      // Remplace uniquement le path pour l'index correspondant
      updatedImages.path = updatedImages.path.map((imgPath, index) => {
        if (index === zones.indexOf(currentZone)) {
          console.log('les indexes')
          console.log(index)
          console.log(zones.indexOf(currentZone))
          console.log('les indexes')
       
          console.log("Remplacement du path pour currentZone:", currentZone);
          return newImagePath; // Remplace par la nouvelle image
        }
        return imgPath; // Conserve les autres images
      });
    } else {
      // Ajoute un nouveau path si l'indice n'existe pas encore
      console.log("Ajout d'un nouveau path pour currentZone:", currentZone);
      updatedImages.path[zones.indexOf(currentZone)] = newImagePath;
    }
  } else {
    // Si `path` n'existe pas, initialise avec l'image actuelle
    console.log("Initialisation de updatedImages.path avec la première image");
    updatedImages.path = [];
    updatedImages.path[zones.indexOf(currentZone)] = newImagePath;
  }

        return updatedImages; // Retourne le tableau mis à jour
      });
     
        // setImages((prev) => ({
        //   ...prev,
        //   path: [...(prev.path || []), reader.result], // Ajoute l'image à la liste des images sans écraser les anciennes
        // }));
      };
      reader.readAsDataURL(file);
    }
    closeModal();
  };
  
  

  const switchCamera = () => {
    // stopCamera();
    setIsFrontCamera((prev) => !prev);
    setTimeout(() => startCamera(), 500); // Relancer la caméra après basculement
  };

  // Fonction pour modifier une image
  const EditImage = (zone) => {
  console.log(event)
    // e.preventDefault(); // Empêche le comportement par défaut

    console.log(zone)
    setCurrentZone(zone);
    setAddimg(1);
   
  };

  // Fonction pour supprimer une image
  const DeleteImage = (zone) => {
  
    // e.preventDefault(); // Empêche le comportement par défaut
    // Vérifie si la zone existe dans `imagesModels`
    setImagesModel((prev) => {
      const updatedModels = { ...prev };
      delete updatedModels[zone]; // Supprime l'entrée pour la zone
      return updatedModels;
    });
  
    // Mise à jour de `images`
    setImages((prev) => {
      const updatedImages = { ...prev };
  
      if (updatedImages.path) {
        console.log("Images avant suppression :", updatedImages.path);
  
        // Supprime l'image associée à l'indice de la zone actuelle
        const zoneIndex = zones.indexOf(zone);
  
        if (zoneIndex > -1 && zoneIndex < updatedImages.path.length) {
          updatedImages.path = updatedImages.path.filter(
            (_, index) => index !== zoneIndex
          );
        }
  
        console.log("Images après suppression :", updatedImages.path);
      }
  
      return updatedImages;
    });
  };
  
  const handleLongPressStart = (zone) => {
  
    // e.preventDefault(); // Empêche le comportement par défaut
   
    const timeout = setTimeout(() => {
      setDropdownZone(zone); // Affiche le dropdown après une seconde
    }, 1000); // 1 seconde
    setLongPressTimeout(timeout);
  };
  
  const handleLongPressEnd = () => {
  
    // e.preventDefault(); // Empêche le comportement par défaut
    clearTimeout(longPressTimeout); // Annule si le bouton est relâché avant 1 seconde
  };
  
  const handleDropdownAction = (action, zone) => {
  
    // e.preventDefault(); // Empêche le comportement par défaut
    if (action === "edit") {
      EditImage(zone);
    } else if (action === "delete") {
      DeleteImage(zone);
    }
    setDropdownZone(null); // Ferme le dropdown
  };
  
// fin de traitements des images 

 
  const handleTailleChange = (field, value) => {
    // Met à jour la taille en mètres ou centimètres
    if (field === "m") settaille_m(value);
    if (field === "cm") settaille_cm(value);

    // Met à jour la taille dans formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      mannequin: {
        ...prevFormData.mannequin,
        taille: `${field === "m" ? value : taille_m}.${field === "cm" ? value : taille_cm}`,
      },
      hotesse: {
        ...prevFormData.hotesse,
        taille: `${field === "m" ? value : taille_m}.${field === "cm" ? value : taille_cm}`,
      },
    }));
  };


  
  // setIsSubmitting(false); // Indique que le formulaire est en cours de traitement
   
  // Fonction pour gérer la soumission (Postuler)
  const handleSubmit = async (event) => {
  
    event.preventDefault(); // Empêche le comportement par défaut du bouton
  
    console.log(formData)
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
    setNewSave(1)
     if (isSubmitting) return; // Bloque l'exécution si déjà en cours de soumission
   
    const data_token = await requestPermission();

const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');

console.log(formattedDate); // Exemple : 2025-01-14 15:45:30
const userid = user_info?.id;
console.log(userid)
// return false;

    const imgs_save = await next_option(); // Attend que la fonction résolve la promesse
    // setIsSubmitting(true); // Indique que le formulaire est en cours de traitement
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

               const subCategoriesToCheck = new Set([
                "meet_afrodite_former_mannequinnat",
                "meet_afrodite_hotesse_accueil",
                "meet_afrodite_influenceur",
                "meet_afrodite_maquillage",
                "meet_afrodite_former_selfconfiance",
                "meet_afrodite_etiquette_image",
                "meet_afrodite_former_fitness"
              ]);
              
              if (formData?.rencontrer_afrodite?.etat_candidature) {
                setContacter_afrodites(1);
              } else if (
                formData?.formation?.some(
                  (formation) =>
                    formation?.category === "meet_afrodite_formation" ||
                    formation?.subCategories?.some((sub) => subCategoriesToCheck.has(sub))
                )
              ) {
                setContacter_afrodites(1);
              }

                //  if(formData?.rencontrer_afrodite?.etat_candidature === true){

                //   setContacter_afrodites(1)
                //  }
                //   if(formData?.formation.length > 0){
                //   for(let i= 0; i < formData?.formation.length; i++){
                //     if(formData?.formation[i]?.category === "meet_afrodite_formation"){

                //       setContacter_afrodites(1)
                //     }
                   
                //       if(formData?.formation[i]?.subCategories.length > 0){
                //         // alert('bis')
                //         for(let j = 0; j < formData?.formation[i]?.subCategories.length; j++){
                //           if((formData?.formation[i]?.subCategories[j] ==="meet_afrodite_former_mannequinnat")
                //           || (formData?.formation[i]?.subCategories[j] ==="meet_afrodite_hotesse_accueil")
                        
                //           || (formData?.formation[i]?.subCategories[j] ==="meet_afrodite_influenceur")
                //           || (formData?.formation[i]?.subCategories[j] ==="meet_afrodite_maquillage")
                //           || (formData?.formation[i]?.subCategories[j] ==="meet_afrodite_former_selfconfiance")
                //           || (formData?.formation[i]?.subCategories[j] ==="meet_afrodite_etiquette_image")
                //           || (formData?.formation[i]?.subCategories[j] ==="meet_afrodite_former_fitness")
                //           )
                //           {
                //             setContacter_afrodites(1)
                //           }
                //       }
                //        }
                  
                //     }
                //   }
                //  alert('pass')
              //  vérifier si il y a des cas de contacter afrodites
               if(result?.data?.user === undefined){

                if(result?.data?.msg){
                  // alert('1')
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
                // alert('2')
                // alert('test')
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

              //  return false;
               // affciher une notif
               // setIsNotification(true)
           
             
               

              
           
 
           }

         
         }); 
         
   } catch (err) {
     console.log("erreur");
     // setError(err.response.data);
   }   
  
  };


  const renderForm = (type) => {
    switch (type) {
      case "mannequin":
        return (
          <>
             <form>
                           <div className="liste_data">
                     
                                <div className="list">
                             {Object.keys(mannequin_list).map((category, index) => (
                              <div key={index} className="category_block">
                                <label className="option_data">
                                <input
  type="checkbox"
  checked={formData?.mannequin?.[category] || false}
  onChange={() => handleCheckboxChange_c("mannequin", category)}
/>

          
                                  {category === "mannequin_clip" ?
                                  
                                  (
                                   <>
                                   clip 
                                   </>
                                  )
          
                                  :
          
                                  category === "mannequin_photos" ?
                                  (
                                    <>photos </>
                                   )
           
                                   :
          
                                   category === "mannequin_podium" ?
                                   (
                                     <>podium </>
                                    )
            
                                 
                                       :
                    
          
                                  ( 
          
                                    <>
          
                                    </>
                                  )
                                  }
          
                                </label>
              
                                {/* Affichage des formations associées si la catégorie est cochée */}
                                {selectedCategories.includes(category) && (
                                  <div className="sub_list">
                                    {categories[category].map((formation, i) => (
                                      <label key={i} className="option_data sub_option">
                                        <input
                                          type="checkbox"
                                          checked={
                                            formData.formation.some(
                                              (item) => item.category === category && item.subCategories.includes(formation)
                                            )
                                          }
                                          onChange={() => handleCategoryChange_b(category, formation)}
                                        />
                                        <>
                                        {formation === "former_marche" ?
                                        
                                        (
                                         
                                          <>Défilé sur podium 
                                          <span 
                                            data-tooltip-id="tooltip-marche" 
                                            data-tooltip-content="Techniques de marche, posture" 
                                            onClick={(e) => e.stopPropagation()} 
                                            style={{ cursor: "pointer", marginLeft: "5px" }}
                                          >📌</span>
                                          <Tooltip id="tooltip-marche" />
          
                                          </>
            
                                        )
                                      
                                      :
                                      formation === "former_pose" ?
                                    
                                    (
                                    
          
          <>
          Poses photo
          <span 
            data-tooltip-id="tooltip-pose" 
            data-tooltip-content="pose photo pour shootings professionnels" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-pose" />
          
          </>
            
                                    )
                                    :
                                    formation === "former_gestion_regard" ?
                                  
                                  (
                                    <>
                                  Expression faciale et du regard
          
          <span 
            data-tooltip-id="tooltip-faciale" 
            data-tooltip-content="Gestion de l’expression faciale et du regard" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-faciale" />
          
                                    </>
            
                                  )
                                  :
                                  formation === "former_tenue_sur_scene" ?
                                
                                (
                                  <>
                                  Tenue et élégance 
          
          <span 
            data-tooltip-id="tooltip-Tenue" 
            data-tooltip-content="Tenue et élégance sur scène et en studio" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-Tenue" />
          
                                  </>
            
                                )
                                :
                                formation === "former_adaptation_mode_de_vie" ?
                              
                              (
                                <>
                                Adaptation aux styles de mode
                               
                        
          <span 
            data-tooltip-id="tooltip-Adaptation" 
            data-tooltip-content="Adaptation aux différents styles de mode (casual, haute couture, lingerie, sport, etc.)" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-Adaptation" />
          
                                </>
            
                              )
                              :
                              formation === "meet_afrodite_former_mannequinnat" ?
                            
                            (
                              <>
                              contacter afrodite pour des conseils
          
                              
                              </>
            
                            )
                            :
                            formation === "former_technique_accueil" ?
                          
                          (
                            <>
                            Accueil et communication
                         
          <span 
            data-tooltip-id="tooltip-communication" 
            data-tooltip-content="Techniques d’accueil et de communication" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-communication" />
          
                            </>
            
                          )
                          :
                          formation === "former_posture_gesture_elegante" ?
                        
                        (
                          <>
                          Posture et gestuelle
                       
          <span 
            data-tooltip-id="tooltip-gestuelle" 
            data-tooltip-content="Posture et gestuelle élégante" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-gestuelle" />
          
                          </>
            
                        )
                        :
                        formation === "former_gestion_stress_evenementiel" ?
                      
                      (
                        <>
                        Gestion du stress
                    
          <span 
            data-tooltip-id="tooltip-stress_event" 
            data-tooltip-content="Gestion du stress en événementiel" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-stress_event" />
          
                        </>
            
                      )
                      :
                      formation === "former_presentation_prise_parole" ?
                    
                    (
                      <>
                      Présentation et prise de parole
                      
          <span 
            data-tooltip-id="tooltip-prise_parole" 
            data-tooltip-content="Présentation et prise de parole" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-prise_parole" />
          
                      </>
            
                    )
                    :
                    formation === "former_gestion_situation_difficile_client" ?
                  
                  (
                    <>
                    Gestion des situations difficiles
               
          <span 
            data-tooltip-id="tooltip-situations_difficile" 
            data-tooltip-content="Gestion des situations difficiles avec les clients" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-situations_difficile" />
                    </>
            
                  )
                  :
                  formation === "meet_afrodite_hotesse_accueil" ?
                
                (
                  <>
                  contacter afrodite pour des conseils
                  </>
            
                )
                :
                formation === "former_strategie_contenu_rxsx" ?
              
              (
                <>
               produire du contenu
                
          <span 
            data-tooltip-id="tooltip-contenu_rxsx" 
            data-tooltip-content="Stratégie de contenu sur Instagram, TikTok, YouTube" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-contenu_rxsx" />
          
                </>
            
              )
              :
              formation === "former_faire_audience" ?
            
            (
              <>
              construire une audience 
          
              
          <span 
            data-tooltip-id="tooltip-audience" 
            data-tooltip-content="Comment construire une audience et fidéliser les abonnés" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-audience" />
          
              </>
            
            )
            :
            formation === "former_monetisation_collaboration_avec_marque" ?
            
            (
            <>
            Monétisation et collaborations
            
          <span 
            data-tooltip-id="tooltip-collaborations" 
            data-tooltip-content="Monétisation et collaborations avec les marques" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-collaborations" />
          
            </>
            
            )
            :
            formation === "former_montage_video" ?
            
            (
            <>
            infographie
          
          
          <span 
            data-tooltip-id="tooltip-infographie" 
            data-tooltip-content="Montage vidéo et retouche photo pour un feed professionnel" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-infographie" />
          
            </>
            
            )
            :
            formation === "former_algorithe_rxsx" ?
            
            (
            <>
            Algorithmes des réseaux sociaux
          
            
          <span 
            data-tooltip-id="tooltip-Algorithmes_rxsx" 
            data-tooltip-content="Algorithmes des réseaux sociaux et engagement" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-Algorithmes_rxsx" />
          
            </>
            
            )
            :
            formation === "meet_afrodite_influenceur" ?
            
            (
            <>
           contacter afrodite pour des conseils
            </>
            
            )
            :
            formation === "former_technique_maquillage_base" ?
            
            (
            <>
            Techniques de maquillage
          
            
          <span 
            data-tooltip-id="tooltip-maquillage_base" 
            data-tooltip-content=" Techniques de maquillage de base et avancé" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-maquillage_base" />
          
            </>
            
            )
            :
            formation === "former_maquillage_pro" ?
            
            (
            <>
            Maquillage professionnel
          
            
          <span 
            data-tooltip-id="tooltip-Maquillage_pro" 
            data-tooltip-content="Maquillage professionnel pour shootings et défilés" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-Maquillage_pro" />
          
            </>
            
            )
            
            :
            
            formation === "former_soin_peau" ?
            
            (
            
            <>
                Soin de la peau et du visage
          
                
          <span 
            data-tooltip-id="tooltip-peau_visage" 
            data-tooltip-content="Soin de la peau et entretien du visage" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-peau_visage" />
          
            </>
            
            )
            :
            formation === "choisir_bons_produits" ?
            
            (
            <>
            choisir produits cutanée
          
            
          <span 
            data-tooltip-id="tooltip-produits_peau" 
            data-tooltip-content="Choisir les bons produits selon le type de peau" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-produits_peau" />
          
            </>
            
            )
            :
            formation === "technique_coiffure" ?
            
            (
            
            <>
                coiffure simple et stylisme
          
                
          <span 
            data-tooltip-id="tooltip-coiffure_stylisme" 
            data-tooltip-content="Techniques de coiffure simple et stylisme" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-coiffure_stylisme" />
          
            </>
            
            )
            :
            formation === "meet_afrodite_maquillage" ?
            
            (
            <>
           contacter afrodite pour des conseils
            </>
            
            )
            :
            formation === "former_preparer_casting_audition" ?
            
            (
            <>
            casting et audition
          
          <span 
            data-tooltip-id="tooltip-audition" 
            data-tooltip-content="Préparer un casting et réussir une audition" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-audition" />
          
            </>
            
            )
            :
            formation === "former_faire_book" ?
            
            (
            <>
            créer un book professionnel
          
          <span 
            data-tooltip-id="tooltip-book" 
            data-tooltip-content="Comment créer un book professionnel" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-book" />
          
            </>
            
            )
            :
            formation === "former_selfconfiance" ?
            
            (
            <>
            confiance en soi et gestion du stress
          
          
          <span 
            data-tooltip-id="tooltip-confiance" 
            data-tooltip-content="Exercices de confiance en soi et gestion du stress" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-confiance" />
          
            </>
            
            )
            :
            formation === "former_travail_voix" ?
            
            (
            <>
            Travail de la voix et de la posture
          
          
          <span 
            data-tooltip-id="tooltip-voix" 
            data-tooltip-content="Travail de la voix et de la posture pour la présentation" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-voix" />
            </>
            
            )
            
            :
            formation === "former_simulation_casting" ?
            
            (
            <>
            Simulation de casting 
          <span 
            data-tooltip-id="tooltip-casting" 
            data-tooltip-content="Simulation de casting et mise en situation" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-casting" />
          
            </>
            
            )
            :
            formation === "meet_afrodite_former_selfconfiance" ?
            
            (
            <>
           contacter afrodite pour des conseils
            </>
            
            )
            :
            formation === "former_creer_image_pro" ?
            
            (
            <>
            Construire une image professionnelle
          
          
          <span 
            data-tooltip-id="tooltip-image_pro" 
            data-tooltip-content="Construire une image professionnelle" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-image_pro" />
          
            </>
            
            )
            :
            formation === "former_code_vestimentaire" ?
            
            (
            <>
            Les codes vestimentaires
          
          
          <span 
            data-tooltip-id="tooltip-dress" 
            data-tooltip-content="apprendre les codes vestimentaires et le dress code selon les événements" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-dress" />
          
            </>
            
            )
            :
            formation === "former_technique_networking_gestion_image_pro" ?
            
            (
            <>
          networking et gestion d'image publique
          <span 
            data-tooltip-id="tooltip-networking" 
            data-tooltip-content="Techniques de networking et gestion de son image publique" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-networking" />
          
            </>
            
            )
            :
            formation === "former_gestion_attitude_interaction_avec_client" ?
            
            (
            <>
            
          
            Gérer son attitude et ses interactions
          <span 
            data-tooltip-id="tooltip-attitude" 
            data-tooltip-content="avec les clients et médias" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-attitude" />
            </>
            
            )
            :
            formation === "meet_afrodite_etiquette_image" ?
            
            (
            <>
           contacter afrodite pour des conseils
            </>
            
            )
            
            :
            formation === "former_training_physique_mannequin" ?
            
            (
            <>
            
            Entraînement physique
          <span 
            data-tooltip-id="tooltip-physique" 
            data-tooltip-content="pour mannequin (tonification, souplesse)" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-physique" />
          
            </>
            
            )
            :
            formation === "former_bonne_nutrition_equilibre_alimentaire" ?
            
            (
            <>
             
          Nutrition et équilibre alimentaire
          <span 
            data-tooltip-id="tooltip-nutrition" 
            data-tooltip-content="pour rester en forme" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-nutrition" />
          
          </>
          
            
            )
            
            :
            formation === "former_ameliorer_posture_endurance" ?
            
            (
            <>
           
          améliorer la posture et l’endurance
          <span 
            data-tooltip-id="tooltip-posture" 
            data-tooltip-content=" Exercices pour améliorer la posture et l’endurance" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-posture" />
          
          
            </>
            
            )
            
            :
            formation === "former_yoga_relaxation" ?
            
            (
            
          <>
          Yoga et relaxation
          <span 
            data-tooltip-id="tooltip-yoga" 
            data-tooltip-content="pour gérer le stress" 
            onClick={(e) => e.stopPropagation()} 
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >📌</span>
          <Tooltip id="tooltip-yoga" />
          
          </>
          
            
            )
            
            :
            formation === "meet_afrodite_former_fitness" ?
            
            (
            <>
           contacter afrodite pour des conseils
          
            
            </>
            
            )
                                    :
            
                                    (
            
                                      <>
                                      null
                                      </>
                                    )
                                  
                                  }
                                        
                                        </>
                             
                                      </label>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
          
                               </div>
                        </div>
                      </form>
          </>
        );
      case "hotesse":
        return (
          <form>
           
           
            
           
          </form>
        );
      case "influenceur":
        return (
          <form>
            
          <div className="mb-4 input_group">

            
          <label
           className="input_label"
           >
               <span>
               {/* <label className="block mb-2 flex items-center"> */}
              <FontAwesomeIcon icon={faInstagram} className="text-pink-500 mr-3" />
              Instagram
            {/* </label> */}
             </span>
             <div className="float_data">

             <input
              type="url"
                className="input_value"
              placeholder="Lien Instagram"
              value={formData.influenceur.instagram.lien}
              onChange={(e) =>
                handleInputChange("influenceur", "instagram", {
                  ...formData.influenceur.instagram,
                  lien: e.target.value,
                })
              }
              // className="w-full border p-2 rounded"
            />

         </div>
          
             {/* <label className="float_msg"> (optionnel)</label> */}
         </label>
         <label
           className="input_label"
           >
               <span>
             nbr. abonnés
             </span>
             <div className="float_data">

             <input
              type="number"
              placeholder="Nombre d'abonnés Instagram"
              value={formData.influenceur.instagram.abonnés}
              onChange={(e) =>
                handleInputChange("influenceur", "instagram", {
                  ...formData.influenceur.instagram,
                  abonnés: e.target.value,
                })
              }
               className="input_value"
            />

            </div>
          
             {/* <label className="float_msg"> (optionnel)</label> */}
         </label>
           
          
           
          </div>
    
          <div className="mb-4 input_group">
          <label
           className="input_label"
           >
               <span>
               <FontAwesomeIcon icon={faFacebook} className="text-blue-500 mr-2" />
              Facebook
             </span>
             <div className="float_data">

             <input
                 className="input_value"
                 type="url"
                 placeholder="Lien Facebook"
                 value={formData.influenceur.facebook.lien}
                 onChange={(e) =>
                   handleInputChange("influenceur", "facebook", {
                     ...formData.influenceur.facebook,
                     lien: e.target.value,
                   })
                 }
            />

         </div>
          
             {/* <label className="float_msg"> (optionnel)</label> */}
         </label>
         <label
           className="input_label"
           >
               <span>
             nbr. abonnés
             </span>
             <div className="float_data">

             <input
             type="number"
             placeholder="Nombre d'abonnés Facebook"
             value={formData.influenceur.facebook.abonnés}
             onChange={(e) =>
               handleInputChange("influenceur", "facebook", {
                 ...formData.influenceur.facebook,
                 abonnés: e.target.value,
               })
             }
               className="input_value"
            />

            </div>
          
             {/* <label className="float_msg"> (optionnel)</label> */}
         </label>
           
          
           
          </div>
         
    
          <div className="mb-4 input_group">
          <label
           className="input_label"
           >
               <span>
               <FontAwesomeIcon icon={faYoutube} className="text-red-500 mr-2" />
              YouTube
             </span>
             <div className="float_data">

             <input
              
                className="input_value"
                type="url"
                placeholder="Lien YouTube"
                value={formData.influenceur.youtube.lien}
                onChange={(e) =>
                  handleInputChange("influenceur", "youtube", {
                    ...formData.influenceur.youtube,
                    lien: e.target.value,
                  })
                }
              // className="w-full border p-2 rounded"
            />

         </div>
          
             {/* <label className="float_msg"> (optionnel)</label> */}
         </label>
         <label
           className="input_label"
           >
               <span>
             nbr. abonnés
             </span>
             <div className="float_data">

             <input
               type="number"
               placeholder="Nombre d'abonnés YouTube"
               value={formData.influenceur.youtube.abonnés}
               onChange={(e) =>
                 handleInputChange("influenceur", "youtube", {
                   ...formData.influenceur.youtube,
                   abonnés: e.target.value,
                 })
               }
               className="input_value"
            />

            </div>
          
             {/* <label className="float_msg"> (optionnel)</label> */}
         </label>
           
          
           
          </div>
          
    
          <div className="mb-4 input_group">
          <label
           className="input_label"
           >
               <span>
               <FontAwesomeIcon icon={faTiktok} className="text-black mr-2" />
               TikTok
             </span>
             <div className="float_data">

             <input
             
                className="input_value"
                type="url"
                placeholder="Lien TikTok"
                value={formData.influenceur.tiktok.lien}
                onChange={(e) =>
                  handleInputChange("influenceur", "tiktok", {
                    ...formData.influenceur.tiktok,
                    lien: e.target.value,
                  })
                }
            />

         </div>
          
             {/* <label className="float_msg"> (optionnel)</label> */}
         </label>
         <label
           className="input_label"
           >
               <span>
             nbr. abonnés
             </span>
             <div className="float_data">

             <input
              type="number"
              placeholder="Nombre d'abonnés TikTok"
              value={formData.influenceur.tiktok.abonnés}
              onChange={(e) =>
                handleInputChange("influenceur", "tiktok", {
                  ...formData.influenceur.tiktok,
                  abonnés: e.target.value,
                })
              }
               className="input_value"
            />

            </div>
          
             {/* <label className="float_msg"> (optionnel)</label> */}
         </label>
           
          
           
          </div>
         
        </form>
        );
       
        case "se_former":
          return (
            <form>
              <div className="liste_data">
                {/* <span className="text-center w-100">Liste des formations d'Afrodites</span> */}
                <div className="list">
                  {/* Affichage des catégories */}
                  {Object.keys(categories).map((category, index) => (
                    <div key={index} className="category_block">
                      <label className="option_data">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                        />

                        {category === "form_mannequinnat" ?
                        
                        (
                         <>
                         Mannequinat 📸
                         </>
                        )

                        :

                        category === "form_hotesse" ?
                        (
                          <>Hôtesse & Événementiel 🎤</>
                         )
 
                         :

                         category === "form_influenceur" ?
                         (
                           <>Influenceur & Réseaux Sociaux 📱</>
                          )
  
                          :
                          category === "form_maquillage_esthetique" ?
                          (
                            <>Maquillage & Esthétique 💄</>
                           )
   
                           :
                           category === "form_casting_selfconfiance" ?
                           (
                             <>Casting & Prise de Confiance en Soi 🎬</>
                            )
    
                            :
                            category === "form_etiquette_image" ?
                            (
                              <>Étiquette & Image de Marque 👔</>
                             )
     
                             :
                             category === "form_fitness" ?
                             (
                               <>Fitness & Bien-être 🏋️‍♀️</>
                              )
      
                              :
                              category === "meet_afrodite_formation" ?
                              (
                                <>
                                 contacter afrodite pour des conseils
                                 </>
                               )
                             :
          

                        ( 

                          <>

                          </>
                        )
                        }

                      </label>
    
                      {/* Affichage des formations associées si la catégorie est cochée */}
                      {selectedCategories.includes(category) && (
                        <div className="sub_list">
                          {categories[category].map((formation, i) => (
                            <label key={i} className="option_data sub_option">
                              <input
                                type="checkbox"
                                checked={
                                  formData.formation.some(
                                    (item) => item.category === category && item.subCategories.includes(formation)
                                  )
                                }
                                onChange={() => handleCategoryChange_b(category, formation)}
                              />
                              <>
                              {formation === "former_marche" ?
                              
                              (
                               
                                <>Défilé sur podium 
                                <span 
                                  data-tooltip-id="tooltip-marche" 
                                  data-tooltip-content="Techniques de marche, posture" 
                                  onClick={(e) => e.stopPropagation()} 
                                  style={{ cursor: "pointer", marginLeft: "5px" }}
                                >📌</span>
                                <Tooltip id="tooltip-marche" />

                                </>
  
                              )
                            
                            :
                            formation === "former_pose" ?
                          
                          (
                          

<>
Poses photo
<span 
  data-tooltip-id="tooltip-pose" 
  data-tooltip-content="pose photo pour shootings professionnels" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-pose" />

</>
  
                          )
                          :
                          formation === "former_gestion_regard" ?
                        
                        (
                          <>
                        Expression faciale et du regard

<span 
  data-tooltip-id="tooltip-faciale" 
  data-tooltip-content="Gestion de l’expression faciale et du regard" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-faciale" />

                          </>
  
                        )
                        :
                        formation === "former_tenue_sur_scene" ?
                      
                      (
                        <>
                        Tenue et élégance 

<span 
  data-tooltip-id="tooltip-Tenue" 
  data-tooltip-content="Tenue et élégance sur scène et en studio" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-Tenue" />

                        </>
  
                      )
                      :
                      formation === "former_adaptation_mode_de_vie" ?
                    
                    (
                      <>
                      Adaptation aux styles de mode
                     
              
<span 
  data-tooltip-id="tooltip-Adaptation" 
  data-tooltip-content="Adaptation aux différents styles de mode (casual, haute couture, lingerie, sport, etc.)" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-Adaptation" />

                      </>
  
                    )
                    :
                    formation === "meet_afrodite_former_mannequinnat" ?
                  
                  (
                    <>
                    contacter afrodite pour des conseils
                    
                    </>
  
                  )
                  :
                  formation === "former_technique_accueil" ?
                
                (
                  <>
                  Accueil et communication
               
<span 
  data-tooltip-id="tooltip-communication" 
  data-tooltip-content="Techniques d’accueil et de communication" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-communication" />

                  </>
  
                )
                :
                formation === "former_posture_gesture_elegante" ?
              
              (
                <>
                Posture et gestuelle
             
<span 
  data-tooltip-id="tooltip-gestuelle" 
  data-tooltip-content="Posture et gestuelle élégante" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-gestuelle" />

                </>
  
              )
              :
              formation === "former_gestion_stress_evenementiel" ?
            
            (
              <>
              Gestion du stress
          
<span 
  data-tooltip-id="tooltip-stress_event" 
  data-tooltip-content="Gestion du stress en événementiel" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-stress_event" />

              </>
  
            )
            :
            formation === "former_presentation_prise_parole" ?
          
          (
            <>
            Présentation et prise de parole
            
<span 
  data-tooltip-id="tooltip-prise_parole" 
  data-tooltip-content="Présentation et prise de parole" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-prise_parole" />

            </>
  
          )
          :
          formation === "former_gestion_situation_difficile_client" ?
        
        (
          <>
          Gestion des situations difficiles
     
<span 
  data-tooltip-id="tooltip-situations_difficile" 
  data-tooltip-content="Gestion des situations difficiles avec les clients" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-situations_difficile" />
          </>
  
        )
        :
        formation === "meet_afrodite_hotesse_accueil" ?
      
      (
        <>
         contacter afrodite pour des conseils
        </>
  
      )
      :
      formation === "former_strategie_contenu_rxsx" ?
    
    (
      <>
     produire du contenu
      
<span 
  data-tooltip-id="tooltip-contenu_rxsx" 
  data-tooltip-content="Stratégie de contenu sur Instagram, TikTok, YouTube" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-contenu_rxsx" />

      </>
  
    )
    :
    formation === "former_faire_audience" ?
  
  (
    <>
    construire une audience 

    
<span 
  data-tooltip-id="tooltip-audience" 
  data-tooltip-content="Comment construire une audience et fidéliser les abonnés" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-audience" />

    </>
  
  )
  :
  formation === "former_monetisation_collaboration_avec_marque" ?
  
  (
  <>
  Monétisation et collaborations
  
<span 
  data-tooltip-id="tooltip-collaborations" 
  data-tooltip-content="Monétisation et collaborations avec les marques" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-collaborations" />

  </>
  
  )
  :
  formation === "former_montage_video" ?
  
  (
  <>
  infographie


<span 
  data-tooltip-id="tooltip-infographie" 
  data-tooltip-content="Montage vidéo et retouche photo pour un feed professionnel" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-infographie" />

  </>
  
  )
  :
  formation === "former_algorithe_rxsx" ?
  
  (
  <>
  Algorithmes des réseaux sociaux

  
<span 
  data-tooltip-id="tooltip-Algorithmes_rxsx" 
  data-tooltip-content="Algorithmes des réseaux sociaux et engagement" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-Algorithmes_rxsx" />

  </>
  
  )
  :
  formation === "meet_afrodite_influenceur" ?
  
  (
  <>
   contacter afrodite pour des conseils
  </>
  
  )
  :
  formation === "former_technique_maquillage_base" ?
  
  (
  <>
  Techniques de maquillage

  
<span 
  data-tooltip-id="tooltip-maquillage_base" 
  data-tooltip-content=" Techniques de maquillage de base et avancé" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-maquillage_base" />

  </>
  
  )
  :
  formation === "former_maquillage_pro" ?
  
  (
  <>
  Maquillage professionnel

  
<span 
  data-tooltip-id="tooltip-Maquillage_pro" 
  data-tooltip-content="Maquillage professionnel pour shootings et défilés" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-Maquillage_pro" />

  </>
  
  )
  
  :
  
  formation === "former_soin_peau" ?
  
  (
  
  <>
      Soin de la peau et du visage

      
<span 
  data-tooltip-id="tooltip-peau_visage" 
  data-tooltip-content="Soin de la peau et entretien du visage" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-peau_visage" />

  </>
  
  )
  :
  formation === "choisir_bons_produits" ?
  
  (
  <>
  choisir produits cutanée

  
<span 
  data-tooltip-id="tooltip-produits_peau" 
  data-tooltip-content="Choisir les bons produits selon le type de peau" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-produits_peau" />

  </>
  
  )
  :
  formation === "technique_coiffure" ?
  
  (
  
  <>
      coiffure simple et stylisme

      
<span 
  data-tooltip-id="tooltip-coiffure_stylisme" 
  data-tooltip-content="Techniques de coiffure simple et stylisme" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-coiffure_stylisme" />

  </>
  
  )
  :
  formation === "meet_afrodite_maquillage" ?
  
  (
  <>
   contacter afrodite pour des conseils
  </>
  
  )
  :
  formation === "former_preparer_casting_audition" ?
  
  (
  <>
  casting et audition

<span 
  data-tooltip-id="tooltip-audition" 
  data-tooltip-content="Préparer un casting et réussir une audition" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-audition" />

  </>
  
  )
  :
  formation === "former_faire_book" ?
  
  (
  <>
  créer un book professionnel

<span 
  data-tooltip-id="tooltip-book" 
  data-tooltip-content="Comment créer un book professionnel" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-book" />

  </>
  
  )
  :
  formation === "former_selfconfiance" ?
  
  (
  <>
  confiance en soi et gestion du stress


<span 
  data-tooltip-id="tooltip-confiance" 
  data-tooltip-content="Exercices de confiance en soi et gestion du stress" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-confiance" />

  </>
  
  )
  :
  formation === "former_travail_voix" ?
  
  (
  <>
  Travail de la voix et de la posture


<span 
  data-tooltip-id="tooltip-voix" 
  data-tooltip-content="Travail de la voix et de la posture pour la présentation" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-voix" />
  </>
  
  )
  
  :
  formation === "former_simulation_casting" ?
  
  (
  <>
  Simulation de casting 
<span 
  data-tooltip-id="tooltip-casting" 
  data-tooltip-content="Simulation de casting et mise en situation" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-casting" />

  </>
  
  )
  :
  formation === "meet_afrodite_former_selfconfiance" ?
  
  (
  <>
   contacter afrodite pour des conseils
  </>
  
  )
  :
  formation === "former_creer_image_pro" ?
  
  (
  <>
  Construire une image professionnelle


<span 
  data-tooltip-id="tooltip-image_pro" 
  data-tooltip-content="Construire une image professionnelle" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-image_pro" />

  </>
  
  )
  :
  formation === "former_code_vestimentaire" ?
  
  (
  <>
  Les codes vestimentaires


<span 
  data-tooltip-id="tooltip-dress" 
  data-tooltip-content="apprendre les codes vestimentaires et le dress code selon les événements" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-dress" />

  </>
  
  )
  :
  formation === "former_technique_networking_gestion_image_pro" ?
  
  (
  <>
networking et gestion d'image publique
<span 
  data-tooltip-id="tooltip-networking" 
  data-tooltip-content="Techniques de networking et gestion de son image publique" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-networking" />

  </>
  
  )
  :
  formation === "former_gestion_attitude_interaction_avec_client" ?
  
  (
  <>
  

  Gérer son attitude et ses interactions
<span 
  data-tooltip-id="tooltip-attitude" 
  data-tooltip-content="avec les clients et médias" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-attitude" />
  </>
  
  )
  :
  formation === "meet_afrodite_etiquette_image" ?
  
  (
  <>
   contacter afrodite pour des conseils
  </>
  
  )
  
  :
  formation === "former_training_physique_mannequin" ?
  
  (
  <>
  
  Entraînement physique
<span 
  data-tooltip-id="tooltip-physique" 
  data-tooltip-content="pour mannequin (tonification, souplesse)" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-physique" />

  </>
  
  )
  :
  formation === "former_bonne_nutrition_equilibre_alimentaire" ?
  
  (
  <>
   
Nutrition et équilibre alimentaire
<span 
  data-tooltip-id="tooltip-nutrition" 
  data-tooltip-content="pour rester en forme" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-nutrition" />

</>

  
  )
  
  :
  formation === "former_ameliorer_posture_endurance" ?
  
  (
  <>
 
améliorer la posture et l’endurance
<span 
  data-tooltip-id="tooltip-posture" 
  data-tooltip-content=" Exercices pour améliorer la posture et l’endurance" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-posture" />


  </>
  
  )
  
  :
  formation === "former_yoga_relaxation" ?
  
  (
  
<>
Yoga et relaxation
<span 
  data-tooltip-id="tooltip-yoga" 
  data-tooltip-content="pour gérer le stress" 
  onClick={(e) => e.stopPropagation()} 
  style={{ cursor: "pointer", marginLeft: "5px" }}
>📌</span>
<Tooltip id="tooltip-yoga" />

</>

  
  )
  
  :
  formation === "meet_afrodite_former_fitness" ?
  
  (
  <>
   contacter afrodite pour des conseils

  
  </>
  
  )
                          :
  
                          (
  
                            <>
                            null
                            </>
                          )
                        
                        }
                              
                              </>
                   
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </form>
          );
          case "rencontrer_afrodite":
            return (
              <>
                
                 
  
             </>
            );
           default:
        return null;
    }
  };
 
  return (

    <>
      <ToastContainer className="toast_style"/>
      
      {isWelcomeModalOpen && (
        <div className="modal-overlay welcome_msg" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }} onClick={closeWelcomeModal}>
          <motion.div
            className="modal-content_b"
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2>Bravo vous voulez devenir une Afrodite!</h2>
            <p>aidez nous à cerner vos attentes pour mieux vous servir!</p>
          </motion.div>
        </div>
      )}
     <div className=" form_bg bg-white">
            <button 
              onClick={handleBackClick} 
              // style={backButtonStyle}
              className='back_cmoponent'>
               <FaChevronLeft size={20} />
            </button>
      {/* <label className="bg_title ">
        Formulaire de candidature
      </label> */}
      <form autoComplete='off' className='candidature_form'>
   
        {/* <div className="bg_box"> */}
          
         
            {/* <div className="tab-content text-center"> */}
           

           <div className="input_group first_zone">
           <div className="lbl_title w-100">
        vous êtes:
        </div>
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
            <label class="date_label"> née le </label>

              <div className="date_container">
           
      <input
        type="text"
        name="day"
        value={date.day}
        onChange={handleChange_setdate}
        onKeyDown={handleBackspace_setdate}
        maxLength="2"
        placeholder="JJ"
        ref={dayRef}
      />
      
      <input
        type="text"
        name="month"
        value={date.month}
        onChange={handleChange_setdate}
        onKeyDown={handleBackspace_setdate}
        maxLength="2"
        placeholder="MM"
        ref={monthRef}
      />
      
      <input
        type="text"
        name="year"
        value={date.year}
        onChange={handleChange_setdate}
        onKeyDown={handleBackspace_setdate}
        maxLength="4"
        placeholder="AAAA"
        className="year_input"
        ref={yearRef}
      />
    </div>
            {/* <input
  className="input_value"
  type="date"
  // placeholder="Né(e) le jj/mm/aaaa"
  value={formData.postulant.date_naissance}
  // onFocus={(e) => (e.target.type = "date")}
  // onBlur={(e) => (e.target.type = "text")}
  onChange={(e) => handleInputChange("postulant", "date_naissance", e.target.value)}
/> */}

         
              
          
         </div>
             <div className="half_col">
             
            <input
            className="input_value"
          
             type="email"
             placeholder='votre adresse email'
             value={formData.postulant.email}
             onChange={(e) => handleInputChange("postulant", "email", e.target.value)}
           />
            
           </div>
         
           <div className="full_col">
             {/* Sélecteur d'indicatif */}
             <div className="number_zone ">
      {/* Sélecteur d'indicatif */}
      {/* <select
        className="p-0 border rounded-md custom_select_indicatif"
        value={selectedCode}
        onChange={handleCodeChange}
        // onChange={(e) => setSelectedCode(e.target.value)}
      >
        {countryCodes.map((country) => (
          <option key={country.code} value={country.code}>
            {country.code}
          </option>
        ))}
      </select> */}
      {/* <input
        type="tel"
        className="indicatif"
        placeholder="ind."
        value={phone_ind}
        onChange={setPhone_ind(e.target.value)}
        // onChange={(e) => setPhoneNumber(e.target.value)}
      /> */}
      {/* Champ numéro de téléphone */}
    <span className="prefix"> (00)</span>  <input
  type="tel"
  className="indicatif"
  placeholder="indicatif"
  value={phone_ind}
  onChange={(e) => setPhone_ind(e.target.value)}
/>
      <input
        type="tel"
        className="contact"
        placeholder="numéro de tél"
        value={phoneNumber}
        onChange={handlePhoneChange}
        // onChange={(e) => setPhoneNumber(e.target.value)}
      />
          </div>
      {/* <PhoneInput
        className="phone_input"
        id="phone1"
        autoComplete="off"
        // defaultCountry="tg"
        name="phone1"
        placeholder="Contact"
        // value={phone1}
        onChange={(value) => handlePhoneChange(value, "phone")}
      /> */}
      <div className="number_uses_zone">
          

           <div className="bottom_data mt-2">
           <div className="mt-2 icon_zone gap-1">
      <div className="rxsx_chk flex items-center cursor-pointer" >
          <input
            type="checkbox"
             className="mr-2"
            checked={whatsapp}
            onChange={() => handleCheckboxChange_phone("whatsapp")}
            disabled={telegram || extraChecked}
            // onChange={() => setWhatsapp(!whatsapp)}
          />
        <FaWhatsapp  className="icon_rxsx text-green-500 ml-2" />
      </div>

      <div className="rxsx_chk flex items-center cursor-pointer">
       <input
            type="checkbox"
             className="mr-2"
            checked={telegram}
            onChange={() => handleCheckboxChange_phone("telegram")}
            disabled={whatsapp || extraChecked}
            // onChange={() => setTelegram(!telegram)}
          />
            <FaTelegram  className="icon_rxsx text-blue-500 ml-2" />
      </div>

  {extraOption && (
      <div className="rxsx_chk flex items-center cursor-pointer">
       <input
            type="checkbox"
             className="mr-3"
             checked={extraChecked}
             onChange={() => handleCheckboxChange_phone(extraOption)}
             disabled={whatsapp || telegram}
            // onChange={handleCheckboxChange_extra}
          />
             {extraOption === "signal" ?

(
   <>
        <img src="/assets/img/msg/signal.jpeg" className="brand_icon" alt=""  />
   </>
)

:

(
  <>
          <img src="/assets/img/msg/viber.jpeg" className="brand_icon" alt=""  />
  </>
)
}
      </div>
    )}
     
     {!extraOption &&
      
      (

      
   
<div className="mx-3">
<select onChange={handleSelectChange} value={extraOption}>
  <option className="select_option" value="">autres</option>
  <option className="select_option" value="signal">Signal</option>
  <option className="select_option" value="viber">Viber</option>
</select>
</div>
      )} 
    </div>
   

    
           </div>
     
           <div className="top_data">
             <label> utilisé sur:</label>
           </div>

        

   
    
       
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
       </div>
            
          
             <div className="half_col">
             
             <div className="input-taille ">
              <label className="tm_lbl">taille</label>
              <div className="dim_zone">
               
              <input type="number" id="taille_m"
                  value={taille_m}
                  // onChange={(e) => settaille_m(e.target.value)}
                  onChange={(e) => handleTailleChange("m", e.target.value)}
                   name="taille_m" min="0" max = "2" placeholder=""
                    required/>
                <span> m </span>
              
              </div>
              <div className="dim_zone">
              <input type="number" id="taille_cm"
                  value={taille_cm}
                  onChange={(e) => handleTailleChange("cm", e.target.value)}
                  // onChange={(e) => settaille_cm(e.target.value)}
                   name="taille_cm" min="0" max="99" placeholder="" required/>
                <span> cm </span>


              </div>
              
            </div>
             </div>
            </div>
        
         
   
       

                      <div className="image_box">
              
                        {/* Zones de photos */}
                       
                        {(add_img === 1) &&
                          (
                            <>
                              <div
                                className="modal_overlay_img"
                                onClick={closeModal} // Ferme le modal si on clique à l'extérieur
                              >
                                <div
                            className="modal_content"
                            onClick={(e) => e.stopPropagation()} // Empêche la fermeture du modal si on clique à l'intérieur
                          >
                            <div className="option_image">
                              <div className="row">
                              <div className="col-lg-6 col-md-6 col-6 inline_box">
                                  <div className="trusted-badge rounded p-0">
                                  <label onClick={() => setCameraActive(true)}>
                                    {/* <label
                                      onClick={(e) => {
                                        setShowCamera(true);
                                        e.stopPropagation(); // Évite la propagation non désirée
                                      }}
            
                                    
                                    data-box="camera_box"
                                      // onClick={Show_camerabox} data-box="camera_box"
                                      > */}
                                      <div className="trusted-icon">
                                        <FontAwesomeIcon size="sm" icon={faCamera} className="icon-trusted" />
                                      </div>
                                      <div className="trusted-content">
                                        <h2 className="heading_18 trusted-heading">Caméra</h2>
                                      </div>
                                    </label>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-6 inline_box">
                                  <div className="trusted-badge rounded p-0">
            
                                    
                                            <label >
                                                <input
                                                  type="file"
                                                  accept="image/*"
                                                  style={{ display: "none" }}
                                                  onChange={handleFileInput}
                                                />
                                      <div className="trusted-icon">
                                        <FontAwesomeIcon size="sm" icon={faImage} className="icon-trusted" />
                                      </div>
                                      <div className="trusted-content">
                                        <h2 className="heading_18 trusted-heading">Galerie</h2>
                                      </div>
                                        </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                            </div>
                            </>
                          ) }
            
                          <div>
                                                        {cameraActive && !capturedImage && (
                                                          <div className="camera_view">
                                                            <div className="return_btn">
                                                              <label htmlFor="" onClick={stopCamera}>
                                                                <svg
                                                                  className="icon icon-menu-back"
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width="40"
                                                                  height="40"
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth="2"
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                >
                                                                  <polyline points="15 18 9 12 15 6"></polyline>
                                                                </svg>
                                                              </label>
                                                            </div>
                                                            <video ref={videoRef} autoPlay playsInline></video>
                                                            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            
                                                            <div className="button_list text-center">
                                                              <label className="mode_btn" onClick={switchCamera}>
                                                                <FontAwesomeIcon size="sm" icon={faRepeat} className="icon-trusted" />
                                                              </label>
                                                              <label className="shots_btn"
                                                                
                                                                 onClick={captureImage}
                                                                 >
                                                                <FontAwesomeIcon size="sm" icon={faCamera} className="icon-trusted" />
                                                              </label>
                                                            </div>
                                                          </div>
                                                        )}
            
                                                        {capturedImage && (
                                                          <div className="image_preview">
                                                            <img src={capturedImage} alt="Preview" style={{ width: "100%" }} />
                                                            <div className="button_list text-center">
                                                              <button className="cancel_btn" onClick={resetCapture}>
                                                                Annuler
                                                              </button>
                                                              <button className="confirm_btn" onClick={proceed}>
                                                                Suivant
                                                              </button>
                                                            </div>
                                                          </div>
                                                        )}
            
                                                        {/* {!cameraActive && !capturedImage && (
                                                          <button onClick={startCamera}>Activer la Caméra</button>
                                                        )} */}
                                                      </div>   
                       <label
                         className="input_label"
                         >
                          {/* <div className="text-center w-100"> */}
                            <label className="min_title">
                              ajouter vos photos
                               <span>
                               (* récentes)
                                </span>

                            </label>
                          {/* </div> */}
                             <div className="zone_img_new">
                                
                                {/* <div className="row"> */}
                                {/* <div className="text-center w-100"> */}
                                  
                                                  {zones.map((zone) => (
                                                    <>
                                                    <div key={zone}
                                                      onMouseDown={() => handleLongPressStart(zone)} // Desktop
                                                      onMouseUp={handleLongPressEnd} // Desktop
                                                      onTouchStart={() => handleLongPressStart(zone)} // Mobile
                                                      onTouchEnd={handleLongPressEnd} // Mobile
                                                  
                                                  className="div_img col-4 col-lg-3 col-md-3 col-sm-4 img_item">
            
                                                          {imagesModels[zone] ? (
                                                                    <>
                                                             
                                                              <label className='img_container'>
                                                              <img
                                                                 onClick={(e) => {
                                                                  Addimgs(zone);
                                                                // e.preventDefault();
                                                                // setCurrentZone(zone); // Ouvre uniquement la modale
                                                                // e.stopPropagation(); // Évite la propagation non désirée
                                                              }}
                                                              src={typeof imagesModels[zone] === "string" ? imagesModels[zone] : URL.createObjectURL(imagesModels[zone])}
                                                                // src={imagesModels[zone]}
                                                                alt={zone}
                                                                // style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                              />
                                                             </label>
                                                                  </>
            
                                                            ) : (
                                                                <>
                                                                                <label
                                                                                    onClick={(e) => {
                                                                                      Addimgs(zone); // Ouvre uniquement la modale
                                                                                      e.stopPropagation(); // Évite la propagation non désirée
                                                                                    }}
                                                                                    //  onClick={Addimgs} 
                                                                                    className='input_label'>
                                                                                      {/* <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/> */}
            
                                                                                      {zone === "face" ?
                                                                                      (
                                                                                        <span className="person_icon"> 
                                                                                             <img src= {face_image} alt={zone} />
                                                                                      </span>
            
                                                                                      )
                                                                                      :
                                                                                      zone === "profile" ?
                                                                                      (
                                                                                        <span className="person_icon"> 
                                                                                          <img src= {profil_image} alt={zone} />
                                                                                        </span>
                                                                                        
                                                                                      )
                                                                                      :
                                                                                      zone === "entier" &&
                                                                                      (
                                                                                        <span className="person_icon">  
                                                                                           <img src= {plain_pied_image} alt={zone} className="illustrate" />
                                                                                       
                                                                                          </span>
                                                                                       
                                                                                      )
                                                                                     
                                                                                      
                                                                                      
                                                                                      }
                                                                                    
                                                                                  </label> 
                                                                                  
                                                                                  {/* <label className='libel'>
                                                                                    {zone}
                                                                                  </label> */}
                                                                </>
                                                          )
                                                          
                                                          
                                                          }
            
                                                              
                                  
                                                    </div>
                                                    
                                                    </>
                                                  
                                                  ))}
                                                
                                   
                                 {/* </div> */}
                               
             
                   {/* preview */}
                   {!images_gallery_boxshow  
                     ?
            
                     (
                       null
                     )
            
                     : 
            
                     (
                       <>
                        <div className="image_preview">
                         
                       {upload_img.length === 0 &&
            
                         (
                           <>
                              <div id="gal_mask" className="mask_gal">  
                                       <div className="container_cst">
                                                 
                                                  
                                                   
                                                     {imagesModels[currentZone] ? (
                                                       <div  className='full_img_box'>
                                                     <div className="img-body expand_img ">
                                                    <img
                                                    onClick={(e) => {
                                                      slidetozone(currentZone); // Ouvre uniquement la modale
                                                      e.stopPropagation(); // Évite la propagation non désirée
                                                    }}
                                                      src={imagesModels[currentZone]}
                                                      alt={currentZone}
                                                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                    />
                                                      </div>
                                                     
                                                     </div>
                                                        ) 
            
                                                        :
            
                                                        (
                                                          <div  className='full_img_box'>
                                                          <div className="img-body expand_img ">
                                                        
                                                           </div>
                                                          
                                                          </div>
                                                        )
            
                                                     }
                                                       
                                                   
                                                   
                                           <div className="thumb-wrapper">
                                                  {zones.map((zone) => (
                                                    <>
                                                    <div key={zone}
                                                      onMouseDown={() => handleLongPressStart(zone)} // Desktop
                                                      onMouseUp={handleLongPressEnd} // Desktop
                                                      onTouchStart={() => handleLongPressStart(zone)} // Mobile
                                                      onTouchEnd={handleLongPressEnd} // Mobile
                                                  
                                                  className="div_img col-4 col-lg-3 col-md-3 col-sm-4 img_item">
            
                                                          {imagesModels[zone] ? (
                                                          <>
                                                          
                                                        
                                                              <img
                                                              onClick={(e) => {
                                                                e.preventDefault();
                                                                setCurrentZone(zone); // Ouvre uniquement la modale
                                                                e.stopPropagation(); // Évite la propagation non désirée
                                                              }}
                                                              src={typeof imagesModels[zone] === "string" ? imagesModels[zone] : URL.createObjectURL(imagesModels[zone])}
                                                                // src={imagesModels[zone]}
                                                                alt={zone}
                                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                              />
                                                              <label className='libel'>
                                                                                    {zone}
                                                                                  </label>
                                                                                  </>
            
                                                            ) : (
                                                                <>
                                                                                <label
                                                                                    onClick={(e) => {
                                                                                      Addimgs(zone); // Ouvre uniquement la modale
                                                                                      e.stopPropagation(); // Évite la propagation non désirée
                                                                                    }}
                                                                                    //  onClick={Addimgs} 
                                                                                    className='input_label'>
                                                                                      <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>
                                                                                    
                                                                                  </label> 
                                                                                  <label className='libel'>
                                                                                    {zone}
                                                                                  </label>
                                                                </>
                                                          )
                                                          
                                                          
                                                          }
            
                                                              {/* Dropdown */}
                                                                {dropdownZone === zone && (
                                                                  <div className="dropdown">
                                                                    <button
                                                                      className="dropdown-item"
                                                                        onClick={(e) => {
                                                                e.preventDefault();
                                                              handleDropdownAction("edit", zone)// Ouvre uniquement la modale
                                                                e.stopPropagation(); // Évite la propagation non désirée
                                                              }}
                                                                      // onClick={() => handleDropdownAction("edit", zone)}
                                                                    >
                                                                      <FontAwesomeIcon icon={faEdit} /> mod.
                                                                    </button>
                                                                    <button
                                                                      className="dropdown-item"
                                                                          onClick={(e) => {
                                                                e.preventDefault();
                                                              handleDropdownAction("delete", zone)// Ouvre uniquement la modale
                                                                e.stopPropagation(); // Évite la propagation non désirée
                                                              }}
                                                                      // onClick={() => handleDropdownAction("delete", zone)}
                                                                    >
                                                                      <FontAwesomeIcon icon={faTrash} /> sup.
                                                                    </button>
                                                                  </div>
                                                                )}
            
                                    
            
                                  
                                                    </div>
                                                    
                                                    </>
                                                  
                                                  ))}
                                                      
                                                                        
                                                         
                                                {/* Affichage de la vidéo de la caméra */}
                         
                                                    
                                           </div>
                                       </div>
                                         
                                       <div className="fixedbtn_box">
                                       <div className="col-6 col-sm-6 col-md-6">
                                            {/* <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/> */}
                                                   {/* <a href="#"> */}
                                                  <label   onClick={(e) => {
                                                              e.preventDefault();
                                                              cancel_action(); // Ouvre uniquement la modale
                                                              e.stopPropagation(); // Évite la propagation non désirée
                                                            }}
                                                             className="link_cst cancel_btn">
                                                       annuler
                                                   </label>
                                                     {/* </a>      */}
                                                                                           
                                       
                                       </div>
                                       <div className="col-6 col-sm-6 col-md-6">
                                        
                                               {/* <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/> */}
                                                   {/* <a href="#"> */}
                                                   <label   onClick={(e) => {
                                                              e.preventDefault();
                                                              next_option(); // Ouvre uniquement la modale
                                                              e.stopPropagation(); // Évite la propagation non désirée
                                                            }}
                                                             className="link_cst confirm_btn">
                                                       suivant
                                                   </label>
                                                     {/* </a>      */}
                                                                                           
                                        
                                       </div>
                                   
                                   </div>                     
                                           
                                   </div>
            
                           </>
            
                         )
            
                         
                       }
            
            
            
                         </div>
                       </>
            
                     )
                   }
            
                                {/* </div> */}
                              </div>
                              </label>
                        {/* fin photo */}
                     
                          
                      </div>
            
 {/* <div className="category_old"> */}
 <div className="line_data">
             <label  className="input_label check_zone">
               <span className="special_lbl">
               Avez-vous déjà été mannequin ?
             </span>
             <div className="float_data">
             <label className="option_data">
            <input
              type="checkbox"
              checked={formData.mannequin.old_mannequin === "Oui"}
              onChange={() => handleCheckboxChange_b("mannequin", "old_mannequin", "Oui")}
            />
            Oui
          </label>
          <label className="option_data">
            <input
              type="checkbox"
              checked={formData.mannequin.old_mannequin === "Non"}
              onChange={() => handleCheckboxChange_b("mannequin", "old_mannequin", "Non")}
            />
            Non
          </label>

             </div>
          
           </label>

            </div>
            <div className="line_data">
            <label
           className="input_label check_zone"
           >
               <span className="special_lbl">
               Avez-vous déjà été hôtesse d&apos;accueil?
             </span>
             <div className="float_data">
             <label className="option_data">
            <input
              type="checkbox"
              checked={formData.hotesse.oldhotesse === "Oui"}
              onChange={() => handleCheckboxChange_b("hotesse", "oldhotesse", "Oui")}
            />
            Oui
          </label>
          <label className="option_data">
            <input
              type="checkbox"
              checked={formData.hotesse.oldhotesse === "Non"}
              onChange={() => handleCheckboxChange_b("hotesse", "oldhotesse", "Non")}
            />
            Non
          </label>

             </div>
          
           </label>

            </div>

            <div className="line_data">
            <label
           className="input_label check_zone"
           >
               <span className="special_lbl">
               Avez-vous déjà été vlogueuse?
             </span>
             <div className="float_data">
             <label className="option_data">
            <input
              type="checkbox"
              checked={formData.influenceur.oldinfluenceur === "Oui"}
              onChange={() => handleCheckboxChange_b("influenceur", "oldinfluenceur", "Oui")}
            />
            Oui
          </label>
          <label className="option_data">
            <input
              type="checkbox"
              checked={formData.influenceur.oldinfluenceur === "Non"}
              onChange={() => handleCheckboxChange_b("influenceur", "oldinfluenceur", "Non")}
            />
            Non
          </label>

             </div>
          
           </label>
            </div>
 {/* </div> */}        

         
          </div>
            
            {/* </div> */}
         
        {/* </div> */}

      {/* Render each type with its checkbox and form */}
      <div className="mb-6 input_group snd_zone">
      
      <div className="lbl_title w-100 my-2">
        vous voulez <span className="mini_txt">(vous pouvez cocher plusieurs options)</span>
        </div>
      {["mannequin", "hotesse",
       "influenceur",
        "se_former"
       , "rencontrer_afrodite"
      ].map((type) => (
        <div key={type} className="model_categorie border rounded">
          <label className="accordion_title flex items-center space-x-2">
            <input
              type="checkbox"
              name={type}
              checked={selectedTypes[type]}
              onChange={() => handleCheckboxChange(type)}
              className="cursor-pointer"
            />
            <span className="title capitalize text-lg font-semibold">
              {type === "mannequin" ?
              (
                <>
                devenir mannequin
                </>
              )
              :

              type === "hotesse" ?

              (
                <>
                devenir hôtesse d&apos;accueil
                </>
              )
              :

              type === "influenceur" ?

              (
                <>
                devenir vlogueuse (influenceuse vidéo)
                </>
              )
              :

              type === "se_former" ?

              (
                <>
               juste avoir une formation en
                </>
              )
              :

              type === "rencontrer_afrodite" ?

              (
                <>
                 contacter afrodite pour des conseils
                </>
              )
              :

              (
                <>
                null
                </>
              )
              
            }
            </span>
          </label>
          {selectedTypes[type] && (
            <div className="tab-content">
             
              {renderForm(type)}
            </div>
          )}
        </div>
      ))}
     </div>

           
 
      {/* Submit Button */}
      <div className="my-3 pb-4 text-center">
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
        valider
        </button>
      </div>

      </form>
    </div>

    {isModalOpen && (
          <div className="modal-overlay" style={{backgroundColor : "rgba(12,12,12,.9)"}} onClick={closeModal_notif}>
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
                {contacter_afrodites === 1  ?
                (
                  <>
                  contacter afrodite en direct ou whatsapp sur le +228 91028184
                  </>
                )
                :

                (
                  <>
  Elle vous contactera via vos numéros!
                  </>
                )
                }
              
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

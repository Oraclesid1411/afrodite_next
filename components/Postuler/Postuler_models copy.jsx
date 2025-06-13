import React from 'react'
// import React from 'react'
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect ,useRef  } from "react"; 
import Header_banner from '../Components/Header_banner';   
import { FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa';

import Locations from '../Components/Locations.jsx';
import { useAuth } from "../Context/AuthenticateContext.jsx";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faCamera,faCheckDouble, faImage,faRepeat, faPlus, faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
function Postuler_models() {


  const auth = useAuth(); 
  const user_info = auth.currentUser 

  const navigate = useNavigate()
   const apiUrl = 'https://apiafro.aafrodites.com'
 
  const location = useLocation(); 
  const link_url = location?.pathname.split('/');
 

  const [isroleChecked, setIsRoleChecked] = useState(false);
  const [ishostChecked, setIsHostChecked] = useState(false);
  const [isfashionChecked, setIsFashionChecked] = useState(false);
  const [newuser, setNewUser] = useState(0);
 
  const [newuserdata, setNewUserData] = useState(0); 
  const [isnotification, setIsNotification] = useState(false);
 
  useEffect(() => { 

    if(link_url[2] === "1"){
  
     
     setIsFashionChecked(true)
    } 
    else if(link_url[2] === "2"){
  
     
     setIsHostChecked(true)
    }
    else if(link_url[2] === "3"){
  
     setIsRoleChecked(true)
    }
 
   } , [link_url]);
 
   
  const userid = user_info?.id;
  
  useEffect(() => { 
 
 
        const params = {
                                    
          userid : userid ,
          categ: parseInt(link_url[2])
        }

const fetchData = async () => {

try {
  //  info vendeur 
  const data_b = await axios.post(`${apiUrl}/postulant/info` , params);
     
  console.log("data_b.data")
  console.log(data_b.data)
  if(!isnotification){
    if(data_b.data.length > 0){
   
      // navigate
      navigate("/etatcandidature")
  
    }
  }

  
   


} catch (err) {
// console.log(err);
// console.log('erreur here')
}
};
fetchData(userid);

} , [userid ,link_url,navigate]);
 
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  
  const [taille_m, settaille_m] = useState("1");
  const [taille_cm, settaille_cm] = useState("00");
 
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
    console.log('Valeurs sélectionnées:', data);
  };


  
  const [formData, setFormData] = useState({
    postulant: {
      nom: "",
      prenom: "",
      pseudo: "",
      date_naissance: "",
        taille: "",
      poids: "",
      indication: "",
     
    }
    ,
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

  const handleCheckboxToggle = (type) => {
    if (type === "fashion") {
      setIsFashionChecked(!isfashionChecked);
    } 
    else if (type === "role") {
      setIsRoleChecked(!isroleChecked);
    }
    else if (type === "host") {
      setIsHostChecked(!ishostChecked);
    }
  }; 
  const handleInputChange = (type, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const imgs_save = await next_option(); // Attend que la fonction résolve la promesse
   
  const this_taille = taille_m + ","+  taille_cm
    if(formData?.postulant?.pseudo){
      setFormData((prevState) => ({
        ...prevState, // Copie l'état actuel
        postulant: {
          ...prevState.postulant, // Copie les propriétés existantes de postulant
          pseudo :  "afrodites" ,
         
        },
      }));

    }
  console.log(this_taille)
  // return false;

    const telnum1 = document.querySelector(".react-international-phone-input[name='phone1']" ).value;
    const number1 = telnum1.split(" ");
    const telnum2 = document.querySelector(".react-international-phone-input[name='phone2']" ).value;
    const number2 = telnum2.split(" ");
 

    setFormData((prevState) => ({
      ...prevState, // Copie l'état actuel
      postulant: {
        ...prevState.postulant, // Copie les propriétés existantes de postulant
        taille :  this_taille  ,
        pays :  locationData.pays 
        ? (isNaN(parseInt(locationData.pays)) ? null : parseInt(locationData.pays)) 
        : null,
       ville : locationData.ville 
       ? (isNaN(parseInt(locationData.ville)) ? null : parseInt(locationData.ville)) 
       : null,
       quartier: locationData.quartier 
       ? (isNaN(parseInt(locationData.quartier)) ? null : parseInt(locationData.quartier)) 
       : null,
       code_1 : number1[0],
       tel1 : number1[1],
       code_2 : number2[0],
       tel2 : number2[1], // Ajoute ou met à jour la propriété contact
      },
    }));
    
  

    // creer un final data form
    var data_role = [] , data_fashion = [] , data_host = [];
    const data_postulant = {
      data : formData?.postulant
    }

    if(isroleChecked){
      // console.log("role model")
       data_role = {
        fonction: "on",
        data : formData?.role
      }
    }

    if(isfashionChecked){
      
       data_fashion = {
        fonction: "on",
        data : formData?.fashion,
        experimented : experiencedstate,
      }
    }
    if(ishostChecked){
     
       data_host = {
        fonction: "on",
        data : formData?.host
      }
    }

    const userid = user_info?.id;
 
    const param = {imgs_save ,data_postulant, data_role ,data_fashion , data_host , userid }
 
    // console.log("param")
    // console.log(param)
    // console.log(imagespath)
    // return false;
        toast.info('sauvegarde en cours' , {
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

        try {
          await axios
            .post(`${apiUrl}/postulant/inscriptionmodel`,
              param
              )
            .then((result) => {
        
            console.log("result.data")
              console.log(result)
              console.log(result.data?.user)

           

            
                if(result){
                  setTimeout(() => {
                  
                    toast.success('candidature soumis avec succès' , {
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
                    

                    // affciher une notif
                    setIsNotification(true)
                    if(result.data?.user != null && result.data?.token != null){
                      // Sauvegarder les données du user dans le localStorage
                      const   user   = result.data?.user; // Assurez-vous que `response.data.user` contient l'ID, le pseudo et le password
                      const  token = result.data?.token; // Assurez-vous que `response.data.user` contient l'ID, le pseudo et le password
                     
                      console.log("result.data")
                      console.log(token)
                      console.log(user)
                      setNewUserData([user , result.data?.pass])
                       auth.saveToLocalStorage(user ,token);
                    setNewUser(1)
                      // console.log(auth)
                      // localStorage.setItem("site", token);
                      // localStorage.setItem("user", JSON.stringify(user));
                  }
                    

                  // arreter le loader

                  // afficher le recap
                }, 3500); // Délai de 3 secondes

                
      
                }
              }); 
              
        } catch (err) {
          console.log("erreur");
          // setError(err.response.data);
        }
  };
 
 // État pour gérer la sélection
 const [experiencedstate, setExperiencedstate] = useState(null);

 const handleExperinceChange = (value) => {
  setExperiencedstate(value === experiencedstate ? null : value); // Déselection si déjà coché
 
  if(value === "oui"){
    // setFormData(fashion)
    handleInputChange("fashion", "experimented", 1)
  }
  else{
    handleInputChange("fashion", "experimented", 0)
  }
 };
 
 
// sur les images
const [add_img, setAddimg] = useState(0); 


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
  
// console.log(listImages)
  const Show_gallerybox = (e) => {
    
    e.preventDefault(); // Empêche le comportement par défaut
    // console.log("gallery")
      if(images_gallery_boxshow === true){
      
          setimages_gallery_boxshow(false)
          // open gallery
        
      }
      else{
          setimages_gallery_boxshow(true)
          // var select_img = document.querySelector('#select_img');
          // // console.log(select_img)
          // select_img.click();

      }
    
    };

    const [cameraActive, setCameraActive] = useState(false);
    const [isFrontCamera, setIsFrontCamera] = useState(true); // Exemple avec un hook d'état

    const [capturedImage, setCapturedImage] = useState(null);
      const [mediaStream, setMediaStream] = useState(null);
     
      console.log(isFrontCamera)
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

console.log(images)

const formData_b = new FormData();
images?.path.forEach((base64Image, index) => {
  const file = base64ToFile(base64Image, `image-${index + 1}.jpeg`);
  console.log("file" + index)
  console.log(file)
  
  // formData_b.append('files', file);
  formData_b.append('images', file);

}); 

// images?.path.forEach((file) => formData_b.append('images', file));

        console.log(formData_b)
        try {
          const response = await axios.post(`${apiUrl}/upload/saveImage`, formData_b, {
            headers: {
              'Content-Type': 'multipart/form-data', // Important
            },
            withCredentials: true, // Si nécessaire
          });
          console.log(response.data);
          setImagespath(response.data?.files)
          return response.data?.files;
        } catch (error) {
          console.error("Erreur lors de l'upload :", error.response?.data || error.message);
        }
 
    // try {
    //   axios.defaults.withCredentials = true;
    //   const response = await axios.post(`${apiUrl}/upload/saveImage`, formData_b, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    //   // const response = await axios.post(
        
    //   //   `${apiUrl}/upload/saveImage`, images, // Envoyer l'array des images
    //   //     {
    //   //         headers: { "Content-Type": "application/json" },
    //   //     }
    //   // );

    //         console.log(response.data);
    //     } catch (error) {
    //         console.error("Erreur lors de l'upload :", error);
    //     } 
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


  // Fonction pour uploader la vidéo vers le backend
  const next_optionVideo = async () => {
    const formData = new FormData();
    formData.append('video', upload_video);

    try {
      const response = await axios.post(`${apiUrl}/upload/saveFile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Vidéo uploadée :', response.data);
    } catch (error) {
      console.error("Erreur lors de l'upload de la vidéo :", error);
    }
  };
  return (
    <>
          
    <div className="container form_bg pt-3">
      <button 
        onClick={handleBackClick} 
        // style={backButtonStyle}
        className='back_cmoponent'>
         <FaChevronLeft size={10} />
      </button>
    <ToastContainer className="toast_style"/>
    {isnotification &&
    [
      <>
      <div className="notification_box">
      {/* Accordion for Model */}
        <div className="resume_box">
        <div style={{ marginBottom: "20px" }}>
                 
      
          <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
         
        
          {newuser === 1 && [
                <>
                  <div className="text-center"> 
                <span className='title_label'>
                     Félicitation! votre compte afrodites fut activé
                     vos identifiant de connexion prochaines sont:
                    
                 </span>
                 <p>pseudo : {newuserdata[0]?.pseudo}</p>
                 <p>mot de passe : {newuserdata[1]}</p>
                 </div> 
                </>
              ]}
           
            <div className="text-center">
             
            <span className='title_label'>
                     info du postulant
                    </span>
            </div>
                 <div className="detail_model">
                        <label
                          className="input_label"
                          >
                              <span>
                              Nom 
                              </span>
                              <span  className="">
                              {formData.postulant.nom} 
                              </span>
                          
                          
                          </label>
                          <label
                          className="input_label"
                          >
                              <span>
                              prénom 
                              </span>
                              <span>
                              {formData.postulant.prenom} 
                              </span>
                          
                              </label>
                          
                          <label
                            className="input_label"
                            >
                                <span>
                                date de naissance 
                              
                              </span>
                              <span>
                              {formData.postulant.date_naissance}
                              
                              </span>
                            
                              
                          </label>
                          
                        
                          <label
                            className="input_label"
                            >
                                <span>
                                taille  
                              </span>
                              <span>
                              {(() => {
                                    const taille = formData.postulant.taille.replace(",", "."); // Remplacer la virgule par un point (si nécessaire)
                                    const [meters, centimeters] = taille.split(".");
                                    return `${meters} m ${centimeters || "00"} cm`; // Gestion du cas où il n'y a pas de centimètres
                                  })()}
                              </span>
                        
                          </label>
                         
                        
                          <label
                            className="input_label"
                            >
                                <span>
                             Tél
                              </span>
                              <span>
                              {phone1}
                              </span>
                            
                          </label>
                          <label
                            className="input_label"
                            >
                                <span>
                                whatsapp
                              </span>
                              <span>
                              {phone2}
                              </span>
                            
                          </label>
                             

                  </div>
                  {isfashionChecked && (
                     <>
                       <div className="text-center w-100">
                   <span className='title_label'>
                     info fashion modele
                    </span>
                   </div>
                     <div className="container zone_img notif">
                   
                 
                    <div className="w-100">
                    <div className="text-center">
                    
                      {images.path ?
                      (
                        <>
                                  {zones.map((zone) => (
                                      <>
                                       <div key={zone}
                                         
                                        
                                        // onClick={Show_gallerybox}
                                     className="div_img col-4 col-lg-3 col-md-3 col-sm-4 img_item">

                                            {imagesModels[zone] && (
                                              <>
                                              
                                              <img
                                            
                                               src={typeof imagesModels[zone] === "string" ? imagesModels[zone] : URL.createObjectURL(imagesModels[zone])}
                                                 // src={imagesModels[zone]}
                                                 alt={zone}
                                                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                               />
                                               <label className='libel'
                                               
                                                >
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
                        </>

                      )

                      :
                      
                      (
                        <>
                          <label  className='input_label_add'>
                    <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>
                    <label> aucune photo n&apos;a été ajoutée</label>
                      {/* ajouter ensuite des div pour afficher les preview en miniature */}
                                                     
                    </label>  
                        </>
                      )

                      }
                  
                     </div>
             
                    </div>
                  </div>
                  
                     </>
                   )}
                    {isroleChecked && (
                     <>
                       <div className="text-center w-100">
                   <span className='title_label'>
                     info role modele
                    </span>
                   </div>
                   
                  <div className="detail_model">
                     
                              <label
                                className="input_label"
                                >
                              
                                <label className='mr-3 labelzone'>
                            réseau sociaux
                              </label>
                              <label className='value'>
                         
                                  {formData.role.socialMedia}
                              </label>
                            
                            
                          </label>

                          <label
                                className="input_label"
                                >
                              
                                <label className='mr-3 labelzone'>
                           nombre d'abonnés
                              </label>
                              <label className='value'>
                         
                                  {formData.role.followers}
                              </label>
                            
                            
                          </label>

                  </div>
                     </>
                   )}
                    {ishostChecked && (
                     <>
                       <div className="text-center w-100">
                   <span className='title_label'>
                     info host modele
                    </span>
                   </div>
                   
                  <div className="detail_model">
                     
                              <label
                                className="input_label"
                                >
                              
                                <label className='mr-3 labelzone'>
                              durée d'expérience
                              </label>
                              <label className='value'>
                              {`${formData.host.temps_experience} mois`}
                               </label>
                            
                            
                          </label>

                  </div>
                     </>
                   )}
                  <div className="action_btn">
                  
                      <label className="abort_btn">
                        Abandonner

                        </label>
                        <label className="update_btn">
                          modifier

                        </label>
                        <label className="view_btn">
                          <Link className='link' to="/etatcandidature">
                          ma candidature 
                          </Link>
                        
                          </label>
                          <label className="view_btn">
                          <Link className='link' to="/">
                         accueil
                          </Link>
                        
                          </label>
                  </div>
                 
          
          </div>
       
      </div>

        </div>

     

      </div>
      </>
    ]}
    <form autoComplete='off' onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
       {/* Accordion for Model */}
       

      <div style={{ marginBottom: "20px" }}>
     
     
       <div className="text-center w-100">
        <label>
          
          <span className='title_label'>
        devenir un model afrodites
          </span>
        </label>
        </div>
     <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
         
    
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
              <label className="obligat"> *</label>

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
                <label className="obligat"> *</label>

            </div>
            
             
            </label>
            <label
             className="input_label"
             >
                <span>
                pseudo 
                </span>
                <div className="float_data">
                <input
              className="input_value"
                type="text"
                value={formData.postulant.pseudo}
                onChange={(e) => handleInputChange("postulant", "pseudo", e.target.value)}
              />
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

            <input
               className="input_value"
             
                type="date"
                value={formData.postulant.date_naissance}
                onChange={(e) => handleInputChange("postulant", "date_naissance", e.target.value)}
              />
                <label className="obligat"> *</label>

            </div>
             
            </label>
           
           
        
            <Locations 
                  inputdata ={{ 
                                 pays_name : 'pays',
                                 ville_name: 'ville',
                                //  quartier_name: 'quartier'
                  }} 
                    onChange={handleLocationChange}
                                                                                    
                                                                              
             />
                                                                                    
                                                                                             
          
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
                                                                    autoComplete='off'
                                                                                defaultCountry="tg"
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
                                                                 autoComplete='off'
                                                                                defaultCountry="tg"
                                                                                name="phone2"
                                                                                value={phone2}
                                                                                onChange={(phone2) => setPhone2(phone2)}
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
             
                type="text"
                placeholder='votre adresse email'
                value={formData.postulant.date_naissance}
                onChange={(e) => handleInputChange("postulant", "date_naissance", e.target.value)}
              />
                <label className="obligat"> *</label>

            </div>
             
                {/* <label className="float_msg"> (optionnel)</label> */}
            </label>
            <label
              className="input_label"
              >
                  <span>
                reseaux sociaux
                </span>
                <div className="float_data">
                <PhoneInput
                              className="input_value"
                                                                 id="phone2"
                                                                 autoComplete='off'
                                                                                defaultCountry="tg"
                                                                                name="phone2"
                                                                                value={phone2}
                                                                                onChange={(phone2) => setPhone2(phone2)}
                                                                              />

            </div>
             
                {/* <label className="float_msg"> (optionnel)</label> */}
            </label>
         
   </div>
   </div>
    
      {/* Accordion for Model */}

      <div style={{ marginBottom: "20px" }}>
        <label>
          <input
            type="checkbox"
            checked={isfashionChecked}
            onChange={() => handleCheckboxToggle("fashion")}
          />
          <span className='title_label'>
            en tant que Mannequin
          </span>
        </label>
        {isfashionChecked && (

          <>
           <label
             className="input_label"
             >
                <span>
                Taille  
                </span>
                <div className="float_data input-taille ">
                <input type="number" id="taille_m"
                  value={taille_m}
                  onChange={(e) => settaille_m(e.target.value)}
                   name="taille_m" min="0" max = "2" placeholder="m" required/>
                <span>m</span>
                <input type="number" id="taille_cm"
                  value={taille_cm}
                  onChange={(e) => settaille_cm(e.target.value)}
                   name="taille_cm" min="0" max="99" placeholder="cm" required/>
                <span>cm</span>

            </div>
            
            
            </label>

            <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
            {/* <h4>Informations Mannequin</h4> */}
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
                 <div className="container zone_img">
                    
                    <div className="row">
                    <div className="text-center w-100">
                      
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
                                                    e.preventDefault();
                                                    setCurrentZone(zone); // Ouvre uniquement la modale
                                                    e.stopPropagation(); // Évite la propagation non désirée
                                                  }}
                                                  src={typeof imagesModels[zone] === "string" ? imagesModels[zone] : URL.createObjectURL(imagesModels[zone])}
                                                    // src={imagesModels[zone]}
                                                    alt={zone}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                                                                          <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>

                                                                          {zone === "face" ?
                                                                          (
                                                                            <> 👤 </>

                                                                          )
                                                                          :
                                                                          zone === "profile" ?
                                                                          (
                                                                            <>🧍‍♂️</>
                                                                          )
                                                                          :
                                                                          zone === "entier" &&
                                                                          (
                                                                            <>🧍‍♀️</>
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
                       
                     {video.length > 0 ?
                     (
                      <>
                      <div  
                        
                    
                           className="div_img col-4 col-lg-3 col-md-3 col-sm-4 img_item">

                              <>
                            
                                <label className='img_container'>
                                <img
                               
                                // src={typeof imagesModels[zone] === "string" ? imagesModels[zone] : URL.createObjectURL(imagesModels[zone])}
                                  // src={imagesModels[zone]}
                                  
                                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                               </label>
                              </>

                              
                                
    
                      </div>
                      
                      </>
                     )
                    
                    :
                    
                    (
                      <>
                         
                                        <div   className="div_img col-4 col-lg-3 col-md-3 col-sm-4 img_item">

                                            
                                                                    <label
                                                                        onClick={(e) => {
                                                                          Addimgs(); // Ouvre uniquement la modale
                                                                          e.stopPropagation(); // Évite la propagation non désirée
                                                                        }}
                                                                      
                                                                        className='input_label'>
                                                                          <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>

                                                                          🎬
                                                                        
                                                                      </label> 
                                                                    
                                              
                                                   
                      
                                        </div>
                                         
                      </>

                    )
                    
                  }
                                     
                                      
                                    
                       
                     </div>
                   
 
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

                    </div>
                  </div>
                  </label>
            {/* fin photo */}
         
              
          </div>
          
          </>
         
        )}
      </div>

      
  {/* Accordion pour hotesse */}
  <div style={{ marginBottom: "20px" }}>
        <label
          //  className="input_label"
          >
          <input
            // className="input_value"
            type="checkbox"
            checked={ishostChecked}
            onChange={() => handleCheckboxToggle("host")}
          />
          <span className='title_label'>
           en tant qu'Hotesse d'accueil
          </span>
        </label>
        {ishostChecked && (
          <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
            {/* <h4>Informations Influenceur</h4> */}
            <label
              className="input_label"
              >
                <span>
                temps d'experiences (en mois) 
                </span>
            
              <input
                className="input_value"
                type="text"
                value={formData.host.temps_experience}
                onChange={(e) => handleInputChange("host", "temps_experience", e.target.value)}
              />
            </label>
           
           
            
          </div>
        )}
      </div>        

      {/* Accordion pour Influenceur */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          <input
            type="checkbox"
            checked={isroleChecked}
            onChange={() => handleCheckboxToggle("role")}
          />
          <span className='title_label'>
           en tant qu'Influenceur(role model)
          </span>
        </label>
        {isroleChecked && (
          <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
            {/* <h4>Informations Influenceur</h4> */}
         
           
           
            <label
            
             className="input_label"
             >
                <span>
                Réseaux sociaux 
                </span>
            
              <input
               className="input_value"
             
                type="text"
                value={formData.role.socialMedia}
                onChange={(e) => handleInputChange("role", "socialMedia", e.target.value)}
              />
            </label>
         
            <label
            
             className="input_label"
             >
                <span>
                Nbre d'abonnés 
                </span>
             
              <input
                className="input_value"
                type="number"
                value={formData.role.followers}
                onChange={(e) => handleInputChange("role", "followers", e.target.value)}
              />
            </label>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="btn_container">
      <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px" }}>
        s'inscrire
      </button>
      </div>
    
    </form>
    </div>
     
    
    </>
  )
}

export default Postuler_models
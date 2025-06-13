import React from 'react'
// import React from 'react'
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect ,useRef  } from "react"; 
import Header_banner from '../Components/Header_banner';  

import Locations from '../Components/Locations.jsx';
import { useAuth } from "../Context/AuthenticateContext.jsx";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faCamera,faCheckDouble, faImage,faRepeat, faPlus, faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CameraCapture from '../Components/CameraCapture .jsx';
import FixedMenu from '../Components/FixedMenu.jsx';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";


const StyledAccordion = styled(Accordion)(({ theme }) => ({
  margin: "10px 0",
  backgroundColor: "#f9f9f9",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: "#007BFF",
  color: "white",
  borderRadius: "4px",
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  backgroundColor: "#f1f1f1",
  padding: "15px",
}));


function EtatCandidatures() {
  const auth = useAuth(); 
  const user_info = auth.currentUser 
 
  const navigate = useNavigate()
   const apiUrl = 'https://apiafro.aafrodites.com'
 
  const location = useLocation(); 
  const link_url = location?.pathname.split('/');
 

  const [isroleChecked, setIsRoleChecked] = useState(false);
  const [ishostChecked, setIsHostChecked] = useState(false);
  const [isfashionChecked, setIsFashionChecked] = useState(false);
  
  const [isrolenotifChecked, setIsRolenotifChecked] = useState(false);
  const [ishostnotifChecked, setIsHostnotifChecked] = useState(false);
  const [isfashionnotifChecked, setIsFashionnotifChecked] = useState(false);
  const [isnotification, setIsNotification] = useState(false);


  
// les données du postulant

const [info_postulant, setinfo_postulant] = useState([]);
const [info_personne, setinfo_personne] = useState([]);
const [info_fashion, setinfo_fashion] = useState([]);
const [info_role, setinfo_role] = useState([]);
const [info_host, setinfo_host] = useState([]);

console.log("info_postulant")
console.log(info_postulant)
console.log(info_personne)
console.log(info_fashion)
console.log(info_role)
console.log(info_host)
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
        
        }

const fetchData = async () => {

try {
  //  info   
  const data_b = await axios.post(`${apiUrl}/postulant/etatcandidature` , params);
      
    console.log("data_b")
    console.log(data_b)
  
    if(data_b.data.length === 0){
   
      // navigate
      navigate("/")
  
    }
    else{
      setinfo_postulant(data_b.data)
    }
 

  
   


} catch (err) {
// console.log(err);
// console.log('erreur here')
}
};
fetchData(userid);


   } , [userid ,link_url,navigate]);
   const [info_postulantLoaded, setInfoPostulantLoaded] = useState(false);

   useEffect(() => {
     if (info_postulant.length > 0 && !info_postulantLoaded) {
       const params = {
         id: info_postulant[0].id,
       };
   
       const fetchData = async () => {
         try {
           const params_b = {
             id: info_postulant[0].personne_id,
           };
   
           const data_a = await axios.post(`${apiUrl}/postulant/infoperson`, params_b);
           if (data_a.data.length > 0) setinfo_personne(data_a.data);
   
           const data_b = await axios.post(`${apiUrl}/postulant/infofashion`, params);
           if (data_b.data.length > 0) setinfo_fashion(data_b.data);
   
           const data_c = await axios.post(`${apiUrl}/postulant/inforole`, params);
           if (data_c.data.length > 0) setinfo_role(data_c.data);
   
           const data_d = await axios.post(`${apiUrl}/postulant/infohost`, params);
           if (data_d.data.length > 0) setinfo_host(data_d.data);
   
           // Marquer comme chargé
           setInfoPostulantLoaded(true);
         } catch (err) {
           console.error('Erreur lors de la récupération des données:', err);
         }
       };
   
       fetchData();
     }
   }, [info_postulant, info_postulantLoaded]);
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  // locations listes
   
  const [selectedPays, setSelectedPays] = useState('');
  const [selectedVille, setSelectedVille] = useState('');
  const [selectedQuartier, setSelectedQuartier] = useState('');


  console.log(selectedPays)
  const handleLocationChange = (name, value) => {
    if (name === 'pays') {
      setSelectedPays(value);
    } else if (name === 'ville') {
      setSelectedVille(value);
    } else if (name === 'quartier') {
      setSelectedQuartier(value);
    }
  };

  const [formData, setFormData] = useState({
    postulant: {
      nom: "",
      prenom: "",
      pseudo: "",
      date_naissance: "",
        taille: "",
      poids: "",
     
    }
    ,
    fashion: {
    
      experimented: "",
       
    },
    role: {
     
      socialMedia: "",
      followers: "",
    },
    host: {
      nom: "",
      prenom: "",
     
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
  const handleCheckboxnotifToggle = (type) => {
    if (type === "fashion") {
      setIsFashionnotifChecked(!isfashionnotifChecked);
    } 
    else if (type === "role") {
      setIsRolenotifChecked(!isrolenotifChecked);
    }
    else if (type === "host") {
      setIsHostnotifChecked(!ishostnotifChecked);
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
    const telnum1 = document.querySelector(".react-international-phone-input[name='phone1']" ).value;
    const number1 = telnum1.split(" ");
    const telnum2 = document.querySelector(".react-international-phone-input[name='phone2']" ).value;
    const number2 = telnum2.split(" ");

    console.log(number1)
    // return false;
    setFormData((prevState) => ({
      ...prevState, // Copie l'état actuel
      postulant: {
        ...prevState.postulant, // Copie les propriétés existantes de postulant
        pays : selectedPays,
       ville : selectedVille,
       quartier : selectedQuartier,
       code_1 : number1[0],
       tel1 : number1[1],
       code_2 : number2[0],
       tel2 : number2[0], // Ajoute ou met à jour la propriété contact
      },
    }));
   
    console.log("Form Submitted:", formData);
    console.log(formData);


    // return false;
    // creer un final data form
   var data_role = [] , data_fashion = [] , data_host = [];
  const data_postulant = {
    data : formData?.postulant
  }

    if(isroleChecked){
      console.log("role model")
       data_role = {
        fonction: "on",
        data : formData?.role
      }
    }

    if(isfashionChecked){
      console.log("fashion model")
       data_fashion = {
        fonction: "on",
        data : formData?.fashion,
        experimented : experiencedstate,
      }
    }
    if(ishostChecked){
      console.log("host model")
       data_host = {
        fonction: "on",
        data : formData?.host
      }
    }

  const userid = user_info?.id;
 
    const param = {imagespath ,data_postulant, data_role ,data_fashion , data_host , userid }
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
    
         console.log(result)
        //  return false;
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
 };
 

 
// sur les images
const [add_img, setAddimg] = useState(0); 


// declaration des parametres pour les images
const [upload_img, setUpload_img] = useState([]);  
const [files, setFiles] = useState([]);
const [upload_file, setFile] = useState([]);  
const [images_gallery_boxshow, setimages_gallery_boxshow] = useState(false);  
// const [images_camera_boxshow, setImages_camera_boxshow] = useState(false);  
const [nav1, setNav1] = useState(null);
const [currentSlide, setCurrentSlide] = useState(0);
const [slider1, setSlider1] = useState(null); 

const [localFiles, setLocalFiles] = useState([]);
const [listImages, setListImages] = useState([]);  
// options caméra
const videoRef = useRef(null);
const canvasRef = useRef(null);
const [camera_active, setCameraactive] = useState(0);
const [isFrontCamera, setIsFrontCamera] = useState(false);
const [capturedFiles, setCapturedFiles] = useState([]);

  // State pour gérer les images
  
const [images, setImages] = useState([]);
const [imagespath, setImagespath] = useState([]);

const zones = ["face", "dos", "profile","entier", "buste", "pied", "..."]
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
 
      const upload_produit_image = () => {  
        var tab_img = [];
        var tab_path = [];

      
        for(let i= 0;i < upload_img.length; i++ ){
    
          tab_img.push(upload_img[i])
        }
       
        if(biens_dataupdate.length > 0){
          var path_1 = "",  path_2 = "",  path_3 = "", 
              path_4 = "",  path_5 = "",  path_6 = "", 
              path_7 = "",  path_8 = "",  path_9 = "", 
              path_10 = "";
    
            if(biens_dataupdate[0]?.path_image1 != "")
              path_1 = biens_dataupdate[0]?.path_image1;
    
            if(biens_dataupdate[0]?.path_image2 != "")
              path_2 = biens_dataupdate[0]?.path_image2;
    
            if(biens_dataupdate[0]?.path_image3 != "")
              path_3 = biens_dataupdate[0]?.path_image3;
    
            if(biens_dataupdate[0]?.path_image4 != "")
              path_4 = biens_dataupdate[0]?.path_image4;
    
            if(biens_dataupdate[0]?.path_image5 != "")
              path_5 = biens_dataupdate[0]?.path_image5;
    
            if(biens_dataupdate[0]?.path_image6 != "")
              path_6 = biens_dataupdate[0]?.path_image6;
    
            if(biens_dataupdate[0]?.path_image7 != "")
              path_7 = biens_dataupdate[0]?.path_image7;
    
            if(biens_dataupdate[0]?.path_image8 != "")
              path_8 = biens_dataupdate[0]?.path_image8;
    
            if(biens_dataupdate[0]?.path_image9 != "")
              path_9 = biens_dataupdate[0]?.path_image9;
    
            if(biens_dataupdate[0]?.path_image10 != "")
              path_10 = biens_dataupdate[0]?.path_image10;
            
           
            tab_path.push(path_1, path_2, path_3 , path_4 , path_5 , path_6 , path_7 , path_8 , path_9 , path_10)
         
        }
    
        // console.log(tab_path)
      
        // Filtrer uniquement les chaînes vides, null et undefined
        const filteredArray = tab_path.filter((item) => item !== '' && item !== null && item !== undefined);
        // console.log(filteredArray)
        
      for(let j= 0; j< tab_path.length; j++ ){
        
    
        if(tab_path[j] !== ""){
      
          
          var this_path = URL.createObjectURL();
          
          return false;
    
        }
    
     
    }
       
     
      }; 

      
const cancel_uploading = () => {
  // console.log('test')
  // demander une confirmation

  // retirer les images ajouter
  setUpload_img([])
  setFiles([])
  // activer toujours supprimer sans demander de confirmation
  if(images_gallery_boxshow === true){
      setimages_gallery_boxshow(false)

  }
  

};

const deleteImage = (e) => {
  // alert(e.target.dataset.id)

  var tab_image_rec = upload_img;
  if(e.target.dataset.id != undefined){
  
    console.log(upload_img)
    console.log(tab_image_rec[e.target.dataset.id])

    const updatedImage = tab_image_rec.filter(image => image?.id != e.target.dataset.id);
   
   console.log('updatedImage')
   
   console.log(updatedImage)

   console.log('upload_file')
   console.log(upload_file)
    setUpload_img(updatedImage);

    var this_name = upload_file[e.target.dataset.id].name;

    const updatedFIles = upload_file.filter(file  => file.name != this_name);
    
   
       
    setFile(updatedFIles) 
  }
 

};  
const onImageChange = async (e) => {  
  
  
  setLoading(true); // Active le loader
  // return false;
var tab_img = [];
var tab_file_upload = [];
  // Ajouter la rotation initiale des images à 0
  for (let i = 0; i < upload_img.length; i++) {
    tab_img.push({
      ...upload_img[i],
      rotation: 0  // Ajouter une rotation initiale de 0 à chaque image
    });
  }

  const list_file = Array.from(e.target.files);
  const resizedFiles = [];
  const previews = [];

  for (let file of list_file) {
    const resizedImage = await resizeFile(file);
    resizedFiles.push(resizedImage);

    // Créer un URL pour l'aperçu de l'image redimensionnée
    previews.push(URL.createObjectURL(resizedImage));
  }
  for (let j = 0; j < previews.length; j++) {
    let n = upload_img.length + parseInt(j + 1);
    
    tab_img.push({
      id: n,
      src: previews[j],
      alt: "image indisponible",
      rotation: 0  // Nouvelle image avec rotation initiale 0
    });
  }

  setUpload_img(tab_img);
  for (let i = 0; i < upload_file.length; i++) {
    tab_file_upload.push(upload_file[i]);
  }

  for (let i = 0; i < resizedFiles.length; i++) {
    tab_file_upload.push(resizedFiles[i]);
  }
    
    setFile(tab_file_upload);
    setIsFormDirty(true)
    setAddimg(0)
    setLoading(false); // Désactive le loader après la requête
                  
};

  
  // Fonction pour pivoter une image sélectionnée
const rotateImage = (imageId) => {
  setUpload_img((prevImages) => 
    prevImages.map(image => {
      console.log(image.id)
      if (image.id === imageId) {
        let newRotation = image.rotation + 90; // Augmenter la rotation de 90 degrés
        if (newRotation >= 360) {
          newRotation = 0;  // Réinitialiser la rotation à 0 si elle dépasse 360
        }
        return {
          ...image,
          rotation: newRotation
        };
      }
      return image;
    })
  );
};

const saveRotation = (imageId) => {
  setLoading(true); // Active le loader
  const image = upload_img.find((img) => img.id === imageId);
  const imageToModify = upload_img.find((img) => img.id === imageId);
  if (image) {
    console.log(`Rotation enregistrée pour l'image ${imageId}: ${image.rotation}°`);
    // Implémenter une logique pour sauvegarder cette rotation si nécessaire
  }
 
  if (!imageToModify) {

    setLoading(false) 
    return;
  }

   // Re-créer une image pivotée et mettre à jour l'aperçu
   const canvas = document.createElement("canvas");
   const ctx = canvas.getContext("2d");
   const img = new Image();
   img.src = imageToModify.src;
   img.rotation = imageToModify.rotation;
   img.onload = () => {
    const angle = imageToModify.rotation;

    // Définir la taille du canvas selon la rotation
    if (angle === 90 || angle === 270) {
      canvas.width = img.height;
      canvas.height = img.width;
    } else {
      canvas.width = img.width;
      canvas.height = img.height;
    }

    // Rotation de l'image
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);

    // Mettre à jour l'aperçu
    const updatedSrc = canvas.toDataURL();
    canvas.toBlob((blob) => {
      setUpload_img((prevImages) =>
        prevImages.map((img) => {
          if (img.id === imageId) {
            return { ...img, rotation: 0 , src: updatedSrc, file: blob };
          }
          return img;
        })
      );

      setFile((prevFiles) => {
        const newFiles = prevFiles.map((file, index) => {
          if (index === imageId - 1) {
            return blob; // Remplacer l'ancien fichier
          }
          return file;
        });
        return newFiles;
      });
    });
   
    setLoading(false); // Active le loader
 
  };
  

};
  // Préparer les images modifiées pour l'upload
  const prepareImageForUpload = async (image) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = image.preview;

      img.onload = () => {
        const { width, height } = img;

        if (image.rotation === 90 || image.rotation === 270) {
          canvas.width = height;
          canvas.height = width;
        } else {
          canvas.width = width;
          canvas.height = height;
        }

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((image.rotation * Math.PI) / 180);
        ctx.drawImage(
          img,
          -img.width / 2,
          -img.height / 2,
          img.width,
          img.height
        );
        ctx.restore();

        canvas.toBlob((blob) => resolve(blob), "image/jpeg");
      };
    });
  };
  

 const valid_uploading = async () => {

  setLoading(true); // Active le loader
const formData_b = new FormData();
// for (const file of upload_file) {
//   console.log(file)
//   const processedImage = await prepareImageForUpload(file);
//   formData_b.append("images", processedImage, file.file.name);
// }
upload_file.forEach((file) => formData_b.append('images', file));

try {
  // const response = await axios.post('http://localhost:8000/api/save-local', formData_b, {
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${apiUrl}/upload/saveFile`, formData_b, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  
  
  setLocalFiles(response.data.files); // Mettre à jour la liste des fichiers sauvegardés localement
  setListImages(response?.data?.files)
   
  if(response.data.files != undefined){
     
      if(images_gallery_boxshow === true){
        setimages_gallery_boxshow(false)

      }
    
   
    }
    setLoading(false); // Désactive le loader après la requête
   
} catch (error) {
  console.error('Erreur lors de la sauvegarde locale :', error);
  setLoading(false); // Désactive le loader après la requête
}

};
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
  
    const [capturedImage, setCapturedImage] = useState(null);
      const [mediaStream, setMediaStream] = useState(null);
     
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
    setCapturedFiles(capturedImage)
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
          const response = await axios.post(`${apiUrl}/upload/saveFile`, formData_b, {
            headers: {
              'Content-Type': 'multipart/form-data', // Important
            },
            withCredentials: true, // Si nécessaire
          });
          console.log(response.data);
          setImagespath(response.data?.files)
        } catch (error) {
          console.error("Erreur lors de l'upload :", error.response?.data || error.message);
        }
    // return false;
    // try {
    //   axios.defaults.withCredentials = true;
    //   const response = await axios.post(`${apiUrl}/upload/saveFile`, formData_b, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    //   // const response = await axios.post(
        
    //   //   `${apiUrl}/upload/saveFile`, images, // Envoyer l'array des images
    //   //     {
    //   //         headers: { "Content-Type": "application/json" },
    //   //     }
    //   // );

    //         console.log(response.data);
    //     } catch (error) {
    //         console.error("Erreur lors de l'upload :", error);
    //     } 
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

  return (
    <>

        <Header_banner data ={{ link : 'ma candidature' }} />
    <div className="main_container data_container">
        
        <ToastContainer className="toast_style"/>
        <div className="lebeltest">
            etat de candidature
        </div>
    </div>


<FixedMenu />   
    
    </>
  )
}

export default EtatCandidatures
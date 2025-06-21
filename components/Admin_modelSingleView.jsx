// import React from 'react'
import React, { useState, useEffect } from 'react';
import { Link , useLocation } from 'react-router-dom';
import axios from 'axios'
// import Header_menu from '../../Components/Header_menu';  
// import Footer from './Footer'
// import Modal from 'react-modal';
// import { getFFmpeg , loadFFmpeg } from '../..//sevices/ffmpegUtils';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import MannequinNavigation from './MannequinNavigator';

// import { useParams } from 'react-router-dom';


// import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';

// import ImageModal from './ImageModal';

import Calendar_view from '../Calendar_view';  
import Timeline_view from '../Timeline_view'; 
import FixedMenu from '../../Components/FixedMenu';

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import imageCompression from 'browser-image-compression';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import SelectComponent from '../../Components/SelectComponent';
import { faXTwitter, faFacebook, faLinkedin, faYoutube, faWhatsapp, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {faShare,faCalendar,faIdCard,faUser, faImage,faFilm ,faList ,faThumbsUp,faHeart,faComment, faInfo} from '@fortawesome/free-solid-svg-icons';
import SelectComponent from '../../Components/SelectComponent';
// import zIndex from '@mui/material/styles/zIndex';
import { FaEdit } from 'react-icons/fa';
import { convertVideoToResolutions } from '../../sevices/compressVideoResolutions';
// import { loadFFmpeg } from '../../sevices/ffmpegUtils';
const ImageModal = ({id , groupedPaths: initialGroupedPaths, onClose, handleUpdate }) => {
  const [groupedPaths, setGroupedPaths] = useState(initialGroupedPaths);

  const apiUrl = "https://apiafro.aafrodites.com";


  
  console.log("id")
  console.log(id)
  const [images, setImages] = useState([]);
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

  
      const compressImageWithMaxSize = async (file, maxWidth, maxHeight, maxSize) => {
        let options = {
          maxWidthOrHeight: Math.max(maxWidth, maxHeight),
          useWebWorker: true,
        };
      
        let compressedFile = await imageCompression(file, options);
        
        // Vérifier si la taille du fichier est inférieure à la taille maximale
        if (compressedFile.size > maxSize) {
          // Réduire la qualité de l'image pour respecter la taille
          const quality = Math.max(0.1, maxSize / compressedFile.size); // Calculer un facteur de qualité basé sur la taille
          options = { maxWidthOrHeight: Math.max(maxWidth, maxHeight), maxSize: maxSize, useWebWorker: true, initialQuality: quality };
          compressedFile = await imageCompression(file, options);
        }
      
        return compressedFile;
      };
    const compressImage = async (file, maxWidth, maxHeight) => {
      const options = {
        maxWidthOrHeight: Math.max(maxWidth, maxHeight),
        useWebWorker: true,
      };
      return await imageCompression(file, options);
    };
  const next_option = async () => {
    // console.log("Envoi au serveur...");
  
    if (!images?.path || images.path.length === 0) {
      console.error("Aucune image à télécharger");
      return;
    }

    const loadingToastId = toast.info('Traitement de l\'image en cours...', {
          position: "top-center",
          autoClose: false, 
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
  
    const formData = new FormData();

for (let index = 0; index < images.path.length; index++) {
  const base64Image = images.path[index];
  const originalFileName = `image-${index + 1}.jpeg`;

  // Ajouter un timestamp pour rendre le nom unique
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  const uniqueFileName = `${originalFileName.split(".")[0]}_${timestamp}.jpeg`;
  try {
    // Convertir l'image Base64 en fichier
    const file = base64ToFile(base64Image, uniqueFileName);
    console.log(file)

    if (file.size > 500000) {
      // Compresser les images avec des tailles max spécifiques
      const [desktopImage, mobileImage, thumbnailDesktop, thumbnailMobile] = await Promise.all([
        // compressImage(file, 1920, 1080),
        compressImageWithMaxSize(file, 1280, 720, 700000), // Mobile haute qualité, 300 Ko max
        // Desktop haute qualité
        compressImageWithMaxSize(file, 1280, 720, 400000), // Mobile haute qualité, 300 Ko max
        compressImage(file, 600, 400),  // Miniature Desktop
        compressImageWithMaxSize(file, 400, 250, 100000),  // Miniature Mobile, 40 Ko max
      ]);

      
      console.log(thumbnailMobile)
      console.log(mobileImage)
      console.log(uniqueFileName.split(".")[0])
// return false;
      formData.append("files", desktopImage, uniqueFileName); // Original
      formData.append("files", mobileImage, `${uniqueFileName.split(".")[0]}_desktop.${uniqueFileName.split(".")[1]}`);
      // formData.append("files", mobileImage, `${uniqueFileName.split(".")[0]}_desktop.${uniqueFileName.split(".")[1]}`);
      formData.append("files", mobileImage, `${uniqueFileName.split(".")[0]}_mobile.${uniqueFileName.split(".")[1]}`);
      formData.append("files", thumbnailMobile, `${uniqueFileName.split(".")[0]}_thumbnail_desktop.${uniqueFileName.split(".")[1]}`);
      formData.append("files", thumbnailMobile, `${uniqueFileName.split(".")[0]}_thumbnail_mobile.${uniqueFileName.split(".")[1]}`);
      // formData.append("files", mobileImage, `${uniqueFileName}_mobile`);
      // formData.append("files", thumbnailMobile, `${uniqueFileName}_thumbnail_desktop`);
      // formData.append("files", thumbnailMobile, `${uniqueFileName}_thumbnail_mobile`);
    } else {
      // Ne pas compresser si la taille est déjà inférieure à 500 Ko
      formData.append("files", file, uniqueFileName); // Original
      formData.append("files", file, `${uniqueFileName.split(".")[0]}_desktop.${uniqueFileName.split(".")[1]}`);
      formData.append("files", file, `${uniqueFileName.split(".")[0]}_mobile.${uniqueFileName.split(".")[1]}`);
      formData.append("files", file, `${uniqueFileName.split(".")[0]}_thumbnail_desktop.${uniqueFileName.split(".")[1]}`);
      formData.append("files", file, `${uniqueFileName.split(".")[0]}_thumbnail_mobile.${uniqueFileName.split(".")[1]}`);
    
      
    }

  } catch (compressionError) {
    console.error(`Erreur lors de la compression de l'image ${uniqueFileName} :`, compressionError);
    continue; // Continuer avec les autres images même en cas d'erreur
  }


  
}

  
    try {
      // Envoi des fichiers
     
      const response = await axios.post(`${apiUrl}/uploadfiles/saveFile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.dismiss(loadingToastId);
      toast.success('Image chargée avec succès !', {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
  
      return response.data?.files;
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error('Erreur lors de la mise à jour !', {
      position: "top-center",
      autoClose: 3000,
      theme: "light",
    });
      console.error("Erreur lors de l'upload :", error.response?.data || error.message);
    }
  };
  const [imagePreview, setImagePreview] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const newImagePath = reader.result; // Chemin de la nouvelle image

        
        // Mettre à jour les aperçus
        setImagePreview(newImagePath);
        
   
        // Sauvegarder le chemin dans l'état images
        setImages((prev) => {
          const updatedImages = { ...prev };
          if (!updatedImages.path) {
            updatedImages.path = [];
          }
          updatedImages.path.push(newImagePath); // Ajoute le nouveau chemin
          return updatedImages;
        });
      };
      reader.readAsDataURL(file); // Lit l'image comme DataURL
    }

  };
  
  // Lancer `next_option` lorsqu'une image est ajoutée

  useEffect(() => {
    if (images.path && images.path.length > 0) {
      const uploadImages = async () => {
        try {
          const imgs_upld = await next_option(); // Attend la réponse de `next_option()`
          console.log("Images uploadées :", imgs_upld);
          
          if (imgs_upld && imgs_upld.length >= 5) { 
            const all_images = [
              {
                o_desktop: imgs_upld[0],
                hr_desktop: imgs_upld[1],
                hr_mobile: imgs_upld[2],
                m_desktop: imgs_upld[3],
                m_mobile: imgs_upld[4],
              },
            ];
  
            const param = { all_images , id };
            console.log("All Images:", all_images);
            console.log("Param:", param);

            try {

              console.log(param)
    
              // return false;
              await axios
                .post(`${apiUrl}/fashion_model/addimages_principal_fashionmodel`,
                  param
                  )
                .then((result) => {
            
                console.log("result.data")
                  console.log(result)
                //   console.log(result.data?.user)
    
                 return false;
    
                
                    if(result){
                      setTimeout(() => {
                      
                        toast.success('mannequin ajouté avec succès' , {
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
                        
                      setImages([])
                      setnewuserdata([result.data?.new_pseudo , result.data?.new_pass])
                        // affciher une notif
                        setIsNotification(true)
                        setIsloaded(true)
                        // setIsModalOpen(false);
                        
    
                      // arreter le loader
    
                      // afficher le recap
                    }, 3500); // Délai de 3 secondes
    
                    
          
                    }
                  }); 
                  
            } catch (err) {
              console.log("erreur");
              // setError(err.response.data);
            }
          }
        } catch (error) {
          console.error("Erreur lors de l'upload des images :", error);
        }
      };
  
      uploadImages();
    }
  }, [images]); // Déclenche l'effet lorsque `images` change

  
// useEffect(() => {

//   if (images.path && images.path.length > 0) {
//     const imgs_upld = async () => {
//       await next_option(); // Attend que la fonction résolve la promesse
//     };
     
// //        console.log("imgs_upld")
// //        console.log(imgs_upld)
// //     const all_images = []
// //        all_images.push({
// //                          o_desktop : imgs_upld[0] ,
// //                          hr_desktop : imgs_upld[1],
// //                          hr_mobile : imgs_upld[2],
// //                          m_desktop : imgs_upld[3],
// //                          m_mobile : imgs_upld[4],

// //                 });


// //  const param = {all_images}
  
// //    console.log(all_images)
// //     console.log("param")
// //     console.log(param)

//     imgs_upld();
 
//   }
// }, [images]); // Déclenche l'effet lorsque `images` change
  return (
    <div className="modal_image_with_paths">
      <div className="modal-content">
        <h3 className="text-center">Versions d'images</h3>
        <button className="close-modal" onClick={onClose}>
          X
        </button>
        <div className="image-grid">
        {groupedPaths?.length > 0 ?
        <>
         {groupedPaths.map((image) => (
            <div key={image.id} className="image-box">
              {image.path ? (
                <>
                  {/* Image Preview */}
                  <img
                    src={`${apiUrl}/${image.path}`}
                    alt={`Version ${image.suffix || "générique"}`}
                    className="preview-image"
                  />
                  <div className="image-info">
                    <span className="suffix-label">
                      {image.suffix || "Générique"}
                    </span>
                  </div>
                  {/* Metadata */}
                  {image.originalname && (
                    <div className="meta-info">
                      <p>Nom : {image.originalname}</p>
                      <p>Poids : {(image.size / 1024).toFixed(2)} Ko</p>
                    </div>
                  )}
                  {/* Modify Button */}
                  <div className="modify-container">
                    <label htmlFor={`upload-${image.id}`} className="modify-btn">
                      Modifier
                    </label>
                    <input
                      id={`upload-${image.id}`}
                      type="file"
                      className="upload-input"
                      onChange={(e) => handleUpdate(e, image.id, setGroupedPaths)}
                      style={{ display: "none" }}
                    />
                  </div>
                </>
              ) : (
                <div className="upload-container">
                  <span className="upload-label">
                    {image.suffix || "Générique"}
                  </span>
                  <input
                    type="file"
                    className="upload-input"
                    onChange={(e) => handleUpload(e, image.id)}
                  />
                </div>
              )}
            </div>
          ))}
        </>

        :

        <>
       
       <div style={styles.formGroup}>
                        <label style={styles.imageLabel}>
                          {/* Zone de prévisualisation de l'image */}
                          {imagePreview ? (
                            <img
                              src={imagePreview}
                              alt="Prévisualisation"
                              style={styles.imagePreview}
                            />
                          ) : (
                            <span> + image </span>
                          )} 
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={styles.fileInput}
                          />
                        </label>
                      </div>
        </>
      
      }
         
        </div>
      </div>
    </div>
  );
};

const Secondary_ImageModal = ({ data, onClose, handleUpdate }) => {
  // const [groupedPaths, setGroupedPaths] = useState(initialGroupedPaths);

  const apiUrl = "https://apiafro.aafrodites.com";

  return (
    <div className="modal_image_with_paths">
      <div className="modal-content">
        <h3 className="text-center">Versions d'images</h3>
        <button className="close-modal" onClick={onClose}>
          X
        </button>
        <div className="image-grid">
          {data.map((image) => (
            <div key={image.id} className="image-box">
              {image.path ? (
                <>
                  {/* Image Preview */}
                  <img
                    src={`${apiUrl}/${image.path}`}
                    alt={`Version ${image.suffix || "générique"}`}
                    className="preview-image"
                  />
                  <div className="image-info">
                    <span className="suffix-label">
                      {image.suffix || "Générique"}
                    </span>
                  </div>
                  {/* Metadata */}
                  {image.originalname && (
                    <div className="meta-info">
                      <p>Nom : {image.originalname}</p>
                      <p>Poids : {(image.size / 1024).toFixed(2)} Ko</p>
                    </div>
                  )}
                  {/* Modify Button */}
                  <div className="modify-container">
                    <label htmlFor={`upload-${image.id}`} className="modify-btn">
                      Modifier 
                      {/* {image.id} */}
                    </label>
                    <input
                      id={`upload-${image.id}`}
                      type="file"
                      className="upload-input"
                      onChange={(e) => handleUpdate(e, image.id)}
                      style={{ display: "none" }}
                    />
                  </div>
                </>
              ) : (
                <div className="upload-container">
                  <span className="upload-label">
                    {image.suffix || "Générique"}
                  </span>
                  <input
                    type="file"
                    className="upload-input"
                    onChange={(e) => handleUpload(e, image.id)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function Admin_modelSingleView() {
  //  alert('trest')

   // list link param
   let current_location = useLocation();
   const link_url = current_location?.pathname.split('/');
  
//  const type_model = link_url[2];
//  const id_model =  link_url[3];
   axios.defaults.withCredentials = true;
 
   const [events , setEvents] = useState([]);
    const [TypeView_N, setTypeView_N] = useState("calendar"); // Par défaut en mode calendrier
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [videoPreviews, setVideoPreviews] = useState([]);
    const [videoupload, setUploadevideo] = useState([]); 
 
    
   const type_model = link_url[3];
   const id_model =  link_url[4];
   
   const openModal2 = () => {
    setIsModalOpen2(true);
  };
  
  // Fonction pour fermer le modal
  const closeModal2 = () => {
    setIsModalOpen2(false);
    // setIsNotification(false)
    setVideoPreviews([])
    setUploadevideo([])
  };

  
// Fonction utilitaire pour convertir base64 en File
function base64ToFileV(base64, filename) {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, { type: mime });
}
 
  const next_option_videos = async () => {
   
    if (!videoupload?.path || videoupload.path.length === 0) {
      console.error("Aucune vidéo à télécharger");
      return;
    }
  
    const formData = new FormData();
  
    for (let index = 0; index < videoupload.path.length; index++) {
      const base64 = videoupload.path[index];
      const originalFileName = `video_${index + 1}.mp4`;
  
      const file = base64ToFileV(base64, originalFileName);
  
      console.log(`Traitement de ${originalFileName}`);
  
      try {
        const convertedFiles = await convertVideoToResolutions(file, ['360', '480', '720']);
  
           console.log("convertedFiles")
           console.log(convertedFiles)
        for (const { resolution, file: convertedFile } of convertedFiles) {
          const filename = originalFileName.replace('.mp4', `_${resolution}p.mp4`);
          formData.append('files', convertedFile, filename);
          console.log(`Ajouté: ${filename}`);
        }
  
        // Inclure l'original si souhaité
        formData.append('files', file, originalFileName);
  
      } catch (err) {
        console.error(`Erreur de conversion pour ${originalFileName}`, err);
      }
    }
  
    try {
  
      const res = await axios.post(`${apiUrl}/uploadfiles/saveFile`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
  
      console.log("Upload réussi", res.data);
      // return res.data;
      return res.data?.files;
    } catch (err) {
      console.error('Erreur d’upload:', err.response?.data || err.message);
      throw err;
    }
  };
  
  // const extractThumbnail = (videoFile) => {
  //   console.log(videoFile)

  //   return new Promise((resolve, reject) => {
  //     const video = document.createElement('video');
  //     video.preload = 'metadata';
  //     video.src = URL.createObjectURL(videoFile);
  //     video.muted = true;
  //     video.playsInline = true;
  

      
  //     console.log("video default")
  //     console.log(video)
  //     video.onloadedmetadata = () => {
  //       // Aller à la 1ère seconde (ou 0.1 pour plus de rapidité)
  //       video.currentTime = Math.min(1, video.duration / 2);
  //     };
  
  //      console.log("video")
  //      console.log(video)
  //     video.onseeked = () => {
  //       const canvas = document.createElement('canvas');
  //       canvas.width = video.videoWidth;
  //       canvas.height = video.videoHeight;
  //       const ctx = canvas.getContext('2d');
  //       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  //       canvas.toBlob((blob) => {
  //         if (blob) {
  //           const thumbFile = new File([blob], `${videoFile.name}_thumb.jpg`, { type: 'image/jpeg' });
  //           resolve(thumbFile);
  //         } else {
  //           reject("Blob creation failed");
  //         }
  //       }, 'image/jpeg', 0.8);
  //     };
  
  //     video.onerror = (err) => {
  //       reject(err);
  //     };
  //   });
  // };
  
  const extractThumbnail = (videoFiles, apiUrl) => {
         console.log("videoFiles")
         console.log(videoFiles)
    if (!videoFiles?.path || videoFiles.path.length === 0) {
      console.error("Aucune vidéo à télécharger");
      return;
    }

    const base64 = videoupload.path[0];
    const originalFileName = `video_${0 + 1}.mp4`;

    const videoFile = base64ToFileV(base64, originalFileName);

    // const videoFile = videoFiles?.path?.[0];
    console.log("videoFile")
    console.log(videoFile)
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.muted = true;
      video.playsInline = true;
      video.src = URL.createObjectURL(videoFile);
  
      video.onloadedmetadata = () => {
        video.currentTime = Math.min(1, video.duration / 2);
      };
  
      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
        canvas.toBlob(async (blob) => {
          if (blob) {
            const thumbFile = new File([blob], `${videoFile.name}_thumb.jpg`, {
              type: 'image/jpeg',
            });
  
            console.log("thumbFile")
            console.log(thumbFile)
            // Envoi immédiat vers le backend
            const formData = new FormData();
            // formData.append("file", thumbFile);
            formData.append("files", thumbFile); // ici "files" au lieu de "file"

            try {
              const response = await axios.post(`${apiUrl}/uploadfiles/thumbnail`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
              });

              console.log("response")
              console.log(response)
  
              if (response.data?.files[0]?.path) {
                resolve(response.data?.files[0]?.path); // Retourne juste le chemin du thumbnail
              } else {
                reject(new Error("Le backend n'a pas retourné de chemin"));
              }
            } catch (uploadErr) {
              reject(uploadErr);
            }
          } else {
            reject(new Error("Erreur de création du blob"));
          }
        }, 'image/jpeg', 0.8);
      };
  
      video.onerror = (err) => {
        reject(new Error('Erreur de chargement vidéo : ' + err.message));
      };
    });
  };
  
  const handleSubmitVideo = async (e) => {
    e.preventDefault();
  
    const toastId = toast.info('Sauvegarde en cours...', {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  
    try {
    
      // générer un thumb pour la video
      const thumbnailPath = await extractThumbnail(videoupload, apiUrl);
  
    // console.log("thumbnailPath")
    // console.log(thumbnailPath)

    // return false;
      const videos_upld = await next_option_videos();
      if (!videos_upld.length) throw new Error("Aucune vidéo trouvée");
  
      // Extraire et uploader le thumbnail depuis la 1ère vidéo
    
      // Uploader les vidéos individuellement
      // const uploadedVideos = [];
      // for (const videoFile of videos_upld) {
      //   const videoFormData = new FormData();
      //   videoFormData.append("file", videoFile);
  
      //   const videoRes = await axios.post(`${apiUrl}/uploadfiles/video`, videoFormData, {
      //     headers: { 'Content-Type': 'multipart/form-data' }
      //   });
  
      //   const videoPath = videoRes.data?.path;
      //   if (videoPath) {
      //     uploadedVideos.push({ o_version: videoPath });
      //   }
      // }
  
      // Préparer les données à envoyer à la BDD
      const values = {
        data_model: {
          id: this_model[0]?.idmannequin,
        },
        
        video: videos_upld,
        thumbnail: thumbnailPath,
      };
  
      console.log("values")
      console.log(values)
      // Envoi des infos à la BDD
      const result = await axios.post(`${apiUrl}/fashion_model/addVideos_fashionmodel`, values);
  
      if (result) {

        console.log("result")
        console.log(result)

        // return false;
        toast.update(toastId, {
          render: "Vidéo sauvegardée avec succès",
          type: "success",
          autoClose: 3000,
          hideProgressBar: true,
        });
  
        setVideoPreviews([]);
        setUploadevideo([]);
        setIsModalOpen2(false);
      }
    } catch (err) {
      console.error(err);
      toast.update(toastId, {
        render: "Erreur lors de la sauvegarde des vidéos",
        type: "error",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };
  
  
// const handleSubmitVideo = async (e) => {
//   e.preventDefault();

//   // Afficher un toast de chargement (sans autoClose pour qu'il reste jusqu'à la fin)
//   const toastId = toast.info('Sauvegarde en cours...', {
//     position: "top-center",
//     autoClose: false,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//   });

//   // Préparer les données à envoyer
//   var data_modelVideo = {
//     data: this_model[0]?.idmannequin,
//   };

// //   try {
// //     // Attendre que les vidéos soient téléchargées
// //     const videos_upld = await next_option_videos();
// //     var all_video = [];

// //     console.log("videos_upld")
// //     console.log(videos_upld)


// // // return false;
// //     // Parcourir les vidéos par groupes de 5
// //     for (let i = 0; i < videos_upld.length; i += 1) {
// //       const groupedVideo = {
// //         o_version: videos_upld[i] || null,
// //       };
// //       all_video.push(groupedVideo);
// //     }

// //     // Préparer la requête
// //     const values = {
// //       all_video: all_video,
// //       data_model: data_modelVideo,
// //     };

// //     console.log("values")
// //     console.log(values)

// //     return false;
// //     // Envoyer la requête au serveur
// //     const result = await axios.post(`${apiUrl}/fashion_model/addVideos_fashionmodel`, values);

// //     // Si la requête est réussie, mettre à jour le toast
// //     if (result) {
// //       toast.update(toastId, {
// //         render: "Vidéo sauvegardée avec succès",
// //         type: "success",
// //         autoClose: 3000,
// //         hideProgressBar: true,
// //       });

// //       // Réinitialiser les états
// //       setVideoPreviews([]);
// //       setUploadevideo([]);
// //       setIsModalOpen2(false);
// //     }
// //   }

// try {
//   const videos_upld = await next_option_videos(); // [File, File, ...]

//   console.log("videos_upld")
//   console.log(videos_upld)
//   const all_video = [];

// alert("next")
//   // return false;
//   const thumbFile = await extractThumbnail(videos_upld[0]);
//   alert("thumb create")
//    // Étape 4 : uploader la miniature
//    const thumbFormData = new FormData();
//    thumbFormData.append("file", thumbFile);
//    alert("thumb send")

//    const thumbResponse = await axios.post(`${apiUrl}/uploadfiles/thumbnail`, thumbFormData, {
//      headers: {
//        'Content-Type': 'multipart/form-data'
//      }
//    });

//    const thumbPath = thumbResponse.data?.path;

//    console.log('thumbs here')
//   console.log(thumbFile)
//   console.log(thumbResponse)
//   return false;
//   const thumbBase64 = await new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(thumbFile);
//     reader.onloadend = () => resolve(reader.result);
//     reader.onerror = reject;
//   });

//   for (let i = 0; i < videos_upld.length; i++) {
//     const videoFile = videos_upld[i];

//     // Générer une miniature
   
//     // Option : convertir en base64 si tu préfères
  
//     const groupedVideo = {
//       o_version: videoFile,         // Fichier vidéo (à envoyer via FormData si tu veux)
//     };

//     all_video.push(groupedVideo);
//   }


//   const values = {
//     video : all_video,
//     thumbnail: thumbBase64,       // Miniature au format base64

//     data_model: data_modelVideo,
//   };

//   console.log("values", values);


//   return false;
//   // Envoyer à ton serveur
//   const result = await axios.post(`${apiUrl}/fashion_model/addVideos_fashionmodel`, values);

//   if (result) {
//     toast.update(toastId, {
//       render: "Vidéo sauvegardée avec succès",
//       type: "success",
//       autoClose: 3000,
//       hideProgressBar: true,
//     });

//     setVideoPreviews([]);
//     setUploadevideo([]);
//     setIsModalOpen2(false);
//   }
// } 
//    catch (err) {
//     // En cas d'erreur, afficher un toast d'erreur
//     toast.update(toastId, {
//       render: "Erreur lors de la sauvegarde des vidéos",
//       type: "error",
//       autoClose: 3000,
//       hideProgressBar: true,
//     });
//   }
// };

  //  alert(id_model)
   useEffect(() => {
    const fetchData = async () => {
   
    try {
     
         const rep1 = await axios.post(`${apiUrl}/events/all_events_model` , {id_model  : id_model});
    //  console.log('rep1')
    //  console.log(rep1)
     
        const grouped_event = rep1?.data.reduce((acc, row) => {
          // Vérifie si le mannequin existe déjà dans l'accumulateur
                    // console.log("row")
                    // console.log(row)
           const convdb = new Date(row?.date_debut).toISOString().split('T')[0];
        
          const convdf = new Date(row?.date_fin).toISOString().split('T')[0];
          
          let listevent = acc.find(item => (item.id_event === row.id_event));
          
          if (!listevent) {
          
            // Si non, crée une nouvelle entrée pour ce mannequin
            listevent = {
              id_event: row.id_event,
              nom_event: row.nom_event,
              detail: row.details,
              type_model: row.type_model, 
              date_debut : convdb,
              date_ffin : convdf,
              pays : row.pays,
              ville : row.ville,
              quartier : row.quartier,
              indication_lieu : row.indication_lieu,
              statut : row.statut,
              id_typeevent : row.id_typeevent,
              nom_organiser : row.nom_organiser,
              heure_debut : row?.heure_debut,
              heure_fin : row?.heure_fin,
              paths: {} };
            acc.push(listevent);
          }
          
           
          // Ajoute le path_image correspondant au type_resolution
          switch (row.type_resolution) {
             
            case 3:
              listevent.paths.path_hrd = row.path_image;
              break;
            case 4:
              listevent.paths.path_hrm = row.path_image;
              break;
            case 5:
              listevent.paths.path_md = row.path_image;
              break;
            case 6:
              listevent.paths.path_mm = row.path_image;
              break;
            default:
              // Si un type inconnu est trouvé, le traiter ou ignorer
              // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
              break;
          }

           return acc;
        }, []);

    
        setEvents(grouped_event);
     
    } catch (err) {
      console.log(err);
    
    }
  };
  fetchData();
} , []);

   const [selected_image, setselected_image] = useState([]); 
   const [bisSelectedImage, setbisSelectedImage] = useState([]); 
 const [isModalImgOpen, setIsModalImgOpen] = useState(false);
 const [IsModalImg_secondaryOpen, setIsModalImg_secondaryOpen] = useState(false);

 const [detail_image , setdetail_image ] = useState([]);
 const [imageResolutions , setimageResolutions ] = useState(false);
 const [secondary_imageResolutions , setsecondary_imageResolutions ] = useState(false);
   const [isFixed, setIsFixed] = useState(false);
   const [this_model, setthis_model] = useState([]); 
   const [this_modelNew, setthis_modelNew] = useState([]); 
   const [isEnriched, setIsEnriched] = useState(false);
   const [principal_data, setprincipal_data] = useState([]);
   const [secondary_data, setsecondary_data] = useState([]);
   const [list_photgraphes, setlist_photgraphes] = useState([]);
   const [list_maquilleurs, setlist_maquilleurs] = useState([]);
   const [list_coiffeurs, setlist_coiffeurs] = useState([]);
   const [list_stylistes, setlist_stylistes] = useState([]);
   const [list_boutiques, setlist_boutiques] = useState([]);
   const [setupdated, setupdating] = useState(false);


  const apiUrl = 'https://apiafro.aafrodites.com'
    // const apiUrl = 'http://localhost:5000'

 
   const param = {type_model, id_model}


    useEffect(() => {
  
      const fetchData = async () => {
       
        try {
            
         const rep1 = await axios.post(`${apiUrl}/fashion_model/this_model`, param );

         const rep2 = await axios.post(`${apiUrl}/fashion_model/this_model_data`, param );
       
         const photogr = await axios.post(`${apiUrl}/Collabs/all_photographes` );
         const coif = await axios.post(`${apiUrl}/Collabs/all_coiffeur` );
         const styl = await axios.post(`${apiUrl}/Collabs/all_stylistes` );
         const maqui = await axios.post(`${apiUrl}/Collabs/all_maquilleurs`);
         const boutiq = await axios.post(`${apiUrl}/Collabs/liste_boutiques`);
             
          console.log("rep1")
          console.log(rep1)
          console.log("rep2")
          console.log(rep2)
        setlist_photgraphes(photogr?.data)
        setlist_maquilleurs(maqui?.data)
        setlist_coiffeurs(coif?.data)
        setlist_stylistes(styl?.data)
        setlist_boutiques(boutiq?.data)
       
         setthis_model(rep1.data);
  
         const principal_image =  rep1.data.filter(li => li.type_image === 1);
         
         if(principal_image.length === 1){
          setprincipal_data(principal_image)
         }
        
                   
        
            const groupedResults = rep2?.data?.list_rep.reduce((acc, row) => {
              // Vérifie si le mannequin existe déjà dans l'accumulateur
              let listimg = acc.find(item => item.id_image === row.id_image);
              // console.log("row")
              //   console.log(row)
              if (!listimg) {
              
                // Si non, crée une nouvelle entrée pour ce mannequin
                listimg = {
                  id_image: row.id_image,
                  image_name: row.image_name,
                  nom: row.nom,
                  model_id: row.idmannequin,
                  pseudo: row.pseudo,
                  type_image: row.type_image,
                  type_model: row.type_model,
                  userclient: row.userclient,
                  paths: {} };
                acc.push(listimg);
              }
           
         
              // Ajoute le path_image correspondant au type_resolution
              switch (row.type_resolution) {
                case 1:
                  listimg.paths.path_od = row.path_resolution;
                  listimg.paths.id_od = row.path_id;
                  break;
                case 2:
                  listimg.paths.path_om = row.path_resolution;
                  listimg.paths.id_om = row.path_id;
                  break;
                case 3:
                  listimg.paths.path_hrd = row.path_resolution;
                  listimg.paths.id_hrd = row.path_id;
                  break;
                case 4:
                  listimg.paths.path_hrm = row.path_resolution;
                  listimg.paths.id_hrm  = row.path_id;
                  break;
                case 5:
                  listimg.paths.path_md = row.path_resolution;
                  listimg.paths.id_md = row.path_id;
                  break;
                case 6:
                  listimg.paths.path_mm = row.path_resolution;
                  listimg.paths.id_mm = row.path_id;
                  break;
                default:
                  // Si un type inconnu est trouvé, le traiter ou ignorer
                  console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
                  break;
              }
            
              return acc;
            }, []);

        console.log("groupedResults")

         console.log(groupedResults)
 
            // Separate images by type

            var type1Images = {};
                  type1Images = groupedResults.filter(image => image.type_image === 1);
               
                    if(type1Images.length === 0){
                      type1Images = groupedResults.filter(data => data.model_id != null);
               
                    }

                console.log("type1Images")
                console.log(type1Images)

                const image_with_path = type1Images[0]?.paths;
              
                console.log("image_with_path")  
                console.log(image_with_path)  
               
                setimageResolutions(image_with_path)
  
               
                // const type2Images = groupedResults.filter(image => image.type_image === 2);
                const type2Images = groupedResults
                .filter(image => image.type_image === 2)
                .sort((a, b) => b.id_image - a.id_image); // Tri décroissant
              console.log("type2Images")
              console.log(type2Images)
                const tab_paths = type2Images.map(item => {
                  return {
                    id_image: item.id_image,
                    paths: item.paths
                  };
                });
                
                    // const secondary_image_with_path = type2Images[0]?.paths;
                      setsecondary_imageResolutions(tab_paths)

                setprincipal_data(type1Images)
                setsecondary_data(type2Images)
                // console.log(type1Images);
                // console.log(type2Images);

        } catch (err) {
          console.log(err);
        
        }
      };
      fetchData();
    } , []);
  


    const handleVideoChange = (event) => {
      const files = Array.from(event.target.files); // Permettre plusieurs fichiers
    
      if (files.length > 0) {
          // Créer un Set basé sur les chemins déjà existants pour éviter les doublons
          const existingPaths = new Set([...videoPreviews]); // videoPreviews contient les aperçus actuels
    
          files.forEach((file) => {
              const reader = new FileReader();
    
              reader.onload = () => {
                  const newVideoPath = reader.result; // Chemin de la nouvelle vidéo
    
                  // Vérifier si la vidéo est déjà enregistrée (éviter les doublons)
                  if (!existingPaths.has(newVideoPath)) {
                      existingPaths.add(newVideoPath); // Ajouter au Set
    
                      // Mettre à jour les prévisualisations vidéo
                      setVideoPreviews((prev) => [...prev, newVideoPath]);
    
                      // Sauvegarder le chemin dans l'état videos (sans doublons)
                      setUploadevideo((prev) => {
                          const updatedVideos = { ...prev };
    
                          // Initialiser `path` s'il est absent
                          const currentPaths = updatedVideos.path || [];
    
                          // Ajouter uniquement si le chemin est unique
                          if (!currentPaths.includes(newVideoPath)) {
                              updatedVideos.path = [...currentPaths, newVideoPath];
                          }
    
                          return updatedVideos;
                      });
                  }
              };
    
              reader.readAsDataURL(file); // Lit la vidéo comme DataURL
          });
      }
    };
    
    
    const handleRemoveVideo = (index) => {
        setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
    };
    
   const groupPathsById = (imageResolutions) => {
    const grouped = [];
   
      console.log("imageResolutions")
      console.log(imageResolutions)
    // Parcours des clés de `imageResolutions`
    if(imageResolutions){
      Object.keys(imageResolutions).forEach((key) => {
        if (key.startsWith("path_")) {
          // Identifier l'id correspondant (clé id_*)
          const idKey = `id_${key.split("_")[1]}`;
          const id = imageResolutions[idKey];
    
          // console.log("idKey")
          //  console.log(idKey)
          // Extraire le suffixe après le dernier `_`
          const path = imageResolutions[key];
          const suffixMatch = path.match(/_([^_]+)\.[a-z]+$/);
          var suffix = "";
  
          if(idKey === "id_od"){
            suffix = "high desktop"
          }
          else if(idKey === "id_om"){
            suffix = "high mobile"
          }
         else if(idKey === "id_hrd"){
            suffix = "tag desktop"
          }
         else if(idKey === "id_hrm"){
            suffix = "tag mobile"
          }
         else if(idKey === "id_md"){
            suffix = "mini desktop"
          }
          else if(idKey === "id_mm"){
            suffix = "mini mobile"
          }
    
          grouped.push({
            id,
            path,
            suffix,
          });
        }
      });
    }
   
  
    return grouped;
  };

  
  const groupedPaths = groupPathsById(imageResolutions);

  
  const groupPathsForImages = (imageArray) => {
    const groupedImages = [];
  
    imageArray.forEach((image) => {
      const { id_image, paths } = image; // Extraire id_image et paths de chaque objet
      const groupedPaths = [];
  
      // Parcourir les clés de l'objet `paths`
      Object.keys(paths).forEach((key) => {
        if (key.startsWith("path_")) {
          // Identifier l'id correspondant (clé id_*)
          const idKey = `id_${key.split("_")[1]}`;
          const id = paths[idKey];
  
          // Obtenir le chemin et générer le suffixe
          const path = paths[key];
          let suffix = "";
  
          switch (idKey) {
            case "id_od":
              suffix = "high desktop";
              break;
            case "id_om":
              suffix = "high mobile";
              break;
            case "id_hrd":
              suffix = "tag desktop";
              break;
            case "id_hrm":
              suffix = "tag mobile";
              break;
            case "id_md":
              suffix = "mini desktop";
              break;
            case "id_mm":
              suffix = "mini mobile";
              break;
            default:
              suffix = "unknown";
          }
  
          groupedPaths.push({
            id,
            path,
            suffix,
          });
        }
      });
  
      // Ajouter l'image et ses chemins groupés à la liste finale
      groupedImages.push({
        id_image,
        groupedPaths,
      });
    });
  
    return groupedImages;
  };
  
 
  
  
  useEffect(() => {
    const handleScroll = () => {
      const secondaryNavbar = document.querySelector('.title_nav');
      const stickyPosition = secondaryNavbar.offsetTop;
 
      if (window.pageYOffset >= stickyPosition) {
        // setIsFixed(true);
      } else {
        // setIsFixed(false);
      }
    };
 
    window.addEventListener('scroll', handleScroll);
 
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
    const [nav1, setNav1] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slider1, setSlider1] = useState(null);
    // Etat pour la sélection
  const [selectedPhotographe, setSelectedPhotographe] = useState([]);
  const [selectedStyl, setselectedStyl] = useState([]);
  const [selectedcoif, setselectedcoif] = useState([]);
  const [selectedMaqu, setselectedMaqu] = useState([]);
  const [selectedBoutique, setselectedBoutique] = useState([]);

  const toggle_newimage = (id) => {
   // Trouver l'élément avec l'ID correspondant
   const item = secondary_imageResolutions.find((entry) => entry.id_image === id);

         console.log("Élément correspondant :", item);
         const list = groupPathsById(item?.paths);
     
     setdetail_image(list)
   };

  // Fonction de gestion du changement de sélection
  const handleSelectPChange = (value) => {
    setSelectedPhotographe(value);
  };

  const handleSelectMChange = (value) => {
    setselectedMaqu(value);
  };
  
  const handleSelectBChange = (value) => {
    setselectedBoutique(value);
  };
  const handleDelete_uq = (key) => {
  //   // Supprime l'image
    console.log(`Suppression de ${key}`);

    return false;
    // Simule la suppression
    const updatedImages = { ...images, [key]: null };
    setImages(updatedImages);
  };

  const handle_new_Upload = (event, key) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`Upload pour ${key}: ${file.name}`);
      // Simule l'upload et mise à jour
      const updatedImages = { ...images, [key]: URL.createObjectURL(file) };
      setImages(updatedImages);
    }
  };

  const handleUpdate_image = async (e, id, setGroupedPaths) => {
    const file = e.target.files[0]; // Récupération du fichier
    
    if (file) {
      console.log(`Updating image for ID: ${id}`);
      const formData = new FormData();
  // return false;
      try {
        let finalFile = file;
   
        formData.append("files", finalFile);
        
        // Ajout de l'ID de l'image dans FormData
        formData.append("id", id);
  
        // Envoi de la requête API pour mettre à jour l'image
        const response = await axios.post(
          `${apiUrl}/uploadfiles/changemodel_img`,
          formData, // Envoi des données FormData directement
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
  
        console.log(response);

        return false;
        if (response.data) {
          const updatedPath = response.data.updatedPath; // Chemin de la nouvelle image
  
          // Mise à jour de l'état des images dans groupedPaths
          setGroupedPaths((prevPaths) =>
            prevPaths.map((image) =>
              image.id === id ? { ...image, path: updatedPath } : image
            )
          );
  
          console.log("Image mise à jour avec succès :", updatedPath);
        } else {
          console.error("Erreur lors de la mise à jour de l'image :", response.data.message);
        }
      } catch (error) {
        console.error("Erreur lors de la compression ou de l'envoi :", error);
      }
    }
  };

  
   // Fonction de gestion du changement de sélection
   const handleSelectCoifChange = (value) => {
    setselectedcoif(value);
  };

   // Fonction de gestion du changement de sélection
   const handleSelectStylChange = (value) => {
    setselectedStyl(value);
  };
  
  
   // Fonction de gestion du changement de sélection
   const setupdate_form = async (value) => {
    console.log("value");
    console.log(value);
    setselected_image(value)
    
 
   const param_collabs = {id : value};

   console.log("param_collabs")
   
   console.log(param_collabs)

   try {
    const rep1 = await axios.post(`${apiUrl}/Collabs/image_photographes`, param_collabs );
    const rep2 = await axios.post(`${apiUrl}/Collabs/image_maquilleurs`, param_collabs );
           
     const rep3 = await axios.post(`${apiUrl}/Collabs/image_stylistes`, param_collabs );
     const rep4 = await axios.post(`${apiUrl}/Collabs/image_coiffeurs`, param_collabs );
     const rep5 = await axios.post(`${apiUrl}/Collabs/image_boutiques`, param_collabs );
    
   //  liste des collabs par images
  const image_photographes = rep1?.data;
  const image_maquilleurs = rep2?.data;
  const image_stylistes = rep3?.data;
  const image_coiffeurs = rep4?.data;
  
  const image_boutiques = rep5?.data;

  
  // console.log("image_photographes")
  // console.log(image_photographes)
  if(image_photographes.length === 0){
    setSelectedPhotographe([])
  }
  
  if(image_stylistes.length === 0){
    setselectedStyl([])
  }

  if(image_maquilleurs.length === 0){
    setselectedMaqu([])
  }

  if(image_coiffeurs.length === 0){
    setselectedcoif([])
  }


  if(image_boutiques.length === 0){
    setselectedBoutique([])
  }
  console.log(image_maquilleurs)
  console.log(image_stylistes)
  console.log(image_coiffeurs)
   
   } catch (err) {
     console.log(err);
   
   }
  };
const fetchContributeurs = async (id) => {
  
  const response = await axios.post(`${apiUrl}/fashion_model/contrib`, {
    id_image: id,
  }); 
 
  return response; // Exemple : { name: "John Doe" }
};
   
useEffect(() => {
  const enrichImages = async () => {
    // Clone des images pour enrichissement
    const updatedList = await Promise.all(
      this_model.map(async (item) => {
        var list_photograph = {};
        var list_maquilleur = {};
        var list_styliste = {};
        var list_coiffeur = {};
        const contribu = await fetchContributeurs(item?.id_image);
       
      if(contribu?.data != null){
          list_photograph = contribu?.data[0];
          list_maquilleur = contribu?.data[1];
          list_styliste = contribu?.data[2];
          list_coiffeur = contribu?.data[3];
        
        return {
            ...item,
            list_photograph,
            list_maquilleur,
            list_styliste,
            list_coiffeur,
          };
      }
      else{ 
          list_photograph ={photographes: []};
          list_maquilleur = {maquilleurs: []};
          list_styliste = {stylistes: []};
          list_coiffeur = {coiffeurs: []};
        
        return {
        ...item, 
        list_photograph,
            list_maquilleur,
            list_styliste,
            list_coiffeur,
      };}
     
      })
    );
  
    setthis_modelNew(updatedList);
    setIsEnriched(true); // Marque les données comme enrichies
 
  };
 
  if (this_model.length > 0 && !isEnriched) {
    enrichImages();
  }
}, [this_model ,isEnriched]);
 

// grouper la liste des collabs


const grouped_photographes = list_photgraphes.reduce((acc, row) => {
  // Vérifie si le mannequin existe déjà dans l'accumulateur
  let collab = acc.find(item => item.collab_id === row.collab_id);
  
  if (!collab) {
    // Si non, crée une nouvelle entrée pour ce mannequin
    collab = {
      collab_id: row.collab_id,
      nom: row.person_nom,
      // prenom: row.prenom,
      pseudo: row.person_pseudo,
      // type_image: row.type_image,
      // type_model: row.type_model,
      // userclient: row.userclient,
      // id_image: row.id_image,
      // image_name: row.image_name,
      //  paths: {}
       };
    acc.push(collab);
  }
  
  // Ajoute le path_image correspondant au type_resolution
  // switch (row.type_resolution) {
  //   // case 1:
  //   //   mannequin.paths.path_od = row.path_resolution;
  //   //   break;
  //   // case 2:
  //   //   mannequin.paths.path_om = row.path_resolution;
  //   //   break;
  //   // case 3:
  //   //   mannequin.paths.path_hrd = row.path_resolution;
  //   //   break;
  //   // case 4:
  //   //   mannequin.paths.path_hrm = row.path_resolution;
  //   //   break;
  //   case 5:
  //     mannequin.paths.path_md = row.path_resolution;
  //     break;
  //   case 6:
  //     mannequin.paths.path_mm = row.path_resolution;
  //     break;
  //   default:
  //     // Si un type inconnu est trouvé, le traiter ou ignorer
  //     // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
  //     break;
  // }

  return acc;
}, []);


const grouped_maquilleurs = list_maquilleurs.reduce((acc, row) => {
  // Vérifie si le mannequin existe déjà dans l'accumulateur
  let collab = acc.find(item => item.collab_id === row.collab_id);
  
  if (!collab) {
    // Si non, crée une nouvelle entrée pour ce mannequin
    collab = {
      collab_id: row.collab_id,
      nom: row.person_nom,
      // prenom: row.prenom,
      pseudo: row.person_pseudo,
      // type_image: row.type_image,
      // type_model: row.type_model,
      // userclient: row.userclient,
      // id_image: row.id_image,
      // image_name: row.image_name,
      //  paths: {}
       };
    acc.push(collab);
  }
  
  // Ajoute le path_image correspondant au type_resolution
  // switch (row.type_resolution) {
  //   // case 1:
  //   //   mannequin.paths.path_od = row.path_resolution;
  //   //   break;
  //   // case 2:
  //   //   mannequin.paths.path_om = row.path_resolution;
  //   //   break;
  //   // case 3:
  //   //   mannequin.paths.path_hrd = row.path_resolution;
  //   //   break;
  //   // case 4:
  //   //   mannequin.paths.path_hrm = row.path_resolution;
  //   //   break;
  //   case 5:
  //     mannequin.paths.path_md = row.path_resolution;
  //     break;
  //   case 6:
  //     mannequin.paths.path_mm = row.path_resolution;
  //     break;
  //   default:
  //     // Si un type inconnu est trouvé, le traiter ou ignorer
  //     // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
  //     break;
  // }

  return acc;
}, []);


const grouped_stylistes = list_stylistes.reduce((acc, row) => {
  // Vérifie si le mannequin existe déjà dans l'accumulateur
  let collab = acc.find(item => item.collab_id === row.collab_id);
  
  if (!collab) {
    // Si non, crée une nouvelle entrée pour ce mannequin
    collab = {
      collab_id: row.collab_id,
      nom: row.person_nom,
      // prenom: row.prenom,
      pseudo: row.person_pseudo,
      // type_image: row.type_image,
      // type_model: row.type_model,
      // userclient: row.userclient,
      // id_image: row.id_image,
      // image_name: row.image_name,
      //  paths: {}
       };
    acc.push(collab);
  }
  
  // Ajoute le path_image correspondant au type_resolution
  // switch (row.type_resolution) {
  //   // case 1:
  //   //   mannequin.paths.path_od = row.path_resolution;
  //   //   break;
  //   // case 2:
  //   //   mannequin.paths.path_om = row.path_resolution;
  //   //   break;
  //   // case 3:
  //   //   mannequin.paths.path_hrd = row.path_resolution;
  //   //   break;
  //   // case 4:
  //   //   mannequin.paths.path_hrm = row.path_resolution;
  //   //   break;
  //   case 5:
  //     mannequin.paths.path_md = row.path_resolution;
  //     break;
  //   case 6:
  //     mannequin.paths.path_mm = row.path_resolution;
  //     break;
  //   default:
  //     // Si un type inconnu est trouvé, le traiter ou ignorer
  //     // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
  //     break;
  // }

  return acc;
}, []);


const grouped_coiffeurs = list_coiffeurs.reduce((acc, row) => {
  // Vérifie si le mannequin existe déjà dans l'accumulateur
  let collab = acc.find(item => item.collab_id === row.collab_id);
  
  if (!collab) {
    // Si non, crée une nouvelle entrée pour ce mannequin
    collab = {
      collab_id: row.collab_id,
      nom: row.person_nom,
      // prenom: row.prenom,
      pseudo: row.person_pseudo,
      // type_image: row.type_image,
      // type_model: row.type_model,
      // userclient: row.userclient,
      // id_image: row.id_image,
      // image_name: row.image_name,
      //  paths: {}
       };
    acc.push(collab);
  }
  
  // Ajoute le path_image correspondant au type_resolution
  // switch (row.type_resolution) {
  //   // case 1:
  //   //   mannequin.paths.path_od = row.path_resolution;
  //   //   break;
  //   // case 2:
  //   //   mannequin.paths.path_om = row.path_resolution;
  //   //   break;
  //   // case 3:
  //   //   mannequin.paths.path_hrd = row.path_resolution;
  //   //   break;
  //   // case 4:
  //   //   mannequin.paths.path_hrm = row.path_resolution;
  //   //   break;
  //   case 5:
  //     mannequin.paths.path_md = row.path_resolution;
  //     break;
  //   case 6:
  //     mannequin.paths.path_mm = row.path_resolution;
  //     break;
  //   default:
  //     // Si un type inconnu est trouvé, le traiter ou ignorer
  //     // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
  //     break;
  // }

  return acc;
}, []);
const grouped_boutiques = list_boutiques.reduce((acc, row) => {
  // Vérifie si le mannequin existe déjà dans l'accumulateur
  let collab = acc.find(item => item.collab_id === row.collab_id);
  // console.log(row)
  if (!collab) {
    // Si non, crée une nouvelle entrée pour ce mannequin
    collab = {
      collab_id: row.collab_id,
      nom: row.nom_boutique,
      // prenom: row.prenom,
      pseudo: row.nom_boutique,
      // type_image: row.type_image,
      // type_model: row.type_model,
      // userclient: row.userclient,
      // id_image: row.id_image,
      // image_name: row.image_name,
      //  paths: {}
       };
    acc.push(collab);
  }
  
  // Ajoute le path_image correspondant au type_resolution
  // switch (row.type_resolution) {
  //   // case 1:
  //   //   mannequin.paths.path_od = row.path_resolution;
  //   //   break;
  //   // case 2:
  //   //   mannequin.paths.path_om = row.path_resolution;
  //   //   break;
  //   // case 3:
  //   //   mannequin.paths.path_hrd = row.path_resolution;
  //   //   break;
  //   // case 4:
  //   //   mannequin.paths.path_hrm = row.path_resolution;
  //   //   break;
  //   case 5:
  //     mannequin.paths.path_md = row.path_resolution;
  //     break;
  //   case 6:
  //     mannequin.paths.path_mm = row.path_resolution;
  //     break;
  //   default:
  //     // Si un type inconnu est trouvé, le traiter ou ignorer
  //     // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
  //     break;
  // }

  return acc;
}, []);
 

// fin groupement de la liste des collabs
      useEffect(() => {
        setNav1(slider1);
      }, [slider1]);

      
 
      // Fonction pour ouvrir et fermer le modal
      
  const [isModalOpen, setIsModalOpen] = useState(false);
       // Fonction pour ouvrir le modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    // setIsNotification(false)
    setImagePreviews([])
    setUploadeimages([])
  };

      // const [contactModalOpen, setContactModalOpen] = useState(false);
      const openContactModal = () => setContactModalOpen(true);
   
      const [TypeView, setTypeView] = useState("calendar");

      const handleView = (event) => {
        setTypeView(event.currentTarget.dataset.mode);
      };
    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

      // Détecter les changements de taille de l'écran
      useEffect(() => {
        const handleResize = () => {
          setDeviceWidth(window.innerWidth);
        };
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
     
       // Fonction pour obtenir le chemin de l'image adapté à la largeur de l'appareil
       const getPathForResolution = (paths) => {

        // console.log("paths")
        // console.log(paths)

        if (deviceWidth <= 720) {
          return paths.path_mm; // Résolution miniature
        }
         else if (deviceWidth <= 1080) {
          return paths.path_md; // Résolution moyenne
        }
         else {
          return paths.path_md; // Résolution haute
        }

      };
      // another images settings
  const [images, setimages] = useState([]); 
  // const [imagePreview, setImagePreview] = useState(null);
    useEffect(() => {

        if(this_modelNew.length > 0){
          
          const list = [
            ...new Set(
              this_modelNew.map((p) => ({
                id: p?.id,
                location: "Lomé",
                  thumb: p?.path_image,
                src: p?.path_image,
                title:p?.pseudo,
                caption: `
                <div class="captiondata">
                  <h4>${p?.pseudo || "Sans nom"}</h4>
                    <div class='item_li'><label>Photographes:</label> ${
                    p?.list_photograph?.photographes
                      ?.map((photographe) => `<a href="/singleViewP/4/${photographe[0]?.id}" style="margin-right: 5px;">${photographe[0]?.pseudo}</a>`)
                      .join(' ') || "-"
                  }</div>
                    <div class='item_li'><label>Stylistes:</label> ${
                    p?.list_styliste?.stylistes
                      ?.map((styliste) => `<a href="/singleViewP/7/${styliste[0]?.id}" style="margin-right: 5px;">${styliste[0]?.pseudo}</a>`)
                      .join(' ') || "-"
                
                  }</div>
                    <div class='item_li'><label>coiffeurs:</label> ${
                      p?.list_coiffeur?.coiffeurs
                      ?.map((coiffeurs) => `<a href="/singleViewP/5/${coiffeurs[0]?.id}" style="margin-right: 5px;">${coiffeurs[0]?.pseudo}</a>`)
                      .join(' ') || "-"
                  }</div>
                  
                  <div class='item_li'><label>Maquilleurs:</label> ${
                    p?.list_maquilleur?.maquilleurs
                      ?.map((maquilleur) => `<a href="/singleViewP/6/${maquilleur[0]?.id}" style="margin-right: 5px;">${maquilleur[0]?.pseudo}</a>`)
                      .join(' ') || "-"
                  }</div>
              
                </div>
              `,

                }))
            ),
          ];
          setimages(list)
        }
            
    } , [this_modelNew]);

 const [imagePreviews, setImagePreviews] = useState([]);
 const [imagesupload, setUploadeimages] = useState([]); 
 
 const handleRemoveImage = (index) => {
   setImagePreviews((prev) => prev.filter((_, i) => i !== index));
 };

 const handleImageChange = (event) => {
  const files = Array.from(event.target.files); // Permettre plusieurs fichiers

  if (files.length > 0) {
    // Créer un Set basé sur les chemins déjà existants
    const existingPaths = new Set([...imagePreviews]); // imagePreviews contient les aperçus actuels

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const newImagePath = reader.result; // Chemin de la nouvelle image

        // Vérifier si l'image est déjà enregistrée (éviter les doublons)
        if (!existingPaths.has(newImagePath)) {
          existingPaths.add(newImagePath); // Ajouter au Set

          // Mettre à jour les aperçus
          setImagePreviews((prev) => [...prev, newImagePath]);

          // Sauvegarder le chemin dans l'état images (sans doublons)
          setUploadeimages((prev) => {
            const updatedImages = { ...prev };

            // Initialiser `path` s'il est absent
            const currentPaths = updatedImages.path || [];
            
            // Ajouter uniquement si le chemin est unique
            if (!currentPaths.includes(newImagePath)) {
              updatedImages.path = [...currentPaths, newImagePath];
            }

            return updatedImages;
          });
        }
      };

      reader.readAsDataURL(file); // Lit l'image comme DataURL
    });
  }
};

 
  const [isnotification, setIsNotification] = useState(false);
  const [formData, setFormData] = useState({
    model: {
      nom: "",
      prenom: "",
      pseudo: "",
      // date_naissance: "",
      //   taille: "",
      // poids: "",
      // indication: "",
     
    }
    
  });

  const handleInputChange = (type, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
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

  const compressImageWithMaxSize = async (file, maxWidth, maxHeight, maxSize) => {
    let options = {
      maxWidthOrHeight: Math.max(maxWidth, maxHeight),
      useWebWorker: true,
    };
  
    let compressedFile = await imageCompression(file, options);
    
    // Vérifier si la taille du fichier est inférieure à la taille maximale
    if (compressedFile.size > maxSize) {
      // Réduire la qualité de l'image pour respecter la taille
      const quality = Math.max(0.1, maxSize / compressedFile.size); // Calculer un facteur de qualité basé sur la taille
      options = { maxWidthOrHeight: Math.max(maxWidth, maxHeight), maxSize: maxSize, useWebWorker: true, initialQuality: quality };
      compressedFile = await imageCompression(file, options);
    }
  
    return compressedFile;
  };


  const compressImage = async (file, maxWidth, maxHeight) => {
    const options = {
      maxWidthOrHeight: Math.max(maxWidth, maxHeight),
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  };

  const next_option = async () => {
    // console.log("Envoi des images au serveur...");
  
    if (!imagesupload?.path || imagesupload.path.length === 0) {
      console.error("Aucune image à télécharger");
      return;
    }
  
    const formData = new FormData();
  
    // Parcourir toutes les images
    for (let index = 0; index < imagesupload.path.length; index++) {
      const base64Image = imagesupload.path[index];
      const originalFileName = `image-${index + 1}.jpeg`;
  
      // Ajouter un timestamp pour rendre le nom unique
      const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
      const uniqueFileName = `${originalFileName.split(".")[0]}_${timestamp}.jpeg`;
  
      try {
        // Convertir l'image Base64 en fichier
        const file = base64ToFile(base64Image, uniqueFileName);
        // console.log(file)
  
        if (file.size > 350000) {
          // Compresser les images avec des tailles max spécifiques
          const [desktopImage, mobileImage, thumbnailDesktop, thumbnailMobile] = await Promise.all([
            compressImage(file, 1920, 1080), // Desktop haute qualité
            compressImageWithMaxSize(file, 1280, 720, 300000), // Mobile haute qualité, 300 Ko max
            compressImage(file, 600, 400),  // Miniature Desktop
            compressImageWithMaxSize(file, 400, 250, 50000),  // Miniature Mobile, 40 Ko max
          ]);
 
          formData.append("files", mobileImage, uniqueFileName); // Original
          formData.append("files", mobileImage, `${uniqueFileName}_desktop`);
          formData.append("files", mobileImage, `${uniqueFileName}_mobile`);
          formData.append("files", thumbnailMobile, `${uniqueFileName}_thumbnail_desktop`);
          formData.append("files", thumbnailMobile, `${uniqueFileName}_thumbnail_mobile`);
        } else {

          const [thumbnailMobile] = await Promise.all([
              // compressImage(file, 600, 400),  // Miniature Desktop
            compressImageWithMaxSize(file, 400, 250, 50000),  // Miniature Mobile, 40 Ko max
          ]);
          
          // Ne pas compresser si la taille est déjà inférieure à 500 Ko
          formData.append("files", file, uniqueFileName); // Original
          formData.append("files", file, `${uniqueFileName}_desktop`);
          formData.append("files", file, `${uniqueFileName}_mobile`);
          formData.append("files", thumbnailMobile, `${uniqueFileName}_thumbnail_desktop`);
          formData.append("files", thumbnailMobile, `${uniqueFileName}_thumbnail_mobile`);
    
          // formData.append("files", file, `${uniqueFileName}_thumbnail_desktop`);
          // formData.append("files", file, `${uniqueFileName}_thumbnail_mobile`);
        }
  
      } catch (compressionError) {
        console.error(`Erreur lors de la compression de l'image ${uniqueFileName} :`, compressionError);
        continue; // Continuer avec les autres images même en cas d'erreur
      }
    }
  
    try {
      // Envoi des fichiers compressés au serveur
      const response = await axios.post(`${apiUrl}/uploadfiles/saveFile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
  
      // console.log("Fichiers uploadés avec succès :", response.data);
      return response.data?.files;
    } catch (uploadError) {
      console.error("Erreur lors de l'envoi des fichiers :", uploadError.response?.data || uploadError.message);
    }
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info('sauvegarde en cours' , {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });

    var data_model = {}

    if(setupdated){
       data_model = {
        data :  selected_image,
        photographes : selectedPhotographe,
        stylistes : selectedStyl,
        maquilleurs : selectedMaqu,
        coiffeurs : selectedcoif,
        boutiques : selectedBoutique,
      }
    }
    else{
       data_model = {
        data :  this_model[0]?.idmannequin ,
        photographes : selectedPhotographe,
        stylistes : selectedStyl,
        maquilleurs : selectedMaqu,
        coiffeurs : selectedcoif,
        boutiques : selectedBoutique,
      }

      const imgs_upld = await next_option(); // Attend que la fonction résolve la promesse
    
      var all_images = []; // Initialise un tableau pour organiser les images
      
      // Parcourir les images par groupes de 5
      for (let i = 0; i < imgs_upld.length; i += 5) {
        const groupedImage = {
          o_desktop: imgs_upld[i] || null, // Image originale desktop
          hr_desktop: imgs_upld[i + 1] || null, // Haute résolution desktop
          hr_mobile: imgs_upld[i + 2] || null, // Haute résolution mobile
          m_desktop: imgs_upld[i + 3] || null, // Miniature desktop
          m_mobile: imgs_upld[i + 4] || null, // Miniature mobile
        };
      
        all_images.push(groupedImage); // Ajouter l'image groupée au tableau final
      }
      
         
         
          // const param = {all_images ,data_model}
        
    }
   

    console.log(data_model)

    // return false;
  
       

        try {

          // console.log("setupdated")
          
          // console.log(setupdated)

          // return false;
          if(setupdated === true){
          await axios
                .post(`${apiUrl}/fashion_model/updateimages_fashionmodel`,
                       data_model
                    )
                .then((result) => {
        
            // console.log("result.data")
              console.log(result)
            //   console.log(result.data?.user)

            //  return false;

            
                if(result){
                  setTimeout(() => {
                  
                    toast.success('image modifiée avec succès' , {
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
                    
                  // setImages([])
                  // setnewuserdata([result.data?.new_pseudo , result.data?.new_pass])
                    // affciher une notif
                    // setIsNotification(true)
                    // setIsloaded(true)
                      setImagePreviews([])
                     setUploadeimages([])
                    setIsModalOpen(false);
                    

                  // arreter le loader

                  // afficher le recap
                }, 3500); // Délai de 3 secondes

                
      
                }
              }); 
            }
            else{

              //  console.log(data_model)
              
              const values = { 
                 all_images : all_images,
                data_model: data_model
              }

              console.log("values")
              console.log(values)
            //  return false;
              await axios
              .post(`${apiUrl}/fashion_model/addimages_fashionmodel`,
                values
                )
              .then((result) => {
          
              // console.log("result.data")
                console.log("result")
                console.log(result)
              //   console.log(result.data?.user)
  
              //  return false;
  
              
                  if(result){
                    setTimeout(() => {
                    
                      toast.success('image ajoutée avec succès' , {
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
                      
                    // setImages([])
                    // setnewuserdata([result.data?.new_pseudo , result.data?.new_pass])
                      // affciher une notif
                      // setIsNotification(true)
                      // setIsloaded(true)
                        setImagePreviews([])
                       setUploadeimages([])
                      setIsModalOpen(false);
                      
  
                    // arreter le loader
  
                    // afficher le recap
                  }, 5500); // Délai de 3 secondes
  
                  
        
                  }
                }); 

            }
              
        } catch (err) {
          console.log("erreur");
          // setError(err.response.data);
        }
  };
 

  const [images_list, setImages_list] = useState({

    path_hrd: "",
    id_hrd: "",

    path_hrm: "",
    id_hrm: "",

    path_md: "",
    id_md: "",

    path_mm: "",
    id_mm: "",

    path_od: "",
    id_Od : "",

    path_om: "",
    id_Om : ""
  });

  // console.log(images_list)
  // console.log(images_list)
  
  const handleDelete = async (imageId, modelId , type_image) => {

const type_img = type_image;


// console.log(imageId, parseInt(modelId) , type_img)
    // return false;
    try {
      // Vérification que l'imageId et modelId sont fournis
      if (!imageId || !modelId) {
        console.error("ID de l'image ou du modèle manquant");
        return;
      }
  
      // Envoyer la requête de suppression vers le serveur
      const data = { imageId :imageId ,
                     modelId : parseInt(modelId) ,
                     type_img
                    }
      const response = await axios.post(`${apiUrl}/fashion_model/deleteImagesFashionModel`,
        data );

     console.log(response)
  // return false;
      // Vérification de la réponse du serveur
      if (response.status === 200) {
        console.log("Image supprimée avec succès:", response.data.message);
        // setIsEnriched(false)
          // Mettre à jour l'état pour supprimer l'image de la liste sans recharger
          setsecondary_data((prev) => prev.filter((item) => item.id_image !== imageId));
        // Vous pouvez ajouter un rafraîchissement ou une mise à jour de l'interface utilisateur ici
      } else {
        console.error("Erreur lors de la suppression de l'image:", response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API de suppression:", error);
    }
  };
   
  return (
    <>

{isModalImgOpen && (
        <ImageModal
        id={id_model}
        groupedPaths={groupedPaths}
          onClose={() => setIsModalImgOpen(false)}
          // handleDelete={handleDelete_uq}
          handleUpdate={handleUpdate_image}
        />
      )}

{IsModalImg_secondaryOpen && (
        <Secondary_ImageModal
        data={detail_image}
          onClose={() => setIsModalImg_secondaryOpen(false)}
          // handleDelete={handleDelete_uq}
          handleUpdate={handleUpdate_image}
        />
      )}
        {/* <Header_menu data ={{ link : 'mannequin' }}/> */}
        <div className="admin_datacontent">
              <ToastContainer className="toast_style"/>
   
          <div className="admin_zone agent_description col-12 col-sm-12">

          {principal_data.map((p) => (
                                  <>

              <div className="row description_content">
              {/* <MannequinNavigation className="custom-MnavigationMobile"/> */}

                <div className="col-12 col-lg-3 col-md-3 col-sm-12 img_box">
                      <div className="product-card desc_picture">


                      {/* <MannequinNavigation className="custom-MnavigationDesktop"/> */}
                <div className="imgpart">
                      <div className="photoRx">
                            
                             <div className="product-card-img">
                             <label className='del_btn_primary' 
                                    onClick={() => setIsModalImgOpen(true)}
                              
                                  >
                                    <FaEdit />
                                  </label>
                                  <a className="hover-switch" href={`${apiUrl}/${p?.path_image}`}>
                               
                                   <img  src={`${apiUrl}/${getPathForResolution(p.paths)}` }
                                         alt="image" className='img profile-image'/>                                                                      
                                    </a>
                                 
                            </div>
                            <div className="name">
                            <label className='modelname'>{p?.nom} {p?.pseudo}</label>
                              <div className="categorie_agent">
                                <label htmlFor="">
                                   
                                  <span className='flag'>
                                    <img src="/assets/img/flags/tg.jpeg" alt="" />
                                  </span>
                                </label>

                                
                              </div>
                            </div>
                           

                            <div className="agent_rxsx">
                         
                              <ul className='list_rxsx'>
                                  <li className='rxsx_item'>

                              
                                    <a href="/">
                                    <FontAwesomeIcon icon={faInstagram} size="sm" />

                                    </a>

                                
                                  </li>
                                  <li className='rxsx_item'>
                                  <a href="/">
                                    <FontAwesomeIcon icon={faYoutube} size="sm" />

                                    </a>
                                  

                                </li>
                                <li className='rxsx_item'>
                                <a href="/">
                                    <FontAwesomeIcon icon={faTiktok} size="sm" />

                                    </a>
                                
                                  </li>
                                  <li className='rxsx_item'>
                                  <a href="/">
                                    <FontAwesomeIcon icon={faLinkedin} size="sm" />

                                    </a>
                                

                                </li>
                                <li className='rxsx_item'>
                                <a href="/">
                                    <FontAwesomeIcon icon={faFacebook} size="sm" />

                                    </a>
                              

                                  </li>
                                
                              </ul>
                              
                            
                  
                            </div>

                      </div>
                          
                </div>
                <div className="detailspart ">
                        
 
                          <div className="personalInformation">

                            <div className="model_data">
                              <div className="data">
                                <label className="label">
                                  Taille:
                                </label>
                                <label className='value'>
                                  1.70m
                                </label>
                              </div>
                              <div className="data">
                                <label className="label">
                                Robe:
                                </label>
                                <label className='value'>
                                34
                                </label>
                              </div>
                              <div className="data">
                                <label className="label">
                                Chaussures:
                                </label>
                                <label className='value'>
                                45
                                </label>
                              </div>
                              <div className="data">
                                <label className="label">
                                Poitrine:
                                </label>
                                <label className='value'>
                                75
                                </label>
                              </div>
                              <div className="data">
                                <label className="label">
                                Hanche:
                                </label>
                                <label className='value'>
                                88
                                </label>
                              </div>
                              <div className="data">
                                <label className="label">
                                Poitrine:
                                </label>
                                <label className='value'>
                                75
                                </label>
                              </div>
                              <div className="data">
                                <label className="label">
                                Waist:
                                </label>
                                <label className='value'>
                                60
                                </label>
                              </div>
                                <button className='btn_more'>
                                  ...
                              </button>
                            </div>

                           
                         
                            
                          </div>

                          <div className="btn_list">
                          <button className='btn_like'>
                                <FontAwesomeIcon className='icon' icon={faThumbsUp} size="sm" />
                          </button>
                          <button className='btn_share'>
                              <FontAwesomeIcon className='icon' icon={faShare} size="sm" />
                          </button>
                        <button className='btn_contact' onClick={openContactModal}>
                        <FontAwesomeIcon icon={faIdCard} className='icon'/>
                         contacts
                        </button>
                       
                           
                          </div>
                         
                       

                         
                </div>
                     
                      
                     </div>
                </div>


                <div className="col-12 col-lg-9 col-md-9 col-sm-12 details_zone">
                  
                <div className="container tab_list_box">
                     <div className="tab-list product-tab-list sticky_nav">
                                             <nav className= {`nav title_nav ${isFixed ? 'fixed_navb' : ''}`}>
                                                 
                                               <a className="product-tab-link tab-link" href="#bio" data-bs-toggle="tab">
                                                   <FontAwesomeIcon className="mr-3" size="lg" icon={faUser} />
                                                       Bio
                                               </a>
                                            
                                               <a className="product-tab-link tab-link active" href="#photos" data-bs-toggle="tab">
                                                   <FontAwesomeIcon className="mr-3" size="lg" icon={faImage} />
                                                       Photos
                                               </a>
                                               <a className="product-tab-link tab-link" href="#videos" data-bs-toggle="tab">
                                                   <FontAwesomeIcon className="mr-3" size="lg" icon={faFilm} />
                                                       Vidéos
                                               </a>
                                               <a className="product-tab-link tab-link" href="#events" data-bs-toggle="tab">
                                                 <FontAwesomeIcon  className=" mr-3"  size="lg" icon={faCalendar}/>
                                               Events
                                               </a>
                                             </nav>
                                       </div>

                 
                    <div className="tab-content col-12 ">

                         <div id="bio" className="tab-pane fade show">
                            <div className="  model_bio">
                                
   
                                       bio
                    
                            </div>
                          </div> 
                           {/* Section Photos */}
                           <div id="photos" className="tab-pane fade show active">
                            <div className="row gallery-container">
                                

                               {secondary_data.map((item ,index) => (
                                  <>
                                  {secondary_data.length > 0 &&
                                  
                                  (
                                    <>
                               <div  key={item?.id_image} data-id={item.id_image} className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">
                                <div className="product-card">
                                  <div className="product-card-img">
                                    
                                
                                  <a
                                   
                                      data-fancybox="gallery"
                                    href={`${apiUrl}/${item.src}`}
                                    data-caption={item.caption}
                                         
                                  >
                                     
                                      <img 
                                      // src={`${apiUrl}/${item.thumb}`}
                                      // src={`${apiUrl}/${item.thumb}`}
                                      src={`${apiUrl}/${getPathForResolution(item.paths)}` }
                                       alt={item.paths} />
                                    </a>
                                        

                                    
                                  </div>
                                  

                                 
                                  
                                </div>
                                {/* <label className='edit_btn' 
                                 onClick={() => {
                            
                                  openModal();
                                  setupdating(true);
                                  setupdate_form(item?.id_image);
                                }}>
                                  edit
                                </label> */}
                                  <label className='del_btn_primary' 
                                    // onClick={() => setIsModalImg_secondaryOpen(true)}
                                    onClick={() => (setIsModalImg_secondaryOpen(true)
                                                   , toggle_newimage(item?.id_image))}
                                  >
                                    <FaEdit />
                                  </label>
                                <label className='del_btn' 
                                  onClick={() => {
                            
                                    // openModal();
                                    // setupdating(true);
                                    handleDelete(item?.id_image , id_model);
                                  }}>x</label>
                                
                              </div>
                               

                                    </>
                                  )}
                                
                                  </>
                                 ))}
                               
                              
                              
                            </div>
                            <div className="btn_zone">
                            <label className="new_item mx-3" onClick={openModal} > + nouveau</label>
        
                            </div>
                          </div> 
                         
                        {/* Section Vidéos */}

                        <div id="videos" className="tab-pane fade">
                          <div className="row">
                                
                                </div>
  
                                <div className="btn_zone">
                                  <label className="new_item mx-3" onClick={openModal2} > + nouveau</label>
          
                                

                              </div>
                          </div>   
                
                          {/* Section Events */}
                          <div id="events" className="tab-pane fade from_detail">
                          <div className="row">
                               {   
                                     // affichage type calendrier
                                     TypeView_N === "calendar" ? 
                                      
                                      (
                                        // <div className="calendar_view">
                                       
                                       <Calendar_view 
                                         events_tab = {events} 
                                         type_model = {type_model}
                                         setTypeView_N={setTypeView_N}
                                       />
  
                                        // </div>
                                      ) 
                                      :
                                       (
                                        // affichage type timeline
                                        <Timeline_view 
                                            events = {events} 
                                            type_model = {type_model}
                                       
                                            setTypeView_N={setTypeView_N}
                                        
                                    />  )
                                    }

                                    {/* <div className="mode_affichage_container">
                                      <div className="btn_box">
                                        {TypeView === "calendar" ? (
                                          <>
                                            <button className="view_btn active">
                                              <FontAwesomeIcon icon={faCalendar} />
                                            </button>
                                            <button className="view_btn" data-mode="timelines" onClick={handleView}>
                                              <FontAwesomeIcon icon={faList} />
                                            </button>
                                          </>
                                        ) : (
                                          <>
                                            <button className="view_btn" data-mode="calendar" onClick={handleView}>
                                              <FontAwesomeIcon icon={faCalendar} />
                                            </button>
                                            <button className="view_btn active">
                                              <FontAwesomeIcon icon={faList} />
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    </div> */}

                           </div>
                        </div>
                    </div>
                </div>

                </div>
              </div>  
              </>
               ))}
             
          </div>        
        </div>


        {/* Modal */}
    
   {/* Modal pour Mise à jour */}
     {/* Modal */}
     
        {isModalOpen && (
        <div style={styles.modalOverlay}>
            {/* Bouton Fermer */}
          
          <div style={styles.modalContent}>
            <button onClick={closeModal} style={styles.closeButton}>
              X
            </button>
            {setupdating === true ?
            (
              <>
                <h2 style={{fontSize : "18px" , textAlign : "center"}}>mise à jour</h2>
           
              
              </>

            )

            :

            (
              <>
               <h2 style={{fontSize : "18px" , textAlign : "center"}}>nouveau mannequin</h2>
           
              </>
            )

            }
          

            {isnotification ?
          (
            <>
            
            </>
            )

            :

            (
              <>
              {/* Formulaire */}
              <form onSubmit={handleSubmit}>
                      

              <div style={styles.formGroup} className='text-center'>
                        <label htmlFor="image-upload" style={styles.uploadLabel}>
                          {/* Zone de prévisualisation de l'image */}
                          {imagePreviews.map((src, index) => (
                            <div style={styles.imageContainer} key={index}>
                              <img
                                src={src}
                                alt={`Prévisualisation ${index + 1}`}
                                style={styles.imagePreview}
                              />
                              <button
                                style={styles.removeButton}
                                onClick={() => handleRemoveImage(index)}
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                          {imagePreviews.length === 0 && <span  style={styles.textspan}>+ Ajouter des images</span>}
    
                          <input
                           id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                             multiple
                             style={styles.hiddenInput}
                          />
                        </label>
                      </div>
                      <div style={styles.formGroup}>
                        {/* <label>photographe(s) :</label> */}
                        <SelectComponent
          options={grouped_photographes}
          label="Photographes"
          value={selectedPhotographe}
          onChange={handleSelectPChange}
          id="photographe-select"
          defaultValue="Sélectionner un photographe"
        />

<SelectComponent
          options={grouped_stylistes}
          label="Styliste(s)"
          value={selectedStyl}
          onChange={handleSelectStylChange}
          id="styliste-select"
          defaultValue="Sélectionner un styliste"
        />

<SelectComponent
          options={grouped_coiffeurs}
          label="Coiffeurs"
          value={selectedcoif}
          onChange={handleSelectCoifChange}
          id="coiffeur-select"
          defaultValue="Sélectionner un coiffeur"
        />

<SelectComponent
          options={grouped_maquilleurs}
          label="Maquilleurs"
          value={selectedMaqu}
          onChange={handleSelectMChange}
          id="maquilleur-select"
          defaultValue="Sélectionner un maquilleur"
        />
                    
<SelectComponent
          options={grouped_boutiques}
          label="boutiques"
          value={selectedBoutique}
          onChange={handleSelectBChange}
          id="boutiques-select"
          defaultValue="Sélectionner une boutique"
        />
                    
                            </div>
                    
                     

                     
                      <div className="text-center">
                      <button type="submit" style={styles.submitButton}>Enregistrer</button>
                  
                      </div>
                      </form>
              </>
            )
          
          
          }
           

          
          </div>
        </div>
      )}





{isModalOpen2 && (
    <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
            <button onClick={closeModal2} style={styles.closeButton}>
                X
            </button>
            {setupdating === true ? (
                <>
                    <h2 style={{ fontSize: "18px", textAlign: "center" }}>Mise à jour</h2>
                </>
            ) : (
                <>
                    <h2 style={{ fontSize: "18px", textAlign: "center" }}>Nouvelle Vidéo</h2>
                </>
            )}

            {isnotification ? (
                <>
                    {/* Notifications ou messages à afficher */}
                </>
            ) : (
                <>
                    {/* Formulaire */}
                    <form onSubmit={handleSubmitVideo}>
            <label htmlFor="video-upload" style={{ display: 'block', marginBottom: '10px' }}>
                <span style={styles.textspan}>+ Ajouter des vidéos</span>

                <input
                    id="video-upload"
                    type="file"
                    accept="video/*" // Accepter uniquement les fichiers vidéo
                    onChange={handleVideoChange}
                    multiple
                    style={{ display: 'none' }} // Masquer l'input par défaut
                />
            </label>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {videoPreviews.map((src, index) => (
                    <div key={index} style={{ marginBottom: '10px', position: 'relative' }}>
                        <video controls src={src} style={{ width: '300px', height: 'auto' }} />
                        <button
                            type="button"
                            onClick={() => handleRemoveVideo(index)}
                            style={{
                                position: 'absolute',
                                top: '0',
                                right: '0',
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                padding: '5px',
                            }}
                        >
                            ✕
                        </button>
                    </div>
                ))}
                {videoPreviews.length === 0 && <span style={{ color: '#888' }}>Aucune vidéo sélectionnée</span>}
            </div>

            <div className="text-center" style={{ marginTop: '20px' }}>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
                    Enregistrer
                </button>
            </div>
        </form>
                </>
            )}
        </div>
    </div>
)}


                      
                 

      <FixedMenu/>
    </>
  )
}



// Styles pour le modal et les boutons
const styles = {
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex : '999',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  submitButton: {
    padding: '4px 8px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display : 'inline-block'
  },
  closeButton: {
    marginTop: '10px',
    padding: '5px 8px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    float: "right",
    // marginRight: "1em",
    display : 'inline-block'
  },
  imageLabel: {
    display: 'block',
    cursor: 'pointer',
    textAlign: 'center',
    padding: '10px',
    border: '1px dashed #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    position: 'relative',
  },
  textspan: {
  
    fontSize: '12px',
  },
  fileInput: {
    display: 'none',
  },
  imagePreview: {
    maxWidth: '100%',
    maxHeight: '150px',
    marginBottom: '10px',
  },
  uploadLabel: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100px",
    height: "100px",
    border: "2px dashed #aaa",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "24px",
    color: "#aaa",
  },

  hiddenInput: {
    display: "none",
  },
};


export default Admin_modelSingleView
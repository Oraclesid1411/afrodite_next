// import React from 'react'
'use client';

// import React from 'react'
import React, { useState, useEffect ,useRef } from 'react';
import { useParams ,usePathname  } from "next/navigation";
// import React, { useState, useEffect } from 'react';
// import { Link , useLocation } from 'react-router-dom';
import axios from 'axios'
// import Header_menu from './Header_menu'
import Modal from 'react-modal';

// import FixedMenu from '../Components/FixedMenu';


// import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faFacebook, faLinkedin, faYoutube, faWhatsapp, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {faUser,faCalendar, faImage,faFilm ,faList ,faContactCard,faHeart,faComment, faThumbsUp, faShare, faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import { faUserPlus , faInfo} from '@fortawesome/free-solid-svg-icons';

// import { map } from 'jquery';
// import Influenceur from '../Pages/infuenceur';
// import ImageModal from './ImageModal';
// import Calendar_view from '../Pages/Calendar_view';
// import Timeline_view from '../Pages/Timeline_view';


const Influenceur = React.lazy(() => import('../../components/models/infuenceur.jsx'));
const Timeline_view = React.lazy(() => import('../events/Timeline_view.jsx'));
const Calendar_view = React.lazy(() => import('../events/Calendar_view'));
const ImageModal = React.lazy(() => import('../images/ImageModal.jsx'));

import { Tooltip, OverlayTrigger } from 'react-bootstrap';


import { useAuth } from "../../Context/AuthenticateContext.jsx";
import {apiUrl} from "../../config/apiUrl.js"

function SingleViewP() {

    const params = useParams();
    const auth = useAuth();
    const user_info = auth.currentUser;
    const pathname = usePathname();
   

    axios.defaults.withCredentials = true;
  
    const type_model = params?.type;
    const id_model = params?.id;   

    const param = {type_model, id_model}
const pages_param ={
  link_url :  pathname,
  type_model : type_model,
  id_model:id_model,
   person : "collab"

 };

    // const pages_param ={
    //   link_url :  current_location?.pathname,
    //   type_model : type_model,
    //   id_model:id_model,
    //   person : "collab"
    
    //  };

     console.log("pages_param")
     console.log(pages_param)
     const [hasLiked, setHasLiked] = useState(false);
     const [like_count, setlike_count] = useState(0);
     const [hasFollowed, setHasFollowed] = useState(false);
     const [hasShared, setHasShared] = useState(false);
     const [shares_count, setshares_count] = useState(0);
     const [followers_count, setFollowers_count] = useState(0);
         
    //  const [pageId, setPageId] = useState(null);
     const [pageData, setPageData] = useState(null);
   
 
    const [events , setEvents] = useState([]);
    
    const [showAll, setShowAll] = useState(false); // Etat pour contrôler l'affichage des données
    // const [dropdownOpen, setDropdownOpen] = useState(false); // Etat pour ouvrir/fermer le dropdown
    // const [showAll, setShowAll] = useState(false);
  
    const toggleShowAll = () => {
      setShowAll(!showAll);
    }; 
  
  const [loading, setLoading] = useState(true); // Loader state
      const [loading_img, setLoading_img] = useState(false); // Loader state
     
      const handleDataLoaded = (isLoaded) => {
    
        if (isLoaded) {
           setLoading_img(false)
    
          console.log("Data has been loaded successfully.");
          // Optionally update any other state or trigger side effects
        }
      };

   let categorie = null

   if(type_model == 1){
    categorie = 'Photographe'

   } else if(type_model == 3){
    categorie = 'Coiffeur'

   }else if(type_model == 2){
    categorie = 'Maquilleur'

   }
   else if(type_model == 4){
    categorie = 'Styliste'

   }
   else if(type_model == 5){
    categorie = 'boutique'

   }
   else{
    categorie = null

    console.log(categorie)
   }

   
 
       const [TypeView, setTypeView] = useState("calendar");
//  const [loading, setLoading] = useState(true); // Loader state
  //  const [loading_img, setLoading_img] = useState(false); // Loader state
    const [TypeView_N, setTypeView_N] = useState("calendar"); // Par défaut en mode calendrier
    useEffect(() => {
      const fetchData = async () => {
     
      try {
       
           const rep1 = await axios.post(`${apiUrl}/events/all` , {id_model  : id_model});
       console.log('rep1')
       console.log(rep1)
       
          const grouped_event = rep1?.data.reduce((acc, row) => {
            // Vérifie si le mannequin existe déjà dans l'accumulateur
                      console.log("row")
                      console.log(row)
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
                // statut : row.statut,
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
 
      //  const handleView = (event) => {
      //    setTypeView(event.currentTarget.dataset.mode);
      //  };
   const [isFixed, setIsFixed] = useState(false);
   const [this_model, setthis_model] = useState([]);
  //  const [principal_data, setprincipal_data] = useState([]);
   const [oeuvres, setOeuvres] = useState([]);
   const [CollabOeuvres, setCollabOeuvres] = useState([]);
   const [like_moment , setlike_moment] = useState([]);
 
 
  // const apiUrl = 'http://localhost:5000'

 
  //  const param = {type_model, id_model}

   const set_location = async (id , type_location) => {
   
    const list = [id , type_location]

    console.log("list")

    console.log(list)

  const  response = await axios.post(`${apiUrl}/locations/getlocation`, list );
  const { this_pays, this_ville, this_quartier } = response.data;
  if (response.data) {
  switch (type_location) {
    case 1:
      return this_pays?.length > 0 ? this_pays[0]?.nom : "-";
    case 2:
      return this_ville?.length > 0 ? this_ville[0]?.nomville : "-";
    case 3:
      return this_quartier?.length > 0 ? this_quartier[0]?.nomquartier : "-";
    default:
      return "-";
  }

}

return "-";
 
  };

   useEffect(() => {
    
      const fetchData = async () => {
       
        try {
         

          var rep1 = null

          // console.log(typeof type_model)
console.log(param)
          if(type_model == "1"){
            rep1 = await axios.post(`${apiUrl}/photographer/this_model`, param );

           } else if(type_model == "3"){
            rep1 = await axios.post(`${apiUrl}/coiffeur/this_model`, param );

           }else if(type_model == "2"){
            rep1 = await axios.post(`${apiUrl}/maquilleur/this_model`, param );

           }
           else if(type_model === "4"){
            // alert('test')
            rep1 = await axios.post(`${apiUrl}/styliste/this_model`, param );
           
           }
           else if(type_model === "5"){
            // alert('test')
            rep1 = await axios.post(`${apiUrl}/Collabs/boutique_data`, param );
           
           }
           else{
            null
           }
          
           console.log("rep1")
           console.log(rep1.data)

           const rep3 = await axios.post(`${apiUrl}/pages/this_page`, pages_param);
           console.log("rep3")
           console.log(rep3)
           setPageData(rep3?.data)
        
          //  ssetmodelData
        //  const res = await axios.post(`${apiUrl}/auth/login` , inputs);
        setthis_model(rep1.data)
       
          // ouevres du collab
          const oeuvres_for_mannequins = await axios.post(`${apiUrl}/Collabs/oeuvres_for_mannequins`, {
            id: param,
          });
console.log("param")
console.log(param)
             console.log("oeuvres_for_mannequins")   
             console.log(oeuvres_for_mannequins.data) 
             setCollabOeuvres(oeuvres_for_mannequins.data?.oeuvres)  
             setLoading(false)
        } catch (err) {
          console.log(err);
        
        }
      };
      fetchData();


      const fetchData2 = async () => {
       
        try {
         

          let rep2 = null


          if(type_model == 4){
            
            rep2 = await axios.post(`${apiUrl}/photographer/oeuvres`, {id : id_model} );
            
           } else if(type_model == 5){
            rep2 = await axios.post(`${apiUrl}/coiffeur/oeuvres`, {id : id_model} );

           }else if(type_model == 6){
            rep2 = await axios.post(`${apiUrl}/maquilleur/oeuvres`, {id : id_model} );

           }else if(type_model == 7){
            rep2 = await axios.post(`${apiUrl}/styliste/oeuvres`, {id : id_model} );

           }else{
            null
           }
      
         setOeuvres(rep2.data)

         
        } catch (err) {
          console.log(err);
        
        }
      };
      fetchData2()
      
    } , []);

      
 useEffect(() => {
  
  const fetchData_page = async () => {
   
     try {

      console.log("pageData")
      console.log(pageData)
   if(pageData?.length > 0){
     const pages_param_b =  {
      pageid : pageData[0]?.id,
      user: user_info?.id,
    }   
  
    const page_stat = await axios.post(`${apiUrl}/posts/pages_stats`, pages_param_b);
    const user_interact = await axios.post(`${apiUrl}/posts/hasLike_page`, pages_param_b);
    // alert('pass')
    console.log("page_stat")
    console.log(page_stat)

    
    console.log("user_interact")
    console.log(user_interact)
    setlike_count(page_stat?.data?.count_like)
    setFollowers_count(page_stat?.data?.count_followers)
    setshares_count(page_stat?.data?.count_sharing)
    setHasLiked(user_interact?.data?.success_like)
    setHasFollowed(user_interact?.data?.success_follow)
    // setHasShared(user_interact?.data?.success_sharing)
    if(user_interact?.data?.like_data){
      if(user_interact?.data?.like_data.length > 0){
        const like_time = user_interact?.data?.like_data[0]?.date_like;
        setlike_moment(like_time)
      }
    }
 

    // setlike_count(page_stat?.data?.count)
    //    setHasLiked(page_stat?.data?.success)

      // setLoading(false); // Active le loader
    // }
    // else{

    // }

   }
    
    
    } 
    
    catch (err) {
      console.log('return error')
      console.log(err);
    
    }
    finally {
      // setLoading(false); // Désactive le loader
      console.log('to long:')
    }
  };

  fetchData_page();

} , [pageData]);

    const [modelData, setModelData] = useState([
    // { label: 'expériences', value: ' ' },
    // { label: 'avec afrodites', value: '' },
    // { label: 'Spécialité', value: '' },
    { label: 'pays', value: "" },
    { label: 'Ville', value: "" },
    { label: 'Quartier', value: '' },
    
    { label: 'lieu', value: '' },
    { label: 'contact', value: '' },
    { label: 'whatsapp', value: '' },
  ]);

  // Fonction de vérification des valeurs par défaut
  const hasDefaultValues = () =>
    modelData.some(
      item =>
        (item.label === 'pays' && item.value === "") ||
        (item.label === 'Ville' && item.value === "") ||
        (item.label === 'Quartier' && item.value === "")
    );

  const groupedData = async () => {
    const results = await this_model.reduce(async (accPromise, row) => {
      const acc = await accPromise;
console.log("row")
console.log(row)
      let model = acc.find(item => item.model_id === row.idcontributeur);

      if (!model) {
        // Récupère les localisations
        var pays = "";
        var ville = "";
        var quartier = "" ;
        var indicatif_1 ="";
        var tel_1 ="";
        var indicatif_2 ="";
        var tel_2 = "";
        var indication_lieu = "";

        if(type_model != 5){
          // alert('test')
            pays = await set_location(row.pays, 1);
            ville = await set_location(row.ville, 2);
            quartier = await set_location(row.quartier, 3);
            indicatif_1 = row.indicatif;
            tel_1 = row.num_tel;
            indicatif_2= row.indicatif_2;
            tel_2 = row.num_tel_2;
            indication_lieu  = row.indication;
        }
        else{
            pays = await set_location(row.pays_boutique, 1);
            ville = await set_location(row.ville_boutique, 2);
            quartier = await set_location(row.quartier_boutique, 3);
            indicatif_1 =  row.indicatif_tel  ;
            tel_1 = row.tel1;
            indicatif_2= row.indicatif_tel_2;
            tel_2 = row.tel_2;
            indication_lieu  = row.detail_lieu;
        }
      
        console.log("pays dsfgfdshdfhfdhhgkg")
        console.log(pays)

        model = {
          model_id: row.idcontributeur,
          nom: row.nom,
          prenom: row.prenom,
          pseudo: row.person_pseudo,
          // lieu: row.detail_lieu,
          contact:    indicatif_1 +" " +tel_1  + " / " + indicatif_2 +" " +tel_2 ,
          whatsapp: indicatif_1 +" " + tel_1,
          lieu: indication_lieu,
          pays,
          ville,
          quartier,
          type_image: row.type_image,
          type_model: row.type_model,
          userclient: row.userclient,
          id_image: row.id_image,
          image_name: row.image_name,
          paths: {},
        };
        acc.push(model);
      }

      // Ajoute les paths en fonction de `type_resolution`
      switch (row.type_resolution) {
        case 3:
          model.paths.path_hrd = row.path_resolution;
          break;
        case 4:
          model.paths.path_hrm = row.path_resolution;
          break;
        case 5:
          model.paths.path_md = row.path_resolution;
          break;
        case 6:
          model.paths.path_mm = row.path_resolution;
          break;
        default:
          break;
      }

    // console.log("model")
    // console.log(model)
      return acc;
    }, Promise.resolve([]));

    return results;
  };

  useEffect(() => {
    // Vérifie les valeurs par défaut
    if (!hasDefaultValues()) return; // Arrête le useEffect si les valeurs ont été mises à jour

    const fetchAndUpdateData = async () => {
      const results = await groupedData();

      console.log("results:", results);

      console.log(results);
      if (results.length > 0) {
        const firstModel = results[0]; // Met à jour avec le premier mannequin pour l'exemple

        console.log("firstModel")
console.log(firstModel)
        setModelData(prevData =>
          prevData.map(item => {
            switch (item.label) {
              case 'pays':
                return { ...item, value: firstModel.pays || "-" };
              case 'Ville':
                return { ...item, value: firstModel.ville || "-" };
              case 'Quartier':
                return { ...item, value: firstModel.quartier || "-" };
                case 'lieu':
                  return { ...item, value: firstModel.lieu || "-" };
                  case 'contact':
                    return { ...item, value: firstModel.contact || "-" };
            
                    case 'whatsapp':
                      return { ...item, value: firstModel.whatsapp || "-" };
                
              default:
                return item;
            }
          })
        );
      }
    };

    fetchAndUpdateData();
  }, [groupedData, modelData]);

  const handleShare_b = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: 'Viens voir cette page !',
          url: window.location.href,
        });
        console.log('Partage réussi');
      } catch (error) {
        console.error('Erreur lors du partage:', error);
      }
    } else {
      alert("Le partage n'est pas pris en charge sur ce navigateur.");
    }
  };

   
  
  console.log("groupedData")
  console.log(groupedData)
  
  console.log(modelData)

  const groupedResults = this_model.reduce((acc, row) => {
    //   // Vérifie si le mannequin existe déjà dans l'accumulateur
      let model = acc.find(item => item.model_id === row.idcontributeur);
    
      
      if (!model) {
        // Si non, crée une nouvelle entrée pour ce mannequin
        model = {
          model_id: row.idcontributeur,
          nom: row.nom,
          prenom: row.prenom,
          pseudo: row.person_pseudo,
          nationalite: row.nationalite,
      
          youtube: row.youtube || '',
          tiktok: row.tiktok || '',
          instagram: row.instagram || '',
          facebook: row.facebook || '',
          linkedin: row.linkedin || '',

          type_image: row.type_image,
          type_model: row.type_model,
          userclient: row.userclient,
          id_image: row.id_image,
          image_name: row.image_name,
           paths: {} };
        acc.push(model);
     
      }
      
      // Ajoute le path_image correspondant au type_resolution
      switch (row.type_resolution) {
        // case 1:
        //   mannequin.paths.path_od = row.path_resolution;
        //   break;
        // case 2:
        //   mannequin.paths.path_om = row.path_resolution;
        //   break;
        case 3:
          model.paths.path_hrd = row.path_resolution;
          break;
        case 4:
          model.paths.path_hrm = row.path_resolution;
          break;
        case 5:
          model.paths.path_md = row.path_resolution;
          break;
        case 6:
          model.paths.path_mm = row.path_resolution;
          break;
        default:
          // Si un type inconnu est trouvé, le traiter ou ignorer
          // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
          break;
      }
    
      return acc;
    }, []);
   
        
    const groupedResults_O = CollabOeuvres.reduce((acc, row) => {
      // Vérifie si le mannequin existe déjà dans l'accumulateur
      let imges_liste = acc.find(item => item.id_image === row.id_image);
    
      // console.log("row")
      // console.log(row)
      // console.log( row.idcontributeur)
      // console.log("model")
        
      if (!imges_liste) {
        // Si non, crée une nouvelle entrée pour ce mannequin
        imges_liste = {
          id_image: row.id_image,
          nom: row.nom,
          prenom: row.prenom,
          pseudo: row.pseudo,
          pseudo_model: row.pseudo_model,
          idmannequin: row.idmannequin,
          type_image: row.type_image,
          type_model: row.type_model,
          userclient: row.userclient,
          // id_image: row.id_image,
          image_name: row.image_name,
           paths: {} };
        acc.push(imges_liste);
     
      }
      
      // Ajoute le path_image correspondant au type_resolution
      switch (row.type_resolution) {

       
        // case 1:
        //   mannequin.paths.path_od = row.path_resolution;
        //   break;
        // case 2:
        //   mannequin.paths.path_om = row.path_resolution;
        //   break;
        case 3:
          imges_liste.paths.path_hrd = row.path_resolution;
          break;
        case 4:
          imges_liste.paths.path_hrm = row.path_resolution;
          break;
        case 5:
          imges_liste.paths.path_md = row.path_resolution;
          break;
        case 6:
          imges_liste.paths.path_mm = row.path_resolution;
          break;
        default:
          // Si un type inconnu est trouvé, le traiter ou ignorer
          // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
          break;
      }
    
      return acc;
    }, []);

   

         const [selectedImage, setSelectedImage] = useState(null);
           const [isModalOpen, setIsModalOpen] = useState(false);
         
      const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
       
    
         const handleImageClick = (image) => {
           // setSelectedImage(image);
           // setIsModalOpen(true);
       
           // setLoading(true)
          setSelectedImage(image);
           setIsModalOpen(true);
               console.log(image)
           // setLoading(true)
                     setLoading_img(true)
       
            // Update the URL to include the image ID, reflecting that the modal is open
              // Construire le lien de l'image avec un format hash
               const imageUrl = `#image_${image.id_image}`;  // Exemple : #image_123

             // Ajouter l'ID de l'image au hash sans modifier le reste de l'URL
               window.location.hash = imageUrl;  // Ajoute le hash à l'URL actuelle

           // setLoading_img(false)
         };
         const handleCloseModal = () => {
           // alert('close modal')
           setIsModalOpen(false);
           setSelectedImage(null);
            // Revert the URL to the original one (i.e., without the modal's image ID)
            window.history.replaceState({}, '', window.location.pathname);
         };
         // Handle the browser back button or native back button to close the modal
         useEffect(() => {
           // Function to handle popstate event, which fires on back button press
           const handlePopState = (e) => {
             // alert('close')
             console.log(e.state)
             console.log(isModalOpen)
             if (isModalOpen === true) {
               handleCloseModal(); // Close modal if state indicates it's open
             }
           };
       
           // Listen for popstate event
           window.addEventListener('popstate', handlePopState);
       
           // Cleanup the event listener on component unmount
           return () => {
             window.removeEventListener('popstate', handlePopState);
           };
         }, [isModalOpen]);
         
       
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
       
        if (deviceWidth <= 720) {
          return paths.path_mm; // Résolution miniature
        } else if (deviceWidth <= 1080) {
          return paths.path_md; // Résolution moyenne
        } else {
          return paths.path_md; // Résolution haute
        }
      };

      const getPathForResolution_b = (paths) => {
        // console.log("paths")
        // console.log(paths)
        if (deviceWidth <= 720) {
          return paths.path_hrm; // Résolution miniature
        } else if (deviceWidth <= 1080) {
          return paths.path_hrd; // Résolution moyenne
        } else {
          return paths.path_hrd; // Résolution haute
        }
      };
   
      console.log("groupedResults")
      console.log(groupedResults)
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
   

    useEffect(() => {
        setNav1(slider1);
      }, [slider1]);

        const settings = {
        //   dots: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: false,
          autoplaySpeed: 1000,
          onReInit: () => setCurrentSlide(slider1?.innerSlider.state.currentSlide),
          lazyLoad: true,
          asNavFor: ".slider-nav",
          focusOnSelect: true,
          nextArrow: (
            <div>
              <div className="next-slick-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
              </div>
            </div>
          ),
      
          prevArrow: (
            <div>
              <div className="next-slick-arrow rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
              </div>
            </div>
          ),
       };


      const [modalIsOpen, setModalIsOpen] = useState(false);

      // Fonction pour ouvrir et fermer le modal
      const openModal = () => setModalIsOpen(true);
      const closeModal = () => setModalIsOpen(false);

      const [contactModalOpen, setContactModalOpen] = useState(false);
      const openContactModal = () => setContactModalOpen(true);
      const closeContactModal = () => setContactModalOpen(false);

      // Exemple d'event pour affichage dans le modal
      const contributor = [
        {name : "Koffi John", Role : "Photographe"},
        {name : "Ama Diyou", Role : "Coiffeuse"},
        {name : "Yao Danti", Role : "Styliste"},
        {name : "Vermaille Conte", Role : "Maquilleur"},
        {name : "Koffi John", Role : "Photographe"},
        {name : "Koffi John", Role : "Photographe"},
        {name : "Koffi John", Role : "Photographe"},
        {name : "Koffi John", Role : "Photographe"},
      ]

       
      // useEffect(() => {
      //   // Bind Fancybox to elements with [data-fancybox] attribute
      //   Fancybox.bind("[data-fancybox]", {
      //     infinite: false, // Example of configuration option
      //     buttons: ["zoom", "close"], // Customize buttons
      //   });

      //   // Cleanup on component unmount
      //   return () => {
      //     Fancybox.destroy();
      //   };
      // }, []);

      // like

      const handleLike = async (id) => {
 
        if (hasLiked) {
          
             const currentTime = new Date();

             const likeTime = new Date(like_moment);
             const diffMs = currentTime - likeTime;
             const diffMinutes = diffMs / (1000 * 60);

  if (diffMinutes < 1440) {
      // Annuler le like (like par erreur)
    try {
      const unlike_page = await axios.post(`${apiUrl}/posts/unlike_page`, {
        id: id[0]?.id,
        user: user_info?.id,
      });

      if (unlike_page.data?.value === 1) {
        setlike_count(like_count - 1);
        setHasLiked(false);
        setlike_moment(null);
        console.log("Like annulé car clic dans les 5 minutes");
      } else {
        console.log("Erreur lors de l'annulation du like");
      }
    } catch (error) {
      console.error('Erreur lors de l\'unlike', error);
    }
  } else {
    console.log("Like déjà effectué depuis plus de 5 minutes, aucune action.");
  }
          // console.log('Vous avez déjà aimé cette page !');
      
        } else {
          try {

            // alert('relike')
            const like_page = await axios.post(`${apiUrl}/posts/like_page`, {
              id: id[0]?.id,
              // id_post: postId,
              user: user_info?.id,
            });
    
             console.log("like_page.data")
              console.log(like_page.data)
             // return false;
            if (like_page) {
              if(like_page.data?.value === 1)
   
               setlike_count(like_count + 1);
              setHasLiked(true);
                // Afficher un message de succès avec Toastify
               //  toast.success('Page aimée avec succès !');
            }
            else{
                // Afficher un message de succès avec Toastify
               //  toast.success('erreur lors de l\'action !');
            }
          } catch (error) {
            console.error('Erreur lors du like', error);
          }
        }
      }; 

      const handleFollow = async (id) => {
 
        console.log(id)
       //  console.log(principal_data)
    
       //  return false;
        if (hasFollowed) {
          // alert('Vous avez déjà aimé cette page');
          // alert('se desabonner !');
        } else {
          try {
            const follow_page = await axios.post(`${apiUrl}/posts/follow_page`, {
              id: id[0]?.id,
              // id_post: postId,
              user: user_info?.id,
            });
    
            //  console.log("like_page.data")
            //   console.log(like_page.data)
             // return false;
            if (follow_page) {
              if(follow_page.data?.value === 1)
    
                setFollowers_count(followers_count + 1);
                setHasFollowed(true);
                // Afficher un message de succès avec Toastify
               //  toast.success('Page aimée avec succès !');
            }
            else{
                // Afficher un message de succès avec Toastify
               //  toast.success('erreur lors de l\'action !');
               console.log('erreur')
            }
          } catch (error) {
            console.error('Erreur lors du like', error);
          }
        }
      };  
      const handleShare = async (id) => {
     
        console.log(id)
       //  console.log(principal_data)
       if (navigator.share) {
        try {
          await navigator.share({
            title: document.title,
            text: 'Viens voir cette page !',
            url: window.location.href,
          });
          // envoi desdonnées au serveur
          const share_page = await axios.post(`${apiUrl}/posts/share_page`, {
            id: id[0]?.id,
            // id_post: postId,
            user: user_info?.id,
          });
    console.log("share_page")
    console.log(share_page)
          console.log('Partage réussi');

          if (share_page) {
            if(share_page.data?.value === 1)
 
              setshares_count(shares_count + 1);
            //  setHasLiked(true);
             // like_moment 
            //  setlike_moment(like_page.data?.like_moment)
              // Afficher un message de succès avec Toastify
             //  toast.success('Page aimée avec succès !');
          }
          else{
            console.log('erreur')
              // Afficher un message de succès avec Toastify
             //  toast.success('erreur lors de l\'action !');
          }
        } catch (error) {
          console.error('Erreur lors du partage:', error);
        }
      } else {
        alert("Le partage n'est pas pris en charge sur ce navigateur.");
      }
        return false;
        if (hasLiked) {
          // alert('Vous avez déjà aimé cette page');
          console.log('Vous avez déjà aimé cette page !');
        } else {
          try {
            const like_page = await axios.post(`${apiUrl}/posts/like_page`, {
              id: id[0]?.id,
              // id_post: postId,
              user: user_info?.id,
            });
    
             console.log("like_page.data")
              console.log(like_page.data)
             // return false;
            if (like_page) {
              if(like_page.data?.value === 1)
    
               setlike_count(like_count + 1);
              setHasLiked(true);
                // Afficher un message de succès avec Toastify
               //  toast.success('Page aimée avec succès !');
            }
            else{
                // Afficher un message de succès avec Toastify
               //  toast.success('erreur lors de l\'action !');
            }
          } catch (error) {
            console.error('Erreur lors du like', error);
          }
        }
      };
      
      // end like

      
     console.log("like_count")
    //  console.log(hasLiked)
     console.log(like_count)
  return (
    <>

{loading === true &&

(
  <div className="loader-container">
  <div className="spinner"></div>
  <p>Chargement en cours...</p>
</div>

)
}

{loading_img === true &&

(
  <div className="loader-container">
  <div className="spinner"></div>
  <p>Chargement en cours...</p>
</div>

)
}
        {/* <Header_menu data ={{ link : 'collab' }}/> */}
        <div className="main_container">
          <div className="agent_description col-12 col-sm-12">

         
              <div className="row description_content">

                          {groupedResults.map((p) => (
                             <div key={p.id} className="col-12 col-lg-3 col-md-3 col-sm-12 img_box">
                                                    <div className=" container_primary">
                                  <div className="start_box">
                                    <div className="model_identity">
                                      <div className="product-card-img">
                                        <a className="hover-switch"
                                         href={`${apiUrl}/${getPathForResolution(p.paths)}`} 
                                         data-fancybox="gallery">
                                          <img
                                            src={`${apiUrl}/${getPathForResolution(p.paths)}`}
                                              data-fancybox="gallery"
                                              loading="lazy"
                                            alt="image"
                                            className="img profile-image"
                                          />
                                        </a>
                            
                                            
                                      </div>

                                      <div className="name">
                                      {type_model === 5 ?
                                      (
                                        <label className="model_name">{p?.pseudo}</label>
                                      
                                      )
                                    
                                      :

                                      (
                                        <label className="model_name">{p?.pseudo}</label>
                                      
                                      )
                                    }
                                       
                                      </div>
                                     
                                    </div>
                                   <div className="rs_box">
                                                <ul className="list_rxsx" style={{'padding-left' : '0px'}}>
                                              {p.instagram && <>
                                                <li className="rxsx_item">
                                                <a href={p.instagram} target="_blank" rel="noopener noreferrer">
                                                  <FontAwesomeIcon icon={faInstagram} size="sm" color='white'/>
                                                </a>
                                              </li>
                                              </>}
                                  
                                              {p.youtube && <>
                                                <li className="rxsx_item">
                                                <a href={p.youtube} target="_blank" rel="noopener noreferrer">
                                                <FontAwesomeIcon icon={faYoutube} size="sm" color='white'/>
                                                </a>
                                              </li>
                                              </>}
                                  
                                              {p.tiktok && <>
                                                <li className="rxsx_item">
                                                <a href={p.tiktok} target="_blank" rel="noopener noreferrer">
                                                  <FontAwesomeIcon icon={faTiktok} size="sm" color='white'/>
                                                </a>
                                              </li>
                                              </>}
                                  
                                              {p.linkedin && <>
                                                <li className="rxsx_item">
                                                <a href={p.linkedin} target="_blank" rel="noopener noreferrer">
                                                  <FontAwesomeIcon icon={faLinkedin} size="sm" color='white'/>
                                                </a>
                                              </li>
                                              </>}
                                  
                                              {p.facebook && <>
                                                <li className="rxsx_item">
                                                <a href={p.facebook} target="_blank" rel="noopener noreferrer">
                                                  <FontAwesomeIcon icon={faFacebook} size="sm" color='white'/>
                                                </a>
                                              </li>
                                              </>}
                                            </ul>
                                                </div>
                                               
                                   
                                  </div>
                            
                                  <div className="center_box">
                                    <div className="top_box">
                                   
                                    </div>
                                    <div className="under_box">
                                                                 {/* <a className='btn_like'>
                                                                      <FontAwesomeIcon className='icon' icon={faThumbsUp} />
                                                                </a> */}
                                                 <a href="#"
                                                     onClick={() => handleLike(pageData)}
                                                    className={`btn_like ${hasLiked === true ? 'active' : ''}`} 
                                                                                                     
                                                  //  disabled={hasLiked === true}  // Désactive le bouton si l'utilisateur a déjà aimé
                                                                                                     
                                                >
                                                   <FontAwesomeIcon className='icon' icon={faThumbsUp} />
                                                      <span className="stat">{like_count}</span>
                                            </a>
                                                           <a href="#"
                                                                                               onClick={() => handleFollow(pageData)}
                                                                                               className={`btn_like ${hasFollowed === true ? 'active' : ''}`} 
                                                                                             
                                                                                               disabled={hasFollowed === true}  // Désactive le bouton si l'utilisateur a déjà aimé
                                                                                             
                                                                                           >
                                                                                                  <FontAwesomeIcon className='icon' icon={faUserPlus} />
                                                                                                  <span className="stat">{followers_count}</span>
                                                                                            </a>

                                                                                           

                                                                    <a href="#"
                                                                                                     onClick={() => handleShare(pageData)}
                                                                                                     className={`btn_like ${hasShared === true ? 'active' : ''}`} 
                                                                                                   
                                                                                                    //  disabled={hasShared === true}  // Désactive le bouton si l'utilisateur a déjà aimé
                                                                                                   
                                                                                                 >
                                                                                                        <FontAwesomeIcon className='icon' icon={faShare} />
                                                                                                        <span className="stat">{shares_count}</span>
                                                                                                  </a>
                                                                                         
                                                                 {/* <a className='btn_like'>
                                                                      <FontAwesomeIcon className='icon' icon={faShare} />
                                                                </a> */}
                            
                                    </div>
                                    <div className="bottom_box">
                                    <div className="image_zone">
                            
                                    {/* <img src={"/assets/img/morpho/morpho_h.jpg"} loading="lazy" alt="morpho" /> */}
                                  
                                    </div>
                                      </div>
                                    
                                  </div>
                            
                                  <div className="end_box">
                                      
                            <div className="data_detail">
                            <div className="dropdown-container">
                              <div className="dropdown_data">
                                <ul className="dropdown-list">

                                  {modelData.slice(0, showAll ? modelData.length : 4).map((item, index) => (
                                   
                                      <li key={index} className="dropdown-item collab_info">
                                          
                                           <strong>{item.label}:</strong> {item.value}

                                     </li>

                                  ))}

                                </ul>
                                <button className="dropdown-toggle_b" onClick={toggleShowAll}>
                                  {showAll ? '-' : '+'}
                                </button>
                              </div>
                            </div>
                            </div>
                                     
                                      
                                  </div>
                                                 </div>
                                            </div>   
                          ))}

        <div className="col-12 col-lg-9 col-md-9 col-sm-12 details_zone">

          
        <div className="container tab_list_box">
           <div className="tab-list product-tab-list sticky_nav">
                                    <nav className= {`nav title_nav ${isFixed ? 'fixed_nav' : ''}`}>
                                        
                                      
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

                        {/* Section Photos */}
                          <div id="photos" className="tab-pane fade show active">
                            <div className="row gallery-container models_gallery">
                                

                            {groupedResults_O.map((item ,index) => (
                                  <>
                                  {groupedResults_O.length > 0 &&
                                  
                                  (
                                    <>
                               <div  key={item?.id_image} data-id={item.id_image} className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">
                                <div className="product-card">
                                  <div className="product-card-img">
                                    
                                
                                     <label className="hover-switch">                                  
                                        <img
                                      key={item.id_image}
                                      src={`${apiUrl}/${getPathForResolution(item.paths)}` }
                                      alt={getPathForResolution(item.paths)} 
                                   loading="lazy"
                                       className="thumbnail"
                                      onClick={() => handleImageClick(item)}
                                    /> 
                                      </label>  

                                  
                                    
                                  </div>

                                  {/* {getPathForResolution(item.paths)} */}
                                  
                                </div>
                              </div>

                                    </>
                                  )}
                                
                                  </>
                                 ))}
                              
                            
                            </div>
                          </div> 

                        {/* Section Vidéos */}

                          <div id="videos" className="tab-pane fade">
                              <div className="row">
                                <div className="box col-lg-4 col-md-6 col-6 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">
                                  <div className="product-card video_card">
                                    <div className="product-card-img">
                                        <a className="hover-switch" data-fancybox="video-gallery" href="https://www.youtube.com/watch?v=5zV2tKuwNdA" data-caption="Video 1">
                                          <img 
                                          src="/assets/videos/video_1.PNG" 
                                          loading="lazy"
                                          alt="video" className="img" />
                                          <button className="play-button">▶</button>
                                        </a>
                                    </div>
                                    <div className="interaction_buttons">
                                        <button className="like-button">
                                            <FontAwesomeIcon icon={faHeart} /> 32
                                        </button>
                                        <button className="comment-button">
                                          <FontAwesomeIcon icon={faComment} /> 40
                                        </button>

                                       
                                      <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id="tooltip-top">Contributeurs</Tooltip>}
                                      >
                                         <button className='comment-button'  onClick={openModal}> 
                                        <FontAwesomeIcon icon={faInfo} />
                                      </button>
                                      </OverlayTrigger>
                                    </div>
                                  </div>
                                </div>
                              </div>
                          </div>   
                       
                    </div>
            
          </div>
         
        </div>        
        </div>
        </div>
        </div>

           {isModalOpen && selectedImage && (
                                    <ImageModal
                                    image={selectedImage}
                                    data = {groupedResults_O}
                                    onDataLoaded={handleDataLoaded} // Pass callback to the child
                                  
                                    onClose={handleCloseModal} />
           )}          
        {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Contributeurs"
        overlayClassName="custom-overlay"
        className="custom-modal"
        ariaHideApp={false} 
      >

        <h3>
          Contributeurs
        </h3>
         
        {contributor.map((value, keys) =>{
          return(
          <p className="post">
              <p to={Influenceur}>{value.name} --- {value.Role}</p>
          </p>)
        })}
        

        <button onClick={closeModal}>Retour</button>
      </Modal>



      <Modal
        isOpen={contactModalOpen}
        onRequestClose={closeContactModal}
        contentLabel="Contributeurs"
        overlayClassName="custom-overlay"
        className="custom-modal"
        ariaHideApp={false} 
      >

        <h3>
          Contact Info
        </h3>
         
        
        

        <button onClick={closeContactModal}>Retour</button>
      </Modal>


{/* <FixedMenu/> */}
   </>
  )
}

export default SingleViewP
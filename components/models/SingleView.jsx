'use client';

// import React from 'react'
import React, { useState, useEffect ,useRef } from 'react';
import { useParams ,usePathname  } from "next/navigation";
import Link from 'next/link';

// import { Link , useLocation } from 'react-router-dom';
import axios from 'axios'
// import Header_menu from './Header_menu.jsx' 
// import Modal from 'react-modal';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const Timeline_view = React.lazy(() => import('../events/Timeline_view.jsx'));
const Calendar_view = React.lazy(() => import('../events/Calendar_view'));
const ImageModal = React.lazy(() => import('../images/ImageModal.jsx'));
// import ImageModal from '../../../components/images/ImageModal.jsx'; 

// import Timeline_view from '../../../components/events/Timeline_view.jsx';
// import FixedMenu from './FixedMenu.jsx';
// import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFacebook, faLinkedin, faYoutube, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {faShare,faCalendar, faUserPlus,faUser, faImage,faFilm  ,faThumbsUp,faHeart,faComment, faInfo} from '@fortawesome/free-solid-svg-icons';

 
import { useAuth } from "../../Context/AuthenticateContext.jsx";
import {apiUrl} from "../../config/apiUrl.js"
// import video_img from "/assets/"
// const apiUrl = 'https://apiafro.aafrodites.com'

 
function SingleView() {
  const params = useParams();
  const auth = useAuth();
  const user_info = auth.currentUser;
  const pathname = usePathname();
  // const link_url = current_location?.pathname.split('/');
  const [loading, setLoading] = useState(true); // Loader state
  const [loading_img, setLoading_img] = useState(false); // Loader state
  const [visibleCount, setVisibleCount] = useState(9);

  const [liste_nationalite, setListe_nationalite] = useState([]); // Loader state
  const [liste_langue, setListe_langue] = useState([]); // Loader state
  const [liste_villes, setListe_villes] = useState([]); // Loader state
  const [TypeView_N, setTypeView_N] = useState("calendar"); // Par défaut en mode calendrier
  const galleryRef = useRef(null);
    axios.defaults.withCredentials = true;
    const type_model = params?.type;
    const id_model = params?.id;      // const apiUrl = 'http://localhost:5000'
const param = {type_model, id_model}
const pages_param ={
  link_url :  pathname,
  type_model : type_model,
  id_model:id_model

 };
 
  // zone de détail sur le model
 // afficher les détail en partie ou all
 
 const [principal_data, setprincipal_data] = useState([]);
 const [pageData, setPageData] = useState(null);
  
 const [secondary_data, setsecondary_data] = useState([]);
 const [model_video, setmodel_video] = useState([]);
 const [hasLiked, setHasLiked] = useState(false);
 const [hasFollowed, setHasFollowed] = useState(false);
 const [hasShared, setHasShared] = useState(false);
 const [like_count, setlike_count] = useState(0);
 const [like_moment , setlike_moment] = useState([]);

 const [shares_count, setshares_count] = useState(0);

 const [followers_count, setFollowers_count] = useState(0);

//  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
 const [deviceWidth, setDeviceWidth] = useState(null);

 useEffect(() => {
  if (typeof window !== 'undefined') {
    const handleResize = () => setDeviceWidth(window.innerWidth);

    setDeviceWidth(window.innerWidth); // initial
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }
}, []);
 const [videoPath, setVideoPath] = useState("");

 const [selectedImage, setSelectedImage] = useState(null);
 const [isModalOpen_img, setIsModalOpen_img] = useState(false);
 
const [TypeView, setTypeView] = useState("calendar");

 
 const [isFixed, setIsFixed] = useState(false);
 const [showAll, setShowAll] = useState(false); // Etat pour contrôler l'affichage des données
    const [events , setEvents] = useState([]);

    
  const modelData = [
    { label: 'Popularité', value: '56K' },
    { label: 'Taille', value: '1.70m' },
    { label: 'Hanche', value: '88' },
    { label: 'Robe', value: '34' },
    { label: 'Chaussures', value: '45' },
    { label: 'Poitrine', value: '75' },
    { label: 'age', value: '19 ans' },
    
  ];
 


  
 const loadMore = () => {
  if (visibleCount < secondary_data.length) {
    setVisibleCount((prev) => prev + 6);
  }
};
 
// console.log("document.body")
// console.log(document.body.offsetHeight)
// console.log("window.innerHeight")
// console.log(window.innerHeight)
 
// useEffect(() => {
//   let isFetching = false;

//   const handleScroll = () => {
//     const scrollPosition = window.innerHeight + window.scrollY;
//     const threshold = document.body.offsetHeight - 100;
// // alert('scroll')
//     if (scrollPosition >= threshold && !isFetching) {
//       isFetching = true;

//       setVisibleCount((prev) => {
//         const remaining = secondary_data.length - prev;
//         const nextCount = remaining > 6 ? prev + 6 : prev + remaining;
//         return nextCount;
//       });

//       // Empêche plusieurs appels rapides
//       setTimeout(() => {
//         isFetching = false;
//       }, 500); // 0.5s d’attente entre deux scrolls
//     }
//   };

//   window.addEventListener("scroll", handleScroll);
//   return () => window.removeEventListener("scroll", handleScroll);
// }, [secondary_data.length]);

useEffect(() => {
  const container = galleryRef.current;
  if (!container) return;

  let isFetching = false;

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight - 50 && !isFetching) {
      isFetching = true;

      setVisibleCount((prev) => {
        const remaining = secondary_data.length - prev;
        return prev + Math.min(6, remaining);
      });

      setTimeout(() => {
        isFetching = false;
      }, 400); // anti-spam scroll
    }
  };

  container.addEventListener("scroll", handleScroll);
  return () => container.removeEventListener("scroll", handleScroll);
}, [secondary_data.length]);


  useEffect(() => {
  
    const fetchData = async () => {
     
      try {
          
  
       const rep2 = await axios.post(`${apiUrl}/fashion_model/this_model_data`, param );
       const rep3 = await axios.post(`${apiUrl}/pages/this_page`, pages_param);
       const rep4 = await axios.post(`${apiUrl}/fashion_model/all_videos`, 
        {id : id_model ,
           categorie : type_model
        });
   

        
const videosWithDefaultSrc = rep4?.data?.map((video) => ({
  ...video,
  default_src: getDefaultSrc(video, deviceWidth),
}));


// console.log("videosWithDefaultSrc");

// console.log(videosWithDefaultSrc);

        setmodel_video(videosWithDefaultSrc)

      //  console.log("rep4.data")
      //  console.log(rep4.data)
       setPageData(rep3?.data)
    
          const groupedResults = rep2?.data?.list_rep.reduce((acc, row) => {
            // Vérifie si le mannequin existe déjà dans l'accumulateur

             let listimg = acc.find(item => item.id_image === row.id_image);
            
            if (!listimg) {
            
              // Si non, crée une nouvelle entrée pour ce mannequin
              listimg = {
                id_image: row.id_image,
                image_name: row.image_name,
                nom: row.nom,
                prenom: row.prenom,
                date_naissance: row.date_naissance,
                ville: row.ville,
                langue_a: row.langue_a,
                langue_b: row.langue_b,
                langue_c: row.langue_c,
                nationalite: row.nationalite,
                pseudo: row.pseudo,
                youtube: row.youtube || '',
                tiktok: row.tiktok || '',
                instagram: row.instagram || '',
                facebook: row.facebook || '',
                linkedin: row.linkedin || '',
           
                type_image: row.type_image,
                type_model: row.type_model,
                userclient: row.userclient,
                paths: {} };
              acc.push(listimg);
            }
            
            
            // Ajoute le path_image correspondant au type_resolution
            switch (row.type_resolution) {
              
              case 3:
                listimg.paths.path_hrd = row.path_resolution;
                break;
              case 4:
                listimg.paths.path_hrm = row.path_resolution;
                break;
              case 5:
                listimg.paths.path_md = row.path_resolution;
                break;
              case 6:
                listimg.paths.path_mm = row.path_resolution;
                break;
              default:
                // Si un type inconnu est trouvé, le traiter ou ignorer
                // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
                break;
            }

            // console.log("listimg")
            // console.log(listimg)
            return acc;
          }, []);

          
          // Separate images by type
              const type1Images = groupedResults.filter(image => image.type_image === 1);
              const type2Images = groupedResults
              .filter(image => image.type_image === 2)
              .sort((a, b) => b.id_image - a.id_image); // Tri décroissant
              setprincipal_data(type1Images)
              setsecondary_data(type2Images)
            

      } catch (err) {
        console.log(err);
      
      }
      finally {
        setLoading(false); // Désactive le loader
      }
    };
    fetchData();
  } , []);

// console.log("model_video")
// console.log(model_video)
// useEffect(() => {

//   const video = model_video ;
//   const handleResize = () => setDeviceWidth(window.innerWidth);
//   window.addEventListener("resize", handleResize);

//   // Choix de la résolution en fonction de la largeur
//   if (deviceWidth < 480) {
//     setVideoPath(video.path_360 || video.path);
//   } else if (deviceWidth < 768) {
//     setVideoPath(video.path_480 || video.path);
//   } else {
//     setVideoPath(video.path_720 || video.path);
//   }

//   return () => window.removeEventListener("resize", handleResize);
// }, [deviceWidth, model_video]);

const getDefaultSrc = (video, width) => {
  if (width < 300) return video.path_360 || video.path;
  if (width < 480) return video.path_480 || video.path;
  if (width < 720) return video.path_720 || video.path;
  return video.path;
};

         
// console.log("videoPath")
// console.log(videoPath)
 useEffect(() => {
  
  const fetchData_page = async () => {
   
    // console.log("pageData")
    // console.log(pageData)
    try {

   if(pageData?.length > 0){
     const pages_param_b =  {
      pageid : pageData[0]?.id,
      user: user_info?.id,
    }   
    console.log("pages_param_b")
    console.log(pages_param_b)

    const page_stat = await axios.post(`${apiUrl}/posts/pages_stats`, pages_param_b);
    const user_interact = await axios.post(`${apiUrl}/posts/hasLike_page`, pages_param_b);
      // alert('pass')
    console.log("user_interact")
    console.log(user_interact)
    console.log(page_stat)

    setlike_count(page_stat?.data?.count_like)
    setFollowers_count(page_stat?.data?.count_followers)
    setshares_count(page_stat?.data?.count_sharing)
    setHasLiked(user_interact?.data?.success_like)
    setHasFollowed(user_interact?.data?.success_follow)
    setHasShared(user_interact?.data?.success_sharing)
    if(user_interact?.data?.like_data){
      if(user_interact?.data?.like_data.length > 0){
        const like_time = user_interact?.data?.like_data[0]?.date_like;
        setlike_moment(like_time)
      }
    }
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

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
   
// les events du model ainsi que d'autres info secondaire
  useEffect(() => {
      const fetchData = async () => {
     

      try {

        const [rep1, rep_b, rep_c , rep_d] = await Promise.all([
          axios.post(`${apiUrl}/events/all_events_model`, { id_model }),
           axios.get(`${apiUrl}/locations/getAllVilles`),
          axios.get(`${apiUrl}/locations/liste_nationalite`),
          axios.get(`${apiUrl}/locations/liste_langue`),
         ]);
        
      
          const grouped_event = rep1?.data.reduce((acc, row) => {
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

          if(rep_b?.data.length > 0){
            setListe_villes(rep_b?.data)
          }
          if(rep_c?.data.length > 0){
            setListe_nationalite(rep_c?.data)
          }
          if(rep_d?.data.length > 0){
            setListe_langue(rep_d?.data)
          }
       
          setEvents(grouped_event);
       
      } catch (err) {
        console.log(err);
      
      }
    };
    fetchData();
  } , []);
 

  function setLangues(idLangue) {
    const langueTrouvee = liste_langue.find(langue => langue.id === idLangue);
    return langueTrouvee ? langueTrouvee.libelle : '-';
  }
  function setNationalite(id) {
    const rep = liste_nationalite.find(l => l.id === id);
    return rep ? rep.libelle : '-';
  }
   
   
    const handleLike = async (id) => {
 
      if (hasLiked) {
        
  const currentTime = new Date();

  const likeTime = new Date(like_moment);
  const diffMs = currentTime - likeTime;
  // conversion en minutes
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
            // like_moment 
            setlike_moment(like_page.data?.like_moment)
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
    
  };


 
  function set_age(date_naissance) {
    if (!date_naissance) return 'Inconnu';
  
    const birthDate = new Date(date_naissance);
    const today = new Date();
  
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
  
    // Ajuster l'âge si l'anniversaire n'est pas encore passé cette année
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
  
    return age;
  }

  // récupération des données du modèle
   
   
      

 

//  gestion des nav de//  set image by resolution
 
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

     

  //  nav des onglets
useEffect(() => {
  const handleScroll = () => {
    const secondaryNavbar = document.querySelector('.title_nav');
    const stickyPosition = secondaryNavbar.offsetTop;

    if (window.pageYOffset >= stickyPosition) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

// end gestion de second navbar

// les images des models

const openModal = () => setIsModalOpen_img(true);

// const closeModal = () => setModalIsOpen(false);

const handleImageClick = (image) => {
  setLoading_img(true);
  setSelectedImage(image);
  setIsModalOpen_img(true);

  // Update the URL to include the image ID when the modal opens
  const imageUrl = `#${image.id_image}`; // Example URL: #123
  console.log("imageUrl")
  console.log(imageUrl)
  console.log("imageUrl")
  window.history.pushState({ modal: true , img: true }, '', imageUrl);
};

useEffect(() => {
  // Si l'URL contient un hash au chargement, le retirer
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}, []);
const handleDataLoaded = (isLoaded) => {
  if (isLoaded) {
    setLoading_img(false);
    console.log("Data has been loaded successfully.");
    // Optionally update any other state or trigger side effects
  }
};
 
const handleCloseModal_img = () => {
  setIsModalOpen_img(false);
  setSelectedImage(null);

  if (window.location.hash) {
    // 1. On essaie d'aller en arrière
    window.history.back();

    // 2. Et on planifie un nettoyage manuel après un petit délai
    setTimeout(() => {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }, 300); // Attends 300ms pour laisser Fancybox gérer sa fermeture
  }
  console.log("isModalOpen_img")
  console.log(isModalOpen_img)

};
useEffect(() => {
  const handlePopState = () => {
    setIsModalOpen_img(false);
      setSelectedImage(null);
    // if (window.location.hash) {
    //   console.log("window.location")
    //   console.log(window.location)

    //   alert('test')
    //   const imageId = window.location.hash.substring(1); // Extract the ID from #id_image
    //   // Check if the ID corresponds to an image and handle reopening the modal
     
    //  console.log("imageId")
     
    //  console.log(imageId)
    //   const image = findImageById(imageId); // Replace with your logic to find the image by ID
    //   if (image) {
    //     setSelectedImage(image);
    //     setIsModalOpen(true);
    //   }
    // } else {

    //   alert('not')
    //   // If there's no hash, ensure the modal is closed
    //   setIsModalOpen(false);
    //   setSelectedImage(null);
    // }
  };

  // Attach the event listener
  window.addEventListener('popstate', handlePopState);

  // Cleanup the event listener on component unmount
  return () => {
    window.removeEventListener('popstate', handlePopState);
  };
}, []);
 
// end images des models
 
// events
const handleView = (event) => {
  setTypeView(event.currentTarget.dataset.mode);
};
// end events
// fin data de second zone de la page(renfermantimages, video,event, etc=)
     
// Afficher un loader si la page est en cours de chargement
  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Chargement en cours...</p>
      </div>
    );
  }
 
 
  console.log("deviceWidth")
  
  console.log(deviceWidth)
  return (
    <>

    {(loading_img === true) &&

      (
        <div className="loader-container">
        <div className="spinner"></div>
        <p>Chargement en cours...</p>
      </div>

      )
    }
        {/* <Header_menu data ={{ link : 'mannequin' }}/> */}
        <div className="main_container">
          <div className="agent_description col-12 col-sm-12">

        
                                 
              <div className="row description_content">
              {/* <MannequinNavigation className="custom-MnavigationMobile"/> */}
              {principal_data.map((p) =>{ 
                console.log('p.id')
                //  console.log(p)
            
            return(
                <div key={p.userclient} className="col-12 col-lg-3 col-md-3 col-sm-12 img_box">
                      <div className=" container_primary">
      <div className="start_box">
        <div className="model_identity">
          <div className="product-card-img">
            <a className="hover-switch" href={`${apiUrl}/${getPathForResolution(p.paths)}`} data-fancybox="gallery">
              <img
                src={`${apiUrl}/${getPathForResolution(p.paths)}`}
                alt="image"
                fetchPriority="high" // Nouvelle ligne pour améliorer le LCP
                // loading="lazy"
                className="img profile-image"
              />
            </a>

            
          </div>
          <div className="name">
            <label className="modelname">{p?.pseudo}</label>
          
          </div>
        </div>

              <div className="rs_box">
              <ul className="list_rxsx" style={{'paddingLeft' : '0px'}}>
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
        <div className="categorie_agent">
              <a href="/mannequins" className="cstm_link_w">
                mannequin
              </a>
            </div>
        </div>
        <div className="bottom_box">
        <div className="image_zone">

        <img src={"/assets/img/morpho/morpho_h.jpg"} loading="lazy" alt="morpho" />
      
        </div>
          </div>
         <div className="under_box">
                                     {/* <a className='btn_like'
                                       href='#'
                                       onClick={() => handleLike_page(currentImage.id_image)}
                                     >
                                          <FontAwesomeIcon className='icon' icon={faThumbsUp} />
                                    </a>
                                   */}

                                    <a href="#"
                                       onClick={() => handleLike(pageData)}
                                       className={`btn_like ${hasLiked === true ? 'active' : ''}`} 
                                     
                                       disabled={hasLiked === true}  // Désactive le bouton si l'utilisateur a déjà aimé
                                     
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
                           
                                    {/* <a className='btn_follow'>
                                        <FontAwesomeIcon className='icon' icon={faUserPlus} />
                                    </a> */}
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
      </div>

      <div className="end_box">
        <div className="personalInformation">
        
<div className="list">
<div className="dropdown-container">
      <div className="dropdown">
        <ul className="dropdown-list">
          {modelData.slice(0, showAll ? modelData.length : 4).map((item, index) => (
            <li key={index} className="dropdown-item none_bg">
              <strong>{item.label}:</strong> {item.value}
            </li>
          ))}
        </ul>
        <button className="dropdown-toggle" onClick={toggleShowAll}>
          {showAll ? '-' : '+'}
        </button>
      </div>
    </div>
</div>
         
        </div>
         
      </div>
                     </div>
                </div>
              )})}

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

                    {/* Section Events */}

                    <div className="tab-content col-12 ">
                        
                      
                          <div id="bio" className="tab-pane fade show">
                            <div className="  model_bio">
                                
   
                     {principal_data.map((p) => (
                <div key={p.userclient} className="col-12 col-lg-3 col-md-3 col-sm-12 img_box">
         
<div className="bio_element">
       <label className='label_data'>nom(s)</label>  

<label className='valuel_data'>{p?.nom} {p?.prenom}</label>     

</div>

<div className="bio_element">
<label className='label_data'>Age </label>  

<label className='valuel_data'>
{set_age(p?.date_naissance)} ans
  
  </label>     

</div>
<div className="bio_element">
<label className='label_data'>Nationalité</label>  

<label className='valuel_data'>{setNationalite(p?.nationalite)}</label>     

</div>
<div className="bio_element">
<label className='label_data'>Ville de résidence</label>  

<label className='valuel_data'>{p?.ville}</label>     

</div>
<div className="bio_element">
<label className='label_data'>Langues parlées</label>  

<label className='valuel_data'>{setLangues(p?.langue_a)}</label>     

</div>

           </div>
              ))}

                    
                            </div>
                          </div> 

                             {/* Section Photos */}
                     
                          <div id="photos"  
                        
                          className="tab-pane fade show active"
                          ref={galleryRef} 
                          
                          >
                            <div
                             className="row gallery-container" 
                              >
                                

                            {secondary_data.slice(0, visibleCount).map((item, index) => (
                                 <div key={item?.id_image} className="box col-lg-2 col-md-4 col-4 fade-in">
                                    <div className="product-card">
                                       <div className="product-card-img">
                                           <label className="hover-switch">                                  
                                             <img
                                                src={`${apiUrl}/${getPathForResolution(item.paths)}`}
                                                alt={getPathForResolution(item.paths)} 
                                                loading={index < 2 ? "eager" : "lazy"}
                                                fetchPriority={index === 0 ? "high" : undefined}
                                                className="thumbnail"
                                                onClick={() => handleImageClick(item)}
                                             /> 
                                         </label>  
                                      </div>
                     
                                  </div>
                               </div>
                            ))}

                              
                               {visibleCount < secondary_data.length && (
                                 <div className="text-center mt-3">
                                     <span className="loader_cstm"></span>
                               </div>
                             )}
                            </div>
                          </div> 

                        {/* Section Vidéos */}

                        <div id="videos" className="tab-pane fade">
  <div className="row">
    {model_video.map((video, index) => (
      <div
        key={video.id || index}
        className="box col-lg-4 col-md-6 col-6 aos-init aos-animate"
        data-aos="fade-up"
        data-aos-duration="700"
      >
        <div className="product-card video_card">
          <div className="product-card-img">
            <a

className="hover-switch clip_video"
data-fancybox="video-gallery"
// data-type="video"
// href={`${apiUrl}/${video.path}`}
data-caption={`Vidéo ${index + 1}`}

              // className="hover-switch clip_video"
              // data-fancybox="video-gallery"

              href={`${apiUrl}/${video?.default_src}`} // Chemin réel vers la vidéo
              // data-caption={`Vidéo ${index + 1}`}
            
            >
              <img
                src={`${apiUrl}/${video.thumbnail}` || `/assets/videos/video_1.PNG`} // miniature ou fallback
                loading="lazy"
                alt={`video-${index + 1}`}
                className="img"
              />
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
              overlay={<Tooltip id={`tooltip-${index}`}>Contributeurs</Tooltip>}
            >
              <button className="comment-button" onClick={openModal}>
                <FontAwesomeIcon icon={faInfo} />
              </button>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
 
                       
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
                         
          </div>        
        </div>


        {/* Modal */}
                     {isModalOpen_img && selectedImage && (
                                <ImageModal 
                                    image={selectedImage}
                                    data = {secondary_data}
                                    onDataLoaded={handleDataLoaded} // Pass callback to the child
                                    onClose={handleCloseModal_img} 
                                 />
                      )}

      {/* <FixedMenu/> */}
    </>
  )

}

export default SingleView
'use client';
// import React , { Component, useContext }  from 'react'
import {useEffect, useState, useRef } from "react";

// import { useNavigate } from 'react-router-dom'
import { usePathname, useRouter   } from "next/navigation";

import { useAuth } from "../Context/AuthenticateContext.jsx";

// import $ from 'jquery';  
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// import { Return_back } from './Back_btn';
 
import axios from 'axios'
// import {
//     Link,
//     NavLink,
//   } from "react-router-dom";

  // import { useLocation  } from 'react-router-dom'; 
  // import Link from 'next/link';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'; 

  import CountrySelect from "./countrySeclected.jsx";

//   import Footer from "./Footer.jsx";

  
// Composant Modal personnalisé
const CustomModal = ({ show, children }) => {
    return (
        <div className={`new_custom-modal ${show ? 'show' : ''}`}>
            <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
               
                <div className="custom-modal-body">
                
                    {children}
                </div>
            </div>
        </div>
    );
  };
  

const Header_menu = (props) => {

    const auth = useAuth(); 
    const user_info = auth.currentUser 
    // const location = useLocation(); 
    const location = usePathname();  
    // const apiUrl = 'https://apiafro.aafrodites.com/'
    axios.defaults.withCredentials = true;
    
    // const navigate = useNavigate()
    const navigate = useRouter();

 
    const [isModalOpen, setIsModalOpen] = useState(false);  // Etat du modal
     
    const links = [
           { name: 'Franchises',
             path: '#',
             onClick: () => handleOpenModal('modal_1')
            },
        { name: 'Nos afrodites', path: '/afro' },
        { name: 'Collabs', path: '/parteners' },
        
      ];

      const [isDropdownOpen, setIsDropdownOpen] = useState(null);
      const dropdownRef = useRef(null); // Référence au dropdown pour vérifier si le clic est à l'extérieur
    
      const handleDropdownToggle = (e, path) => {
        e.preventDefault();  // Empêche le rechargement de la page
        setIsDropdownOpen(isDropdownOpen === path ? null : path); // Toggle du dropdown
      };
    
      // Utilisation de useEffect pour ajouter un écouteur de clic à l'extérieur du dropdown
      useEffect(() => {
        // Fonction pour gérer les clics à l'extérieur
        const handleClickOutside = (e) => {
          if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(null); // Fermer le dropdown si le clic est à l'extérieur
          }
        };
    
        // Ajouter l'écouteur d'événements
        document.addEventListener('mousedown', handleClickOutside);
    
        // Nettoyage de l'écouteur d'événements à la destruction du composant
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []); // Ce useEffect s'exécute une seule fois après le premier rendu
    
                const [activeIndex, setActiveIndex] = useState(null);
             // Gestion du clic sur un élément de menu
                const handleOpenMenu = (index) => {
                    // Active le sous-menu en ajoutant la classe 'active' au bon élément
                    setActiveIndex(index);
                };
        
    const [searchTerm, setSearchTerm] = useState([]);
    const [current_link, setCurrentLink] = useState("");
    // const [message , setMessage]  = useState("");
 
    
  useEffect(() => {
      
    const fetchData = async () => {
     
        // if(location?.state != null || location?.state != undefined){
            setCurrentLink(props?.data?.link)
        // }
    };
    fetchData();
  });
    
    const [message_type , setMessageType]  = useState("");
 
  useEffect(() => {
      
    const fetchData = async () => {
     
        if(location?.state != null || location?.state != undefined){
            if(location?.state?.notification != undefined || location?.state?.notification != null){
                 
                // setMessage(location?.state?.notification)
                // setMessageType(location?.state?.etat)

            }
        }
    };
    fetchData();
  });
 
// search 
 const sendSearch = async (e) => {
    e.preventDefault();

    if (searchTerm.length === 0) return;
    
      // Navigation avec les paramètres insérés dans l'URL et l'objet `state`
        // navigate(`/search/${searchTerm}`, {
        //     state: { searchTerm }  // Passer des données dans l'objet `state`
        // });

        navigate.push(`/search/${searchTerm}`);
            // navigate(`/search/${searchTerm}` )
    
  };
       

//   / Gérer l'ouverture du modal
const handleOpenModal = (modalId, e) => {
    // Empêcher l'action par défaut (naviguer vers un href)
    e.preventDefault(); // Empêche la navigation (pour éviter de changer de page)
    e.stopPropagation(); // Empêche la propagation de l'événement si nécessaire
  
    // Afficher l'alerte ou ce que vous voulez
   
    setIsModalOpen(true);
  
    // Mettre à jour l'historique sans l'événement
    // const modalState = { opened: true };
      // Met à jour l'URL avec le hash sans recharger la page
      navigate.push(`#${modalId}`, undefined, { shallow: true });
  
    // window.history.pushState({ modal: modalId }, `Menu Modal ${modalId}`, `#${modalId}`);
  
    // history.pushState({ modal: modalId }, `Menu Modal ${modalId}`, `#${modalId}`);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);

    if (typeof window !== 'undefined' && window.location.hash) {
      // 1. On tente d'aller en arrière
      window.history.back();

      // 2. Après un court délai, on vérifie si le hash est toujours là et on nettoie manuellement
      setTimeout(() => {
        if (window.location.hash) {
          // On supprime le hash sans recharger la page
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
          // ou si tu veux utiliser Next.js router.replace (optionnel)
          // router.replace(window.location.pathname + window.location.search, undefined, { shallow: true });
        }
      }, 300);
    }
  };

  useEffect(() => {
    const onPopState = (event) => {
      const modal = event.state?.modal;
      const img = event.state?.img;

      if (modal && !img) {
        // Si on a un modal sans image -> ouvrir le modal
        setIsModalOpen(true);
      } else {
        // Sinon, fermer le modal
        setIsModalOpen(false);
      }
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);


  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
    
  // if (window.location.hash) {
  //   // 1. On essaie d'aller en arrière
  //   window.history.back();

  //   // 2. Et on planifie un nettoyage manuel après un petit délai
  //   setTimeout(() => {
  //     if (window.location.hash) {
  //       window.history.replaceState(null, '', window.location.pathname + window.location.search);
  //     }
  //   }, 300); // Attends 300ms pour laisser Fancybox gérer sa fermeture
  // }

  //   // window.history.pushState({ modal: null }, "Close Modal", "/");
  // };

  // Écouter les changements dans l'historique et mettre à jour l'état en conséquence
    // useEffect(() => {
    //   const onPopState = (event) => {
    //     // Gérer les modals
    //     if (event.state?.modal) {
    //     //   setIsModalOpen(true);
    //       if (!event.state?.img){
    //         // alert('sets there')
      
    //         setIsModalOpen(true);
    //       }
       
    //     } else {
    //       setIsModalOpen(false);
    //     }
   
    //   };
  
    //   window.addEventListener("popstate", onPopState);
    //   return () => {
    //     window.removeEventListener("popstate", onPopState);
    //   };
    // }, []);
    
//   console.log(current_link)
  return (
  
    <>
    
                {/* Modal personnalisé pour le menu */}
                <CustomModal show={isModalOpen}>
                    <div className="services_listing">
                    <div className="modal_customs" tabIndex="1">
          <div className="modal_customs-content">
            <button className="close_cstom-btn"  onClick={() => handleCloseModal(null)}>
              ×
            </button>
            <h2>creer une franchise Afrodite</h2>
            <ul>
           
              {/* {modalContent === 'creer-une-franchise-Afrodite' && ( */}
                <>
                  <li>bientôt disponible</li>
                </>
              {/* )} */}
            </ul>
          </div>
             </div>

                    </div>
               

         
              </CustomModal>
         <header className="sticky-header border-btm-black header-1">
             <div className="header-bottom">

                  <div className="container w-100 text_box">
                    <div className="header_main_container">
                        <div className="px-3 first_container col-lg-2 col-md-4 col-4">
                            <div className="header-logo">
                                <a href="/" className="logo-main">
                                    <img src={"/assets/models/logo.png"} loading="lazy" alt="afrodites"/>
                                </a>
                                <label className="location_selector" style={{display: "none"}}>
                                     {/* Sélecteur de pays avec drapeaux */}
                                    <CountrySelect />
                                </label>
                            </div>
                        </div>
                        <div className="second_container col-lg-8 d-lg-block d-none">
                            <nav className="site-navigation">
                                <ul className="main-menu list-unstyled justify-content-center">

                                    {current_link === "" ?
                                    (
                                        <>
                                        <li className="menu-list-item nav-item active" >
                                           <a 
                                           className="nav-link" 
                                           href="/"
                                           >Accueil</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a 
                                           className="nav-link" 
                                           href="/about"
                                           >Nous</a>
                                       </li>

                                       <li className="menu-list-item nav-item has-dropdown">
                                            <div className="mega-menu-header">
                                                <a className="nav-link" href="/mannequins">
                                                    Nos Models
                                                </a>
                                                <span className="open-submenu">
                                                    <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                        width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                        strokeLinejoin="round">
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div className="submenu-transform submenu-transform-desktop">
                                                <ul className="submenu list-unstyled"
                                                    style={
                                                        {width :'600px',
                                                        height :'230px'}
                                                    }
                                                    >
                                                    
                                                    <div className="dropdowFlex">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <hr className="vertical-line"/>


                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>
                                                        
                                                        
                                                                                                    
                                                </ul>
                                            </div>
                                        </li>

                                        <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                                           
                                        <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/vlog">Vlog</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                                       </li>



                                       


                                       {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>

                                          <li className="menu-list-item nav-item has-dropdown">
                                          <li className="menu-list-item nav-item">
                                               
                                            </li>
                                                <div className="mega-menu-header">
                                                <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                    
                                                    <span className="open-submenu">
                                                        <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                            strokeLinejoin="round">
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="submenu-transform submenu-transform-desktop">
                                                    <ul className="submenu list-unstyled">
                                                        <li className="menu-list-item nav-item-sub">
                                                            <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                            </a>
                                                        </li>
                                                        <li className="menu-list-item nav-item-sub">
                                                        <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                        </li>
                                                         
                                                    </ul>
                                                </div>
                                            </li>
                                          

                                        </>
                                       )
                                    
                                    
                                    }
                                           
                                       </>
                                    )

                                    :
                                    current_link === "home" ?
                                    ( 
                                        <>
                                        <li className="menu-list-item nav-item active" >
                                           <a className="nav-link" href="/">Accueil</a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                           <a 
                                           className="nav-link" 
                                           href="/about"
                                           >Nous</a>
                                       </li>
                                       <li className="menu-list-item nav-item has-dropdown">
                                 <div className="mega-menu-header">
                                    <a className="nav-link" href="/mannequins">
                                       Nos Models
                                    </a>
                                    <span className="open-submenu" onClick={() => handleOpenMenu(0)}>
                                                 <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                    </span>
                                </div>

                                <div className="submenu-transform submenu-transform-desktop">
                                <ul className="submenu list-unstyled"
                                                    style={
                                                        {width :'600px',
                                                        height :'230px'}
                                                    }
                                                    >
                                                    
                                                    <div className="dropdowFlex">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <hr className="vertical-line"/>


                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>
                                                        
                                                        
                                                                                                    
                                                </ul>
                                            </div>
                            </li>
                            
                            <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/vlog">Vlog</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                                       </li>

                             {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>

                                        <li className="menu-list-item nav-item has-dropdown">
                                        <li className="menu-list-item nav-item">
                                             
                                          </li>
                                              <div className="mega-menu-header">
                                              <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                  
                                                  <span className="open-submenu">
                                                      <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                          width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                          strokeLinejoin="round">
                                                          <polyline points="6 9 12 15 18 9"></polyline>
                                                      </svg>
                                                  </span>
                                              </div>
                                              <div className="submenu-transform submenu-transform-desktop">
                                                  <ul className="submenu list-unstyled">
                                                      <li className="menu-list-item nav-item-sub">
                                                          <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                          </a>
                                                      </li>
                                                      <li className="menu-list-item nav-item-sub">
                                                      <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                      </li>
                                                       
                                                  </ul>
                                              </div>
                                          </li>
                                        

                                      </>
                                       )
                                    }
                                        </>

                                    )

                                    :
                                    current_link === "mannequin" ?
                                    ( 
                                       
                                        <>
                                        <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/">Accueil</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a 
                                           className="nav-link" 
                                           href="/about"
                                           >Nous</a>
                                       </li>

                                       <li className="menu-list-item nav-item has-dropdown active">
                                            <div className="mega-menu-header">
                                                <a className="nav-link active" href="/mannequins">
                                                    Nos Models
                                                </a>
                                                <span className="open-submenu">
                                                    <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                        width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                        strokeLinejoin="round">
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div className="submenu-transform submenu-transform-desktop">
                                            <ul className="submenu list-unstyled"
                                                    style={
                                                        {width :'600px',
                                                        height :'230px'}
                                                    }
                                                    >
                                                    
                                                    <div className="dropdowFlex">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <hr className="vertical-line"/>


                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>
                                                        
                                                        
                                                                                                    
                                                </ul>
                                            </div>
                                        </li>

                                     
                                        <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/vlog">Vlog</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                                       </li>


                                       {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>

                                        <li className="menu-list-item nav-item has-dropdown">
                                        <li className="menu-list-item nav-item">
                                             
                                          </li>
                                              <div className="mega-menu-header">
                                              <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                  
                                                  <span className="open-submenu">
                                                      <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                          width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                          strokeLinejoin="round">
                                                          <polyline points="6 9 12 15 18 9"></polyline>
                                                      </svg>
                                                  </span>
                                              </div>
                                              <div className="submenu-transform submenu-transform-desktop">
                                                  <ul className="submenu list-unstyled">
                                                      <li className="menu-list-item nav-item-sub">
                                                          <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                          </a>
                                                      </li>
                                                      <li className="menu-list-item nav-item-sub">
                                                      <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                      </li>
                                                       
                                                  </ul>
                                              </div>
                                          </li>
                                        

                                      </>
                                       )
                                    }
                                     
                                       </>

                                    )

                                    :
                                    current_link === "hottesse" ?
                                    ( 
                                        <>
                                        <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/">Accueil</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a 
                                           className="nav-link" 
                                           href="/about"
                                           >Nous</a>
                                       </li>


                                       <li className="menu-list-item nav-item has-dropdown active">
                                            <div className="mega-menu-header">
                                                <a className="nav-link" href="/mannequins">
                                                    Nos Models
                                                </a>
                                                <span className="open-submenu">
                                                    <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                        width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                        strokeLinejoin="round">
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div className="submenu-transform submenu-transform-desktop">
                                            <ul className="submenu list-unstyled"
                                                    style={
                                                        {width :'600px',
                                                        height :'230px'}
                                                    }
                                                    >
                                                    
                                                    <div className="dropdowFlex">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <hr className="vertical-line"/>


                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>
                                                        
                                                        
                                                                                                    
                                                </ul>
                                            </div>
                                        </li>

                                     
                                        <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/vlog">Vlog</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                                       </li>


                                       {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>

                                          <li className="menu-list-item nav-item has-dropdown">
                                          <li className="menu-list-item nav-item">
                                               
                                            </li>
                                                <div className="mega-menu-header">
                                                <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                    
                                                    <span className="open-submenu">
                                                        <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                            strokeLinejoin="round">
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="submenu-transform submenu-transform-desktop">
                                                    <ul className="submenu list-unstyled">
                                                        <li className="menu-list-item nav-item-sub">
                                                            <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                            </a>
                                                        </li>
                                                        <li className="menu-list-item nav-item-sub">
                                                        <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                        </li>
                                                         
                                                    </ul>
                                                </div>
                                            </li>
                                          

                                        </>
                                       )
                                    }
                                       </>

                                    )

                                    :
                                    current_link === "events" ?
                                    ( 
                                      
                                        <>
                                        <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/">Accueil</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a 
                                           className="nav-link" 
                                           href="/about"
                                           >Nous</a>
                                       </li>

                                       <li className="menu-list-item nav-item has-dropdown">
                                            <div className="mega-menu-header">
                                                <a className="nav-link" href="/mannequins">
                                                    Nos Models
                                                </a>
                                                <span className="open-submenu">
                                                    <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                        width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                        strokeLinejoin="round">
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div className="submenu-transform submenu-transform-desktop">
                                            <ul className="submenu list-unstyled"
                                                    style={
                                                        {width :'600px',
                                                        height :'230px'}
                                                    }
                                                    >
                                                    
                                                    <div className="dropdowFlex">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <hr className="vertical-line"/>


                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>
                                                        
                                                        
                                                                                                    
                                                </ul>
                                            </div>
                                        </li>

                                     
                                        <li className="menu-list-item nav-item active" >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/vlog">Vlog</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                                       </li>

                                       {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>

                                        <li className="menu-list-item nav-item has-dropdown">
                                        <li className="menu-list-item nav-item">
                                             
                                          </li>
                                              <div className="mega-menu-header">
                                              <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                  
                                                  <span className="open-submenu">
                                                      <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                          width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                          strokeLinejoin="round">
                                                          <polyline points="6 9 12 15 18 9"></polyline>
                                                      </svg>
                                                  </span>
                                              </div>
                                              <div className="submenu-transform submenu-transform-desktop">
                                                  <ul className="submenu list-unstyled">
                                                      <li className="menu-list-item nav-item-sub">
                                                          <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                          </a>
                                                      </li>
                                                      <li className="menu-list-item nav-item-sub">
                                                          <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                      </li>
                                                       
                                                  </ul>
                                              </div>
                                          </li>
                                        

                                      </>
                                       )
                                    }
                                       </>

                                    )

                                    :
                                    current_link === "about" ?
                                    ( 

                                        <>
                                        <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/">Accueil</a>
                                       </li>

                                       <li className="menu-list-item nav-item active">
                                           <a 
                                           className="nav-link" 
                                           href="/about"
                                           >Nous</a>
                                       </li>

                                       <li className="menu-list-item nav-item has-dropdown">
                                            <div className="mega-menu-header">
                                                <a className="nav-link" href="/mannequins">
                                                    Nos Models
                                                </a>
                                                <span className="open-submenu">
                                                    <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                        width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                        strokeLinejoin="round">
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div className="submenu-transform submenu-transform-desktop">
                                            <ul className="submenu list-unstyled"
                                                    style={
                                                        {width :'600px',
                                                        height :'230px'}
                                                    }
                                                    >
                                                    
                                                    <div className="dropdowFlex">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <hr className="vertical-line"/>


                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>
                                                        
                                                        
                                                                                                    
                                                </ul>
                                            </div>
                                        </li>

                                     
                                        <li className="menu-list-item nav-item" >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/vlog">Vlog</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                                       </li>

                                       {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>

                                        <li className="menu-list-item nav-item has-dropdown">
                                        <li className="menu-list-item nav-item">
                                             
                                          </li>
                                              <div className="mega-menu-header">
                                              <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                  
                                                  <span className="open-submenu">
                                                      <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                          width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                          strokeLinejoin="round">
                                                          <polyline points="6 9 12 15 18 9"></polyline>
                                                      </svg>
                                                  </span>
                                              </div>
                                              <div className="submenu-transform submenu-transform-desktop">
                                                  <ul className="submenu list-unstyled">
                                                      <li className="menu-list-item nav-item-sub">
                                                          <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                          </a>
                                                      </li>
                                                      <li className="menu-list-item nav-item-sub">
                                                          <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                      </li>
                                                       
                                                  </ul>
                                              </div>
                                          </li>
                                        

                                      </>
                                       )
                                    }
                                       </>

                                    )

                                    :

                                    (
                                        <>
                                        <li className="menu-list-item nav-item active" >
                                           <a 
                                           className="nav-link" 
                                           href="/"
                                           >Accueil</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a 
                                           className="nav-link" 
                                           href="/about"
                                           >Nous</a>
                                       </li>

                                       <li className="menu-list-item nav-item has-dropdown">
                                            <div className="mega-menu-header">
                                                <a className="nav-link" href="/mannequins">
                                                    Nos Models
                                                </a>
                                                <span className="open-submenu">
                                                    <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                        width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                        strokeLinejoin="round">
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div className="submenu-transform submenu-transform-desktop">
                                                <ul className="submenu list-unstyled"
                                                    style={
                                                        {width :'600px',
                                                        height :'230px'}
                                                    }
                                                    >
                                                    
                                                    <div className="dropdowFlex">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <hr className="vertical-line"/>


                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>
                                                        
                                                        
                                                                                                    
                                                </ul>
                                            </div>
                                        </li>

                                        <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                                           
                                        <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/vlog">Vlog</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                                       </li>



                                       


                                       {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>

                                          <li className="menu-list-item nav-item has-dropdown">
                                          <li className="menu-list-item nav-item">
                                               
                                            </li>
                                                <div className="mega-menu-header">
                                                <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                    
                                                    <span className="open-submenu">
                                                        <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                            strokeLinejoin="round">
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="submenu-transform submenu-transform-desktop">
                                                    <ul className="submenu list-unstyled">
                                                        <li className="menu-list-item nav-item-sub">
                                                            <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                            </a>
                                                        </li>
                                                        <li className="menu-list-item nav-item-sub">
                                                        <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                        </li>
                                                         
                                                    </ul>
                                                </div>
                                            </li>
                                          

                                        </>
                                       )
                                    
                                    
                                    }
                                           
                                       </>
                                    )

                                    }
                                   

                                  
                                  
                                </ul>
                            </nav>
                        </div>
                        <div className="mobile_main_nav_custom d-lg-none">
      <nav className="links_container">
      <ul className="main-menu list-unstyled">
  {links.map((link) => (
    <li
      key={link.path}
      className={`menu-list-item nav-item ${location.pathname === link.path ? 'active' : ''}`}
    >
      {link.name.toLowerCase() === 'nos afrodites' ? (
        <div className="nav-link" ref={dropdownRef}>
          <a  className="nav-link"  href="/mannequins" >
            Nos Afrodites 
            {/* <i className="fas fa-caret-down"></i> */}
          </a>
          {/* <ul className={`dropdown_custom-menu ${isDropdownOpen === link.path ? 'show' : ''}`}>
            <li><a className="dropdown_custom-item" href="/mannequins">Mannequins</a></li>
            <li><a className="dropdown_custom-item" href="/hodesse_accueil">Hôtesses</a></li>
            <li><a className="dropdown_custom-item" href="/influenceur">Influenceurs</a></li>
          </ul> */}
        </div>
      )
       :
        (
        <a 
          className="nav-link" 
          href={link.name === "Franchises" ? "#" : link.path}
          onClick={(e) => {
            if (link.name === "Franchises") {
              handleOpenModal(link.name, e);  // Passe l'événement à la fonction
            }
          }}
        >
          {link.name}
        </a>
      )}
    </li>
  ))}
</ul>
      </nav>
    </div>

                        <div className="px-3 third_container col-lg-2 col-md-8 col-8">
                            <div className="header-action d-flex align-items-center justify-content-end">
                                <a className="header-action-item header-search" href="javascript:void(0)">
                                    <svg className="icon icon-search" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7.75 0.250183C11.8838 0.250183 15.25 3.61639 15.25 7.75018C15.25 9.54608 14.6201 11.1926 13.5625 12.4846L19.5391 18.4611L18.4609 19.5392L12.4844 13.5627C11.1924 14.6203 9.5459 15.2502 7.75 15.2502C3.61621 15.2502 0.25 11.884 0.25 7.75018C0.25 3.61639 3.61621 0.250183 7.75 0.250183ZM7.75 1.75018C4.42773 1.75018 1.75 4.42792 1.75 7.75018C1.75 11.0724 4.42773 13.7502 7.75 13.7502C11.0723 13.7502 13.75 11.0724 13.75 7.75018C13.75 4.42792 11.0723 1.75018 7.75 1.75018Z"
                                            fill="black" />
                                    </svg>
                                </a>
                               
                               
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </header>
   
  
        
    
    </>
  )
}

export default Header_menu

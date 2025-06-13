import React from 'react';

import {useEffect, useState, useRef } from "react";
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faCalendar,  faList } from '@fortawesome/free-solid-svg-icons';
// import Link from 'next/link';
import { usePathname, useRouter   } from "next/navigation";

// import { useLocation } from 'react-router-dom'; // Pour gérer l'URL actuelle
// import { Modal, Accordion, Card, Button } from 'react-bootstrap';  
import {  faYoutube } from '@fortawesome/free-brands-svg-icons';

import axios from "axios";
import { useAuth } from "../Context/AuthenticateContext.jsx";

// Composant Modal personnalisé
const CustomModal_b = ({ show, children }) => {

  // alert('here')
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


const FixedMenu = () => {
    const apiUrl = 'https://apiafro.aafrodites.com'
  
    const auth = useAuth();
    axios.defaults.withCredentials = true;
       
    const user_info = auth.currentUser
    const [activeIndex, setActiveIndex] = useState(null);  // Etat pour les sous-menus
    const router = useRouter();   
    const pathname = usePathname();

// Exemple : déterminer le lien actif
const currentLink = pathname;
   
    const [isModalOpen, setIsModalOpen] = useState(false);  // Etat du modal
    // const [activeKey, setActiveKey] = useState(null);  // Etat pour l'accordéon
 const [notifications, setNotifications] = useState([]);
 const [unRead, setUnread] = useState(0);
 

 //   récupérer les notifications de ce user
useEffect(() => {
   
    
  const fetchData = async () => {
    try {
      console.log("user_info?.rol")
      console.log(user_info?.role)
       var root_url = "";
      if(user_info?.role === 3){
            root_url = `${apiUrl}/notifications/manager_notifications`
  
      }
      else if(user_info?.role === 1){
          root_url = `${apiUrl}/notifications/admin_notifications`
  
      }
      else{
       
           root_url = `${apiUrl}/notifications/user_notifications`
      }
      console.log("root_url")
      console.log(root_url)
    // const  list_notif = await axios.post(`${apiUrl}/notifications/test` , { id: user_info?.id });
    const  list_notif = await axios.post(root_url, { id: user_info?.id });
  
      // const listejoiner = await axios.post(`${apiUrl}/postulant/liste_joiner`);
      console.log("list_notif fixed")
      console.log(list_notif)
    
    
      if (list_notif.data?.notifications) {
      
        if (list_notif.data?.notifications.length > 0) {
 
                     // Trier les notifications du plus récent au plus ancien
              const sortedNotifications = list_notif?.data?.notifications.sort((a, b) => {
                           return new Date(b.create_date) - new Date(a.create_date);
                    });

  
                 setNotifications(sortedNotifications);
               const unreadNotifications = sortedNotifications.filter(
                         (notification) => notification.etat_notification === 0
                     );

  // Compter le nombre de notifications non lues
                   const unreadCount = unreadNotifications.length;
                         setUnread(unreadCount)
 
        }
        else{
          setNotifications(0)
        }
 
      } else {

        if (list_notif.data?.message) {

          setNotifications(0)
        }
        else{
          setNotifications(0)
        }
      
      //   navigate("/"); // Redirection si aucune donnée
      }
      // setLoading(false);
    } catch (err) {
      console.error("Erreur lors de la récupération des données :", err);
      // setLoading(false);
    }
  };

  fetchData();
}, []);



  // const handleOpenModal = (modalId) => {
  //   setIsModalOpen(true);
  //   // console.log('test here');
  //   console.log(modalId);
  //   // alert('test')
  
  //   // Évite de passer un objet non sérialisable comme `PointerEvent`
  //   window.history.pushState({ modal: modalId }, `Menu Modal ${modalId}`, `#${modalId}`);
  // };
  

  // Gérer la fermeture du modal
  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   console.log("close_modal")
    
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

  // Gérer l'ouverture du sous-menu
  // const handleOpenMenu = (index) => {
  //   setActiveIndex(index);
  //   window.history.pushState({ submenu: index }, `Submenu Open ${index}`, `#submenu_${index}`);
  // };

  // Gérer la fermeture du sous-menu
  // const handleCloseMenu = () => {
  //   setActiveIndex(null);
    
  // // if (window.location.hash) {
  // //   // 1. On essaie d'aller en arrière
  // //   window.history.back();

  // //   // 2. Et on planifie un nettoyage manuel après un petit délai
  // //   setTimeout(() => {
  // //     if (window.location.hash) {
  // //       window.history.replaceState(null, '', window.location.pathname + window.location.search);
  // //     }
  // //   }, 300); // Attends 300ms pour laisser Fancybox gérer sa fermeture
  // // }

  //   window.history.pushState({ submenu: null }, "Submenu Close",  window.history.back());
  // };

  // Écouter les changements dans l'historique et mettre à jour l'état en conséquence
  // useEffect(() => {
  //   const onPopState = (event) => {
  //     // Gérer les modals
  //     if (event.state?.modal) {
  //       console.log(event.state)
  //       console.log(window.location)
  //       if (!event.state?.img){
  //         // alert('sets there')
    
  //         setIsModalOpen(true);
  //       }
      
  //     } else {
  //       setIsModalOpen(false);
  //     }

  //     // Gérer les sous-menus
  //     if (event.state?.submenu !== undefined) {
  //       setActiveIndex(event.state.submenu);
  //     } else {
  //       setActiveIndex(null);
  //     }
  //   };

  //   window.addEventListener("popstate", onPopState);
  //   return () => {
  //     window.removeEventListener("popstate", onPopState);
  //   };
  // }, []);
  
const tabs = [
  {
    link: user_info ? "/" : "/",
    icon: faHome,
    label: user_info ? "Accueil" : "Accueil",
  },
  {
    link: user_info ? "/profile" : "/login",
    icon: faUser,
    label: user_info ? "Moi" : "Moi",
  },
  {
    link: "/vlog",
    icon: faYoutube,
    label: "Vlog",
  }
  ,
  {
    link: "/evenements",
    icon: faCalendar,
    label: "Events",
    // onClick: () => handleOpenModal('modal_1'), // Ouvrir le modal 1
  },
  {
    link: "#",
    icon: faList,
    id: "menu",
    label: "Menu",
    // onClick: () => handleOpenModal('modal_1'), // Ouvrir le modal 1
  },
];

 // Ouvrir le modal
 const handleOpenModal = (modalId) => {
  setIsModalOpen(true);
  console.log('Open modal:', modalId);

  // Push dans l'historique avec état et hash
  window.history.pushState({ modal: modalId }, `Menu Modal ${modalId}`, `#${modalId}`);
};

// Fermer le modal
const handleCloseModal = () => {
  setIsModalOpen(false);
  console.log('Close modal');

  if (window.location.hash) {
    // Revenir en arrière si possible
    window.history.back();

    // Nettoyage si le hash est encore présent après retour
    setTimeout(() => {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }, 300);
  }
};

// Ouvrir un sous-menu
const handleOpenMenu = (index) => {
  setActiveIndex(index);
  window.history.pushState({ submenu: index }, `Submenu Open ${index}`, `#submenu_${index}`);
};

// Fermer le sous-menu
const handleCloseMenu = () => {
  setActiveIndex(null);

  // Même logique de retour en arrière + nettoyage si besoin
  if (window.location.hash) {
    window.history.back();

    setTimeout(() => {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }, 300);
  }
};

// Gérer les changements dans l'historique (popstate)
useEffect(() => {
  const onPopState = (event) => {
    // Gestion modale
    if (event.state?.modal) {
      console.log('Restoring modal from state:', event.state);
      if (!event.state.img) {
        setIsModalOpen(true);
      }
    } else {
      setIsModalOpen(false);
    }

    // Gestion sous-menu
    if (event.state?.submenu !== undefined) {
      setActiveIndex(event.state.submenu);
    } else {
      setActiveIndex(null);
    }
  };

  window.addEventListener('popstate', onPopState);

  return () => {
    window.removeEventListener('popstate', onPopState);
  };
}, []);
// console.log("notifications")
// console.log(notifications)
  return (
    <>
        <footer id="bottom_nav" className="mt-100 overflow-hidden footer-style-2">
                <div>
                    {/* Bottom Tab Navigator*/}
                    <nav className="navbar fixed-bottom navbar-light" role="navigation">
                        <Nav className="nav_compo">
                             <div className="box_nav">
                                {tabs.map((tab, index) => {

                                   const isActive = router.pathname === tab.link;
                                       return (
                                       
                                        <NavItem key={`tab-${index}`} className='nav_item'>
                                        <NavLink
                                            // href={tab.link}
                                            href={tab.label === "menu" ? "#" : tab.link}
                                            className="nav-link"
                                            id={tab.id || ""}
                                            activeclassName="active"
                                            onClick={tab.label === "Menu" ? () => handleOpenModal('modal_1') : null}

                                            // onClick={tab.label === "Menu" ? handleOpenModal : null}
                                        >
                                            <div className="icon_box">
                                                <FontAwesomeIcon size="sm" icon={tab.icon} />
                                                <div className="label_sm">{tab.label}</div>
                                              
                                                {tab.label === "Menu" ? 
                                                <> 
                                                {unRead > 0 ?
                                                 
                                                 <span className='badge_unread'>{unRead}</span>
                                                
                                                 
                                                :
                                                null
                                                }
                                               </>
                                                : null
                                                
                                                }
                                               
                                            </div>
                                        </NavLink>
                                    </NavItem>
                                       )
                                  
                                      })}
                            </div>
                        </Nav>
                    </nav>
                </div>
            </footer>

            {/* Modal pour le menu */}
                {/* Modal personnalisé pour le menu */}
            <CustomModal_b show={isModalOpen}>
          

                <div className="" tabIndex="1">
                    <div className="offcanvas-wrapper">
                        <div className="offcanvas-header border-btm-black">
                            <h5 className="drawer-heading" onClick={() => handleCloseModal(null)}>
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
        <span className="menu-back-text">Menu</span>
     
                              
                            </h5>
                          
                          

                            {/* <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleCloseModal}></button> */}
                        </div>
                        <div className="offcanvas-body p-0 d-flex flex-column justify-content-between">
                            <nav className="site-navigation">
                                <ul className="main-menu list-unstyled">
                                    <li className={`menu-list-item nav-item ${currentLink === "/" ? 'active' : ''}`}>
                                        <a className="nav-link" href="/">Accueil</a>
                                    </li>
                                    <li className={`menu-list-item nav-item ${currentLink === "/about" ? 'active' : ''}`}>
                                        <a className="nav-link" href="/about">Nous</a>
                                    </li>

                                    <li className="menu-list-item nav-item has-dropdown text-left">
  <div className="mega-menu-header text-left">
    <a className="nav-link" href="#">Devenez une Afrodite</a>
    <span className="open-submenu" onClick={() => handleOpenMenu(0)}>
    <svg
  className="icon icon-menu-next"
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
  <polyline points="9 18 15 12 9 6"></polyline>
</svg>
    </span>
  </div>
  <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 0 ? 'active' : ''}`}>
    <div className="offcanvas-header border-btm-black">
      <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleCloseMenu(null)}>
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
        <span className="menu-back-text">Devenez une Afrodite</span>
      </h5>
    </div>
    <ul className="submenu list-unstyled">
      <li className="menu-list-item nav-item-sub">
        <a className="nav-link-sub" href="/postuler">Mannequin</a>
        
        {/* <a className="nav-link-sub" href="/postuler/1">Mannequin</a> */}
      </li>
      
      <li className="menu-list-item nav-item-sub">
        <a className="nav-link-sub" href="/postuler">Hôtesse d'accueil</a>
        {/* <a className="nav-link-sub" href="/postuler/2">Hôtesse d'accueil</a> */}
        </li>
      <li className="menu-list-item nav-item-sub">
        <a className="nav-link-sub" href="/postuler">Influenceur</a>
        {/* <a className="nav-link-sub" href="/postuler/3">Influenceur</a> */}
      </li>
      {/* <li className="menu-list-item nav-item-sub">
        <button
          className="nav-link-sub nav-text-sub close-submenu"
          onClick={() => handleCloseMenu(0)} // Fonction pour fermer le sous-menu
        >
          Fermer
        </button>
      </li> */}
    </ul>
  </div>
</li>

                                    <li className="menu-list-item nav-item">
                                        <a className="nav-link" href="/evenements">Events</a>
                                    </li>
                                    <li className="menu-list-item nav-item">
                                        <a className="nav-link" href="/franchises">Franchises</a>
                                    </li>
                                    <li className="menu-list-item nav-item">
                                        <a className="nav-link" href="/vlog">Vlog</a>
                                    </li>
                                    <li className="menu-list-item nav-item">
                                        <a className="nav-link" href="/parteners">Collabs</a>
                                    </li>

                               

                                    {user_info === undefined || user_info === null ? (
                                        <li className="menu-list-item nav-item">
                                            <a className="nav-link" href="/login">Connexion</a>
                                        </li>
                                    ) : (
                                      <>
                                     {user_info?.role != 2 && (
                                        <li className="menu-list-item nav-item">
                                            <a className="nav-link" href="/manager">les postulants</a>
                                        </li>
                                      )
                                     }
                                        <li className="menu-list-item nav-item">
                                            <a className="nav-link" href="/notifications">
                                                  Notifications 
                                                  {unRead > 0 ?
                                                     <>
                                                      <span className='badge_unread_b'>{unRead}</span>
                                                     </>

                                                     :
                                                     null
                                                }
                                                
                                            </a>
                                           
                                        </li>
                                        <li className="menu-list-item nav-item has-dropdown">
                                            <div className="mega-menu-header">
                                                <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                <span className="open-submenu" onClick={() => handleOpenMenu(3)}>
                                                <svg
  className="icon icon-menu-next"
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
  <polyline points="9 18 15 12 9 6"></polyline>
</svg>
                                                </span>
                                            </div>
                                            <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 3 ? 'active' : ''}`}>
                                                <ul className="submenu list-unstyled">
                                                    <li className="menu-list-item nav-item-sub">
                                                        <a className="nav-link-sub" href="/profile">Mon Profil</a>
                                                    </li>
                                                    <li className="menu-list-item nav-item-sub">
                                                        <a className="nav-link-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                      
                                      </>
                                       
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </CustomModal_b>
        
    </>
  )
}

export default FixedMenu

import * as React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, faHome, faCalendar, faList, 
  faAngleUp, faHeart 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faXTwitter, faFacebook, faLinkedin, 
  faYoutube, faWhatsapp, faTiktok, faInstagram 
} from '@fortawesome/free-brands-svg-icons';
import axios from "axios";
import { useAuth } from "../Context/AuthenticateContext.jsx";
import { usePathname, useRouter } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "./ui/navigation-menu";
import {apiUrl} from "../config/apiUrl.js"

const CustomModal_b = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end">
      <div 
        className="bg-white w-full rounded-t-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 mb-4 text-lg font-medium"
          >
            <svg
              className="icon icon-menu-back"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span>Menu</span>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

const FixedMenu = () => {
  // const apiUrl = 'https://apiafro.aafrodites.com';
  const auth = useAuth();
  // const router = useRouter();
  const pathname = usePathname();
  
  const user_info = auth.currentUser;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unRead, setUnread] = useState(0);
  
  axios.defaults.withCredentials = true;

  // Récupérer les notifications
  useEffect(() => {
    const fetchData = async () => {
      try {
        let root_url = "";
        if(user_info?.role === 3) {
          root_url = `${apiUrl}/notifications/manager_notifications`;
        } else if(user_info?.role === 1) {
          root_url = `${apiUrl}/notifications/admin_notifications`;
        } else {
          root_url = `${apiUrl}/notifications/user_notifications`;
        }
        
        const list_notif = await axios.post(root_url, { id: user_info?.id });
        
        if (list_notif.data?.notifications?.length > 0) {
          const sortedNotifications = list_notif.data.notifications.sort((a, b) => {
            return new Date(b.create_date) - new Date(a.create_date);
          });
          
          setNotifications(sortedNotifications);
          const unreadCount = sortedNotifications.filter(n => n.etat_notification === 0).length;
          setUnread(unreadCount);
        } else {
          setNotifications([]);
          setUnread(0);
        }
      } catch (err) {
        console.error("Erreur notifications:", err);
        setNotifications([]);
        setUnread(0);
      }
    };

    if (user_info) fetchData();
  }, [user_info]);

  const tabs = [
    { link: "/", icon: faHome, label: "Accueil" },
    { link: user_info ? "/profile" : "/login", icon: faUser, label: "Moi" },
    { link: "/vlog", icon: faYoutube, label: "Vlog" },
    { link: "/evenements", icon: faCalendar, label: "Events" },
    { icon: faList, label: "Menu", onClick: () => setIsModalOpen(true) },
  ];

  return (
    <>
      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 w-full bg-white shadow-lg z-40">
        <NavigationMenu className="w-full">
          <NavigationMenuList className="flex justify-around p-2 w-full">
            {tabs.map((tab, index) => (
              <NavigationMenuItem key={index} className="flex-1">
                {tab.link ? (
                  <NavigationMenuLink
                    href={tab.link}
                    className={`flex flex-col items-center p-2 ${
                      pathname === tab.link ? 'text-primary' : 'text-gray-600'
                    }`}
                  >
                    <FontAwesomeIcon icon={tab.icon} />
                    <span className="text-xs mt-1">{tab.label}</span>
                    {tab.label === "Menu" && unRead > 0 && (
                      <span className="absolute top-0 right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unRead}
                      </span>
                    )}
                  </NavigationMenuLink>
                ) : (
                  <button
                    onClick={tab.onClick}
                    className="flex flex-col items-center p-2 w-full text-gray-600"
                  >
                    <FontAwesomeIcon icon={tab.icon} />
                    <span className="text-xs mt-1">{tab.label}</span>
                    {unRead > 0 && (
                      <span className="absolute top-0 right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unRead}
                      </span>
                    )}
                  </button>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </footer>

      {/* Modal Menu */}
      <CustomModal_b show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NavigationMenu orientation="vertical" className="w-full">
          <NavigationMenuList className="flex flex-col gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink 
                href="/" 
                className={`block p-3 ${pathname === "/" ? 'bg-gray-100' : ''}`}
              >
                Accueil
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink 
                href="/about" 
                className={`block p-3 ${pathname === "/about" ? 'bg-gray-100' : ''}`}
              >
                Nous
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="w-full justify-between p-3">
                Devenez une Afrodite
              </NavigationMenuTrigger>
              <NavigationMenuContent className="w-full">
                <div className="grid gap-1 p-2">
                  <NavigationMenuLink 
                    href="/postuler" 
                    className="block p-2 hover:bg-gray-100 rounded"
                  >
                    Mannequin
                  </NavigationMenuLink>
                  <NavigationMenuLink 
                    href="/postuler" 
                    className="block p-2 hover:bg-gray-100 rounded"
                  >
                    Hôtesse d'accueil
                  </NavigationMenuLink>
                  <NavigationMenuLink 
                    href="/postuler" 
                    className="block p-2 hover:bg-gray-100 rounded"
                  >
                    Influenceur
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink 
                href="/evenements" 
                className={`block p-3 ${pathname === "/evenements" ? 'bg-gray-100' : ''}`}
              >
                Events
              </NavigationMenuLink>
            </NavigationMenuItem>

            {user_info ? (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="/notifications" 
                    className=" p-3 flex justify-between items-center"
                  >
                    Notifications
                    {unRead > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unRead}
                      </span>
                    )}
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="w-full justify-between p-3">
                    {user_info.pseudo}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-full">
                    <div className="grid gap-1 p-2">
                      <NavigationMenuLink 
                        href="/profile" 
                        className="block p-2 hover:bg-gray-100 rounded"
                      >
                        Mon Profil
                      </NavigationMenuLink>
                      <button
                        onClick={auth.logout}
                        className="block p-2 hover:bg-gray-100 rounded text-left w-full"
                      >
                        Déconnexion
                      </button>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </>
            ) : (
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="/login" 
                  className="block p-3"
                >
                  Connexion
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </CustomModal_b>
    </>
  );
};

export default FixedMenu;
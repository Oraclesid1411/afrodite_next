import React, { useEffect, useState } from "react";
import Header_menu from './Header_menu'
import FixedMenu from './FixedMenu'

import moment from 'moment';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthenticateContext.jsx"; // Assurez-
// import {useEffect, useState, useRef } from "react";
function Notifications() {

    
      const navigate = useNavigate();
      const auth = useAuth();

         const [loading, setLoading] = useState(true); // Loader state
        const user_info = auth.currentUser;
        axios.defaults.withCredentials = true;
               
        console.log(user_info)
      
         const apiUrl = 'https://apiafro.aafrodites.com'
     // Exemple de données
  const [notifications, setNotifications] = useState([]);

//   récupérer les notifications de ce user
useEffect(() => {
   
    
    const fetchData = async () => {
      try {
        console.log(user_info?.role)
         var list_notif = "";
        if(user_info?.role === 3){
           list_notif = await axios.post(`${apiUrl}/notifications/manager_notifications`, { id: user_info?.id });
    
        }
        else if(user_info?.role === 1){
           list_notif = await axios.post(`${apiUrl}/notifications/admin_notifications`, { id: user_info?.id });
    
        }
        else{
           list_notif = await axios.post(`${apiUrl}/notifications/user_notifications`, { id: user_info?.id });
    

        }
       
        // const listejoiner = await axios.post(`${apiUrl}/postulant/liste_joiner`);
        console.log("list_notif")
        console.log(list_notif)
        // setLoading(false)
        // return false;
        if (list_notif.data?.notifications.length > 0) {
            // alert('here')
             // Trier les notifications du plus récent au plus ancien
    const sortedNotifications = list_notif?.data?.notifications.sort((a, b) => {
      return new Date(b.create_date) - new Date(a.create_date);
    });

    console.log(sortedNotifications)

    setNotifications(sortedNotifications);
            // setNotifications(list_notif.data?.notifications);
 
        } else {
        //   navigate("/"); // Redirection si aucune donnée
        }
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

   // Prétraiter les données pour convertir les dates au format Moment
    const new_list = notifications.map((item) => ({
      ...item,
      read: item?.etat_notification === 0 ? false : true ,
      
      title: item?.type_notification === 2 ? "intégrer afrodites" : "autre" ,
      date_creation_formatted: item.create_date
        ? moment(item.create_date).format("DD/MM/YY hh:mm") // Formater la date
        : "-", // Si null, afficher la date d'hier
    }));

    console.log("new_list")
      console.log(new_list)
  // Fonction pour marquer une notification comme lue au clic
  const handleNotificationClick = (id) => {
    // setNotifications((prevNotifications) =>
    //   prevNotifications.map((notification) =>
    //     notification.id === id ? { ...notification, read: true } : notification
    //   )
    // );

    navigate(`/notification/${id}`); // Navigue vers la page de détail
    // Vous pouvez également naviguer vers une page de détail ici
    // alert("Détails de la notification #" + id);
  };
  return (
    <>

    <Header_menu /> 
    
    {loading === true &&

(
  <div className="loader-container">
  <div className="spinner"></div>
  <p>Chargement en cours...</p>
</div>

)
}

    <div className='notifications_box'>
      <h2 className='header'>Notifications</h2>
      <div className='list'>
      {new_list.map((notification) => (
  <div
    key={notification.id_notification}
    className={`notification_item ${notification.read ? 'read' : 'unread'}`}
    onClick={() => handleNotificationClick(notification.id_notification)}
  >
    <div className='notificationHeader'>
      <h3 className='title'>{notification.title}</h3>
      <span className='date'>{notification.date_creation_formatted}</span>
    </div>
    <p className='detail'>{notification.details}
        <label className="mx-1"> 
          {user_info?.role === 3 && 
          <>
         par {notification.pseudo}
          </>
          
          } </label>
    </p>
    {!notification.read && <div className='unreadBox'></div>}
  </div>
))}

      </div>
    </div>


    <FixedMenu />
    
    </>
   
  );
};
 
export default Notifications
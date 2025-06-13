import React, { useState, useEffect ,useRef } from 'react';
import { useRouter } from "next/navigation";
import ZoomView from './ZoomView';

// import axios from 'axios' 

// import Footer from "../Components/Footer";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaEdit, FaEye,FaFilter, FaTrash } from "react-icons/fa";
// import ReactPaginate from "react-paginate";
// import imageCompression from 'browser-image-compression';
// import { motion } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faList , faSearch ,faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
// import FixedMenu from '../Components/FixedMenu';

function Calendar_view({ events_tab, links , setTypeView_N, type_model }) {
  // get all events
  // console.log("events_tab")
  // console.log(events_tab)
  // console.log(links)

  //  const [loading, setLoading] = useState(true); // Loader state
   
  // const [events_tab , setEvents] = useState([]);
  // const apiUrl = 'https://apiafro.aafrodites.com'
  
  // useEffect(() => {
  //   const fetchData = async () => {
     
  //     try {
  //       setLoading(true); // Active le loader
       
  //          const rep1 = await axios.get(`${apiUrl}/events/all`);
        
  //           const grouped_event = rep1?.data.reduce((acc, row) => {
  //           // Vérifie si le mannequin existe déjà dans l'accumulateur

  //            const convdb = new Date(row?.date_debut).toISOString().split('T')[0];
          
  //           const convdf = new Date(row?.date_fin).toISOString().split('T')[0];
            
  //           let listevent = acc.find(item => (item.id_event === row.id_event) &&
  //                                             (item.type_model === row.id_typemodel));
            
  //           if (!listevent) {
            
  //             // Si non, crée une nouvelle entrée pour ce mannequin
  //             listevent = {
  //               id_event: row.id_event,
  //               nom_event: row.nom_event,
  //               detail: row.details,
  //               type_model: row.id_typemodel, 
  //               date_debut : convdb,
  //               date_ffin : convdf,
  //               pays : row.pays,
  //               ville : row.ville,
  //               quartier : row.quartier,
  //               indication_lieu : row.indication_lieu,
  //               statut : row.statut,
  //               id_typeevent : row.id_typeevent,
  //               // statut : row.statut,
  //               heure_debut : row?.heure_debut,
  //               heure_fin : row?.heure_fin,
  //               paths: {} };
  //             acc.push(listevent);
  //           }
            
             
  //           // Ajoute le path_image correspondant au type_resolution
  //           switch (row.type_resolution) {
               
  //             case 3:
  //               listevent.paths.path_hrd = row.path_image;
  //               break;
  //             case 4:
  //               listevent.paths.path_hrm = row.path_image;
  //               break;
  //             case 5:
  //               listevent.paths.path_md = row.path_image;
  //               break;
  //             case 6:
  //               listevent.paths.path_mm = row.path_image;
  //               break;
  //             default:
  //               // Si un type inconnu est trouvé, le traiter ou ignorer
  //               // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
  //               break;
  //           }

  //            return acc;
  //         }, []);

      
  //         setEvents(grouped_event);
       
  //     } catch (err) {
  //       console.log(err);
      
  //     }finally {
  //       setLoading(false); // Désactive le loader
  //     }
  //   };
  //   fetchData();
  // } , []);

  // const navigate = useNavigate()
   const router = useRouter();
  
  const [isOpen_search, setIsOpen_search] = useState(false);
  const [eventDays, setEventDays] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([1, 2, 3]); // Par défaut, tout est sélectionné
  const [calendarDays, setCalendarDays] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);

const categoriesList = [
  { id: 1, label: "Mannequin" },
  { id: 2, label: "Vlogueuse" },
  { id: 3, label: "Hôtesse" }
];

const [filteredEvents, setFilteredEvents] = useState([]);
// const [newlist, setnewlist] = useState([]);
const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
const [currentEventIndex, setCurrentEventIndex] = useState(null);
const [noEventMessage, setNoEventMessage] = useState(""); // État pour le message "Aucun événement"


useEffect(() => {
  // console.log("events_tab")
  // console.log(events_tab)
   setFilteredEvents(events_tab)
 }, [events_tab]);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);


const toggleCategory = (categoryId) => {
    if (categoryId === "Tout") {
        if (selectedCategories.length === categoriesList.length) {
            setSelectedCategories([]); // Désélectionner tout
        } else {
            setSelectedCategories(categoriesList.map(cat => cat.id)); // Sélectionner tout
        }
    } 
    else {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId) // Supprime si déjà sélectionné
                : [...prev, categoryId] // Ajoute sinon
        );
    }
};

  // Fermer le menu si on clique en dehors
  useEffect(() => {
 
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [selectedDay, setSelectedDay] = useState(null);
 
useEffect(() => {
  // Trouver le premier événement du jour sélectionné
  const index = filteredEvents.findIndex(event => 
    new Date(event.date_debut) <= new Date(selectedDay) &&
    new Date(event.date_ffin) >= new Date(selectedDay)
  );

  setCurrentEventIndex(index !== -1 ? index : null);
}, [selectedDay, filteredEvents]); // Exécuter chaque fois que `selectedDay` change

 

useEffect(() => {
  
  const generateEventDays = () => {
    const days = filteredEvents.flatMap(event => {
      const start = new Date(event.date_debut);
      const end = new Date(event.date_ffin);
      const range = [];

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        range.push(dateStr);
      }

      return range;
    });

    setEventDays(days);

     // Sélectionner le premier jour d'événement si rien n'est sélectionné
  if (days.length > 0 && !selectedDay) {
    setSelectedDay(days[0]);
  }
  };

  if (filteredEvents.length > 0) {
    generateEventDays();
  }

 
}, [filteredEvents]);   
 
useEffect(() => {
  const index = eventDays.indexOf(selectedDay);
  setCurrentEventIndex(index !== -1 ? index : null);
}, [selectedDay, eventDays]);

 
  
  // console.log("eventDays")
  // console.log(eventDays)
  
useEffect(() => {
  // Met à jour les événements en fonction du jour sélectionné
  const eventsForSelectedDay = filteredEvents.filter(event => {
    const startDate = new Date(event.date_debut);
    const endDate = new Date(event.date_ffin);
    const currentDate = new Date(selectedDay);
    
    return currentDate >= startDate && currentDate <= endDate;
  });
 
  setCurrentEvents(eventsForSelectedDay);
}, [selectedDay, filteredEvents]); 

  // Mise à jour de la gestion des jours d'événements
  
  
useEffect(() => {
  // Obtenir la date du jour au format YYYY-MM-DD
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

  // Met à jour la date sélectionnée
  setSelectedDay(todayStr);

  // Simuler un clic sur cette date pour afficher ses événements
  handleEventClick(todayStr);
}, [filteredEvents]);

  const handleEventClick = (dateStr) => {
     // Mettre à jour la sélection du jour
    setSelectedDay(dateStr);
  
    // Trouver tous les événements qui se déroulent ce jour-là
    const eventsForTheDay = filteredEvents.filter(event => {
      const startDate = new Date(event.date_debut.split('-').join('-'));
      const endDate = new Date(event.date_ffin.split('-').join('-'));
      const currentDate = new Date(dateStr);
  
      return currentDate >= startDate && currentDate <= endDate;
    });
  
    if (eventsForTheDay.length === 0) {
      setNoEventMessage("Aucun événement trouvé pour cette date.");
      setCurrentEvents([]); // Stocke une liste vide
    } else {
      setNoEventMessage(""); // Efface le message si des événements sont trouvés
      setCurrentEvents(eventsForTheDay); // Stocke la liste des événements trouvés
    }
  };

   
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      // Si le mois est décembre, passer à janvier (0) et incrémenter l'année
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      // Sinon, passer simplement au mois suivant
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      // Si le mois est janvier, passer à décembre (11) et décrémenter l'année
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      // Sinon, passer simplement au mois précédent
      setCurrentMonth(currentMonth - 1);
    }
  };

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();
  const generateCalendar = () => {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);
    let days = [];
  
    // Crée les cases vides avant le début du mois
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
  
    // Crée les jours du mois
    for (let day = 1; day <= totalDays; day++) {
      const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
     

    //  console.log("dateStr")
    //  console.log(dateStr)
       // Ajoute le jour au calendrier
      days.push(

<div 
  key={day} 
  className={`calendar-day ${eventDays.includes(dateStr) ? "has-event" : ""} ${selectedDay === dateStr ? "selected" : ""}`}
  onClick={() => handleEventClick(dateStr)}
  title={eventDays.includes(dateStr) ? "Événement disponible ce jour" : ""}
>
  {day}
</div>

      );
    }
  
    return days;
  };
   
  const goToPreviousEvent = () => {
    if (currentEventIndex > 0) {
      setSelectedDay(eventDays[currentEventIndex - 1]); // Passe au jour précédent
    }
  };
  
  const goToNextEvent = () => {
    if (currentEventIndex < eventDays.length - 1) {
      setSelectedDay(eventDays[currentEventIndex + 1]); // Passe au jour suivant
    }
  }; 
  const formatHeure = (heureString) => {
    if (!heureString) return '';
    if (heureString === "00:00") return '';

    // console.log("heureString")
    // console.log(heureString)
  
    const [heures, minutes] = heureString.split(':');
  
    // Si minutes est "00", on affiche seulement les heures
    return minutes === '00' ? `${heures}h` : `${heures}h${minutes}`;
  };
 

  useEffect(() => {
    if (eventDays.length > 0) {
      setCalendarDays(generateCalendar());
    }
  }, [selectedDay, eventDays, currentMonth, currentYear]);
   
  return (
    <>
    <div className="main_container event_ihm">
    <div className="calendar_view">              
        
      <div className="calendar-container">
        <div className="calendar-header">
                <div className="mode_affichage_container">

                           {links ?
                           
                          (
                            <button className="view_btn calendar active">
                            <FontAwesomeIcon icon={faCalendar}/>
                        </button>
                        
                          )
                        
                        :
                        
                        (
                          <button className="view_btn calendar active">
                          <FontAwesomeIcon icon={faCalendar}/>
                      </button>
                      
                        )}
                       
                           

                           {links ?
                           
                          (
                            <button 
                            onClick={() => router.push(`/event_timelines`)}
       
                            className="view_btn timeline" data-mode="timelines">
                           <FontAwesomeIcon icon={faList}/>
                         </button>
                          )
                        
                        :
                        
                        (
                          <button 
                          onClick={() => setTypeView_N("timeline")} 
                     
                          className="view_btn timeline" data-mode="timelines">
                         <FontAwesomeIcon icon={faList}/>
                       </button>

                        )}
                         
                    </div>
      
        <div className="event_categories_filter">
                          <button className="search_btn" onClick={() => setIsOpen_search(!isOpen_search)}>
                              rechercher <FontAwesomeIcon icon={faSearch}/>
                          </button>

                       
         <div className="dropdown filter_container" ref={dropdownRef}>
      
           <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
               {selectedCategories.length === categoriesList.length ? "Tout" : categoriesList.filter(cat => selectedCategories.includes(cat.id)).map(cat => cat.label).join(", ")}
          </button>

    {isOpen && (
                           <div className="dropdown-menu">
            <label>
                <input type="checkbox"
                    checked={selectedCategories.length === categoriesList.length}
                    onChange={() => toggleCategory("Tout")}
                />
                Tout
            </label>
            {categoriesList.map((category) => (
                <label key={category.id}>
                    <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => toggleCategory(category.id)}
                    />
                    {category.label}
                </label>
            ))}
        </div>
        
    )}
         </div>
        </div>

        <div className="calendar_controls">

         <button onClick={handlePreviousMonth} className='calendar_btn'>
         <FontAwesomeIcon icon={faChevronLeft} />
         </button>
 
        <ZoomView currentMonth={currentMonth} 
         currentYear={currentYear} onMonthChange={setCurrentMonth} 
         onYearChange={setCurrentYear}/>
 
 <button onClick={handleNextMonth} className='calendar_btn'>
 <FontAwesomeIcon icon={faChevronRight} />
       
  </button>


</div>
        
        </div>
        <div className="calendar-grid">
        <div className="calendar-weekday">Dim</div>
          <div className="calendar-weekday">Lun</div>
          <div className="calendar-weekday">Mar</div>
          <div className="calendar-weekday">Mer</div>
          <div className="calendar-weekday">Jeu</div>
          <div className="calendar-weekday">Ven</div>
          <div className="calendar-weekday">Sam</div>
         
          {/* {generateCalendar()} */}

          {calendarDays}
        </div>

        {/* Détails de l'événement */}
        {currentEventIndex !== null ? (
          <div className="event_details">
            <div className="card_header">
          
<div className="action_box">
<button className=' calendar_btn'
  onClick={goToPreviousEvent} 
  disabled={eventDays.indexOf(selectedDay) === 0} 
 >&lt;</button>

<button className='eventDetail' onClick={()=>{
  //  router.push(`/event/${eventId}`);
   router.push(`/event/${filteredEvents[currentEventIndex].id_event}`);
}}>Tout voir</button>

<button className=' calendar_btn' 
 onClick={goToNextEvent} 
 disabled={eventDays.indexOf(selectedDay) === eventDays.length - 1}
>&gt;</button>

</div>

            </div>
          
            <div className="event_mini_cards">
        
  {currentEvents.filter(event => {
      const startDate = new Date(event.date_debut);
    const endDate = new Date(event.date_ffin);
    const currentDate = new Date(selectedDay);
    console.log('tetetetet')
    console.log(event)
    const deb_hor = event?.tab_dates[Object.keys(event.tab_dates)[0]]?.heure_debut;
    console.log(event?.tab_dates[Object.keys(event.tab_dates)[0]]?.heure_debut)
    // formatHeure(item.tab_dates[Object.keys(item.tab_dates)[0]].heure_debut)
    if(type_model){
      return currentDate >= startDate && currentDate <= endDate && event?.type_model === parseInt(type_model);  
  
    }
    else{
      return currentDate >= startDate && currentDate <= endDate ;  
  
    }
    })
    .map((event, index) => (
      <div key={index} className="mini_card">
        <div className="calendar_zone">
        <span className="block_box horaire">
              {/* <FontAwesomeIcon icon={faClock} />  */}
              {(event?.tab_dates[0]?.heure_debut != "00:00") &&
              
              ( 
                <>
                 à 
               <span className='ml-2'>
               {formatHeure(event?.tab_dates[Object.keys(event.tab_dates)[0]]?.heure_debut)}
               </span> 
                
                </>      )
              }
              {/* à {event.heure_fin} */}
              </span>
        </div>

        <div className="event_zone">
          <label className='title_lbl'>
               {event.nom_event}
           <span className='type_model mx-3'>
            {event?.id_typemodel === 1 ? "pour mannequin" :
             event?.id_typemodel === 2 ? "vlogueuse" :
             event?.id_typemodel === 3 ? "hôtesse d'accueil" : ""}
           </span>
         </label>
               <label className="mini_detail">
                        { event.indication_lieu &&
                          <>
                              <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} size="sm" />
                                <span>
                                   {event.indication_lieu}
                                </span>             
                        
                         </>                           
                       }
              </label>
              <label className="organisateur_container">
                by {event?.nom_organiser ?
                (
                      <span>{event?.nom_organiser}</span>
                )
              
              :
              
              (

                <span>test</span>
              )}
                
              </label>
               
          </div>

          <div className="btn_zone">
          <button className='event_action' 
          onClick={() => router.push(`/event/${event.id_event}`)}
              
          >
            Voir +
          </button>
         
          </div>

       
       </div>
    ))
  }
</div>

             </div>
        ) : (

          <div className="event_details">
          {/* <label className='event_date'>events du {selectedDay}</label> */}
         
          <div className="event_mini_cards">
          {noEventMessage && <div className="event-details"><p>{noEventMessage}</p></div>}
         </div>
         
          </div>
          
        )}
      </div>
      </div>

   </div>
      {/* search modal */}
     
{isOpen_search && (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="search-overlay-srch"
      onClick={() => setIsOpen_search(false)} // Ferme en cliquant sur le fond noir
    >
      {/* Conteneur de la barre de recherche */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="search-container-srch"
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture en cliquant dans le champ
      >
        <div className="search_zone">
        <input
          type="text"
          placeholder="mannequin, event, etc..."
          className="search-input-srch"
        />

        <button className='search_submit'>
        <FontAwesomeIcon icon={faSearch}/>
                         
        </button>
        </div>
        
      </motion.div>

      {/* Zone des résultats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="search-results-srch"
      >
        <p className="search-results-text-srch">Résultats de recherche :</p>
         <ul className="search-list-srch">
          <li className="search-item-srch">Produit 1</li>
          <li className="search-item-srch">Produit 2</li>
          <li className="search-item-srch">Produit 3</li>
        </ul>
      </motion.div>
    </motion.div>
  </AnimatePresence>
)}
 
    </>
  );
}

export default Calendar_view;

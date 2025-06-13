// import React from 'react'
import React, { useState, useEffect ,useRef } from 'react';

import axios from 'axios';
// import { FaChevronUp, FaChevronRight, FaChevronDown } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
import { useRouter } from "next/navigation";
// import default_img from '/assets/img/event/event_2.jpeg'
// import Header_menu from "../Components/Header_menu";

// import Footer from "../Components/Footer";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faList,faMapMarkerAlt, faSearch,faChevronDown,faChevronRight, faChevronLeft ,faClock,faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
// import { FaChevronDown, FaChevronRight, FaClock, FaCalendarAlt } from "react-icons/fa";
import ZoomView from './ZoomView';
// import FixedMenu from '../Components/FixedMenu';


function Timeline_view({events , links , setTypeView_N}) {

   const apiUrl = 'https://apiafro.aafrodites.com'
  // const apiUrl = 'http://localhost:5000'
  //  const [loading, setLoading] = useState(true); // Loader state
   

    // get all events
     const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
 const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
 const [filteredEvents_b, setFilteredEvents_b] = useState([]);
  //  console.log("events")
  // console.log(events)
 const router = useRouter();

  // 🔹 Grouper les événements par `id_event`
  const groupedEvents = events.reduce((acc, event) => {
    const existingEvent = acc.find((e) => e.id_event === event.id_event);
    if (existingEvent) {
      // Ajouter les types de modèles au même événement
      if (!existingEvent.type_models.includes(event.type_model)) {
        existingEvent.type_models.push(event.type_model);
      }
    } else {

      // console.log(event)

      const formattedStart = event.heure_debut?.slice(0, 5); // "18:00"
const formattedEnd = event.heure_fin?.slice(0, 5);     // "20:00"

      acc.push({
        id_event: event.id_event,
        nom_event: event.nom_event,
        detail: event.detail,                
        pays: event.pays,                
        ville: event.ville,                
        quartier: event.quartier,                
        indication_lieu: event.indication_lieu,                
        statut: event.statut,                
        id_typeevent: event.id_typeevent,                
        date_debut: event.date_debut,
        paths: event?.paths,
        date_ffin: event.date_ffin,
        heure_debut : formattedStart,
        heure_fin : formattedEnd,
      
        type_models: [event.type_model],
      });
    }
    return acc;
  }, []);



 
  
  // Filtrage automatique à chaque changement de mois ou d’année
  useEffect(() => {
    // console.log("groupedEvents n")
    // console.log(groupedEvents)
    const result = groupedEvents.filter(event => {
      if (!event.date_debut || !event.date_ffin) return false;
  
      const startDate = new Date(event.date_debut);
      const endDate = new Date(event.date_ffin);
  
      const startYear = startDate.getFullYear();
      const startMonth = startDate.getMonth();
      const endYear = endDate.getFullYear();
      const endMonth = endDate.getMonth();
  
      // Vérifie si l'intervalle comprend le mois et l'année sélectionnés
      const isInRange =
        (startYear < currentYear || (startYear === currentYear && startMonth <= currentMonth)) &&
        (endYear > currentYear || (endYear === currentYear && endMonth >= currentMonth));
  
      return isInRange;
    });
  
    setFilteredEvents_b(result);
  }, [currentMonth, currentYear,events]);

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };


  // console.log(groupedEvents)
  // 🔹 Fonction pour formater la date
  const formatDate = (startDate, endDate) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const start = new Date(startDate).toLocaleDateString("fr-FR", options);
    const end = new Date(endDate).toLocaleDateString("fr-FR", options);

    if (start === end) return `${start.split(" ")[0]}`; // Si la date de début et de fin sont les mêmes
    return `${start.split(" ")[0]}-${end.split(" ")[0]}`;
  };


  const formatHeure = (heureString) => {
    if (!heureString) return '';
    if (heureString === "00:00") return '';

    // console.log(heureString)
  
    const [heures, minutes] = heureString.split(':');
  
    // Si minutes est "00", on affiche seulement les heures
    return minutes === '00' ? `${heures}h` : `${heures}h${minutes}`;
  };
  const [selectedCategories, setSelectedCategories] = useState([1, 2, 3]); // Par défaut, tout est sélectionné


const categoriesList = [
  { id: 1, label: "Mannequin" },
  { id: 2, label: "Vlogueuse" },
  { id: 3, label: "Hôtesse" }
];

// const [filteredEvents, setFilteredEvents] = useState(events);
 
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);


  const toggleCategory = (categoryId) => {
    if (categoryId === "Tout") {
        if (selectedCategories.length === categoriesList.length) {
            setSelectedCategories([]); // Désélectionner tout
        } else {
            setSelectedCategories(categoriesList.map(cat => cat.id)); // Sélectionner tout
        }
    } else {
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
    // console.log(events)

    const [activeEvent, setActiveEvent] = useState(null);

  const handleToggle = (id) => {
    setActiveEvent(activeEvent === id ? null : id); // Toggle pour ouvrir ou fermer les détails
  };

  // Trier les événements du plus récent au plus ancien
  // const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  // console.log("groupedEvents")
  // console.log(groupedEvents)
  // console.log("filteredEvents_b")
  // console.log(filteredEvents_b)

  
  // Afficher un loader si la page est en cours de chargement
 
  return (
    <>

<Header_menu data={{ link: 'events' }} />
     
     
     <div className="main_container event_ihm">


      <div className="timeline-container">
          <div className="calendar-header">
                   <div className="mode_affichage_container">
                     {links ?
                                            
                                           (
                                            <button 
                   
                   
                   onClick={() => router.push(`/events_calendar`)}
                  //  onClick={() => setTypeView_N("calendar")}
                    className="view_btn calendar">
                        <FontAwesomeIcon icon={faCalendar}/>
                 </button>
                  )
                                         
                                         :
                                         
                                         (
                                           <button 
                                           onClick={() => setTypeView_N("calendar")} 
                                      
                                           className="view_btn timeline" data-mode="timelines">
                                          <FontAwesomeIcon icon={faCalendar}/>
                                        </button>
                 
                                         )}
                                        
        
                           <button className="view_btn timeline active" data-mode="timelines">
                                    <FontAwesomeIcon icon={faList} />
                          </button>
        
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

<ZoomView 
currentMonth={currentMonth} 
currentYear={currentYear} 
onMonthChange={setCurrentMonth} 
onYearChange={setCurrentYear} 
/>

<button onClick={handleNextMonth} className='calendar_btn'>
<FontAwesomeIcon icon={faChevronRight} />

</button>


</div>
   
         
        </div>
                         
     

        <ul className="timeline">
          {filteredEvents_b.length > 0 ?
          
        (
          <>
            {filteredEvents_b.map((event , index) => (
        <li key={event.id_event}
         className={`timeline-event ${index % 2 === 0 ? "bg-white" : ""}`}>
          {/* <div className="timeline-dot"></div> */}

          <div className="timeline-title" onClick={() => handleToggle(event.id_event)}>
         
             <div className="calendar_zone">
              <span className="block_box date">
              {/* <FontAwesomeIcon icon={faCalendarAlt} /> */}
                {formatDate(event.date_debut, event.date_ffin)}
              </span>
              <span className="block_box horaire">
              {/* <FontAwesomeIcon icon={faClock} />  */}
              {(event.heure_debut != "00:00") &&
              
              ( 
                <>
                 à 
                {formatHeure(event.heure_debut)} 
                
                </>      )
              }
              {/* à {event.heure_fin} */}
              </span>
            </div>

            <div className="event_zone">
              <label className="title_lbl">{event.nom_event}</label>
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
              
              {/* <label className="description_event">
               
                Types de modèles: {event.type_models.join(", ")}
              </label> */}
            </div>

            <div className="btn_zone">
              {activeEvent === event.id_event ?    <FontAwesomeIcon icon={faChevronDown} />  : <FontAwesomeIcon icon={faChevronRight} /> }
            </div>
          </div>

          {/* Détails de l'événement */}
          {activeEvent === event.id_event && (
             <div className={`timeline-details`}>
            <div className="event_card">
              <div className="event_img">
                <img 
                className="img-fluid"
                src={`${apiUrl}/${event?.paths?.path_hrd}`}
                loading="lazy"
                //  src="default_img.jpg" 
                 alt="event" />
              </div>
              <div className="event_detail">
                 {event.detail}
              </div>

              <button className="eventDetail_btn" 
              onClick={() => router.push(`/event/${event.id_event}`)}
              
              >Voir +</button>
          
            </div>

           </div>

)}
        </li>
      ))}
          </>
        )
      
      :
      
      (
        <>
        <p className='text-center'>aucun évents pour ce mois</p>
        </>
      )}
    
    </ul>
    </div>
    </div>
  
    </>
  )
}

export default Timeline_view
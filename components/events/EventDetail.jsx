import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faCalendar, faMapMarkerAlt, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
// import FixedMenu from '../Components/FixedMenu';
import { apiUrl } from '../../config/apiUrl';
function EventDetail({ eventId }) {
  // const { id } = useParams();
  // const navigate = useNavigate();
  console.log("eventId")
  console.log(eventId)
  const router = useRouter();
const id = parseInt(eventId);
  // Aller vers une autre page
  const goToHome = () => {
    router.push('/');
  };
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const [eventIds, setEventIds] = useState([]);
  const [list_mannequin , setListmannequin] = useState([]);

  // const apiUrl = 'https://apiafro.aafrodites.com';
//   const apiUrl = 'http://localhost:5000';

  // Récupération des détails de l'événement
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Active le loader
        // const rep1 = await axios.post(`${apiUrl}/events/this_event`, { id });

        const [rep1, rep2] = await Promise.all([
          axios.post(`${apiUrl}/events/this_event`, { id }),
          axios.post(`${apiUrl}/events/event_mannequin`, { id }) // <- ta 2e requête ici
        ]);
        console.log("rep1")
        console.log(rep1)
        console.log(rep2)

        const grouped_event = rep1?.data.reduce((acc, row) => {
          // Vérifie si le mannequin existe déjà dans l'accumulateur

          // console.log("row")
          // console.log(row)

          // return false;
          // new Date(event.date).toISOString().split('T')[0]
          const convdb = new Date(row?.date_debut).toISOString().split('T')[0];
          // const dateDebut = `${convdb.getDate()}-${convdb.getMonth() + 1}-${convdb.getFullYear()}`;

          const convdf = new Date(row?.date_fin).toISOString().split('T')[0];
          // const dateFin = `${convdf.getDate()}-${convdf.getMonth() + 1}-${convdf.getFullYear()}`;


          let listevent = acc.find(item => (item.id_event === row.id_event));
          
          if (!listevent) {
          
            // Si non, crée une nouvelle entrée pour ce mannequin
            listevent = {
              id_event: row.id_event,
              nom_event: row.nom_event,
              detail: row.details,
              indication_lieu: row.indication_lieu,
              nom_organiser: row.nom_organiser,
              // detail: row.details,
              // detail: row.details,
              type_model: row.id_typemodel, 
              date_debut : convdb,
              date_ffin : convdf,
              heure_debut : row?.heure_debut,
              heure_fin : row?.heure_fin,
              paths: {},
              tab_dates: {} };
            acc.push(listevent);
          }
          
          // console.log("listevent")
          // console.log(listevent)
          
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

           // Ajout dans tab_dates
  const eventDay = new Date(row.event_date).toISOString().split('T')[0];
  listevent.tab_dates[eventDay] = {
    heure_debut: row.debut || row.heure_debut,
    heure_fin: row.fin || row.heure_fin
  };
          // console.log("listimg")
          // console.log(listimg)
          return acc;
        }, []);

        setEvent(grouped_event);
        setListmannequin(rep2.data)
  
        const formattedEvents = rep1.data.map(event => {
          const eventDate = new Date(event.date);
          const formatter = new Intl.DateTimeFormat('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });

          const formattedDate = formatter.format(eventDate);

          return {
            ...event,
            date: `${formattedDate.charAt(0).toUpperCase()}${formattedDate.slice(1)}`,
          };
        });

        // setEvent(formattedEvents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Désactive le loader
      }
    };

    fetchData();
  }, [id]);

  console.log("list_mannequin")
  
  console.log(list_mannequin)
  
  // Récupération des IDs des événements pour navigation
  useEffect(() => {
    const fetchEventIds = async () => {
      try {
        const response = await axios.get(`${apiUrl}/events/all`);
        const ids = response.data.map(model => model.id);
        setEventIds(ids);
      } catch (error) {
        console.error('Erreur lors de la récupération des IDs des événements', error);
      }
    };
    fetchEventIds();
  }, []);


   // 🔹 Fonction pour formater la date
   const formatDate = (startDate, endDate) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const start = new Date(startDate).toLocaleDateString("fr-FR", options);
 
console.log(start)

  if(!endDate) return `${start.split(" ")[0]} ${start.split(" ")[1]} ${start.split(" ")[2]}`; 
  
    const end = new Date(endDate).toLocaleDateString("fr-FR", options);

console.log(start)
// console.log(end)
    if (start === end) return `${start.split(" ")[0]} ${start.split(" ")[1]} ${start.split(" ")[2]}`; // Si la date de début et de fin sont les mêmes
    return `${start.split(" ")[0]}-${end.split(" ")[0]} ${end.split(" ")[1]} ${end.split(" ")[2]}`;
  };


  const currentIndex = eventIds.indexOf(parseInt(id, 10));

  const goToPrevious = () => {
    if (currentIndex > 0) {
      router.push(`/event/${eventIds[currentIndex - 1]}`);
      window.location.reload();
    }
  };

  const goToNext = () => {
    if (currentIndex < eventIds.length - 1) {
      router.push(`/event/${eventIds[currentIndex + 1]}`);
      window.location.reload();
    }
  };

  
  const formatHeure = (heureString) => {
    if (!heureString) return '';
    if (heureString === "00:00") return '';

    console.log(heureString)
  
    const [heures, minutes] = heureString.split(':');
  
    // Si minutes est "00", on affiche seulement les heures
    return minutes === '00' ? `${heures}h` : `${heures}h${minutes}`;
  };

  // const formatDateAvecMoisAbbr = (dateStr) => {
  //   const date = new Date(dateStr);
  //   const jour = date.getDate().toString().padStart(2, '0');
  //   const moisAbbr = new Intl.DateTimeFormat('fr-FR', { month: 'short' }).format(date);
  //   const annee = date.getFullYear();
  
  //   return `${jour} ${moisAbbr} ${annee}`;
  // };
  
  console.log("event")
  console.log(event)
  // Afficher un loader si la page est en cours de chargement
  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Chargement en cours...</p>
      </div>
    );
  }

  return (
    <>
      {event.map(item => (

        <div className="container eventDetailZoom  text-light" key={item?.id}>
          {/* <div className="section-header">
            <h2 className="text-light">{item.nom_event}</h2>
          </div> */}
          <div className="row">
            <div className="img_view col-md-6">
              <a href={`${apiUrl}/${item?.paths?.path_hrd}`} data-fancybox="gallery">
                <img
                  src={`${apiUrl}/${item?.paths?.path_hrd}`}
                  alt="event"
                  loading="lazy"
                  className="img-fluid rounded"
                />
              </a>
            </div>

            <div className="col-md-6">
            <div className="btn_box">
                  <button className="like">
                    <FontAwesomeIcon className="icon" icon={faThumbsUp} size="sm" />
                  </button>
                  {/* <button className="postuler">Postuler</button> */}
                  <button className="share">
                    <FontAwesomeIcon className="icon" icon={faShare} size="sm" />
                  </button>
             
              </div>
           
              <div className="details_event">
           
                <div className="event_info">
                  <div className="title_and_location">
                  <label className="text-light event_title">{item.nom_event}</label>
                 
                  <div className="event_location">
        
          <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} size="sm" />
                    {item?.indication_lieu}
            
                    </div>
                 
                  </div>
                  
                   <div className="calendar_box">
                  <div className="date_lbl">
                       {(item.date_debut === item.date_ffin) ?
                      (
                        <>
                       le
                       
                       <span>
                       {formatDate(item.date_debut)}
                    
                        </span> 
                        </>
                      )

                      :

                      (
                        <>
                           Du 
                           
                          <span className='date_zone'>
                            {formatDate(item.date_debut, item.date_ffin)}
                
                            </span>  
                        </>
                      )

                      }
                    

                  </div>
                  <div className="heure_lbl">

          {item.tab_dates && Object.keys(item.tab_dates).length > 0 && (
  <>
    à
    <span className='heure_zone'>
      {formatHeure(item.tab_dates[Object.keys(item.tab_dates)[0]].heure_debut)}
    </span>
  </>
)}   
                  {/* De  {item.heure_debut} à {item.heure_fin} */}
            
                  </div>

                </div>
        
                   
                </div>
                <div className="organisateur_container">
                  <label class="label">organisateur</label>
                  {event?.nom_organiser ?
                (
                     
                     <label className='data'>

                        {event?.nom_organiser}
                  </label>
                )
              
              :
              
              (

                <label className='data'>test</label>
              )}
                
                  {/* <label className='data'>Afrodites</label> */}
                </div>
                 <div className="collabs_container">
                  <label class="label">collaborateur(s)</label>
                  {/* <label className='data'>Afrodites</label> */}
                   <label className='data'>phirmin , kokou, loko</label>
               
                </div>
                <div className="participants">
                  <label className='fist_intro'>participants:</label>

                 
                  <div className="mannequin_container">
                  {list_mannequin.map((mannequin, index) => (
      <label key={index} className="data">
        {mannequin.prenom || mannequin.nom}
        {index !== list_mannequin.length - 1 && ', '}
      </label>
    ))}
    <label className="label">mannequin{list_mannequin.length > 1 ? 's' : ''}</label>
                
                </div>
                /
                <div className="hotesse_container">
                <label className='data'>afi ,</label>
                <label className='data'>beca</label>
                  <label class="label">hotesse</label>
               
                
                </div>

                /
                <div className="vlogueuse_container">
                <label className='data'>lila ,</label>
                <label className='data'>anna</label>
                  <label class="label">vlogueuse</label>
                
                
                </div>
              
                </div>
              
                <div>
                 </div>
                </div>
            </div>
          </div>
          <p>{item?.detail}</p>
               
        </div>
      ))}
      {/* <FixedMenu /> */}
    </>
  );
}

export default EventDetail;

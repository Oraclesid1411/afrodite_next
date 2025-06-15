'use client';

import  Timeline_view from "../../../components/events/Timeline_view.jsx"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {apiUrl} from "../../../config/apiUrl.js"

function EventsPage() {
  
//   const apiUrl = 'https://apiafro.aafrodites.com';
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
     
      try {
        setLoading(true); // Active le loader
     
           const rep1 = await axios.get(`${apiUrl}/events/all`);
       
           console.log("rep1")
           console.log(rep1)

          //  return false;
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


            let listevent = acc.find(item => (item.id_event === row.id_event) &&
                                              (item.type_model === row.id_typemodel));
            
            if (!listevent) {
            
              // Si non, crée une nouvelle entrée pour ce mannequin
              listevent = {
                id_event: row.id_event,
                nom_event: row.nom_event,
                detail: row.details,
                type_model: row.id_typemodel, 
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

            // console.log("listimg")
            // console.log(listimg)
            return acc;
          }, []);

        // console.log( grouped_event)
          //  const formattedEvents = rep1.data.map(event => ({
          //   ...event,
          //   date: new Date(event.date).toISOString().split('T')[0],
          // }));
  
          setEvents(grouped_event);
       
      } catch (err) {
        console.log(err);
      
      } finally {
        setLoading(false); // Désactive le loader
      }
    };
    fetchData();
  } , []);

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
  
<div className="container bgt_container"> 
<div className="main_container event_ihm">
        <Timeline_view events = {events} links={{ a: '#', b: '#' }} />
      </div>
</div>
  
       

{/* <FixedMenu/> */}
</>
  )
}

export default EventsPage
'use client';

import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";

import { useParams } from "next/navigation";
// import { useLocation } from "react-router-dom";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const apiUrl = "https://apiafro.aafrodites.com";

function AllModels() {

  const params = useParams();
  console.log("params")
  console.log(params)
  const id_model = params?.id?.[0]; // null si /mannequins, une valeur si /mannequins/123

  // const location = useLocation();
  // const id_model = location?.pathname.split("/")[2];

  const [loading, setLoading] = useState(true);
  const [mannequinsData, setMannequinsData] = useState([]);
  const [podiums, setPodiums] = useState([]);
  const [details, setDetails] = useState([]);
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

  // Fonction pour récupérer les données
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [rep1, rep2, rep3] = await Promise.all([
          axios.post(`${apiUrl}/fashion_model/list_mannequin`),
          axios.get(`${apiUrl}/fashion_model/podiums`),
          axios.get(`${apiUrl}/fashion_model/details`),
        ]);

        setMannequinsData(rep1.data);
        setPodiums(rep2.data);
        setDetails(rep3.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fonction de tri des mannequins
  const groupedResults = useMemo(() => {
    return mannequinsData.reduce((acc, row) => {
      let mannequin = acc.find((item) => item.id_mannequin === row.idmannequin);

      if (!mannequin) {
        mannequin = {
          id_mannequin: row.idmannequin,
          nom: row.nom,
          prenom: row.prenom,
          pseudo: row.pseudo,
          type_image: row.type_image,
          type_model: row.type_model,
          userclient: row.userclient,
          id_image: row.id_image,
          image_name: row.image_name,
          categorie_model : [],
          paths: {},
        };
        acc.push(mannequin);
      }

      if(row.id_categorie){
   
        switch (row.id_categorie) {
          case 1:
            if (!mannequin.categorie_model.includes(row.id_categorie)) {
              mannequin.categorie_model.push(row.id_categorie);
            }
            // mannequin.categorie_model.push(row.id_categorie);
            break;
    
          case 2:
            if (!mannequin.categorie_model.includes(row.id_categorie)) {
              mannequin.categorie_model.push(row.id_categorie);
            }
            
            break;
    
            case 3:
              if (!mannequin.categorie_model.includes(row.id_categorie)) {
                mannequin.categorie_model.push(row.id_categorie);
              }
              
              break;
          default:
            // Si un type inconnu est trouvé, le traiter ou ignorer
              break;
        }
      }
    
      switch (row.type_resolution) {
        case 5:
          mannequin.paths.path_md = row.path_resolution;
          break;
        case 6:
          mannequin.paths.path_mm = row.path_resolution;
          break;
        default:
          console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
      }

      return acc;
    }, []);
  }, [mannequinsData]);
// tri decroissant
const neworder = groupedResults.sort((a, b) => b.id_mannequin - a.id_mannequin); // Tri décroissant
  // Filtrer et trier les mannequins en mettant le modèle sélectionné en premier
  const order_data = useMemo(() => {
    return [...neworder].sort((a, b) =>
      a.id_mannequin === parseInt(id_model) ? -1 : b.id_mannequin === parseInt(id_model) ? 1 : 0
    );
  }, [neworder, id_model]);

  const podium_list = order_data.filter(model =>
    model.categorie_model?.includes(1)
  );
  
  const photo_list = order_data.filter(model =>
    model.categorie_model?.includes(2)
  );
  
  const clip_list = order_data.filter(model =>
    model.categorie_model?.includes(3)
  );
  console.log("order_data")
  console.log(clip_list)
  console.log(podium_list)
  console.log(photo_list)
  // Fonction pour obtenir le bon chemin d'image
  const getPathForResolution = (paths) => {
    if (deviceWidth <= 720) return paths.path_mm;
    return paths.path_md;
  };

  // Gestion du redimensionnement de l'écran
  const handleResize = useCallback(() => {
    setDeviceWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Chargement en cours...</p>
        </div>
      )}

      <div className="tab_list_box">
        <div className="tab-list product-tab-list sticky_nav_b">
          <nav className="nav product-tab-nav">
            <a className="product-tab-link tab-link active" href="#All" data-bs-toggle="tab">
              Tous
            </a>
            <a className="product-tab-link tab-link" href="#podium" data-bs-toggle="tab">
              Podium
            </a>
            {/* <a className="product-tab-link tab-link" href="#details" data-bs-toggle="tab">
              Détails
            </a> */}
            <a className="product-tab-link tab-link" href="#photo" data-bs-toggle="tab">
              Photo
            </a>
            <a className="product-tab-link tab-link" href="#clip" data-bs-toggle="tab">
              Clip
            </a>
          </nav>
        </div>

        <div className="tab-content product-tab-content col-12">
        <TabPane id="All" title="Tous" active={true}>
              <div className="row bg-white">
                  {order_data.map((item) => (
                        <MannequinCard key={item.id_mannequin} item={item} getPathForResolution={getPathForResolution} />
                 ))}
             </div>
        </TabPane>
     
          <TabPane id="podium" title="podium">
            <div className="row">
              {podium_list.map((item) => (
                <MannequinCard key={item.idmannequin} item={item} getPathForResolution={getPathForResolution}/>
              ))}
            </div>
          </TabPane>

          <TabPane id="photo" title="photo">
            <div className="row">
              {photo_list.map((item) => (
                <MannequinCard key={item.idmannequin} item={item} getPathForResolution={getPathForResolution}/>
              ))}
            </div>
          </TabPane>


          <TabPane id="clip" title="clip">
            <div className="row">
              {clip_list.map((item) => (
                <MannequinCard key={item.idmannequin} item={item} getPathForResolution={getPathForResolution}/>
              ))}
            </div>
          </TabPane>


         
        </div>
      </div>
    </>
  );
}


// Composant de carte pour afficher les mannequins
const MannequinCard = ({ item, getPathForResolution }) => {
  console.log(item)
  return (
    <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">
      <div className="product-card listing">
        <div className="product-card-img">
          <a className="hover-switch" href={`/single_view/1/${item.id_mannequin}`}>
            <img 
            className="img-fluid thumbnail" 
            loading="lazy"
            src={getPathForResolution ?  `${apiUrl}/${getPathForResolution(item.paths)}` : `${apiUrl}/${item.path_image}`} alt="mannequin" />
          </a>
        </div>
        <a className="text-dark hover-switch" href={`/single_view/1/${item.id_mannequin}`}>
          <label>{item.pseudo}</label>
        </a>
      </div>
    </div>
  );
};


// Composant pour chaque onglet
const TabPane = ({ id, title, active, children }) => {
  return (
  
  <div id={id} className={`tab-pane fade ${active ? "active show" : ""}`}>
    {/* <h3>{title}</h3> */}
    {children}
  </div>
    // <div id={id} className="tab-pane fade">
    //   <h3>{title}</h3>
    //   {children}
    // </div>
  );
};

export default AllModels;

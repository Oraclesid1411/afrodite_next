'use client';

import React , {useState, useEffect} from 'react'

// import Slider from "react-slick";
import axios from 'axios';

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


function All_Parteners() {

   
     const [loading, setLoading] = useState(true); // Loader state
    // const [collabs_data , setcollabs_data] = useState([]); 
    const [photographes_data , setPhotgraphes_data] = useState([]); 
    const [stylistes_data , setStyliste_data] = useState([]); 
    const [coiffeurs_data , setCoiffeurs_data] = useState([]); 
    const [maquilleurs_data , setMaquilleurs_data] = useState([]); 
    const [boutiques_data , setBoutiques_data] = useState([]); 
    // const [collabs_categorie , setcollabs_categorie] = useState([]); 
    // const [newuserdata , setnewuserdata] = useState([]);
    
    
    const apiUrl = 'https://apiafro.aafrodites.com'


        const [isloaded, setIsloaded] = useState(true);
        useEffect(() => {
          const fetchData = async () => {
            
            try {
              const [rep1 , rep2, rep3, rep4 , rep5] = await Promise.all([
                axios.post(`${apiUrl}/Collabs/all_photographes`), 
                axios.post(`${apiUrl}/Collabs/all_maquilleurs`), 
                axios.post(`${apiUrl}/Collabs/all_stylistes`), 
                axios.post(`${apiUrl}/Collabs/all_coiffeur`), 
                axios.post(`${apiUrl}/Collabs/liste_boutiques`), 
              
              ]);
              setPhotgraphes_data(rep1.data);
              setMaquilleurs_data(rep2.data);
              setStyliste_data(rep3.data);
              setCoiffeurs_data(rep4.data);
              setBoutiques_data(rep5.data);
               
              setIsloaded(false)
              setLoading(false)
            } catch (err) {
              console.error("Erreur lors de la récupération des données :", err);
            }
          };
         
          // N'exécuter fetchData que si isloaded est true
            if (isloaded) {
              fetchData();
            }
        }, [isloaded]);




     
const groupedResults = photographes_data.reduce((acc, row) => {
    // Vérifie si le mannequin existe déjà dans l'accumulateur
    let model = acc.find(item => item.model_id === row.idcontributeur);
      
    if (!model) {
      // Si non, crée une nouvelle entrée pour ce mannequin
      model = {
        model_id: row.idcontributeur,
        nom: row.nom,
        prenom: row.prenom,
        pseudo: row.person_pseudo,
        type_image: row.type_image,
        type_collab: row.type_model,
        userclient: row.userclient,
        id_image: row.id_image,
        image_name: row.image_name,
         paths: {} };
      acc.push(model);

    }
    
    // Ajoute le path_image correspondant au type_resolution
    switch (row.type_resolution) {
      case 5:
        model.paths.path_md = row.path_resolution;
        break;
      case 6:
        model.paths.path_mm = row.path_resolution;
        break;
      default:
        
        break;
    }
  
    return acc;
  }, []);

  // console.log("groupedResults")
  // console.log(groupedResults)
  
  const groupedResultsStyliste = stylistes_data.reduce((acc, row) => {
    // Vérifie si le mannequin existe déjà dans l'accumulateur
    let model = acc.find(item => item.model_id === row.idcontributeur);
      
    if (!model) {
      // Si non, crée une nouvelle entrée pour ce mannequin
      model = {
        model_id: row.idcontributeur,
        nom: row.nom,
        prenom: row.prenom,
        pseudo: row.person_pseudo,
        type_image: row.type_image,
        type_model: row.type_model,
        userclient: row.userclient,
        id_image: row.id_image,
        image_name: row.image_name,
         paths: {} };
      acc.push(model);

    }
    
    // Ajoute le path_image correspondant au type_resolution
    switch (row.type_resolution) {
      case 5:
        model.paths.path_md = row.path_resolution;
        break;
      case 6:
        model.paths.path_mm = row.path_resolution;
        break;
      default:
        
        break;
    }
  
    return acc;
  }, []);
  
  

  const groupedResultsCoiffeurs = coiffeurs_data.reduce((acc, row) => {
    // Vérifie si le mannequin existe déjà dans l'accumulateur
    let model = acc.find(item => item.model_id === row.idcontributeur);
      
    if (!model) {
      // Si non, crée une nouvelle entrée pour ce mannequin
      model = {
        model_id: row.idcontributeur,
        nom: row.nom,
        prenom: row.prenom,
        pseudo: row.person_pseudo,
        type_image: row.type_image,
        type_model: row.type_model,
        userclient: row.userclient,
        id_image: row.id_image,
        image_name: row.image_name,
         paths: {} };
      acc.push(model);

    }
    
    // Ajoute le path_image correspondant au type_resolution
    switch (row.type_resolution) {
      case 5:
        model.paths.path_md = row.path_resolution;
        break;
      case 6:
        model.paths.path_mm = row.path_resolution;
        break;
      default:
        
        break;
    }
  
    return acc;
  }, []);
  
  
  const groupedResultsMaquilleurs = maquilleurs_data.reduce((acc, row) => {
    // Vérifie si le mannequin existe déjà dans l'accumulateur
    let model = acc.find(item => item.model_id === row.idcontributeur);
      
    if (!model) {
      // Si non, crée une nouvelle entrée pour ce mannequin
      model = {
        model_id: row.idcontributeur,
        nom: row.nom,
        prenom: row.prenom,
        pseudo: row.person_pseudo,
        type_image: row.type_image,
        type_model: row.type_model,
        userclient: row.userclient,
        id_image: row.id_image,
        image_name: row.image_name,
         paths: {} };
      acc.push(model);

    }
    
    // Ajoute le path_image correspondant au type_resolution
    switch (row.type_resolution) {
      case 5:
        model.paths.path_md = row.path_resolution;
        break;
      case 6:
        model.paths.path_mm = row.path_resolution;
        break;
      default:
        
        break;
    }
  
    return acc;
  }, []);
  
  const groupedResultsBoutiques = boutiques_data.reduce((acc, row) => {
    // Vérifie si le mannequin existe déjà dans l'accumulateur
    let model = acc.find(item => item.model_id === row.collab_id);
      
    if (!model) {
      // Si non, crée une nouvelle entrée pour ce mannequin
      model = {
        model_id: row.collab_id,
        nom: row.nom,
        prenom: row.prenom,
        pseudo: row.pseudo,
        type_image: 1,
        type_model: row.type_model,
        userclient: row.userclient,
        id_image: row.id_image,
        image_name: row.image_name,
        
        type_contributeur: row.type_contributeur,
         paths: {} };
      acc.push(model);
  
      
    }
    
    // Ajoute le path_image correspondant au type_resolution
    switch (row.type_resolution) {
      case 5:
        model.paths.path_md = row.path_resolution;
        break;
      case 6:
        model.paths.path_mm = row.path_resolution;
        break;
      default:
        
        break;
    }
  
    return acc;
  }, []);

  console.log("groupedResultsBoutiques")
  console.log(groupedResultsBoutiques)


  // const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

  const [deviceWidth, setDeviceWidth] = useState(0);

  useEffect(() => {
    // Fonction pour mettre à jour la largeur
    const updateWidth = () => {
      setDeviceWidth(window.innerWidth);
    };

    // Initialiser la valeur une fois le composant monté
    updateWidth();

    // Ajouter l'écouteur d'événement
    window.addEventListener('resize', updateWidth);

    // Nettoyer l'écouteur à la destruction du composant
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

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

   

    
  return (
    <>
    
    {loading === true &&

(
  <div className="loader-container">
  <div className="spinner"></div>
  <p>Chargement en cours...</p>
</div>

)
}
<div className="partener_zone tab_list_box" >
                     <div className="tab-list product-tab-list sticky_nav_b">
                        <nav className="nav product-tab-nav">
                            <a className="product-tab-link tab-link active" href="#Photographes" data-bs-toggle="tab">Photographes</a>
                            <a className="product-tab-link tab-link " href="#Coiffeurs" data-bs-toggle="tab">Coiffeurs</a>
                            <a className="product-tab-link tab-link " href="#Maquilleurs" data-bs-toggle="tab">Maquilleurs</a>
                            <a className="product-tab-link tab-link " href="#Stylistes" data-bs-toggle="tab">Stylistes</a>
                            <a className="product-tab-link tab-link " href="#Boutiques" data-bs-toggle="tab">Boutiques</a>
                       </nav>
                    </div>
                    <div className="partener_content tab-content product-tab-content col-12">
                    <div id="Photographes" className="mt-1 tab-pane fade active show">
                        <div className="row bg-white" >
                               
                               <div className="col-lg-12 col-md-12 col-12">
                                     <div className='bg-white data_section'>
                                       <div className="content px-3">
                                               {/* <Slider {...settings}> */}
                                            <div className="row p-0">
                                               {groupedResults.map((item) => (
                                                        <>
                                                            <div key={item?.model_id} className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                   <div className="product-card listing">
                                                       <div className="product-card-img">
                                                       <a className="hover-switch" href={`singleViewP/1/${item?.model_id}`}>
                                                            <img 
                                                            loading="lazy"
                                                            src={`${apiUrl}/${getPathForResolution(item.paths)}`} 
                                                            alt="photographe" 
                                                            className="img-fluid thumbnail" />
                                                        </a>          
                                                    </div>   
                                                    <a className="text-dark hover-switch" href={`singleViewP/1/${item?.model_id}`}>
                                                    <label className=''> {item?.pseudo}</label>     
                                                </a>                                             
                                                </div>
                                               
                                            </div>
                                        </>
                                    ))}
                                        </div>                                       
                                        {/* </Slider> */}                                       
                                    </div>

                                    <div className="plusMannequin">
                                           {/* voir plus */}
                                        <a href="#">
                                        <img loading="lazy" src="/assets/models/add.png" alt=""/>
                                        </a>
                                       
                                    </div>
                                       
                                   </div>
                               </div>
                           </div>
                        </div>
                        <div id="Coiffeurs" className="mt-1 tab-pane fade">
                        <div className="row bg-white" >
                               
                        <div className="col-lg-12 col-md-12 col-12">
                                     <div className='bg-white data_section'>
                                       <div className="content px-3">
                                            {/* <Slider {...settings}> */}
                                            <div className="row">
                                            {groupedResultsCoiffeurs.map((item) => (
                                                        <>
                                                            <div key={item?.contributor_id} className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                   <div className="product-card listing">
                                                       <div className="product-card-img">
                                                       <a className="hover-switch" href={`singleViewP/3/${item?.model_id}`}>
                                                            <img loading="lazy" src={`${apiUrl}/${getPathForResolution(item.paths)}`} alt="coiffeur" className='img'/>
                                                        </a>          
                                                    </div>  
                                                    <a className="text-dark hover-switch" href={`singleViewP/3/${item?.model_id}`}>
                                                    <label className=''> {item?.pseudo}</label>     
                                                </a>                                              
                                                </div>
                                               
                                            </div>
                                        </>
                                    ))}
                                        </div>                                       
                                        {/* </Slider> */}    
                                          
                                       </div>
                                   
                                       <div className="plusMannequin">
                                           {/* voir plus */}
                                           <a href="#">
                                           <img loading="lazy" src="/assets/models/add.png" alt=""/>
                                           </a>
                                       
                                       </div>
                                       
                                   </div>
                               </div>
                           </div>
                        </div>
                        
                        <div id="Maquilleurs" className=" mt-1 tab-pane fade">
                        <div className="row bg-white" >
                               
                        <div className="col-lg-12 col-md-12 col-12">
                                     <div className='bg-white data_section'>
                                       <div className="content px-3">
                                            {/* <Slider {...settings}> */}
                                            <div className="row">
                                            {groupedResultsMaquilleurs.map((item) => (
                                                        <>
                                                            <div key={item?.contributor_id} className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                   <div className="product-card listing">
                                                       <div className="product-card-img">
                                                       <a className="hover-switch" href={`singleViewP/2/${item?.model_id}`}>
                                                            <img loading="lazy" src={`${apiUrl}/${getPathForResolution(item.paths)}`} alt="maquilleur" className='img'/>
                                                        </a>          
                                                    </div>  
                                                    <a className="text-dark hover-switch" href={`singleViewP/2/${item?.model_id}`}>
                                                    <label className=''> {item?.pseudo}</label>     
                                                </a>                                               
                                                </div>
                                               
                                            </div>
                                        </>
                                    ))}
                                        </div>                                       
                                        {/* </Slider> */}    
                                       </div>
                                   
                                       <div className="plusMannequin">
                                           {/* voir plus */}
                                           <a href="#">
                                           <img loading="lazy" src="/assets/models/add.png" alt=""/>
                                           </a>
                                       
                                       </div>
                                       
                                   </div>
                               </div>
                           </div>
                        </div>

                        <div id="Stylistes" className="mt-1 tab-pane fade">
                        <div className="row bg-white" >
                               
                        <div className="col-lg-12 col-md-12 col-12">
                                     <div className='bg-white data_section'>
                                       <div className="content px-3">
                                            {/* <Slider {...settings}> */}
                                            <div className="row">
                                            {groupedResultsStyliste.map((item) => (
                                                        <>
                                                            <div key={item?.contributor_id} className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                   <div className="product-card listing">
                                                       <div className="product-card-img">
                                                       <a className="hover-switch" href={`singleViewP/4/${item?.model_id}`}>
                                                            <img loading="lazy" src={`${apiUrl}/${getPathForResolution(item.paths)}`} alt="styliste" className='img'/>
                                                        </a>          
                                                    </div>  
                                                    <a className="text-dark hover-switch" href={`singleViewP/4/${item?.model_id}`}>
                                                    <label className=''> {item?.pseudo}</label>     
                                                </a>                                               
                                                </div>
                                              
                                            </div>
                                        </>
                                    ))}
                                        </div>                                       
                                        {/* </Slider> */}    
                                       </div>
                                   
                                       <div className="plusMannequin">
                                           {/* voir plus */}
                                           <a href="#">
                                           <img loading="lazy" src="/assets/models/add.png" alt=""/>
                                           </a>
                                       
                                       </div>
                                       
                                   </div>
                               </div>
                           </div>
                        </div>

                        <div id="Boutiques" className="mt-1 tab-pane fade">
                        <div className="row bg-white" >
                        <div className="col-lg-12 col-md-12 col-12">
                                     <div className='bg-white data_section'>
                                       <div className="content px-3">
                                            {/* <Slider {...settings}> */}
                                            <div className="row">
                                            {groupedResultsBoutiques.map((item) => (
                                                        <>
                                                            <div key={item?.model_id} className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                   <div className="product-card listing">
                                                       <div className="product-card-img">
                                                       <a className="hover-switch" href={`singleViewP/5/${item?.model_id}`}>
                                                            <img loading="lazy" src={`${apiUrl}/${getPathForResolution(item.paths)}`} alt="boutique" className='img'/>
                                                        </a>          
                                                    </div>  
                                                    <a className="text-dark hover-switch" href={`singleViewP/5/${item?.model_id}`}>
                                                    <label className='small_txt'> {item?.nom}</label>     
                                                </a>                                               
                                                </div>
                                               
                                            </div>
                                        </>
                                    ))}
                                        </div>                                       
                                        {/* </Slider> */}    
                                       </div>
                                   
                                       <div className="plusMannequin">
                                           {/* voir plus */}
                                           <a href="#">
                                           <img loading="lazy" src="/assets/models/add.png" alt=""/>
                                           </a>
                                       
                                       </div>
                                       
                                   </div>
                               </div>

                            </div>
                        </div>
                       
                    </div>
                </div>
    </>
  )
}

export default All_Parteners;
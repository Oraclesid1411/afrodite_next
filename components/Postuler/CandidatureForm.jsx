import { useState ,useEffect } from "react";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 

import {
  faInstagram,
  faFacebook,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

const CandidatureForm = (selectedCategory) => {

  console.log("selectedCategory")
  console.log(selectedCategory)
  const [selectedCategories, setSelectedCategories] = useState([]);
  // const [openSections, setOpenSections] = useState({});

  const [openSections, setOpenSections] = useState(() => ({
    [selectedCategory?.selectedCategory]: true, // Ouvre automatiquement la catégorie sélectionnée
  }));

  useEffect(() => {
    if (selectedCategory) {
      setOpenSections((prev) => ({ ...prev, [selectedCategory?.selectedCategory]: true }));
    }
  }, [selectedCategory]);

  console.log("openSections")
  console.log(openSections)
  const [add_img, setAddimg] = useState(0); 
  const [add_img_b , setAddimg_b] = useState(0); 
   // declaration des parametres pour les images
   const [upload_img, setUpload_img] = useState([]);   
   const [images_gallery_boxshow, setimages_gallery_boxshow] = useState(false);   
 

  const [taille_m, settaille_m] = useState("1");
    const [taille_cm, settaille_cm] = useState("00");
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   height: "",
  //   experience: "",
  //   socialMedia: "",
  // });

  const [formData, setFormData] = useState({
    postulant: {
      nom: "",
      prenom: "",
      pseudo: "",
      date_naissance: "",
      age: "",
      nationalite: "",
      pays: "",
      ville: "",
      indication: "",
      indicatif_phone: "",
      telephone: "",
      indicatif_whatsapp: "",
      whatsapp: "",
      email: "",
      disponible: "",
      disponibilites: "",
      soirsWeekends: "",
      experience: "",
     
    }
    ,
    mannequin: {
    
      taille: "",
      tatouagePiercing: null,
    
      // poids: "",
      // tourPoitrine: "",
      // tourTaille: "",
      // tourHanches: "",
      // pointure: "",
      // couleurYeux: "",
      // couleurCheveux: "",
      // typeCheveux: "",
      // teint: "",
      // particularites: "",
      // experience: "",
      // formationPose: "",
      // langues: "",
      photos: null,
      videoPresentation: null,
      reseauxSociaux: "",
       
    },
   
    hotesse: {
      taille: "",
      couleurCheveux: "",
      couleurYeux: "",
      poids: "",
      uniforme: "",
      dernierDiplome: "",
      formationAccueil: "",
      langues: "",
      outilsInformatique: "",
      experiences: "",
      qualites: "",
      motivation: "",
      stress: "",
      photoRecente: null,
      cv: null,
      lettreMotivation: null,
      certificats: null,
     
    },
    influenceur: {
     
      instagram: {
        lien: "",
        abonnés: "",
        tauxEngagement: "",
      },
      tiktok: {
        lien: "",
        abonnés: "",
        tauxEngagement: "",
      },
      youtube: {
        lien: "",
        abonnés: "",
        tauxEngagement: "",
      },
      facebook: {
        lien: "",
        abonnés: "",
        tauxEngagement: "",
      },
      // autresReseaux: "",
      style: "",
      specialisation: "",
      collaborations: "",
      audience: "",
      meilleursPosts: "",
      videoPresentation: "",
      statistiques: "",
      motivation: "",
      disponibiliteCollaboration: "",
    },
  });
  // const toggleCategory = (category) => {
  //   setSelectedCategories((prev) =>
  //     prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
  //   );
  // };

    // Toggle l'ouverture/fermeture des sections
    const toggleCategory = (category) => {
      setSelectedCategories((prev) =>
        prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
      );
      setOpenSections((prev) => ({
        ...prev,
        [category]: !prev[category],
      }));
    };

    const handleTailleChange = (field, value) => {
      // Met à jour la taille en mètres ou centimètres
      if (field === "m") settaille_m(value);
      if (field === "cm") settaille_cm(value);
  
      // Met à jour la taille dans formData
      setFormData((prevFormData) => ({
        ...prevFormData,
        mannequin: {
          ...prevFormData.mannequin,
          taille: `${field === "m" ? value : taille_m}.${field === "cm" ? value : taille_cm}`,
        },
        hotesse: {
          ...prevFormData.hotesse,
          taille: `${field === "m" ? value : taille_m}.${field === "cm" ? value : taille_cm}`,
        },
      }));
    };

    const handleInputChange = (type, field, value) => {
      // Fonction pour calculer l'âge
      const calculateAge = (dateString) => {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
    
        // Vérifier si l'anniversaire est passé cette année
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
    
        return age;
      };
    
      setFormData((prev) => {
        const updatedData = {
          ...prev,
          [type]: {
            ...prev[type],
            [field]: value,
          },
        };
    
        // Si le champ modifié est la date de naissance, calculer et mettre à jour l'âge
        if (field === "date_naissance") {
          updatedData[type].age = value ? calculateAge(value) : "";
        }
    
        return updatedData;
      });
    };
  const handleCheckboxChange = (type, field, value) => {
    // setSelectedTypes((prevState) => ({
    //   ...prevState,
    //   [type]: !prevState[type],
    // }));

    setSelectedTypes((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: prev[type][field] === value ? null : value,
      },
    }));

    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: {
        ...prevFormData[type],
        etat_candidature: !selectedTypes[type], // Ajoute ou met à jour le champ
      },
    }));
  };
  const handleCheckboxChange_b = (type, field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [field]: prevState[type][field] === value ? null : value, // Basculer entre la valeur sélectionnée et null
      },
    }));
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="custom_form container">
      <h2 className="form-title">Postuler</h2>

      <form onSubmit={handleSubmit} className="form-container">
        {/* Zone générale */}
        {/* <div className="section general-info">
          <h3>Informations Générales</h3>
          <div className="form-group">
            <label>Nom :</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email :</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Téléphone :</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
        </div> */}

        {/* Accordéons verticaux */}
        {["mannequin", "hotesse", "influenceur"].map((category) => (
          <div key={category} className="accordion-container">
            <button
              type="button"
              className={`accordion-btn ${selectedCategories.includes(category) ? "active" : ""}`}
              onClick={() => toggleCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
            <motion.div
              className="accordion-content"
              initial={false}
              animate={{ height: openSections[category] ? "auto" : 0, opacity: openSections[category] ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              {openSections[category] && (
                <div className="section-content">
                  {category === "mannequin" && (
                    <>
                     <form>
                                <div className="mb-4">
                                <label
                                 className="input_label"
                                 >
                                    <span>
                                    Taille  
                                    </span>
                                    <div className="float_data input-taille ">
                                    <input type="number" id="taille_m"
                                      value={taille_m}
                                      // onChange={(e) => settaille_m(e.target.value)}
                                      onChange={(e) => handleTailleChange("m", e.target.value)}
                                       name="taille_m" min="0" max = "2" placeholder="m"
                                        required/>
                                    <span className="mx-2"> m </span>
                                    <input type="number" id="taille_cm"
                                      value={taille_cm}
                                      onChange={(e) => handleTailleChange("cm", e.target.value)}
                                      // onChange={(e) => settaille_cm(e.target.value)}
                                       name="taille_cm" min="0" max="99" placeholder="cm" required/>
                                    <span className="mx-2"> cm </span>
                    
                                </div>
                                
                                
                                </label>
                    
                                </div>
                                <label
                               className="input_label"
                               >
                                   <span>
                                       Tatouage/Piercing
                                 </span>
                                 <div className="float_data">
                                 <label>
                                <input
                                  type="checkbox"
                                  checked={formData.mannequin.tatouagePiercing === "Oui"}
                                  onChange={() => handleCheckboxChange_b("mannequin", "tatouagePiercing", "Oui")}
                                />
                                Oui
                              </label>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={formData.mannequin.tatouagePiercing === "Non"}
                                  onChange={() => handleCheckboxChange_b("mannequin", "tatouagePiercing", "Non")}
                                />
                                Non
                              </label>
                    
                                 </div>
                              
                             </label>
                                <div className="mb-4">
                                  <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
                                            {/* <h4>Informations Mannequin</h4> */}
                                            {/* Zones de photos */}
                                           
                                               
                                           <label
                                             className="input_label"
                                             >
                                              {/* <div className="text-center w-100"> */}
                                                <label className="title_dg">
                                                  ajouter vos images
                                                   <span>
                                                   (* récentes)
                                                    </span>
                    
                                                </label>
                                             
                                                </label>
                                              
                                          </div>
                                </div>
                              </form>
                    </>
                  )}
                  {category === "hotesse" && (
                   <>
                     <form>
                                <div className="mb-4">
                               <label
                                className="input_label"
                                >
                                   <span>
                                   Taille  
                                   </span>
                                   <div className="float_data input-taille ">
                                   <input type="number" id="taille_m"
                                     value={taille_m}
                                     onChange={(e) => handleTailleChange("m", e.target.value)}
                                      name="taille_m" min="0" max = "2" placeholder="m" required/>
                                   <span className="mx-2"> m </span>
                                   <input type="number" id="taille_cm"
                                     value={taille_cm}
                                     onChange={(e) => handleTailleChange("cm", e.target.value)}
                                      name="taille_cm" min="0" max="99" placeholder="cm" required/>
                                   <span className="mx-2"> cm </span>
                   
                               </div>
                               
                               
                               </label>
                   
                               </div>
                              
                               <div className="mb-4">
                                 <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
                                           {/* <h4>Informations Mannequin</h4> */}
                                           {/* Zones de photos */}
                                          
                                          {/* la boite de modele de sselecton va  */}
                                         
                               {/* fin de la boite modal  */}
                                                <label
                                            className="input_label"
                                            >
                                             {/* <div className="text-center w-100"> */}
                                               <label className="title_dg">
                                                 ajouter votre photo
                                                  <span>
                                                  (* récentes)
                                                   </span>
                   
                                               </label>
                                           
                                                 </label>
                                           {/* fin photo */}
                                        
                                             
                                         </div>
                               </div>
                              
                             </form>
                   </>
                  )}
                  {category === "influenceur" && (
                    <>
                       <form>
                              <div className="mb-4 input_group">
                              <label
                               className="input_label"
                               >
                                   <span>
                                   {/* <label className="block mb-2 flex items-center"> */}
                                  <FontAwesomeIcon icon={faInstagram} className="text-pink-500 mr-3" />
                                  Instagram
                                {/* </label> */}
                                 </span>
                                 <div className="float_data">
                    
                                 <input
                                  type="url"
                                    className="input_value"
                                  placeholder="Lien Instagram"
                                  value={formData.influenceur.instagram.lien}
                                  onChange={(e) =>
                                    handleInputChange("influenceur", "instagram", {
                                      ...formData.influenceur.instagram,
                                      lien: e.target.value,
                                    })
                                  }
                                  // className="w-full border p-2 rounded"
                                />
                    
                             </div>
                              
                                 {/* <label className="float_msg"> (optionnel)</label> */}
                             </label>
                             <label
                               className="input_label"
                               >
                                   <span>
                                 nbr. abonnés
                                 </span>
                                 <div className="float_data">
                    
                                 <input
                                  type="number"
                                  placeholder="Nombre d'abonnés Instagram"
                                  value={formData.influenceur.instagram.abonnés}
                                  onChange={(e) =>
                                    handleInputChange("influenceur", "instagram", {
                                      ...formData.influenceur.instagram,
                                      abonnés: e.target.value,
                                    })
                                  }
                                   className="input_value"
                                />
                    
                                </div>
                              
                                 {/* <label className="float_msg"> (optionnel)</label> */}
                             </label>
                               
                              
                               
                              </div>
                        
                              <div className="mb-4 input_group">
                              <label
                               className="input_label"
                               >
                                   <span>
                                   <FontAwesomeIcon icon={faFacebook} className="text-blue-500 mr-2" />
                                  Facebook
                                 </span>
                                 <div className="float_data">
                    
                                 <input
                                     className="input_value"
                                     type="url"
                                     placeholder="Lien Facebook"
                                     value={formData.influenceur.facebook.lien}
                                     onChange={(e) =>
                                       handleInputChange("influenceur", "facebook", {
                                         ...formData.influenceur.facebook,
                                         lien: e.target.value,
                                       })
                                     }
                                />
                    
                             </div>
                              
                                 {/* <label className="float_msg"> (optionnel)</label> */}
                             </label>
                             <label
                               className="input_label"
                               >
                                   <span>
                                 nbr. abonnés
                                 </span>
                                 <div className="float_data">
                    
                                 <input
                                 type="number"
                                 placeholder="Nombre d'abonnés Facebook"
                                 value={formData.influenceur.facebook.abonnés}
                                 onChange={(e) =>
                                   handleInputChange("influenceur", "facebook", {
                                     ...formData.influenceur.facebook,
                                     abonnés: e.target.value,
                                   })
                                 }
                                   className="input_value"
                                />
                    
                                </div>
                              
                                 {/* <label className="float_msg"> (optionnel)</label> */}
                             </label>
                               
                              
                               
                              </div>
                             
                        
                              <div className="mb-4 input_group">
                              <label
                               className="input_label"
                               >
                                   <span>
                                   <FontAwesomeIcon icon={faYoutube} className="text-red-500 mr-2" />
                                  YouTube
                                 </span>
                                 <div className="float_data">
                    
                                 <input
                                  
                                    className="input_value"
                                    type="url"
                                    placeholder="Lien YouTube"
                                    value={formData.influenceur.youtube.lien}
                                    onChange={(e) =>
                                      handleInputChange("influenceur", "youtube", {
                                        ...formData.influenceur.youtube,
                                        lien: e.target.value,
                                      })
                                    }
                                  // className="w-full border p-2 rounded"
                                />
                    
                             </div>
                              
                                 {/* <label className="float_msg"> (optionnel)</label> */}
                             </label>
                             <label
                               className="input_label"
                               >
                                   <span>
                                 nbr. abonnés
                                 </span>
                                 <div className="float_data">
                    
                                 <input
                                   type="number"
                                   placeholder="Nombre d'abonnés YouTube"
                                   value={formData.influenceur.youtube.abonnés}
                                   onChange={(e) =>
                                     handleInputChange("influenceur", "youtube", {
                                       ...formData.influenceur.youtube,
                                       abonnés: e.target.value,
                                     })
                                   }
                                   className="input_value"
                                />
                    
                                </div>
                              
                                 {/* <label className="float_msg"> (optionnel)</label> */}
                             </label>
                               
                              
                               
                              </div>
                              
                        
                              <div className="mb-4 input_group">
                              <label
                               className="input_label"
                               >
                                   <span>
                                   <FontAwesomeIcon icon={faTiktok} className="text-black mr-2" />
                                   TikTok
                                 </span>
                                 <div className="float_data">
                    
                                 <input
                                 
                                    className="input_value"
                                    type="url"
                                    placeholder="Lien TikTok"
                                    value={formData.influenceur.tiktok.lien}
                                    onChange={(e) =>
                                      handleInputChange("influenceur", "tiktok", {
                                        ...formData.influenceur.tiktok,
                                        lien: e.target.value,
                                      })
                                    }
                                />
                    
                             </div>
                              
                                 {/* <label className="float_msg"> (optionnel)</label> */}
                             </label>
                             <label
                               className="input_label"
                               >
                                   <span>
                                 nbr. abonnés
                                 </span>
                                 <div className="float_data">
                    
                                 <input
                                  type="number"
                                  placeholder="Nombre d'abonnés TikTok"
                                  value={formData.influenceur.tiktok.abonnés}
                                  onChange={(e) =>
                                    handleInputChange("influenceur", "tiktok", {
                                      ...formData.influenceur.tiktok,
                                      abonnés: e.target.value,
                                    })
                                  }
                                   className="input_value"
                                />
                    
                                </div>
                              
                                 {/* <label className="float_msg"> (optionnel)</label> */}
                             </label>
                               
                              
                               
                              </div>
                             
                            </form>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        ))}

        <button type="submit" className="submit-btn">Postuler</button>
      </form>
    
    </div>
  );
};

export default CandidatureForm;

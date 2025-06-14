// import React from 'react'
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'; 
import Header_banner from "../../Components/Header_banner";
import Footer from "../../Components/Footer";
import {Link} from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { motion } from "framer-motion";
// import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSquareCheck} from '@fortawesome/free-solid-svg-icons';
import Header_menu from "../../Components/Header_menu";
import FixedMenu from "../../Components/FixedMenu";
import CandidatureForm from "../Postuler/CandidatureForm";
const AccordionItem = ({ title, children, defaultOpen = false }) => {

  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (

    <div className="accordion_box border rounded-md mb-2 mt-2">
      <button
        className="w-full flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold">{title}

        <span className=" mx-3 text-xl">{isOpen ? "−" : "+"}</span>
        </h3>
       
      </button>
      {isOpen && <div className="p-3 bg-white">{children}</div>}
    </div>
  );
};

 const Profile = () => {
 
    const location = useLocation(); 
    //  const location = useLocation();
    const { demande } = location.state || {}; // Évite l'erreur si state est undefined
   
    const previousPath = location.state?.previousPath; 

   console.log("previousPath")
   console.log(previousPath)

   console.log("demande")
   console.log(demande)
   const [formData, setFormData] = useState({
    nom: "Zintou",
    prenom: "linda",
    dateNaissance1: "",
    age: "",
    indicatif_phone: "+228",
    telephone: "98454565",
    indicatif_whatsapp: "+228",
    whatsapp: "98454565",
    pseudo: "linx",
    mail: "",
    adresse1: "",
    adresse2: "",
    adresse3: "",
    dejaMannequin: false,
    dejaHotesse: false,
    dejaVlogueuse: false,
    photos: [],
  });

  // const [isOpen_candidature, setIsOpen_candidature] = useState(false);

  const [modalData, setModalData] = useState({ isOpen: false, category: "" });

const openModal = (category) => {
  setModalData({ isOpen: true, category });
};

const closeModal = () => {
  setModalData({ isOpen: false, category: "" });
};

   console.log("formData")
   console.log(formData)

  return (
    
    <>
       <Header_menu  data_props ={{ title: 'Profil', }}  data_page = {{type: "comptes" , back_option: "on"}} />
         <div className="main_container px-2 user_profil_container">
         <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md ">
            {/* <h2 className="text-2xl font-bold mb-4 text-center">Profil de {formData.nom} {formData.prenom}</h2> */}

      {/* Section Infos Générales */}


       <div className="mb-6">

         
         <div className="flex items-center gap-4">
          <div className="zone_photo">
            {formData.photos.length > 0 ? (
              <div className="profil_picture">
                 <img src={URL.createObjectURL(formData.photos[0])} alt="Profil" className="w-20 h-20 rounded-full object-cover" />
           

              </div>
                    ) : (
                <div className="profil_picture">
              📷
                </div>
             )
            }

          </div>
           
          <div>
          <AccordionItem title="Infos Générales"  defaultOpen={true} >
        <p><strong>Nom :</strong> {formData.nom}</p>
        <p><strong>Prénom :</strong> {formData.prenom}</p>
        <p><strong>pseudo :</strong> {formData.pseudo}</p>
        <p><strong>Téléphone :</strong> {formData.indicatif_phone} {formData.telephone}</p>
        <p><strong>WhatsApp :</strong> {formData.indicatif_whatsapp} {formData.whatsapp}</p>
      </AccordionItem>
        
       <AccordionItem title="intégrer afrodites"   defaultOpen={demande === "intégrer afrodite"}>
           <div className="zone_data">
           <div className="container tab_list_box">
                    <div className="tab-list product-tab-list sticky_nav">
                          <nav className="nav title_nav">
                              
                            
                            <a className="product-tab-link tab-link active" href="#devenir_modele" data-bs-toggle="tab">
                                     devenir un modèle
                            </a>
                            <a className="product-tab-link tab-link" href="#se_former" data-bs-toggle="tab">
                                     se former
                            </a>
                            
                          </nav>
                    </div>

                    {/* Section Events */}

                    <div className="tab-content col-12 ">
                        
                      
                        {/* Section Photos */}
                          <div id="devenir_modele" className="tab-pane fade show active">
                          <div className="button_container item" onClick={() => openModal("mannequin")}>
      <label className="devenir_mannequin">Mannequin</label>
    </div>
    <div className="button_container item" onClick={() => openModal("hotesse")}>
      <label className="devenir_hotesse">Hôtesse</label>
    </div>
    <div className="button_container item" onClick={() => openModal("influenceur")}>
      <label className="devenir_influenceur">Influenceur</label>
    </div>

    {modalData.isOpen && (
      <div className="modal-overlay" onClick={closeModal}>
        <motion.div
          className="modal-content"
          initial={{ y: "-100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100vh", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={closeModal}>
            &times;
          </button>
          <CandidatureForm selectedCategory={modalData.category} />
        </motion.div>
      </div>
    )}

                          </div> 

                        {/* Section Vidéos */}

                          <div id="se_former" className="tab-pane fade">
                             formations afrodites
                          </div>   
                       
                         

                    </div>
                </div>

           </div>
         
      </AccordionItem>

      
           </div>
        </div>
      </div>

      {/* Section Adresses */}
    

     
      {/* Section Photos */}
      {formData.photos.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Photos</h3>
          <div className="grid grid-cols-3 gap-2">
            {formData.photos.map((photo, index) => (
              <img
                key={index}
                src={URL.createObjectURL(photo)}
                alt={`Photo ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}
    </div>
        </div>
        {/* <Footer /> */}
        <FixedMenu />
    </>
  )
}

export default Profile
'use client';

import { useState, useEffect } from "react";

import { usePathname, useSearchParams } from "next/navigation";
import Link from 'next/link';
// import { useLocation } from 'react-router-dom'; 
import { motion } from "framer-motion";
// import Header_menu from "../../Components/Header_menu";
// import FixedMenu from "../../Components/FixedMenu";
import CandidatureForm from "../../components/Postuler/CandidatureForm";
import { useAuth } from "../../Context/AuthenticateContext.jsx";
import axios from "axios";
import { apiUrl } from "../../config/apiUrl";
const AccordionItem = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="accordion_box border rounded-md mb-2 mt-2">
      <button
        className="title_button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="perso_hg">{title}  <span className="text-xl">{isOpen ? "−" : "+"}</span></h3>
       
      </button>
      {isOpen && <div className="p-3 bg-white">{children}</div>}
    </div>
  );
};

const Profile = () => {
 const auth = useAuth(); 
  const user_info = auth.currentUser 
 
  // const navigate = useNavigate()
  const [infoPersonne, setInfoPersonne] = useState([]);
  
  console.log("infoPersonne")
  console.log(infoPersonne)
    const [loading, setLoading] = useState(true);

    // const pathname = usePathname();
  // const location = useLocation(); 
  const searchParams = useSearchParams();
  console.log("searchParams")
  console.log(searchParams)
// const demandeParam = searchParams.get('state');
const demande = JSON.parse(searchParams.get('demande') || '{}');

console.log("demande")
console.log(demande)
// const demande = demandeParam ? JSON.parse(demandeParam) : null;
//   const { demande } = location.state || {}; 
  const [modalData, setModalData] = useState({ isOpen: false, category: "" });

  const [modalData_form, setModalData_form] = useState({ isOpen: false, category: "" });

  useEffect(() => {
   
    console.log("apiUrl")
    console.log(apiUrl)
    const userid = user_info?.id;
    console.log(userid)
      // const params = { userid };
  
      const fetchData = async () => {
        try {

          const [dataPersonne] = await Promise.all([
            axios.post(`${apiUrl}/auth/person_data`, { id: userid }),
          ]);
console.log("dataPersonne")
console.log(dataPersonne)
          setInfoPersonne(dataPersonne.data || []);
         
          setLoading(false);
        
       }
        catch (err) {
          console.error("Erreur lors de la récupération des données :", err);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
const openModal_form = (category) => {
  setModalData_form({ isOpen: true, category });
};

const closeModal_form = () => {
  setModalData_form({ isOpen: false, category: "" });
};


  const openModal = (category) => {
    setModalData({ isOpen: true, category });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, category: "" });
  };

  // récupérer les données de la personne

  const [formData, setFormData] = useState({
    nom: "Zintou",
    prenom: "Linda",
    telephone: "98454565",
    pseudo: "linx",
    indicatif_phone: "+228",
    whatsapp: "98454565",
    photos: [],
  });

  console.log(formData)
  // Afficher automatiquement le modal si `demande === "intégrer afrodite"`
  useEffect(() => {
    if (demande === "intégrer afrodite") {
      setModalData({ isOpen: true, category: "choix" });
    }
  }, [demande]);


  
  if (loading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <>
            {/* <Header_menu data_props={{ title: 'Profil' }} data_page={{ type: "comptes", back_option: "on" }} /> */}

      <div className="main_container px-2 user_profil_container">
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <div className="zone_photo">
              {infoPersonne[0]?.photo_profil ? (
                <img 
                
                src={`${apiUrl}/${infoPersonne[0]?.photo_profil}`}
                
                // src={URL.createObjectURL(formData.photos[0])} 
                alt="Profil" className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <div className="profil_picture">📷</div>
              )}
            </div>

            <div>
              {infoPersonne.length > 0 ?
              (
                <>
                    <AccordionItem title="Infos" defaultOpen={true}>
                <p><strong>Nom :</strong> {infoPersonne[0].nom_candidat}</p>
                <p><strong>Prénom :</strong> {infoPersonne[0].prenom}</p>
                <p><strong>Pseudo :</strong> {infoPersonne[0].pseudo}</p>
                <p><strong>Téléphone :</strong> {infoPersonne[0].indicatif_telegram} {infoPersonne[0].num_tel}</p>
                <p><strong>WhatsApp :</strong> {infoPersonne[0].indicatif_telegram} {infoPersonne[0].whatsapp}</p>
              </AccordionItem>
                
                </>
              )

              :

              (
                <>
                
                
                </>
              )

            }
          

             </div>
          </div>
        </div>
      </div>

      {/* Modal affiché automatiquement si `demande === "intégrer afrodite"` */}
      {modalData.isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <motion.div
            className="modal-content_b"
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn modal_content_close" onClick={closeModal}>&times;</button>
            
            {modalData.category === "choix" ? (
              <div className="modal-options text-center">
        
            <h2 className="text-lg font-semibold mb-4">Intégrer Afrodites</h2>

                 <div className="button_container fk_btn" onClick={() => openModal("mannequin")}>
                  <label className="devenir_mannequin">Devenir Mannequin</label>
                </div>
                <div className="button_container fk_btn" onClick={() => openModal("hotesse")}>
                  <label className="devenir_hotesse">Devenir Hôtesse</label>
                </div>

                <div className="button_container fk_btn" onClick={() => openModal("influenceur")}>
                  <label className="devenir_influenceur">Influenceur</label>
               </div>

            <h2 className="text-lg font-semibold mb-4">se former à Afrodite</h2>
            
               <div className="button_container fk_btn" >
                  <label className="devenir_mannequin">apprendre à marcher</label>
                </div>
                <div className="button_container fk_btn" >
                  <label className="devenir_hotesse">apprendre à poser</label>
                </div>

                <div className="button_container fk_btn">
                  <label className="devenir_influenceur">faire un book</label>
               </div>
              </div>
            ) : (
              <CandidatureForm selectedCategory={modalData.category} />
            )}
          </motion.div>
        </div>
      )}

      {/* <FixedMenu /> */}
    </>
  );
};

export default Profile;

import React from 'react'
// import React from 'react'
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect ,useRef  } from "react"; 
import Header_banner from '../Components/Header_banner';  

import Modal from 'react-modal';

import Locations from '../Components/Locations.jsx';
import { useAuth } from "../Context/AuthenticateContext.jsx";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faCamera,faCheckDouble, faImage,faRepeat, faPlus, faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CameraCapture from '../Components/CameraCapture .jsx';
import FixedMenu from '../Components/FixedMenu.jsx';

const Accordeon = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <div className="accordeon">
      <div
        className="accordeon-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3>{title}</h3>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && <div className="accordeon-content">{children}</div>}
    </div>
  );
};

function EtatCandidatures() {

  const auth = useAuth(); 
  const user_info = auth.currentUser 
 
  const navigate = useNavigate()
  //  const apiUrl = 'https://apiafro.aafrodites.com'

   const apiUrl = 'http://localhost:5000'

 
  const location = useLocation(); 
  const link_url = location?.pathname.split('/');
  const [infoPostulant, setInfoPostulant] = useState([]);
  const [infoPersonne, setInfoPersonne] = useState([]);
  const [infoFashion, setInfoFashion] = useState([]);
  const [infoRole, setInfoRole] = useState([]);
  const [infoHost, setInfoHost] = useState([]);
  const [imagesPostulant, setImagesPostulant] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
  const userid = user_info?.id;
    const params = { userid };

    const fetchData = async () => {
      try {
        const dataPostulant = await axios.post(`${apiUrl}/postulant/etatcandidature`, params);
        if (dataPostulant.data.length > 0) {
          setInfoPostulant(dataPostulant.data);

          const id = dataPostulant.data[0].id;
          const personneId = dataPostulant.data[0].personne_id;

          const userId =  user_info?.id

          const [dataPersonne, dataFashion, dataRole, dataHost, dataImage] = await Promise.all([
            axios.post(`${apiUrl}/postulant/infoperson`, { id: personneId }),
            axios.post(`${apiUrl}/postulant/infofashion`, { id }),
            axios.post(`${apiUrl}/postulant/inforole`, { id }),
            axios.post(`${apiUrl}/postulant/infohost`, { id }),
            axios.post(`${apiUrl}/postulant/imagePostulant`, { id : userId }),
          ]);

          setInfoPersonne(dataPersonne.data || []);
          setInfoFashion(dataFashion.data || []);
          setInfoRole(dataRole.data || []);
          setInfoHost(dataHost.data || []);
          setImagesPostulant(dataImage.data || []);

        } else {
          navigate("/"); // Redirection si aucune donnée
        }
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
        setLoading(false);
      }
    };

    fetchData();

  }, []);


 



  async function AbortMannequin() {
    const userId =  user_info?.id

    try {
      const response = await axios.post(`${apiUrl}/postulant/abortMannequin`, { id: userId });
      window.location.reload();
      console.log('Postulant supprimé avec succès:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Erreur serveur:', error.response.data);
      } else if (error.request) {
        console.error('Aucune réponse reçue du serveur:', error.request);
      } else {
        console.error('Erreur:', error.message);
      }
    }
    finally{
      window.location.reload();
    }
  }

  async function AbortHotesse() {
    const userId =  user_info?.id

    try {
      const response = await axios.post(`${apiUrl}/postulant/abortHotesse`, { id: userId });
      window.location.reload();
      console.log('Postulant supprimé avec succès:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Erreur serveur:', error.response.data);
      } else if (error.request) {
        console.error('Aucune réponse reçue du serveur:', error.request);
      } else {
        console.error('Erreur:', error.message);
      }
    }
    finally{
      window.location.reload();
    }
  }

  async function AbortInfluenceur() {
    const userId =  user_info?.id

    try {
      const response = await axios.post(`${apiUrl}/postulant/abortInfluenceur`, { id: userId });
      window.location.reload();
      console.log('Postulant supprimé avec succès:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Erreur serveur:', error.response.data);
      } else if (error.request) {
        console.error('Aucune réponse reçue du serveur:', error.request);
      } else {
        console.error('Erreur:', error.message);
      }
    }finally{
      window.location.reload();
    }
   
  }


  async function DeletePostulant() {
    const userId =  user_info?.id

    try {
      const userId = user_info?.id;

      const response = axios.post(`${apiUrl}/postulant/deletePostulant`, { id: userId });
      window.location.reload();
      console.log('Postulant supprimé avec succès:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Erreur serveur:', error.response.data);
      } else if (error.request) {
        console.error('Aucune réponse reçue du serveur:', error.request);
      } else {
        console.error('Erreur:', error.message);
      }
    }finally{
      window.location.reload();
    }
   
   
  }






  //Updates
   
  const [updateInfoPersonneModalOpen, setUpdateInfoPersonneModalOpen] = useState(false);
  const openUpdateInfoPersonneModal = () => setUpdateInfoPersonneModalOpen(true);
  const closeUpdateInfoPersonneModal = () => setUpdateInfoPersonneModalOpen(false);

  const [updateInfoHostModalOpen, setUpdateInfoHostModalOpen] = useState(false);
  const openUpdateInfoHosteModal = () => setUpdateInfoHostModalOpen(true);
  const closeUpdateInfoHostModal = () => setUpdateInfoHostModalOpen(false);


  const [updateInfoRoleModalOpen, setUpdateInfoRoleModalOpen] = useState(false);
  const openUpdateInfoRoleeModal = () => setUpdateInfoRoleModalOpen(true);
  const closeUpdateInfoRoleModal = () => setUpdateInfoRoleModalOpen(false);

  const [updateInfoFashionModalOpen, setUpdateInfoFashionModalOpen] = useState(false);
  const openUpdateInfoFashioneModal = () => setUpdateInfoFashionModalOpen(true);
  const closeUpdateInfoFashionModal = () => setUpdateInfoFashionModalOpen(false);


  const formatDateForInput = (isoDate) => {
    return isoDate ? isoDate.split("T")[0] : "";
  };
    
  const [formData, setFormData] = useState({
    postulant: {
      nom: "",
      prenom: "",
      pseudo: "",
      date_naissance: "",
    },
  });

  useEffect(() => {
    if (infoPersonne && infoPersonne[0]) {
      setFormData({
        postulant: {
          nom: infoPersonne[0].nom || "",
          prenom: infoPersonne[0].prenom || "",
          pseudo: infoPersonne[0].pseudo || "",
          date_naissance: formatDateForInput(infoPersonne[0]?.date_naissance) || ""
        },
      });
    }
  }, [infoPersonne]);
      
      const handleInputChange = (e) => {
          const { name, value } = e.target; 
          setFormData((prevState) => ({
            ...prevState,
            postulant: {
              ...prevState.postulant,
              [name]: value, 
            },
          }));
      };
      

      

      const handleSubmit = async (e) => {

        e.preventDefault();


        const userid = user_info?.id;
        const params = { userid };



        try {
          const dataPostulant = await axios.post(`${apiUrl}/postulant/etatcandidature`, params);
          if (dataPostulant.data.length > 0) {
            setInfoPostulant(dataPostulant.data);
            const id = dataPostulant.data[0].id;
            const personneId = dataPostulant.data[0].personne_id;
            const param = {formData, id : personneId}
            
            try {
              await axios.post(`${apiUrl}/postulant/updatePersonne`, param);
              navigate(0)
              closeUpdateInfoPersonneModal()
            } catch (error) {
              console.log(error)
            }
  
          } 
        } catch (err) {
          console.error("Erreur lors de la récupération des données :", err);
          setLoading(false);
        } 
      };




      const [formDataRole, setFormDataRole] = useState({
        socialMedia: "",
        followers: ""
      });

      useEffect(() => {
        if (infoRole && infoRole[0]) {
          setFormDataRole({
            socialMedia: infoRole[0]?.rxsx || "",
            followers: infoRole[0]?.nbr_abonne || "",
          });
        }
      }, [infoRole]);

      

  const handleInputChangeRole = (e, field) => {
    const { name, value } = e.target; // Récupère le nom et la valeur de l'input
    setFormDataRole((prevData) => ({
      ...prevData,
      [name]: value // Met à jour le champ correspondant dans formData
    }));
    
  };


  const handleSubmitRole = async (e) => {

    // e.preventDefault();


    const userid = user_info?.id;

    const param = {formDataRole, id : userid}
        
        try {
          await axios.post(`${apiUrl}/postulant/updateRole`, param);
          
          window.location.reload()
          closeUpdateInfoRoleModal()
        } catch (error) {
          console.log(error)
        }

   
  };


    const [formDataHost, setFormDataHost] = useState({
      experience: "",
    });

    useEffect(() => {
      if (infoHost && infoHost[0]) {
        setFormDataHost({
            experience: infoHost[0].temps_experience || "",
        });
      }
    }, [infoHost]);
        

  const handleInputChangeHost = (e, field) => {
  const { name, value } = e.target;
  setFormDataHost((prevData) => ({
    ...prevData,
    [name]: value
  }));

  console.log(formDataHost)

  };


  const handleSubmitHost = async (e) => {

    // e.preventDefault();


    const userid = user_info?.id;

    const param = {formDataHost, id : userid}
        
        try {
          await axios.post(`${apiUrl}/postulant/updateHost`, param);
          
          window.location.reload()
          closeUpdateInfoHostModal()
        } catch (error) {
          console.log(error)
        }

   
  };
    
  
  if (loading) {
    return <p>Chargement des données...</p>;
  }
  return (
    <>

        <Header_banner data ={{ link : 'ma candidature' }} />
    <div className="main_container data_container">
        
    <div className="postulant-details">
      {/* <h1 className='title'>Détails du Postulant</h1> */}
    
      <Accordeon title="Informations Personnelles">
        {infoPersonne.length > 0 ? (
          <div>
            <p>Nom : {infoPersonne[0]?.nom}</p>
            <p>Prénom : {infoPersonne[0]?.prenom}</p>
            <p>Pseudo : {infoPersonne[0]?.pseudo}</p>
            <p>Date de naissance : {new Date(infoPersonne[0]?.date_naissance).toLocaleDateString("fr-FR")}</p>
            <p>Poids : {infoPersonne[0]?.email}</p>
            <p>Taille : {infoPersonne[0]?.prenom}</p>
            <p>Tel : {infoPersonne[0]?.indicatif} {infoPersonne[0]?.num_tel}</p>
            <p>Whatsapp: {infoPersonne[0]?.indicatif_2} {infoPersonne[0]?.num_tel_2}</p>
            <p>Pays :   {infoFashion[0]?.pays ? infoFashion[0]?.pays : "-"}</p>
            <p>Ville :   {infoFashion[0]?.ville ? infoFashion[0]?.ville : "-"}</p>
            {/* <p>quartier : {infoPersonne[0]?.quartier}</p>
            <p>indication : {infoPersonne[0]?.indication}</p> */}

              <div className="action_btn">
                  
              {infoFashion < 1 && infoHost < 1 && infoRole < 1 && (
                  <label className="abort_btn" onClick={DeletePostulant}>
                    Abandonner
                  </label>
                 
                )}

                    <label className="update_btn" onClick={openUpdateInfoPersonneModal}>
                      modifier

                    </label>
                   
                          
                    </div>
                </div>

          
        ) : (
          <p>Aucune information du postulant trouvée.</p>
        )}
      </Accordeon>

     

      {infoFashion.length > 0 &&
      (
        <Accordeon title="Informations Mannequin">
        {infoFashion.length > 0 ? (
          <>
            <p>Expériences en mannequinnat : {infoFashion[0]?.experience_mannequinnat ? "Oui" : "Non"}</p>
            <p>Etat de la candidature :  {
                                            infoFashion[0]?.etat_candidature === null || infoFashion[0]?.etat_candidature === 0
                                              ? "En cours"
                                              : infoFashion[0]?.etat_candidature === 1
                                              ? "Validé"
                                              : infoFashion[0]?.etat_candidature === 2
                                              ? "Rejeté"
                                              : "Non spécifié"
                                          }</p>

                                          <div className="text-center mt-2">
                                              <p>Photos et Vidéos</p>
                                          </div>

                          {imagesPostulant.length > 0 && (
                              <>
                                <div className="container">
                                  <div className="row">
                                      {imagesPostulant.map((image, index) => (
                                        <div key={index} className="col-3">
                                          {image.path.endsWith('.mp4') ? (
                                            <video controls src={image.path} />
                                          ) : (
                                            <img src={`${apiUrl}/${image.path}`} className='rounded overflow-hidden' alt={`Photo ${index + 1}`} />
                                          )}
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </>
                            )}

            
            <div className="action_btn">
                  
                  <label className="abort_btn" onClick={AbortMannequin}>
                    Abandonner
                  </label>
                    <label className="update_btn" onClick={openUpdateInfoFashioneModal}>
                      modifier
                   </label>
                   
                     
              </div>
          </>
        ) : (
          <p>Aucune information fashion disponible.</p>
        )}
      </Accordeon>
      )}
     
      {infoHost.length > 0 &&
      (
        <Accordeon title="Informations Hotesse d'accueil">
        {infoHost.length > 0 ? (
            <>
              <p>experience: {infoHost[0]?.temps_experience ? `${infoHost[0]?.temps_experience} mois` : "-"}</p>
              {/* <p>abonnés : {infoHost[0]?.nbr_abonne ? infoRole[0]?.nbr_abonne : "-"}</p> */}
              <p>etat de la candidature :  {
                                              infoHost[0]?.etat_candidature === null || infoHost[0]?.etat_candidature === 0
                                                ? "En cours"
                                                : infoHost[0]?.etat_candidature === 1
                                                ? "Validé"
                                                : infoHost[0]?.etat_candidature === 2
                                                ? "Rejeté"
                                                : "Non spécifié"
                                            }</p>
                <div className="action_btn">
                  
                  <label className="abort_btn" onClick={AbortHotesse}>
                    Abandonner

                    </label>
                    <label className="update_btn" onClick={openUpdateInfoHosteModal}>
                      modifier

                    </label>
                   
                     
              </div>
            </>
          ) : (
            <p>Aucune information fashion disponible.</p>
          )}
          
        </Accordeon>
      )}
       {infoRole.length > 0 &&
      (
        <Accordeon title="informations Influenceur">
        {infoRole.length > 0 ? (
            <>
              <p>réseaux sociaux: {infoRole[0]?.rxsx ? infoRole[0]?.rxsx : "-"}</p>
              <p>abonnés : {infoRole[0]?.nbr_abonne ? infoRole[0]?.nbr_abonne : "-"}</p>
              <p>etat de la candidature :  {
                                              infoRole[0]?.etat_candidature === null || infoRole[0]?.etat_candidature === 0
                                                ? "En cours"
                                                : infoRole[0]?.etat_candidature === 1
                                                ? "Validé"
                                                : infoRole[0]?.etat_candidature === 2
                                                ? "Rejeté"
                                                : "Non spécifié"
                                            }</p>
                <div className="action_btn">
                  
                  <label className="abort_btn" onClick={AbortInfluenceur}>
                    Abandonner

                    </label>
                    <label className="update_btn" onClick={openUpdateInfoRoleeModal}>
                      modifier

                    </label>
                   
                     
              </div>
            </>
          ) : (
            <p>Aucune information fashion disponible.</p>
          )}
         
        </Accordeon>
      )}
    

     
    </div>
    </div>

     {/* Modal */}

      <Modal
        isOpen={updateInfoPersonneModalOpen}
        onRequestClose={closeUpdateInfoPersonneModal}
        contentLabel="Contributeurs"
        overlayClassName="custom-overlay"
        className="custom-modal"
        ariaHideApp={false} 
      >

        
              <form onSubmit={handleSubmit} style={{ Width: "90%", margin: "auto" }}>
                    {/* Accordion for Model */}
                    

                    <div style={{ marginBottom: "20px" }}>
                  
                  
                    <div className="text-center w-100">
                      <label>
                        
                        <span className='title_label'>
                      Modification des infos personnelles Postulant
                        </span>
                      </label>
                      </div>
                  <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
                      
                  
                          <label
                          className="input_label"
                          >
                              <span>
                              Nom 
                              </span>
                              <div className="float_data">
                              <input
                                className="input_value"
                                type="text"
                                name="nom" // Permet d'identifier ce champ
                                value={formData.postulant.nom}
                                onChange={(e) => handleInputChange(e)}
                              />

                            <label className="obligat"> *</label>

                          </div>
                          
                          
                          </label>
                          <label
                          className="input_label"
                          >
                              <span>
                              prénom 
                              </span>
                              <div className="float_data">
                              <input
                            className="input_value"
                              type="text"
                              name="prenom"
                              value={formData.postulant.prenom}
                              onChange={(e) => handleInputChange(e)}
                              />
                              <label className="obligat"> *</label>

                          </div>
                          
                          
                          </label>
                          <label
                          className="input_label"
                          >
                              <span>
                              pseudo 
                              </span>
                              <div className="float_data">
                              <input
                            className="input_value"
                              type="text"
                              name = "pseudo"
                              value={formData.postulant.pseudo}
                              onChange={(e) => handleInputChange(e)}
                              />
                              <label className="obligat"> *</label>

                          </div>
                          
                          
                          </label>
                          <label
                            className="input_label"
                            >
                                <span>
                                date de naissance 
                              
                              </span>
                          <div className="float_data">

                          <input
                            className="input_value"
                          
                              type="date"
                              name="date_naissance"
                              value={formData.postulant.date_naissance}
                              onChange={(e) => handleInputChange(e)}
                              />
                              <label className="obligat"> *</label>

                          </div>
                          
                          </label>
                      </div>
                </div>
                <div className="btn_container">
                  <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px" }}>
                    Modifier
                  </button>
                </div>
              </form>
         
        

      </Modal>


      <Modal
        isOpen={updateInfoHostModalOpen}
        onRequestClose={closeUpdateInfoHostModal}
        contentLabel="Contributeurs"
        overlayClassName="custom-overlay"
        className="custom-modal"
        ariaHideApp={false} 
      >

        
              <form onSubmit={handleSubmitHost} style={{ Width: "90%", margin: "auto" }}>
                    {/* Accordion for Model */}
                    
                    <div className="text-center w-100">
                      <label>
                        
                        <span className='title_label'>
                          Modification des données Hotesse d'accueil
                        </span>
                      </label>
                      </div>

                    <label
                      className="input_label"
                      >
                        <span>
                        Temps d'experiences (en mois) 
                        </span>
                    
                      <input
                        className="input_value"
                        type="number"
                        name="experience"
                        value={formDataHost.experience}
                        onChange={handleInputChangeHost}
                      />
                    </label>

                <div className="btn_container">
                  <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px" }}>
                    Modifier
                  </button>
                </div>
              </form>

      </Modal>

      
      <Modal
        isOpen={updateInfoRoleModalOpen}
        onRequestClose={closeUpdateInfoRoleModal}
        contentLabel="Contributeurs"
        overlayClassName="custom-overlay"
        className="custom-modal"
        ariaHideApp={false} 
      >

        
              <form onSubmit={handleSubmitRole} style={{ Width: "90%", margin: "auto" }}>
                    {/* Accordion for Model */}


                    <div className="text-center w-100">
                      <label>
                        
                        <span className='title_label'>
                            Modification des données Influenceur
                        </span>
                      </label>
                      </div>
                    
                      

                      <label
                          className="input_label"
                        >
                        Réseaux sociaux
                        <input
                        className='input_value'
                          type="text"
                          name="socialMedia"
                          value={formDataRole.socialMedia}
                          onChange={handleInputChangeRole}
                        />
                      </label>

                      <label className='input_label'>
                        Nombre d'abonnés
                        <input
                          type="number"
                          name="followers"
                          value={formDataRole.followers}
                          onChange={handleInputChangeRole}
                          className='input_value'
                        />
                      </label>

                <div className="btn_container">
                  <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px" }}>
                    Modifier
                  </button>
                </div>
              </form>

      </Modal>


        
      <Modal
        isOpen={updateInfoFashionModalOpen}
        onRequestClose={closeUpdateInfoFashionModal}
        contentLabel="Contributeurs"
        overlayClassName="custom-overlay"
        className="custom-modal"
        ariaHideApp={false} 
      >

        
              <form onSubmit={handleSubmit} style={{ Width: "90%", margin: "auto" }}>
                    {/* Accordion for Model */}

                    <div className="text-center w-100">
                      <label>
                        
                        <span className='title_label'>
                            Modification des données Mannequins
                        </span>
                      </label>
                      </div>
                    

                <div className="btn_container">
                  <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px" }}>
                    Modifier
                  </button>
                </div>
              </form>

      </Modal>




<FixedMenu />   
    
    </>
  )
}

export default EtatCandidatures
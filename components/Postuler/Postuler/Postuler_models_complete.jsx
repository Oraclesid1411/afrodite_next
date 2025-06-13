
import React from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Header_banner from '../Components/Header_banner';
import { FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import Locations from '../Components/Locations.jsx';
import { useAuth } from '../Context/AuthenticateContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCheckDouble, faImage, faRepeat, faPlus, faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Postuler_models() {
  const auth = useAuth();
  const user_info = auth.currentUser;
  const navigate = useNavigate();
  const apiUrl = 'http://localhost:5000';
  const location = useLocation();
  const link_url = location?.pathname.split('/');

  // États pour la gestion des rôles et des formulaires
  const [isroleChecked, setIsRoleChecked] = useState(false);
  const [ishostChecked, setIsHostChecked] = useState(false);
  const [isfashionChecked, setIsFashionChecked] = useState(false);
  const [newuser, setNewUser] = useState(0);
  const [newuserdata, setNewUserData] = useState(0);
  const [isrolenotifChecked, setIsRolenotifChecked] = useState(false);
  const [ishostnotifChecked, setIsHostnotifChecked] = useState(false);
  const [isfashionnotifChecked, setIsFashionnotifChecked] = useState(false);
  const [isnotification, setIsNotification] = useState(false);

  // États pour la localisation
  const [locationData, setLocationData] = useState({ pays: '', ville: '', quartier: '' });

  // États pour les postulants
  const [formData, setFormData] = useState({
    postulant: {
      nom: '',
      prenom: '',
      pseudo: '',
      date_naissance: '',
      taille: '',
      poids: '',
      indication: '',
    },
    fashion: { experimented: null },
    role: { socialMedia: '', followers: null },
    host: { temps_experience: '' },
  });

  // États pour la gestion des images
  const [add_img, setAddimg] = useState(0);
  const [images, setImages] = useState([]);
  const [imagespath, setImagespath] = useState([]);
  const [imagesModels, setImagesModel] = useState({ face: null, dos: null, profile: null, entier: null, buste: null, pied: null });
  const [currentZone, setCurrentZone] = useState(null);

  // États pour la gestion des vidéos
  const [video, setVideo] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [upload_video, setUpload_video] = useState(null);

  // Références pour les vidéos
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);

  // État pour les numéros de téléphone
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');

  // Fonctions de navigation et de mise à jour
  const handleBackClick = () => navigate(-1);

  const handleLocationChange = (data) => {
    setLocationData(data);
    console.log('Valeurs sélectionnées:', data);
  };

  const handleCheckboxToggle = (type) => {
    if (type === 'fashion') {
      setIsFashionChecked(!isfashionChecked);
    } else if (type === 'role') {
      setIsRoleChecked(!isroleChecked);
    } else if (type === 'host') {
      setIsHostChecked(!ishostChecked);
    }
  };

  // Fonction pour démarrer l'enregistrement vidéo
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      const mediaRecorder = new MediaRecorder(stream);

      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: 'video/mp4' });
        setVideo(URL.createObjectURL(videoBlob));
        setUpload_video(videoBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Arrêter l'enregistrement après 10 secondes
      setTimeout(() => {
        mediaRecorder.stop();
        setIsRecording(false);
      }, 10000);
    } catch (error) {
      console.error('Erreur lors de l’accès à la caméra:', error);
    }
  };

  // Fonction pour arrêter la caméra
  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
      setIsRecording(false);
    }
  };

  // Fonction pour uploader la vidéo vers le backend
  const uploadVideo = async () => {
    const formData = new FormData();
    formData.append('video', upload_video);

    try {
      const response = await axios.post(`${apiUrl}/upload/video`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Vidéo uploadée :', response.data);
    } catch (error) {
      console.error("Erreur lors de l'upload de la vidéo :", error);
    }
  };

  // Fonction pour capturer une image depuis la vidéo
  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <>
      <div className="container form_bg pt-3">
        <button onClick={handleBackClick} className='back_cmoponent'>
          <FaChevronLeft size={10} />
        </button>
        <ToastContainer className="toast_style" />

        <form  style={{ maxWidth: '600px', margin: 'auto' }}>
          <div style={{ marginBottom: '20px' }}>
            <label>
              <span className='title_label'>Devenir un modèle Afrodites</span>
            </label>

            <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
              {!isRecording ? (
                <button onClick={startRecording} className="record-btn">🎥 Démarrer l'enregistrement vidéo</button>
              ) : (
                <p>📹 Enregistrement en cours...</p>
              )}

              {video && (
                <div className="video-preview">
                  <video controls>
                    <source src={video} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                </div>
              )}
            </div>
          </div>

          <div className="btn_container">
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px' }}>
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Postuler_models;

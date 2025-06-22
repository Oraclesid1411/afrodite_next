'use client';

import { useState, useEffect } from 'react';

import axios from 'axios'
import { convertVideoToResolutions } from '../../../sevices/compressVideoResolutions';
import { apiUrl } from '../../../config/apiUrl';

// const initialForm = { id: null, 
//                     titre: '',
//                      lien: '',
//                       source: '#',
//                       statut: 'Brouillon'
//                      };
const initialForm = {
    id: null,
    titre: '',
    lien: '',               // Lien principal de la vidéo
    source: '#',            // '#', 'local', 'youtube', 'tiktok', etc.
    thumbnail: '',          // Lien de la miniature
    videos: [],             // Tableau des liens multiples (local only)
    statut: 'Brouillon',    // 'Publié' ou 'Brouillon'
    vlog_type_id: '',       // ID de la catégorie/type de vidéo
  };
  
export default function PageVlogs() {
  const [vlogs, setVlogs] = useState([]);
  const [vlogTypes, setVlogTypes] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [search, setSearch] = useState('');
  const [filterStatut, setFilterStatut] = useState('');

  const handleNew = () => {
    setFormData(initialForm);
  };

  useEffect(() => {
    const fetchVlogTypes = async () => {
      try {
        const res = await axios.get(`${apiUrl}/vlogs/vlog_type`);
        setVlogTypes(res.data); // suppose que res.data est un tableau [{ id, nom }, ...]
      } catch (err) {
        console.error("Erreur lors de la récupération des types de vlog :", err);
      }
    };
  
    fetchVlogTypes();
  }, []);

  useEffect(() => {
    fetchVlogs();
  }, []);
  
  const fetchVlogs = async () => {
    try {
      const res = await axios.get(`${apiUrl}/vlogs/all`);

      console.log("res.data")
      console.log(res.data)
      if (res.data.success) {
        // alert('here')
        const sorted = res.data.vlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        setVlogs(sorted);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des vidéos :", error);
    }
  };
  
  // useEffect(() => {
  //   // Exemple de données
  //   setVlogs([
  //     { id: 1, titre: 'Interview de la Miss 2025', lien: 'https://...', statut: 'Publié', date: '2025-06-01' },
  //     { id: 2, titre: 'Conseils de posture', lien: 'https://...', statut: 'Brouillon', date: '2025-05-22' },
  //   ]);

  // }, []);

  
//   upload de la video
    const [videoPreviews, setVideoPreviews] = useState([]);
    const [videoupload, setUploadevideo] = useState([]); 
 
// Fonction utilitaire pour convertir base64 en File
function base64ToFileV(base64, filename) {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, { type: mime });
  }
  
  const extractThumbnail = (videoFiles, apiUrl) => {
    console.log("videoFiles")
    console.log(videoFiles)
if (!videoFiles?.path || videoFiles.path.length === 0) {
 console.error("Aucune vidéo à télécharger");
 return;
}

const base64 = videoupload.path[0];
const originalFileName = `video_${0 + 1}.mp4`;

const videoFile = base64ToFileV(base64, originalFileName);

// const videoFile = videoFiles?.path?.[0];
console.log("videoFile")
console.log(videoFile)
return new Promise((resolve, reject) => {
 const video = document.createElement('video');
 video.preload = 'metadata';
 video.muted = true;
 video.playsInline = true;
 video.src = URL.createObjectURL(videoFile);

 video.onloadedmetadata = () => {
   video.currentTime = Math.min(1, video.duration / 2);
 };

 video.onseeked = () => {
   const canvas = document.createElement('canvas');
   canvas.width = video.videoWidth;
   canvas.height = video.videoHeight;
   const ctx = canvas.getContext('2d');
   ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

   canvas.toBlob(async (blob) => {
     if (blob) {
       const thumbFile = new File([blob], `${videoFile.name}_thumb.jpg`, {
         type: 'image/jpeg',
       });

       console.log("thumbFile")
       console.log(thumbFile)
       // Envoi immédiat vers le backend
       const formData = new FormData();
       // formData.append("file", thumbFile);
       formData.append("files", thumbFile); // ici "files" au lieu de "file"

       try {
         const response = await axios.post(`${apiUrl}/uploadfiles/thumbnail`, formData, {
           headers: { 'Content-Type': 'multipart/form-data' }
         });

         console.log("response")
         console.log(response)

         if (response.data?.files[0]?.path) {
           resolve(response.data?.files[0]?.path); // Retourne juste le chemin du thumbnail
         } else {
           reject(new Error("Le backend n'a pas retourné de chemin"));
         }
       } catch (uploadErr) {
         reject(uploadErr);
       }
     } else {
       reject(new Error("Erreur de création du blob"));
     }
   }, 'image/jpeg', 0.8);
 };

 video.onerror = (err) => {
   reject(new Error('Erreur de chargement vidéo : ' + err.message));
 };
});
};


   
    // const next_option_videos = async () => {
     
    //   if (!videoupload?.path || videoupload.path.length === 0) {
    //     console.error("Aucune vidéo à télécharger");
    //     return;
    //   }
    
    //   const formData = new FormData();
    
    //   for (let index = 0; index < videoupload.path.length; index++) {
    //     const base64 = videoupload.path[index];
    //     const originalFileName = `video_${index + 1}.mp4`;
    
    //     const file = base64ToFileV(base64, originalFileName);
    
    //     console.log(`Traitement de ${originalFileName}`);
    
    //     try {
    //       const convertedFiles = await convertVideoToResolutions(file, ['360', '480', '720']);
    
    //          console.log("convertedFiles")
    //          console.log(convertedFiles)
    //       for (const { resolution, file: convertedFile } of convertedFiles) {
    //         const filename = originalFileName.replace('.mp4', `_${resolution}p.mp4`);
    //         formData.append('files', convertedFile, filename);
    //         console.log(`Ajouté: ${filename}`);
    //       }
    
    //       // Inclure l'original si souhaité
    //       formData.append('files', file, originalFileName);
    
    //     } catch (err) {
    //       console.error(`Erreur de conversion pour ${originalFileName}`, err);
    //     }
    //   }
    
    //   try {
    
    //     const res = await axios.post(`${apiUrl}/uploadfiles/saveFile`, formData, {
    //       headers: { 'Content-Type': 'multipart/form-data' },
    //       withCredentials: true
    //     });
    
    //     console.log("Upload réussi", res.data);
    //     // return res.data;
    //     return res.data?.files;
    //   } catch (err) {
    //     console.error('Erreur d’upload:', err.response?.data || err.message);
    //     throw err;
    //   }
    // };

    const handleVideoUpload = async (e) => {
        const fileInput = e.target.files[0];
        if (!fileInput) return;
      
        // Conversion du fichier en base64 (pour compatibilité avec ta logique actuelle)
        const reader = new FileReader();
        reader.readAsDataURL(fileInput);
      
        reader.onloadend = async () => {
          const base64 = reader.result;
          const originalFileName = `video_${Date.now()}.mp4`;
          const file = base64ToFileV(base64, originalFileName);
      
          try {
            // 1. Convertir la vidéo en 3 résolutions
            const convertedFiles = await convertVideoToResolutions(file, ['360', '480', '720']);
      
            const formData = new FormData();
      
            // 2. Ajouter chaque version convertie
            for (const { resolution, file: convertedFile } of convertedFiles) {
              const filename = originalFileName.replace('.mp4', `_${resolution}p.mp4`);
              formData.append('files', convertedFile, filename);
            }
      
            // 3. Ajouter l’original
            formData.append('files', file, originalFileName);
      
            // 4. Extraire le thumbnail
            const thumbUrl = await extractThumbnail({ path: [base64] }, apiUrl);
      
            // 5. Envoi de tous les fichiers
            const res = await axios.post(`${apiUrl}/uploadfiles/saveFile`, formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
              withCredentials: true
            });
      
            const uploadedFiles = res.data?.files || [];
            console.log("uploadedFiles")
            console.log(uploadedFiles)
      
            // 6. Trouver le lien de la vidéo principale (ex: 720p ou original)
            const mainVideo = uploadedFiles.find(f => f.path.includes('720p')) || uploadedFiles.find(f => f.path.includes('.mp4'));
      
            // 7. Mettre à jour formData avec le lien de la vidéo
            if (mainVideo?.path) {
              setFormData(prev => ({
                ...prev,
                lien: mainVideo.path,
                thumbnail: thumbUrl,
                videos: uploadedFiles.map(f => f.path), // Pour sauvegarde multiple
              }));
      
              alert("✅ Vidéo et formats uploadés avec succès !");
            } else {
              alert("❌ Aucun lien de vidéo trouvé.");
            }
          } catch (err) {
            console.error("Erreur pendant le traitement de la vidéo :", err);
            alert("🚨 Une erreur est survenue pendant l’upload.");
          }
        };
      };

      const extractThumbnailFromLink = (link, source) => {
        if (source === "youtube") {
          const match = link.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
          if (match && match[1]) {
            return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
          }
        }
      
        // Pour TikTok, à faire manuellement ou à ignorer
        return ""; // ou une image par défaut
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("formData", formData);
      
        try {
          const res = await axios.post(`${apiUrl}/vlogs/create`, formData, {
            headers: { 'Content-Type': 'application/json' },
          });
      
          console.log("res?.data", res?.data);
      
          if (res.data.success) {
            alert("✅ Vidéo enregistrée avec succès !");
            setFormData(initialForm);
            await fetchVlogs(); // mise à jour automatique
          }

          else {
            alert("❌ Échec de l’enregistrement");
          }
        } catch (err) {
          console.error(err);
          alert("🚨 Erreur réseau");
        }
      };
      
      // const handleSubmit = async (e) => {
      //   e.preventDefault();
      
      //   console.log("formData")
        
      
      //   // const thumb = extractThumbnailFromLink(formData.lien, formData.source);

      //   // const dataToSend = {
      //   //   ...formData,
      //   //   thumbnail: thumb,
      //   // };
      

      //   console.log(formData)
      //   // return false;
      //   try {
      //     const res = await axios.post(`${apiUrl}/vlogs/create`, formData, {
      //       headers: { 'Content-Type': 'application/json' },
      //     });
      
      //     console.log("res?.data")
      //     console.log(res?.data)
       
      // //  return false;
      //     if (res.data.success) {
      //       alert("✅ Vidéo enregistrée avec succès !");
      //       // reset form etc.
      //     } else {
      //       alert("❌ Échec de l’enregistrement");
      //     }
      //   } catch (err) {
      //     console.error(err);
      //     alert("🚨 Erreur réseau");
      //   }
      // };
      
//   const handleVideoUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
  
//     const formDataUpload = new FormData();
//     formDataUpload.append('video', file);
  
//     try {
//       const res = await fetch('/api/upload', {
//         method: 'POST',
//         body: formDataUpload,
//       });
  
//       const data = await res.json();
//       if (data.url) {
//         setFormData((prev) => ({ ...prev, lien: data.url }));
//         alert('✅ Vidéo uploadée avec succès !');
//       } else {
//         alert('❌ Échec de l’upload');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('🚨 Erreur lors de l’upload');
//     }
//   };
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.titre || !formData.lien) return;

//     if (formData.id) {
//       setVlogs((prev) =>
//         prev.map((v) => (v.id === formData.id ? { ...formData, date: v.date } : v))
//       );
//     } else {
//       const newVlog = { ...formData, id: Date.now(), date: new Date().toISOString().slice(0, 10) };
//       setVlogs((prev) => [...prev, newVlog]);
//     }

//     setFormData(initialForm);
//   };
const handleEdit = (video) => {
  setFormData({
    id: video.id,
    titre: video.titre,
    lien: video.path,
    source: video.source_label || "youtube", // selon structure
    thumbnail: video.thumbnail,
    vlog_type_id: video.type_vlog,
    statut: video.public === 1 ? "Publié" : "Brouillon",
  });
};

  const handleDelete = (id) => {
    if (confirm('Supprimer ce vlog ?')) {
      setVlogs((prev) => prev.filter((v) => v.id !== id));
    }
  };

  const filtered = vlogs.filter((v) => {
    if (!v.titre) return false;
  
    const matchTitre = v.titre.toLowerCase().includes(search.toLowerCase());
    const matchStatut = filterStatut === '' || v.statut == filterStatut;
  
    return matchTitre && matchStatut;
  });
  
  // const filtered = vlogs.filter((v) =>
  // {
  //     if (v.titre === undefined || v.titre === null ) return false;

  //     console.log("filterStatut")
  //     console.log(filterStatut)
   
  //   v.titre.toLowerCase().includes(search.toLowerCase()) &&
  //   (filterStatut ? v.statut === filterStatut : true) }
  // );

  console.log("vlogs")
  console.log(vlogs)
  console.log(filtered)
  return (
    <div className="vlogs_page">
      {/* Formulaire d'ajout / édition */}
      <form onSubmit={handleSubmit} className="vlog_form">
        <div className="col-12 w-100 text-center py-3">
            <label className="title">
               ajouter une nouvelle vidéo
            </label>
        </div>
        <div className="input_group">
        <input
          type="text"
          placeholder="Titre de la vidéo"
          value={formData.titre}
          onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
        />
      
        <select
          value={formData.source}
          onChange={(e) => setFormData({ ...formData, source: e.target.value })}
        >

          <option value="#">source de la video</option>
          <option value="local">local</option>
          <option value="youtube">youtube</option>
          <option value="tiktok">tiktok</option>
          <option value="autre">autre</option>
        </select>
        
        
{formData.source === 'local' && (
  <input
    type="file"
    accept="video/*"
    onChange={handleVideoUpload}
    className="upload_input"
  />
)}
{/* <input
          type="text"
          placeholder="Lien vidéo"
          value={formData.lien}
          onChange={(e) => setFormData({ ...formData, lien: e.target.value })}
        /> */}
        </div>
        <div className="input_group">
       
        <input
          type="text"
          placeholder="Lien vidéo"
          value={formData.lien}
          onChange={(e) => setFormData({ ...formData, lien: e.target.value })}
          onBlur={() => {
            const thumbnail = extractThumbnailFromLink(formData.lien, formData.source);
            if (thumbnail) {
              setFormData((prev) => ({ ...prev, thumbnail }));
            }
          }}
        />
         <select
  value={formData.vlog_type_id || ''}
  onChange={(e) => setFormData({ ...formData, vlog_type_id: e.target.value })}
>
  <option value="">-- Choisir un type de vlog --</option>

  {vlogTypes.map((type) => (
    <option key={type.id} value={type.id}>
      {type.libelle}
      {type.details ? ` - ${type.details}` : ''}
    </option>
  ))}
</select>
        <select
          value={formData.statut}
          onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
        >
          <option value="Publié">Publié</option>
          <option value="Brouillon">Brouillon</option>
        </select>
        </div>

        {formData.thumbnail && (
          <div className="col-12">
 <div className="thumbnail_preview">
    <img
      src={formData.thumbnail}
      alt="Miniature de la vidéo"
      style={{ maxWidth: "100%", maxHeight: 150, marginTop: 10 }}
    />
  </div>
          </div>
 
)}
     <div className="form_btn_container">
     <button type="submit">{formData.id ? 'Mettre à jour' : 'Ajouter'}</button>
     {formData.id && (
  <button
    type="button"
    className="reset_btn"
    onClick={() => setFormData(initialForm)}
  >
    Nouveau
  </button>
)}
     </div>
        </form>

      {/* Filtres */}
      <div className="vlog_filters">
        <input
          type="text"
          placeholder="🔍 Rechercher un titre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterStatut} onChange={(e) => setFilterStatut(e.target.value)}>
          <option value="">Tous les statuts</option>
          <option value="Publié">Publié</option>
          <option value="Brouillon">Brouillon</option>
        </select>
      </div>

      {/* Liste des vidéos */}
      <table className="vlogs_table">
        <thead>
          <tr>
             <th>#</th>
            <th>Titre</th>
            <th>Source</th>
            <th>Statut</th>
            <th>Miniature</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((v , index) => (
            <tr key={v.id}>
               <td>{index + 1}</td>
              <td>{v.titre}</td>
              <td>{v.source}</td>
              <td>{v.statut}</td>
              <td>
          {v.thumbnail ? (
            <img src={v.thumbnail} alt="thumb" style={{ height: 50 }} />
          ) : (
            "N/A"
          )}
        </td>
        <td>{v.created_at}</td>
              <td>
                <button className="action_btn edit" onClick={() => handleEdit(v)}>✏️</button>
                <button className="action_btn delete" onClick={() => handleDelete(v.id)}>🗑️</button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="4">Aucun vlog trouvé.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

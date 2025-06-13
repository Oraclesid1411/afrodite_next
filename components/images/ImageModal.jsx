
// import React, { useState, useEffect } from 'react';
import React ,{ useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faShareAlt, faUserPlus, faUserCheck , faTimes} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../Context/AuthenticateContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from "next/navigation";
// import { useNavigate } from 'react-router-dom';  // Remplacer useHistory par useNavigate

  import {apiUrl} from "../../config/apiUrl";

// import model_defaultimg from 'assets/'
const ImageModal = ({ image, data, onClose, onDataLoaded }) => {
 
  const auth = useAuth();
  const user_info = auth.currentUser;

  
  const [imagesWithContributors, setImagesWithContributors] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [postId, setPostId] = useState(null);
  const [contributors, setContributors] = useState({});
  const [modeldata, setModeldata] = useState({});
  // États pour les contributeurs
  // const [photographe, setPhotographe] = useState([]);
  // const [styliste, setStyliste] = useState([]);
  // const [maquilleur, setMaquilleur] = useState([]);
  // const [coiffeur, setCoiffeur] = useState([]);
  // const [boutique, setBoutiques] = useState([]);
  // const [modeldata, setModeldata] = useState({});
  const [like_moment , setlike_moment] = useState([]);
  const getContributorsCaption = (contributors) => {
    if (!contributors) return '';
  
    const rolesMap = {
      photographes: 'Photographe',
      stylistes: 'Styliste',
      maquilleurs: 'Maquilleur',
      coiffeurs: 'Coiffeur',
      boutiques: 'Boutique'
    };
  
    const lines = [];
  
    for (const [key, roleLabel] of Object.entries(rolesMap)) {
      const list = contributors[key];
      if (Array.isArray(list) && list.length > 0) {
        const names = list
          .map(item => item.contributeur_nom || item.nom || 'Inconnu')
          .join(', ');
        lines.push(`${roleLabel}${list.length > 1 ? 's' : ''} : ${names}`);
      }
    }
  
    return lines.join(' / ');
  };
  
  // const getContributorsCaption = (contributors) => {

  //   if (!contributors || contributors.length === 0) return '';
  //   console.log("captions")
  //   console.log(contributors)
  //   // return contributors.map(c => `${c.nom} - ${c.role}`).join(', ');
  // };
  // console.log("like_moment")
  // console.log(like_moment)
  useEffect(() => {
    if (!data || data.length === 0) return;

    // Initialisation rapide pour éviter un délai d'affichage
    setImagesWithContributors(
      data.map((imageData) => ({
        ...imageData,
        contributors: {},
        stats: {},
        like_state: "",
      }))
    );

    // Définir l'index de l'image actuelle
    const firstIndex = data.findIndex((img) => img.id_image === image.id_image);
    setCurrentImageIndex(firstIndex !== -1 ? firstIndex : 0);

    const fetchAllData = async () => {
      const updatedImages = await Promise.all(
        data.map(async (imageData) => {
          const [contributors, stats, likeState] = await Promise.all([
            fetchContributors(imageData.id_image),
            fetchImageStats(imageData.id_image),
            fetchHasLiked(imageData.id_image),
          ]);
          // console.log(stats)
          
          // console.log("stats")
          // console.log("likeState pp")
          // console.log(likeState)
// alert('test')
          if(likeState.length > 0){
            if(likeState[0]?.date_like){
              setlike_moment(likeState[0]?.date_like)    
            }
          }
          // setlike_moment(likeState.data?.like_moment)
         
          return { ...imageData, contributors, stats, like_state: likeState };
        })
      );

      setImagesWithContributors(updatedImages);
      onDataLoaded?.(true);
    };

    fetchAllData();
  }, [data, image, onDataLoaded]);

  useEffect(() => {
    if (imagesWithContributors.length > 0) {
    
      const currentImage = imagesWithContributors[currentImageIndex];
    
      setModeldata({
        idmodel: currentImage.idmannequin,
        pseudomodel: currentImage.pseudo_model,
      });

      console.log("currentImage")
      console.log(currentImage)
   
      setContributors(currentImage.contributors || {});
      setLikeCount(currentImage.stats?.likes_count || 0);
      setShareCount(currentImage.stats?.shares_count || 0);
      setPostId(currentImage.stats?.postid || null);
      // setHasLiked(false);
      // alert('here')
      if(currentImage?.like_state.length > 0){
        if(currentImage?.like_state[0]?.has_liked === 0){
          setHasLiked(false); 
        }
        else{
          setHasLiked(true);
        }
      }
      setIsFollowing(false);
    }
  }, [currentImageIndex, imagesWithContributors]);

  useEffect(() => {
    if (postId) {
      fetchSetHasLiked();
    }
  }, [postId]);

  const fetchContributors = async (imageId) => {
    try {
      const { data } = await axios.post(`${apiUrl}/Collabs/list_collab_by_image`, {
        id_image: imageId,
      });
      return data || {};
    } catch (err) {
      console.error("Erreur lors de la récupération des contributeurs", err);
      return {};
    }
  };

  const fetchImageStats = async (imageId) => {
    try {
      const { data } = await axios.post(`${apiUrl}/posts/stats`, {
        id: imageId,
        categorie: 1,
        type: 2,
      });

      // console.log("data here")
      // console.log(data)
      return data?.stats || {};
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques", error);
      return {};
    }
  };

  const fetchHasLiked = async (imageId) => {
    try {
      const { data } = await axios.post(`${apiUrl}/posts/image_liked`, {
        id_contenu: imageId,
        user: user_info?.id,
      });
      // console.log("data gh")
      // console.log(data)
      return data || false;
    } catch (error) {
      console.error("Erreur lors de la récupération du like", error);
      return false;
    }
  };

  const fetchSetHasLiked = async () => {
    try {
      // alert('try')
      const { data } = await axios.post(`${apiUrl}/posts/hasLiked`, {
        id_post: postId,
        user: user_info?.id,
      });
      if (data?.success) {
        setHasLiked(true);
        // console.log("data like");
        // console.log(data)
        // alert('test')
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du like", error);
    }
  };

  const handleFollow = () => setIsFollowing((prev) => !prev);

  const handleLike = async (imageId) => {
  
    // console.log(hasLiked)
    // alert('hasLiked')
    if (hasLiked) {
      // alert('hasLiked')
      const currentTime = new Date();

      const likeTime = new Date(like_moment);
      const diffMs = currentTime - likeTime;
      const diffMinutes = diffMs / (1000 * 60);
    
      if (diffMinutes < 1440) {
        // Annuler le like (like par erreur)
        try {

          // console.log("dislike")

          // return false;
          const unlike = await axios.post(`${apiUrl}/posts/unlike`, {
            id_contenu: imageId,
            id_post: postId,
            user: user_info?.id,
          });
    
          if (unlike.data?.message) {
           
            setLikeCount(likeCount  - 1);
            setlike_moment(null);
            setHasLiked(false)
            setImagesWithContributors((prevImages) =>
              prevImages.map((img) => {
                if (img.id_image === imageId) {
                  const newLikeValue = hasLiked ? 0 : 1;
                  const likeChange = hasLiked ? -1 : 1;
        
                  const updatedLikeState = img.like_state?.length > 0
                    ? [{ ...img.like_state[0], has_liked: newLikeValue }]
                    : [{ has_liked: newLikeValue }];
        
                  return {
                    ...img,
                    like_state: updatedLikeState,
                    stats: {
                      ...img.stats,
                      likes_count: Math.max((img.stats?.likes_count || 0) + likeChange, 0),
                    },
                  };
                }
                return img;
              })
            );
            console.log("Like annulé car clic dans les 5 minutes");
          } else {
            console.log("Erreur lors de l'annulation du like");
          }
        } catch (error) {
          console.error('Erreur lors de l\'unlike', error);
        }
      } else {
        console.log("Like déjà effectué depuis plus de 5 minutes, aucune action.");
      }
    }
else{

  try {
    // console.log(imageId)
    // console.log(imageId)
    
    const { data } = await axios.post(`${apiUrl}/posts/like`, {
      id_contenu: imageId,
      id_post: postId,
      user: user_info?.id,
    });

    // console.log('data like')
    // console.log(data)

    // return false;
    if (data) {
      setLikeCount((prev) => prev + 1);
      setHasLiked(true);
     // Mise à jour locale de l'état
     setImagesWithContributors((prevImages) =>
      prevImages.map((img) => {
        if (img.id_image === imageId) {
          // Cloner le like_state ou créer si vide
          const updatedLikeState = img.like_state?.length > 0
            ? [{ ...img.like_state[0], has_liked: 1 }]
            : [{ has_liked: 1 }];
          return {
            ...img,
            like_state: updatedLikeState,
            stats: {
              ...img.stats,
              likes_count: (img.stats?.likes_count || 0) + 1, // Optionnel : augmenter le compteur localement
            },
          };
        }
        return img;
      })
    );
  
      setlike_moment(data?.like_moment)
      // toast.success("Contenu aimé avec succès !");
    }
  } catch (error) {
    console.error("Erreur lors du like", error);
  }
}
  };

  const handleShare = async () => {
    try {
      await axios.post(`${apiUrl}/post/${postId}/share`);
      setShareCount((prev) => prev + 1);
    } catch (error) {
      console.error("Erreur lors du partage", error);
    }
  };

  const getPathForResolution = (paths) => {
    const width = window.innerWidth;
    return width <= 720 ? paths.path_hrm : paths.path_hrd;
  };

  // console.log('imagesWithContributors')
  // console.log(imagesWithContributors)
  const sliderSettings = {
    infinite: true,
    centerMode: true,
    centerPadding: "0",
    slidesToShow: 1,
    focusOnSelect: true,
    initialSlide: currentImageIndex,
    prevArrow: <button className="left_btn">Prev</button>,
    nextArrow: <button className="right_btn">Next</button>,
    afterChange: (index) => setCurrentImageIndex(index),
  };

  // console.log("hasLiked")
  // console.log(hasLiked)
  if (!imagesWithContributors.length) return null;

  return (
    <div className="imagezoombox">
        <ToastContainer />
    <div className="modal_overlay">
      <div className="fixedbtnzone">
        <button className="closebtn" onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="modal-content">
     
        <div className="image-section text-center">
          
          <Slider {...sliderSettings}>
            {imagesWithContributors.map((currentImage, index) => (
          //  console.log(currentImage)
              <div key={currentImage.id_image} className="image-section text-center">
          
                <a
                  className="hover-switch"
                  href={`${apiUrl}/${getPathForResolution(currentImage.paths)}`}
                  data-fancybox="gallery"
                  data-caption={getContributorsCaption(currentImage.contributors)}
                >
                  
                  <img
                     loading="lazy"
                    src={`${apiUrl}/${getPathForResolution(currentImage.paths)}` || "/assets/img/avatar/dame.png"}
                    alt={currentImage.path_image || "Image"}
                    className="img-fluid"
                    
                  />
                </a>

                {/* Displaying stats and contributors only for the current image */}
                {index === currentImageIndex && (
                  <div className="btn-section">
                    <div className="btn_list">
                      <div className="like_btn">
       <div className="post-actions">
        
 <button

     onClick={() => handleLike(currentImage.id_image)}

     className={
      currentImage?.like_state[0]?.has_liked 
         === 1 ? 'active' : ''

   }
 
>
  <FontAwesomeIcon icon={faThumbsUp} className="mr-3" />
  <span className="ml-3">{likeCount}</span>
</button>

                          <button onClick={handleFollow} className="follow-button">
                            <FontAwesomeIcon
                              icon={isFollowing ? faUserCheck : faUserPlus}
                              className={isFollowing ? "followed-icon" : "follow-icon"}
                            />
                            {isFollowing ? "Vous suivez" : "Suivre"}
                          </button>

                          <button onClick={handleShare}>
                            <FontAwesomeIcon icon={faShareAlt} />
                            ({shareCount})
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </div>

        {/* Display contributors only for the current image */}
        {/* {imagesWithContributors.length} */}
          <div className="details-section">
          
          <div className="contributeurs_list_container">
  {modeldata?.pseudomodel && (
    <>
    
      <a className="cstm_link_b mx-1" href={`/mannequins`}>
        mannequin
      </a>

      <a className="cstm_link" href={`/single_view/1/${modeldata?.idmodel}`}>
        {modeldata?.pseudomodel} /
      </a> 
    </>
  )}

  <a href="/parteners" className="cstm_link_b ">
    Collabs :
  </a>

  {imagesWithContributors.length > 0 && imagesWithContributors[currentImageIndex] && (
  <>
    {contributors.photographes?.length > 0 && (
      <label className="photographe">
        {contributors.photographes.map((item, index) => (
          <React.Fragment key={item?.collab_id}>
            <a href={`/singleViewP/1/${item?.collab_id}`} className="cstm_link">
              {item?.collab_pseudo}
            </a>
            {index < contributors.photographes.length - 1 && ' & '}
          </React.Fragment>
        ))}
        <span className="label">photo / </span>
      </label>
    )}

    {contributors.stylistes?.length > 0 && (
      <label className="styliste">
        {contributors.stylistes.map((item, index) => (
          <React.Fragment key={item?.collab_id}>
            <a href={`/singleViewP/4/${item?.collab_id}`} className="cstm_link">
              {item?.collab_pseudo}
            </a>
            {index < contributors.stylistes.length - 1 && ' & '}
          </React.Fragment>
        ))}
        <span className="label">costume / </span>
      </label>
    )}

    {contributors.maquilleurs?.length > 0 && (
      <label className="maquilleur">
        {contributors.maquilleurs.map((item, index) => (
          <React.Fragment key={item?.collab_id}>
            <a href={`/singleViewP/2/${item?.collab_id}`} className="cstm_link">
              {item?.collab_pseudo}
            </a>
            {index < contributors.maquilleurs.length - 1 && ' & '}
          </React.Fragment>
        ))}
        <span className="label">makeup / </span>
      </label>
    )}

    {contributors.coiffeurs?.length > 0 && (
      <label className="coiffeur">
        {contributors.coiffeurs.map((item, index) => (
          <React.Fragment key={item?.collab_id}>
            <a href={`/singleViewP/3/${item?.collab_id}`} className="cstm_link">
              {item?.collab_pseudo}
            </a>
            {index < contributors.coiffeurs.length - 1 && ' & '}
          </React.Fragment>
        ))}
        <span className="label">hair / </span>
      </label>
    )}

    {contributors.boutiques?.length > 0 && (
      <label className="boutique">
        {contributors.boutiques.map((item, index) => (
          <React.Fragment key={item?.collab_id}>
            <a href={`/singleViewP/5/${item?.collab_id}`} className="cstm_link">
              {item?.nom_boutique}
            </a>
            {index < contributors.boutiques.length - 1 && ' & '}
          </React.Fragment>
        ))}
        <span className="label">boutique</span>
      </label>
    )}
  </>
)}

</div>

          </div>
      
      </div>
    </div>
  </div>
  );
};

export default ImageModal;

'use client';

import React, {useState, useEffect} from 'react'

import axios from 'axios';
import {apiUrl} from "../../config/apiUrl.js"
import TikTokEmbed from '../TikTokEmbed.jsx';
// import Slider from "react-slick";

// import axios from 'axios';

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';




function All_Vlogs() {

  const [vlogTypes, setVlogTypes] = useState([]);
  // const [filterType, setFilterType] = useState('');
  
  const [Allvlog , setAllvlog] = useState([]);

  // console.log("Allvlog")
  // console.log(Allvlog)
 
  // const [actus , setActus] = useState([]);
  // const [lives , setLives] = useState([]);
  // const [castings , setCastings] = useState([]);
  // const [defiles , setDefiles] = useState([]);
  // const [interviews , setInterviews] = useState([]);
  
  const getEmbeddedUrl = (path, source) => {
    if (source === 2) {
      // YouTube
      const videoId = path.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)?.[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
  
    if (source === 3) {
      // TikTok
      const videoId = path.match(/\/video\/(\d+)/)?.[1];
      const username = path.match(/@([a-zA-Z0-9._]+)/)?.[1];
      if (videoId && username) {
        return `https://www.tiktok.com/embed/v2/${videoId}`;
      }
    }
  
    if (source === 1) {
      // Local
      return path;
    }
  
    return path;
  };
  
  
// useEffect(() => {
//   const fetchTypes = async () => {
//     try {
//       const res = await axios.get(`${apiUrl}/vlogtypes`);
//       // Ajouter "Tous" en premier
//       setVlogTypes([{ id: '', libelle: 'Tous', slug: 'all' }, ...res.data]);
//     } catch (err) {
//       console.error("Erreur récupération types :", err);
//     }
//   };

//   fetchTypes();
// }, []);

  // function getEmbeddedUrl(path) {
  //   const youtubeMatch = path.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  //   if (youtubeMatch) {
  //     return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`;
  //   }
  
  //   // TikTok, autre... à adapter si besoin
  //   return path;
  // }
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [rep , rep1] = await Promise.all([
            axios.get(`${apiUrl}/vlogs/all`),
            axios.get(`${apiUrl}/vlogs/vlog_type`),
           ]);

          setAllvlog(rep.data?.vlogs)
          setVlogTypes([{ id: '', libelle: 'Tous', slug: 'all' }, ...rep1.data]);
         } catch (err) {
          console.error("Erreur lors de la récupération des données :", err);
        }
      };
      fetchData();
    }, []);

    // console.log("vlogTypes")
    // console.log(vlogTypes)

  return (
    <>
                <div className="container tab_list_box mb-3">
                    <div className="tab-list product-tab-list sticky_nav">
                    <nav className="nav product-tab-nav">
  {vlogTypes.map((type, index) => (
    <a
      key={type.slug || `type-${index}`}
      className={`product-tab-link tab-link ${index === 0 ? 'active' : ''}`}
      href={`#${type.slug}`}
      data-bs-toggle="tab"
    >
      {type.libelle}
    </a>
  ))}
</nav>
                    </div>
                    <div className="tab-content">
  {vlogTypes.map((type, index) => (
    <div
      key={type.slug}
      className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
      id={type.slug}
    >
      <div className="row">
        {Allvlog
          .filter(v => !type.id || v.type_vlog === type.id)
          .map(v => (
                                                                  
            <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" key={v?.id} data-aos="fade-up" data-aos-duration="700">
                                                   
            <div className="product-card video_card">
                <div className="product-card-img">
        

          <a
          className="hover-switch clip_video"
          data-fancybox="video-gallery"
          data-caption={v?.titre}
          data-type="iframe"
          href={getEmbeddedUrl(v?.path, v?.source)}
        >
          <img
            src={v?.thumbnail || "/default-thumbnail.jpg"}
            alt="video"
            loading="lazy"
            className="img"
          />
          <button className="play-button">▶</button>
        </a>
        

              

                </div>
                <div className="card-title">
                  <label>{v?.titre} </label>
                </div>

            </div>
            </div>
            // <VideoCard key={v.id} data={v} />
          ))}
      </div>
    </div>
  ))}
</div>

                </div>
    </>
  )
}

export default All_Vlogs;
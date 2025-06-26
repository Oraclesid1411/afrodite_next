'use client';

import React, {useState, useEffect} from 'react'

import axios from 'axios';
import {apiUrl} from "../../config/apiUrl.js"

 
import { useAuth } from '../../Context/AuthenticateContext.jsx';
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
  
  // const [stats, setStats] = useState({ likes_count: 0, shares_count: 0 });
  const [liked, setLiked] = useState(false);
  const [Allvlog , setAllvlog] = useState([]);
  const [GroupedVlogs, setGroupedVlogs] = useState([]);
  const [statsMap, setStatsMap] = useState({}); // Clé = id_post, Valeur = stats


    const auth = useAuth();
    const user_info = auth.currentUser;

    const userId  = user_info?.id;
  
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
    //   const fetchData = async () => {
    //     try {
    //       const [rep , rep1] = await Promise.all([
    //         axios.get(`${apiUrl}/vlogs/all`),
    //         axios.get(`${apiUrl}/vlogs/vlog_type`),
    //        ]);

    //       setAllvlog(rep.data?.vlogs)
    //       setVlogTypes([{ id: '', libelle: 'Tous', slug: 'all' }, ...rep1.data]);
        
        
    //     } catch (err) {
    //       console.error("Erreur lors de la récupération des données :", err);
    //     }
    //   };
    //   fetchData();
    // }, []);
  
    useEffect(() => {
      const fetchVlogs = async () => {
        try {
          const [vlogsRes, typesRes] = await Promise.all([
            axios.get(`${apiUrl}/vlogs/all`),
            axios.get(`${apiUrl}/vlogs/vlog_type`),
          ]);
    
          const allVlogs = vlogsRes.data?.vlogs || [];
    
          // Grouper les vlogs par id_contenu
          const groupedMap = new Map();
          allVlogs.forEach((item) => {
            if (!groupedMap.has(item.id_contenu)) {
              groupedMap.set(item.id_contenu, item);
            }
          });
    
          const groupedArray = Array.from(groupedMap.values());
    
          setAllvlog(allVlogs);
          setGroupedVlogs(groupedArray);
          setVlogTypes([{ id: '', libelle: 'Tous', slug: 'all' }, ...typesRes.data]);
        } catch (err) {
          console.error("Erreur lors du chargement des vlogs :", err);
        }
      };
    
      fetchVlogs();
    }, []);
    
    console.log("Allvlog")
    console.log(Allvlog)
    console.log(GroupedVlogs)

    // useEffect(() => {
    //   const fetchStats = async () => {
    //     if (!Allvlog.length) return;
    
    //     const newStatsMap = {};
    //     await Promise.all(
    //       Allvlog.map(async (vlog) => {
    //         try {
    //           const res = await axios.get(`${apiUrl}/vlogs/post_stats/${vlog.id_post}`);
    //           newStatsMap[vlog.id_post] = res.data?.data || { likes_count: 0, shares_count: 0 };
    //         } catch (err) {
    //           console.error(`Erreur de stats pour post ${vlog.id_post}`, err);
    //           newStatsMap[vlog.id_post] = { likes_count: 0, shares_count: 0 };
    //         }
    //       })
    //     );
    
    //     setStatsMap(newStatsMap);
    //   };
    
    //   fetchStats();
    // }, [Allvlog]);

    useEffect(() => {
      const fetchStats = async () => {
        try {
          const statsObj = {};
    
          await Promise.all(
            GroupedVlogs.map(async (vlog) => {
              try {
                const res = await axios.get(`${apiUrl}/vlogs/post_stats/${vlog.id_post}`);
                statsObj[vlog.id_post] = res.data?.data || { likes_count: 0, shares_count: 0 };
              } catch (err) {
                statsObj[vlog.id_post] = { likes_count: 0, shares_count: 0 };
                console.warn("Erreur stats pour", vlog.id_post, err);
              }
            })
          );
    
          setStatsMap(statsObj);
        } catch (err) {
          console.error("Erreur globale lors de la récupération des stats :", err);
        }
      };
    
      if (GroupedVlogs.length > 0) {
        fetchStats();
      }
    }, [GroupedVlogs]);
  
    const handleLike = async () => {
    
      try {
        await axios.post(`${apiUrl}/vlogs/like/${postId}`, { id_user: userId });
        setLiked(!liked);
        fetchStats();
      } catch (err) {
        console.error(err);
      }
    };
  
    const handleShare = async () => {
      try {
        await axios.post(`${apiUrl}/vlogs/share/${postId}`, { id_user: userId });
        alert("✅ Partagé !");
        fetchStats();
      } catch (err) {
        console.error(err);
      }
    };
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
  {vlogTypes.map((type, index) => {
    const filteredVlogs = GroupedVlogs.filter(v =>
      type.id ? v.type_vlog === type.id : true
    );
  //  console.log('filteredVlogs')
  //  console.log(filteredVlogs)
  //  console.log(type)
  //  console.log(v)
  //  console.log(filteredVlogs)
    return (
      <div
        key={type.slug}
        className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
        id={type.slug}
      >
        <div className="row">
          {filteredVlogs.map(v => (
          <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" key={v?.id_contenu} data-aos="fade-up" data-aos-duration="700">
                <div className="product-card video_card">
                <div className="product-card-img">
                  <a
                    className="hover-switch clip_video"
                    data-fancybox="video-gallery"
                    data-caption={v.titre}
                    data-type="iframe"
                    href={getEmbeddedUrl(v.path, v.source)}
                  >
                    <img
                      src={v.thumbnail || "/default-thumbnail.jpg"}
                      alt={v.titre}
                      loading="lazy"
                      className="img"
                    />
                    <button className="play-button">▶</button>
                  </a>
                </div>

                <div className="card-title px-2 pt-1">
                  <label title={v.titre}>{v.titre}</label>

                  <div className="video-actions d-flex justify-content-between mt-1">
                    <button
                      onClick={() => handleLike(v.id_post)}
                      className="btn btn-sm"
                    >
                      ❤️ {statsMap[v.id_post]?.likes_count ?? 0}
                    </button>
                    <button
                      onClick={() => handleShare(v.id_post)}
                      className="btn btn-sm"
                    >
                      🔄 {statsMap[v.id_post]?.shares_count ?? 0}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredVlogs.length === 0 && (
            <div className="col-12 text-center text-muted py-4">
              Aucune vidéo dans cette catégorie.
            </div>
          )}
        </div>
      </div>
    );
  })}
</div>

                </div>
    </>
  )
}

export default All_Vlogs;
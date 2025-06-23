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


  const [Allvlog , setAllvlog] = useState([]);

  console.log("Allvlog")
  console.log(Allvlog)
 
  const [actus , setActus] = useState([]);
  const [lives , setLives] = useState([]);
  const [castings , setCastings] = useState([]);
  const [defiles , setDefiles] = useState([]);
  const [interviews , setInterviews] = useState([]);
  
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
          const [rep , rep1, rep2, rep3, rep4, rep5] = await Promise.all([
            axios.get(`${apiUrl}/vlogs/all`),
            // axios.get(`${apiUrl}/vlogs/actus`),
            // axios.get(`${apiUrl}/vlogs/lives`),
            // axios.get(`${apiUrl}/vlogs/castings`),
            // axios.get(`${apiUrl}/vlogs/defiles`),
            // axios.get(`${apiUrl}/vlogs/interviews`),
          ]);

          setAllvlog(rep.data?.vlogs)
          // setActus(rep1.data);
          // setLives(rep2.data);
          // setCastings(rep3.data);
          // setDefiles(rep4.data);
          // setInterviews(rep5.data);
        } catch (err) {
          console.error("Erreur lors de la récupération des données :", err);
        }
      };
      fetchData();
    }, []);

  return (
    <>
                <div className="container tab_list_box mb-3">
                    <div className="tab-list product-tab-list sticky_nav">
                        <nav className="nav product-tab-nav">
                        <a className="product-tab-link tab-link active" href="#All" data-bs-toggle="tab">Tous</a>
                        <a className="product-tab-link tab-link" href="#Actus" data-bs-toggle="tab">Actus</a>
                            <a className="product-tab-link tab-link" href="#Lives" data-bs-toggle="tab">Lives</a>
                            <a className="product-tab-link tab-link " href="#Castings" data-bs-toggle="tab">Castings</a>
                            <a className="product-tab-link tab-link " href="#Defiles" data-bs-toggle="tab">Défilés</a>
                            <a className="product-tab-link tab-link " href="#Interviews" data-bs-toggle="tab">Interviews</a>
                            {/* <a className="product-tab-link tab-link " href="#pstyle" data-bs-toggle="tab">nouveaux</a> */}
                      </nav>
                    </div>
                    <div className="tab-content product-tab-content col-12">
                    <div id="All" className="tab-pane fade active show">
                        <div className="row">

                        {Allvlog.map((item) => (
                                                      
                                                            <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" key={item?.id} data-aos="fade-up" data-aos-duration="700">
                                                   
                                                            <div className="product-card video_card">
                                                                <div className="product-card-img">
                                                        

                                                          <a
                                                          className="hover-switch clip_video"
                                                          data-fancybox="video-gallery"
                                                          data-caption={item?.titre}
                                                          data-type="iframe"
                                                          href={getEmbeddedUrl(item?.path, item?.source)}
                                                        >
                                                          <img
                                                            src={item?.thumbnail || "/default-thumbnail.jpg"}
                                                            alt="video"
                                                            loading="lazy"
                                                            className="img"
                                                          />
                                                          <button className="play-button">▶</button>
                                                        </a>
                                                        
 
                                                              

                                                                </div>
                                                                <div className="card-title">
                                                                  <label>{item?.titre} </label>
                                                                </div>

                                                            </div>
                                                            </div>
                                              
                                                      ))}
                                                        
                             </div>
                        </div>
                       <div id="Actus" className="tab-pane fade ">
                        <div className="row">

                        {actus.map((item) => (
                                                        <>
                                                            <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" key={item?.id} data-aos="fade-up" data-aos-duration="700">
                                                   
                                                            <div className="product-card video_card">
                                                                <div className="product-card-img">
                                                                    <a className="hover-switch"
                                                                      data-fancybox="video-gallery"
                                                                      href={item?.path}
                                                                      data-caption="Video 1">
                                                                        
                                                                    <img src={item?.thumbnail} alt="video" className='img'/>
                                                                    <button className="play-button">▶</button>
                                                                        
                                                                    </a>
                                                                
                                                                </div>

                                                            </div>
                                                            </div>
                                                            </>
                                                      ))}
                                                        
                             </div>
                        </div>
                        <div id="Lives" className="tab-pane fade ">

                            <div className="row">

                        {lives.map((item) => (
                                                        <>
                                                            <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" key={item?.id} data-aos="fade-up" data-aos-duration="700">
                                                              

                                                            <div className="product-card video_card">
                                                                <div className="product-card-img">
                                                                    <a className="hover-switch"
                                                                      data-fancybox="video-gallery"
                                                                      href={item?.path}
                                                                      data-caption="Video 1">
                                                                        
                                                                    <img src={item?.thumbnail} alt="video" className='img'/>
                                                                    <button className="play-button">▶</button>
                                                                        
                                                                    </a>
                                                                
                                                                </div>

                                                            </div>
                                                            </div>
                                                            </>
                                                      ))}
                                                        
                             </div>
                                                        
                        </div>
                        <div id="Castings" className="tab-pane fade ">

                            <div className="row">

                        {castings.map((item) => (
                                                        <>
                                                            <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" key={item?.id} data-aos="fade-up" data-aos-duration="700">
                                                              

                                                            <div className="product-card video_card">
                                                                <div className="product-card-img">
                                                                    <a className="hover-switch"
                                                                      data-fancybox="video-gallery"
                                                                      href={item?.path}
                                                                      data-caption="Video 1">
                                                                        
                                                                    <img src={item?.thumbnail} alt="video" className='img'/>
                                                                    <button className="play-button">▶</button>
                                                                        
                                                                    </a>
                                                                
                                                                </div>

                                                            </div>
                                                            </div>
                                                            </>
                                                      ))}
                                                        
                             </div>

                        </div>
                        <div id="Defiles" className="tab-pane fade ">

                            <div className="row">

                        {defiles.map((item) => (
                                                        <>
                                                            <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" key={item?.id} data-aos="fade-up" data-aos-duration="700">
                                                              

                                                            <div className="product-card video_card">
                                                                <div className="product-card-img">
                                                                    <a className="hover-switch"
                                                                      data-fancybox="video-gallery"
                                                                      href={item?.path}
                                                                      data-caption="Video 1">
                                                                        
                                                                    <img src={item?.thumbnail} alt="video" className='img'/>
                                                                    <button className="play-button">▶</button>
                                                                        
                                                                    </a>
                                                                
                                                                </div>

                                                            </div>
                                                            </div>
                                                            </>
                                                      ))}
                                                        
                             </div>

                        </div>
                        <div id="Interviews" className="tab-pane fade ">

                            <div className="row">

                        {interviews.map((item) => (
                                                        <>
                                                            <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" key={item?.id} data-aos="fade-up" data-aos-duration="700">
                                                              

                                                            <div className="product-card video_card">
                                                                <div className="product-card-img">
                                                                    <a className="hover-switch"
                                                                      data-fancybox="video-gallery"
                                                                      href={item?.path}
                                                                      data-caption="Video 1">
                                                                        
                                                                    <img src={item?.thumbnail} alt="video" className='img'/>
                                                                    <button className="play-button">▶</button>
                                                                        
                                                                    </a>
                                                                
                                                                </div>

                                                            </div>
                                                            </div>
                                                            </>
                                                      ))}
                                                        
                             </div>

                        </div>

                    </div>
                </div>
    </>
  )
}

export default All_Vlogs;
import React from 'react'


import Slider from "react-slick";

// import { useNavigate, Link } from 'react-router-dom'
// style

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style.scss";

function Hero_b(props) {

    const settings = {
        arrows: false,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
       
      };
  return (
    <>
        <div className="slideshow-section position-relative">
                 <Slider {...settings} className="">                        
                    <div className="slide-item slide-item-bag position-relative">
                        <img loading="lazy" className=" full slide-img d-none d-md-block" src="/assets/models/slide1.png" alt="slide-1"/>
                        <img className="sm slide-img d-md-none" 
                        loading="lazy"
                        src="/assets/models/slide1.png" alt="slide-1"/>
                        <div className="content-absolute content-slide">
                            <div className="height-inherit d-flex align-items-center justify-content-end">
                                <div className="content-box slide-content slide-content-1 py-4 text-center hero-slides-text">
                                    <h2 className="slide-heading heading_72 animate__animated animate__fadeInUp"
                                        data-animation="animate__animated animate__fadeInUp">
                                     Être un modèle
                                    </h2>
                                    <p className="slide-subheading heading_24 animate__animated animate__fadeInUp"
                                        data-animation="animate__animated animate__fadeInUp">
                                    dans la fashion?
                                    </p>
                                    <a className="btn-primary slide-btn animate__animated animate__fadeInUp incription-callToAction"
                                        href="collection-left-sidebar.html"
                                        data-animation="animate__animated animate__fadeInUp">Inscription</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slide-item slide-item-bag position-relative">
                        <img loading="lazy" className=" full slide-img d-none d-md-block" src="/assets/models/slide1.png" alt="slide-1"/>
                        <img loading="lazy" className="sm slide-img d-md-none" src="/assets/models/slide1.png" alt="slide-1"/>
                        <div className="content-absolute content-slide">
                            <div className="height-inherit d-flex align-items-center justify-content-end">
                                <div className="content-box slide-content slide-content-1 py-4 text-center hero-slides-text">
                                    <h2 className="slide-heading heading_72 animate__animated animate__fadeInUp"
                                        data-animation="animate__animated animate__fadeInUp">
                                    Ëtre au service
                                    </h2>
                                    <p className="slide-subheading heading_24 animate__animated animate__fadeInUp"
                                        data-animation="animate__animated animate__fadeInUp">
                                     de l&apos;accueil!
                                    </p>
                                    <a className="btn-primary slide-btn animate__animated animate__fadeInUp incription-callToAction"
                                        href="collection-left-sidebar.html"
                                        data-animation="animate__animated animate__fadeInUp">Incription</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slide-item slide-item-bag position-relative">
                        <img loading="lazy" className=" full slide-img d-none d-md-block" src="/assets/models/slide1.png" alt="slide-1"/>
                        <img loading="lazy" className="sm slide-img d-md-none" src="/assets/models/slide1.png" alt="slide-1"/>
                        <div className="content-absolute content-slide">
                            <div className="height-inherit d-flex align-items-center justify-content-end">
                                <div className="content-box slide-content slide-content-1 py-4 text-center hero-slides-text">
                                    <h2 className="slide-heading heading_72 animate__animated animate__fadeInUp"
                                        data-animation="animate__animated animate__fadeInUp">
                                       Rejoignez
                                    </h2>
                                    <p className="slide-subheading heading_24 animate__animated animate__fadeInUp"
                                        data-animation="animate__animated animate__fadeInUp">
                                      notre agence !
                                    </p>
                                    <a className="btn-primary slide-btn animate__animated animate__fadeInUp incription-callToAction"
                                        href="collection-left-sidebar.html"
                                        data-animation="animate__animated animate__fadeInUp">Incription</a>
                                </div>
                            </div>
                        </div>
                    </div>

                 </Slider>
             

        </div>

    </>
  )
}

export default Hero_b
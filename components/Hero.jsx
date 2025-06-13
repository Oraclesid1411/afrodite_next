import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const apiUrl = 'https://apiafro.aafrodites.com';

const sliderSettings = {
  arrows: false,
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000
};

function Hero() {
  const [mannequins, setMannequins] = useState([]);
  const [deviceWidth, setDeviceWidth] = useState(0); // valeur initiale safe pour le SSR
  // const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDeviceWidth(window.innerWidth);
  
      const handleResize = () => setDeviceWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  // Fonction pour détecter le bon chemin d'image en fonction de la résolution
  const getImagePath = useCallback((paths, priority = "default") => {
    if (priority === "hero") {
      if (deviceWidth <= 720) return paths?.path_hrm;
      return paths?.path_od || paths?.path_hrd;
    } else {
      if (deviceWidth <= 720) return paths?.path_hrm;
      return paths?.path_hrd;
    }
  }, [deviceWidth]);

  // Fonction de regroupement
  const groupMannequinData = (data) => {
    const grouped = [];

    data.forEach(row => {
      let mannequin = grouped.find(m => m.id_mannequin === row.idmannequin);
      if (!mannequin) {
        mannequin = {
          id_mannequin: row.idmannequin,
          nom: row.nom,
          prenom: row.prenom,
          pseudo: row.pseudo,
          type_image: row.type_image,
          type_model: row.type_model,
          userclient: row.userclient,
          id_image: row.id_image,
          image_name: row.image_name,
          paths: {}
        };
        grouped.push(mannequin);
      }

      switch (row.type_resolution) {
        case 1: mannequin.paths.path_od = row.path_resolution; break;
        case 3: mannequin.paths.path_hrd = row.path_resolution; break;
        case 4: mannequin.paths.path_hrm = row.path_resolution; break;
        case 5: mannequin.paths.path_md = row.path_resolution; break;
        case 6: mannequin.paths.path_mm = row.path_resolution; break;
        default: break;
      }
    });

    return grouped;
  };

  // Fetch et regroupement au montage
  useEffect(() => {
    const fetchMannequins = async () => {
      try {
        const { data } = await axios.post(`${apiUrl}/fashion_model/list_mannequin`);
        setMannequins(groupMannequinData(data));
      } catch (err) {
        console.error("Erreur lors du chargement des mannequins :", err);
      }
    };

    fetchMannequins();
  }, []);

  // Resize listener
  useEffect(() => {
    const handleResize = () => setDeviceWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="slideshow-section position-relative">
      <Slider {...sliderSettings}>
        {mannequins.map((item, index) => (
          <div key={item.id_mannequin} className="slide-item slide-item-bag position-relative imageJ">
            <img
              loading="lazy"
              className="img-fluid d-md-none"
              src={`${apiUrl}/${getImagePath(item.paths, "hero")}`}
              alt={`${item.nom || "model"}`}
            />

            <div className="content-absolute content-slide">
              <div className="height-inherit d-flex align-items-center justify-content-end jj">
                <div className="content-box slide-content slide-content-1 py-4 text-center hero-slides-text">
                  <h2 className="slide-heading heading_72 animate__animated animate__fadeInUp"
                      data-animation="animate__animated animate__fadeInUp">
                    {index % 2 === 0 ? "site en" : "Rejoignez"}
                  </h2>
                  <p className="slide-subheading heading_24 animate__animated animate__fadeInUp"
                     data-animation="animate__animated animate__fadeInUp">
                    {index % 2 === 0 ? "construction" : "notre agence !"}
                  </p>

                  {index % 2 !== 0 && (
                    <a
                      className="btn-primary slide-btn animate__animated animate__fadeInUp incription-callToAction"
                      href="/postuler"
                      data-animation="animate__animated animate__fadeInUp"
                    >
                      Inscription
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Hero;

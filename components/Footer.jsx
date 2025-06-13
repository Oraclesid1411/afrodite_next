import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXTwitter,
  faFacebook,
  faLinkedin,
  faYoutube,
  faWhatsapp,
  faTiktok,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

const Footer = () => {
  const apiUrl = 'https://apiafro.aafrodites.com';

  const [rx, setRx] = useState([]);

  // Mapping des noms d'icônes aux objets FontAwesome
  const iconMapping = {
    faXTwitter: faXTwitter,
    faFacebook: faFacebook,
    faLinkedin: faLinkedin,
    faYoutube: faYoutube,
    faWhatsapp: faWhatsapp,
    faTiktok: faTiktok,
    faInstagram: faInstagram,
  };

  useEffect(() => {
    const fetchDataRx = async () => {
      try {
        const rep2 = await axios.get(`${apiUrl}/rx/all`);
        setRx(rep2.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataRx();
  }, []);

  return (
    <>
      <footer className="overflow-hidden footer-style-2">
        <div className="footer-top bg-5 text-center">
          <div className="container">
            <div className="footer-widget-wrapper">
              <div className="row">
                <div className="col-12 footer-widget">
                  <div className="footer-widget-inner">
                    {/* <div className="footer-logo">
                      <a href="" className="logo_link">
                        <img src={"/assets/models/logo.png"} alt="afrodites" />
                      </a>
                    </div> */}
                    <div className="footer-social-wrapper col-12 text-center m-0 p-0">
                      <div className="title">
                        <label htmlFor="">Nous suivre sur :</label>
                      </div>
                      <ul className="">
                        {rx.map((item) => {
                          // Récupérer l'icône correspondant au logo depuis le mapping
                          const icon = iconMapping[item?.logo];
                          return (
                            <li className="footer-social-item" key={item?.id}>
                              <a href={item?.adresse_web} className="foot" target="_blank" rel="noopener noreferrer">
                                {icon ? (
                                  <FontAwesomeIcon icon={icon} size="sm" />
                                ) : (
                                  <span>Icône inconnue</span>
                                )}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <button id="scrollup">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </>
  );
};

export default Footer;

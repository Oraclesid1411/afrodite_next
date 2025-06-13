import React, { useMemo, useEffect, useState } from 'react';
import Hero from './Hero';
import { useRouter, usePathname } from 'next/navigation';
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SectionSlider from './SectionSlider';
import ServiceButtons from './ServiceButtons';

const apiUrl = 'https://apiafro.aafrodites.com';

function MainContent() {
  const router = useRouter();
  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [deviceWidth, setDeviceWidth] = useState(null);

  // Sécurité côté client pour `window`
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDeviceWidth(window.innerWidth);

      const handleResize = () => setDeviceWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
    router.push(`#${content}`, { replace: true });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
    router.push(pathname, { replace: true });
  };

  useEffect(() => {
    const handlePopState = () => {
      if (isModalOpen) closeModal();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [isModalOpen, pathname]);

  const [mannequins_data, setmannequins_data] = useState([]);
  const [hotesses_data, sethotesses_data] = useState([]);
  const [infs_data, setinfs_data] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.allSettled([
          axios.post(`${apiUrl}/fashion_model/list_mannequin`),
          axios.post(`${apiUrl}/role_model/liste_influenceur`),
          axios.post(`${apiUrl}/host_model/liste_hotesses`)
        ]);

        if (responses[0].status === 'fulfilled') setmannequins_data(responses[0].value.data);
        if (responses[1].status === 'fulfilled') setinfs_data(responses[1].value.data);
        if (responses[2].status === 'fulfilled') sethotesses_data(responses[2].value.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
      }
    };

    fetchData();
  }, []);

  const groupData = (data, idField) => {
    return data.reduce((acc, row) => {
      let model = acc.find(item => item.model_id === row[idField]);
      if (!model) {
        model = {
          model_id: row[idField],
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
        acc.push(model);
      }

      if (row.type_resolution === 5) {
        model.paths.path_md = row.path_resolution;
      } else if (row.type_resolution === 6) {
        model.paths.path_mm = row.path_resolution;
      }

      return acc;
    }, []);
  };

  const groupedResults = groupData(mannequins_data, 'idmannequin');
  const groupedResults_b = groupData(hotesses_data, 'idhotesse');
  const groupedResults_c = groupData(infs_data, 'idinfluenceur');

  const getPathForResolution = (paths) => {
    const resolutions = {
      mobile: paths.path_mm,
      tablet: paths.path_md,
      desktop: paths.path_md,
    };

    if (!deviceWidth) return null;
    if (deviceWidth <= 720) return resolutions.mobile;
    if (deviceWidth <= 1080) return resolutions.tablet;
    return resolutions.desktop;
  };

  const settings2 = useMemo(() => ({
    infinite: true,
    speed: 500,
    arrows: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 5000,
        }
      },
      {
        breakpoint: 776,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          infinite: true,
          autoplaySpeed: 5000,
        }
      },
      {
        breakpoint: 576,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          infinite: true,
          autoplaySpeed: 5000,
        }
      }
    ]
  }), []);

  return (
    <>
      <main id="MainContent" className="content-for-layout">
        <Hero />

        <div className='col-lg-12 col-md-12 col-12 box_container'>
          <div className=" col-lg-12 col-md-12 col-12 left_box pt-2 row">
            <SectionSlider
              title="Mannequins"
              route="/mannequins"
              items={groupedResults}
              settings={settings2}
              apiUrl={apiUrl}
              getPathForResolution={getPathForResolution}
              urlPrefix="mannequins/"
            />
            <SectionSlider
              title="Hotesses"
              route="/hotesses"
              items={groupedResults_b}
              settings={settings2}
              apiUrl={apiUrl}
              getPathForResolution={getPathForResolution}
              urlPrefix="single_viewH/3/"
            />
            <SectionSlider
              title="Influenceurs"
              route="/vlogueuses"
              items={groupedResults_c}
              settings={settings2}
              apiUrl={apiUrl}
              getPathForResolution={getPathForResolution}
              urlPrefix="singleViewI/2/"
            />
          </div>
        </div>

        <div className="section_box">
          <div className="center_title fs_gh mt-1 mb-2 white_title">
            Nos offres
          </div>
          <ServiceButtons />
        </div>
      </main>
    </>
  );
}

export default MainContent;

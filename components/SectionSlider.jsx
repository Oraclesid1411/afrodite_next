import React from 'react';
import Slider from 'react-slick';
import Link from 'next/link';

const SectionSlider = ({ title, route, items, settings, urlPrefix = '', apiUrl, getPathForResolution }) => {
  return (
    <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">
      <div className="content data_containerbox">
        <div className="center_title fs_mh mb-1">
          <Link href={route} className="custom_title">
            {title}
          </Link>
        </div>
        <div className="slider text-center">
          <Slider {...settings}>
            {items.map((item) => (
              <div key={item?.model_id} className="product-card listing">
                <div className="product-card-img">
                  <a className="hover-switch" href={`${urlPrefix}${item?.model_id}`}>
                    <img
                      loading="lazy"
                      src={`${apiUrl}/${getPathForResolution(item.paths)}`}
                      alt={title}
                      className="img-fluid thumbnail"
                    />
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SectionSlider);

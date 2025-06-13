// CarouselBox.jsx
import Slider from "react-slick";
import { Link } from "react-router-dom";

const CarouselBox = ({ title, path, results, linkPrefix, settings, apiUrl, getPathForResolution }) => {
  return (
    <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">
      <div className="content data_containerbox">
        <div className="center_title fs_mh mb-1">
          <Link className='custom_title' to={path}>{title}</Link>
        </div>
        <div className="slider text-center">
          <Slider {...settings}>
            {results.map((item) => (
              <div key={item?.model_id} className="product-card listing">
                <div className="product-card-img">
                  <a className="hover-switch" href={`${linkPrefix}/${item?.model_id}`}>
                    <img
                      src={`${apiUrl}/${getPathForResolution(item.paths)}`}
                      alt={title}
                      className="img-fluid thumbnail"
                      loading="lazy"
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

export default CarouselBox;

// components/ServiceButtons.jsx
import React from 'react';
import Link from 'next/link';

const ServiceButtons = () => {
  return (
    <div className="services_listing">
      <div className="row px-2">
        <div className="col-4 item">
        <button className="custom-dropdown-link">
        
          <Link
            href={{
              pathname: "/postuler",
              query: { demande: "devenir afrodite" },
            }}
            className="custom_title"
          >
            {/* <div className="custom_title"> */}
              Devenez<br />une<br />Afrodite
            {/* </div> */}
          </Link>
          </button>
        </div>

        <div className="col-4 item">
        <button className="custom-dropdown-link">
      
          <Link
            href={{
              pathname: "/creercomptebusiness",
              query: { demande: "engager une afrodite" },
            }}
            className="custom_title"
          >
            {/* <div className="custom_title"> */}
              Mettez de<br />l'Afrodites dans<br />votre Com.
            {/* </div> */}
          </Link>
          </button>
        </div>

        <div className="col-4 item">
        <button className="custom-dropdown-link">
       
          <Link
            href={{
              pathname: "/creerfranchise",
              query: { demande: "creer franchise" },
            }}
            className=" custom_title"
          >
            {/* <div className="custom_title"> */}
              Créez une<br />franchise<br />Afrodite
            {/* </div> */}
          </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ServiceButtons);

// import React from 'react'
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'; 
import Header_banner from "../../Components/Header_banner";
import Footer from "../../Components/Footer";
import {Link} from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

// import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSquareCheck} from '@fortawesome/free-solid-svg-icons';
import Header_menu from "../../Components/Header_menu";
import FixedMenu from "../../Components/FixedMenu";


 const Profile = () => {

    const location = useLocation(); 
  const previousPath = location.state?.previousPath; 
 
  // Use previousPath as needed 
  
 

  
      
    
  return (
    
    <>
       <Header_menu  data_props ={{ 
                            title: 'Profil',
                     }} 
                     data_page = {{type: "comptes" , back_option: "on"}}
    />
         <div className="main_container">
         <section className="container">
              <div className="row data_list">
                    <div className="btn_li"> 
                      <Link to={"/mescomptes"} className="link_a">
                      <a href="">Mes comptes</a>
                      </Link>
                      
                    </div>
                    <div className="btn_li"> 
                    <Link to={"/mespreferences"} className="link_a">
                      <a href="">Mes prréférences</a>
                      </Link>
                       
                    </div>
                    <div className="btn_li"> 
                    <Link to={"/user_dashboard"} className="link_a">
                      <a href="">Dashboard</a>
                      </Link>
                       
                    </div>
                    <div className="btn_li"> 
                    <Link to={"/notifications"} className="link_a">
                      <a href="">Notifications</a>
                      </Link>
                        
                    </div>
                    <div className="btn_li"> 
                    <Link to={"/aides"} className="link_a">
                      <a href="">Aides</a>
                      </Link>
                       
                    </div>

            </div>

            
        </section>
        </div>
        {/* <Footer /> */}
        <FixedMenu />
    </>
  )
}

export default Profile
// import React from 'react'

import {useEffect, useState } from "react";
import Header_banner from "./Header_banner.jsx";
import Footer from "./Footer";
import {Link} from "react-router-dom";

import { useAuth } from "../Context/AuthenticateContext.jsx";
// import $ from 'jquery';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { useLocation  } from 'react-router-dom'; 
import  Back_btn  from "./Back_btn.jsx";

function User_dash() {
    const auth = useAuth();
    const user_info = auth.currentUser

    console.log(user_info)

  return (
    <>
      <div className="body-wrapper">
           <Header_banner  data_props ={{ 
                            title: 'Tableau de bord',
                     }} 
                     data_page = {{type: "comptes" , back_option: "on"}}
           />

         <main id="MainContent" className="content-for-layout">
              <div className="container">
              <div className="app-main__outer">
                <div className="app-main__inner">
                    
                    <div className="row">
                        <div className="col-md-6 col-xl-4">
                            <div className="mb-3 card widget-content bg-midnight-bloom">
                                <div className="text-white widget-content-wrapper">
                                    <div className="widget-content-left">
                                        <div className="widget-heading">Mes Navigations</div>
                                        <div className="widget-subheading">
                                        <Link to='/historique_nav'><a href="" className="text_14 d-block text-white">  consulter l'historique</a></Link>
                       
                                          
                                          
                                        </div>
                                    </div>
                                    <div className="widget-content-right">
                                        <div className="text-white widget-numbers resume_text">Total pages consultées <span> 156 </span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-xl-none d-lg-block col-md-6 col-xl-4">
                            <div className="mb-3 card widget-content bg-premium-dark">
                                <div className="text-white widget-content-wrapper">
                                    <div className="widget-content-left">
                                        <div className="widget-heading">Mes Recherches</div>
                                        <div className="widget-subheading"> 
                                        <Link to='/historique_rech'><a href="" className="text_14 d-block text-white">  consulter l'historique</a></Link>
                       
                                           
                                        </div>
                                    </div>
                                    <div className="widget-content-right">
                                        <div className="text-white widget-numbers resume_text">Total recherches <span> 95</span> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                                                         <div className="col-md-6 col-xl-4">
                                    <div className="mb-3 card widget-content bg-midnight-bloom">
                                        <div className="text-white widget-content-wrapper">
                                            <div className="widget-content-left">
                                                <div className="widget-heading">Mes Achats</div>
                                                <div className="widget-subheading"> 
                                                <Link to='/'><a href="" className="text_14 d-block text-white">  voir plus</a></Link>
                       

                                                </div>
                                            </div>
                                            <div className="widget-content-right">
                                                <div className="text-white widget-numbers resume_text">Total achats<span> 19</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                                              
                                              
                            <div className="d-xl-none d-lg-block col-md-6 col-xl-4">
                                <div className="mb-3 card widget-content bg-premium-dark">
                                    <div className="text-white widget-content-wrapper">
                                            <div className="widget-content-left">
                                                <div className="widget-heading">Mon catalogue</div>
                                                <div className="widget-subheading">
                                                <Link to='/catalogues'><a href="" className="text_14 d-block text-white"> voir plus</a></Link>
                        
                                                 </div>
                                            </div>
                                            <div className="widget-content-right">
                                                <div className="text-white widget-numbers resume_text">Total publications <span> 50</span></div>
                                            </div>
                                </div>
                            </div>
                            </div>
                                                
                                                    <div className="col-md-6 col-xl-4">
                                <div className="mb-3 card widget-content bg-midnight-bloom">
                                <div className="text-white widget-content-wrapper">
                                    <div className="widget-content-left">
                                        <div className="widget-heading">Ma showroom</div>
                                        <div className="widget-subheading">
                                            <a href="#" className="go_to_page">voir plus </a>

                                        </div>
                                    </div>
                                    <div className="widget-content-right">
                                        <div className="widget-numbers text-white resume_text">Total publications <span> 22</span> </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        
                                                    <div className="d-xl-none d-lg-block col-md-6 col-xl-4">
                                <div className="mb-3 card widget-content bg-premium-dark">
                                    <div className="text-white widget-content-wrapper">
                                        <div className="widget-content-left">
                                            <div className="widget-heading">Mes Courses</div>
                                            <div className="widget-subheading">
                                                <a href="#" className="go_to_page">voir plus </a>
                                            </div>
                                        </div>
                                        <div className="widget-content-right">
                                            <div className="text-white widget-numbers resume_text">Total courses <span> 36</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                               <div className="col-md-6 col-xl-4">
                                <div className="mb-3 card widget-content bg-midnight-bloom">
                                    <div className="text-white widget-content-wrapper">
                                        <div className="widget-content-left">
                                            <div className="widget-heading">Mes dépôts</div>
                                            <div className="widget-subheading">
                                                <a href="#" className="go_to_page">voir plus </a>
                                            </div>
                                        </div>
                                        <div className="widget-content-right">
                                            <div className="widget-numbers resume_text">Total transactions <span> 186</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                             
                                           </div>
                   
                    
                   
                   
                </div>
                <div className="app-wrapper-footer">
                    <div className="app-footer">
                        <div className="app-footer__inner">
                            <div className="app-footer-left">
                                
                            </div>
                            <div className="app-footer-right">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             </div>
            
        </main>
        <Footer />

     </div>

    </>
  )

}

export default User_dash
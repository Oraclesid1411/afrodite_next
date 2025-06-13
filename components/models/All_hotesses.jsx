'use client';

import React from 'react'
import  { useEffect, useState  } from 'react'

import axios from "axios";
// import { useLocation } from 'react-router-dom';

import { useParams } from "next/navigation";
// import Slider from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import MannequinNavigation from '../../Components/MannequinNavigator';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function All_models() {

    const params = useParams();
    console.log("params")
    console.log(params)
    const id_model = params?.id?.[0]; // null si /mannequins, une valeur si /mannequins/123
  
    const [hosts_models , sethosts_models] = useState([]);
    
    
    const apiUrl = 'https://apiafro.aafrodites.com'
    // const apiUrl = 'http://localhost:5000'


      useEffect(() => {
        const fetchData = async () => {
         
          try {
                           
            

               const rep1 = await axios.get(`${apiUrl}/host_model/all`);
           
           sethosts_models(rep1.data);
          
           
          } catch (err) {
            console.log(err);
          
          }
        };
        fetchData();
      } , []);

      console.log(hosts_models)

  return (
    <>  
                <div className="container tab_list_box">
                    <div className="tab-list product-tab-list sticky_nav">
                        <nav className="nav product-tab-nav">
                            <a className="product-tab-link tab-link active" href="#All" data-bs-toggle="tab">Tous</a>
                            {/* <a className="product-tab-link tab-link" href="#top" data-bs-toggle="tab">podium</a>
                            <a className="product-tab-link tab-link " href="#new" data-bs-toggle="tab">détails</a> */}
                            {/* <a className="product-tab-link tab-link " href="#pstyle" data-bs-toggle="tab">nouveaux</a> */}
                      </nav>
                    </div>


                    <div className="tab-content product-tab-content col-12">
                        <div id="All" className="tab-pane fade active show">
                        <div className="row">
                               
                               <div className="col-lg-12 col-md-12 col-12">
                                     <div className='bg-white mannequins-section'>

                                       <div className="content">
                                         
                                            
                                               
                                               <div className="row">

                                                    {hosts_models.map((item) => (
                                                        <>
                                                            <div key={item?.idhotesse} className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                            <div className="product-card">
                                                                <div className="product-card-img">
                                                                    <a className="hover-switch" href={`single_viewH/3/${item?.idhotesse}`}>
                                                                      <img src={`${apiUrl}/${item?.path_image}`} loading="lazy" alt="mannequin" className='img'/>
                                                                       
                                                                    </a>  
                                                                  

                                                                   
                                                                  
                                                                </div>
                                                               
                                                            </div>
                                                            <a className="text-dark hover-switch" href={`single_viewH/3/${item?.idhotesse}`}>
                                                                    <label className=''> {item?.pseudo}</label>
                                                                    
                                                                    </a>  
                                                            </div>

                                                        </>
                                                    ))}
 
                                                  

                                               </div>
                                                   

                                                   
                                               {/* </Slider> */}
                                          
                                       </div>
                                   
                                       <div className="plusMannequin">
                                           {/* voir plus */}
                                           <a href="/mannequins">
                                           <img src="/assets/models/add.png" loading="lazy" alt=""/>
                                           </a>
                                       
                                       </div>
                                       
                                   </div>
                               </div>
                           </div>
                        </div>
                        <div id="top" className="tab-pane fade">
                        <div className="row">
                               
                                <div className="col-lg-12 col-md-12 col-12">
                                      <div className='bg-white mannequins-section'>

                                        <div className="content">
                                          
                                             
                                                {/* <Slider {...settings}> */}
                                                <div className="row">
                                                <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                    <div className="product-card listing">
                                                        <div className="product-card-img">
                                                            <a className="hover-switch" href="/single_view/1/1">
                                                            <img src="/assets/models/grace.JPG" alt="mannequin" className='img'/>
                                                                
                                                                
                                                            </a>

                                                        
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                                <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                            <div className="product-card">
                                                                <div className="product-card-img">
                                                                    <a className="hover-switch" href="/single_view/1/2">
                                                                    <img src="/assets/models/chi/chi1.webp" alt="mannequin" className='img'/>
                                                                        
                                                                        
                                                                    </a>

                                                                
                                                                </div>

                                                            </div>
                                                            </div>
                                                            <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                            <div className="product-card">
                                                                <div className="product-card-img">
                                                                <a className="hover-switch" href="/single_view/1/3">
                                                                <img src="/assets/models/damilola/1.png" alt="mannequin" className='img'/>
                                                                        
                                                                        
                                                                    </a>

                                                                
                                                                </div>

                                                            </div>
                                                            </div>
                                                  
                                                  
                                                  
                                                  

                                               
                                                <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                    <div className="product-card">
                                                        <div className="product-card-img">
                                                        <a className="hover-switch" href="/single_view/1/4">
                                                        <img src="/assets/models/diepiriye/2.jpg" alt="mannequin" className='img'/>
                                                                
                                                                
                                                            </a>

                                                        
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                                <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                            <div className="product-card">
                                                                <div className="product-card-img">
                                                                <a className="hover-switch" href="/single_view/1/5">
                                                                <img src="/assets/models/jessie/1.jpg" alt="mannequin" className='img'/>
                                                                        
                                                                        
                                                                    </a>

                                                                
                                                                </div>

                                                            </div>
                                                            </div>
                                                            <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                            <div className="product-card">
                                                                <div className="product-card-img">
                                                                <a className="hover-switch" href="/single_view/1/6">
                                                                <img src="/assets/models/grace3.jpeg" alt="mannequin"  className='img'/>
                                                                        
                                                                        
                                                                    </a>

                                                                
                                                                </div>

                                                            </div>
                                                            </div>
                                                  
                                                  
                                                  
                                                  

                                               
                                                <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                    <div className="product-card">
                                                        <div className="product-card-img">
                                                        <a className="hover-switch" href="/single_view/1/7">
                                                        <img src="/assets/models/munachimso/1.webp" alt="mannequin"  className='img'/>
                                                                
                                                                
                                                            </a>

                                                        
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                                <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                            <div className="product-card">
                                                                <div className="product-card-img">
                                                                    <a className="hover-switch" href="/single_view/1/10">
                                                                    <img src="/assets/models/real/real1.webp" alt="mannequin"  className='img'/>
                                                                        
                                                                        
                                                                    </a>

                                                                
                                                                </div>

                                                            </div>
                                                            </div>
                                                            <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                            <div className="product-card">
                                                                <div className="product-card-img">
                                                                    <a className="hover-switch" href="/single_view/1/11">
                                                                    <img src="/assets/models/tolulope/1.webp" alt="mannequin"  className='img'/>
                                                                        
                                                                        
                                                                    </a>

                                                                
                                                                </div>

                                                            </div>
                                                            </div>
                                                  
                                                  
                                                  
                                                  

                                               
                                                <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                    <div className="product-card">
                                                        <div className="product-card-img">
                                                            <a className="hover-switch" href="/single_view/1/12">
                                                            <img src="/assets/models/refilwe/1.jpg" alt="mannequin"  className='img'/>
                                                                
                                                                
                                                            </a>

                                                        
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                                <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                            <div className="product-card">
                                                                <div className="product-card-img">
                                                                    <a className="hover-switch" href="/single_view/1/13">
                                                                    <img src="/assets/models/grace2.JPG" alt="mannequin" className='img'/>
                                                                        
                                                                        
                                                                    </a>

                                                                
                                                                </div>

                                                            </div>
                                                            </div>
                                                            <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                            <div className="product-card">
                                                                <div className="product-card-img">
                                                                    <a className="hover-switch" href="/single_view/1/14">
                                                                    <img src="/assets/models/grace3.jpeg" alt="mannequin" className='img'/>
                                                                        
                                                                        
                                                                    </a>

                                                                
                                                                </div>

                                                            </div>
                                                            </div>
                                                  
                                                  
                                                  
                                                  

                                                </div>
                                                    

                                                    
                                                {/* </Slider> */}
                                           
                                        </div>
                                    
                                        <div className="plusMannequin">
                                            {/* voir plus */}
                                            <a href="/mannequins">
                                            <img src="/assets/models/add.png" alt=""/>
                                            </a>
                                        
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="new" className="tab-pane fade ">
                        <div className="row">
                               
                               <div className="col-lg-12 col-md-12 col-12">
                                     <div className='bg-white mannequins-section'>

                                       <div className="content">
                                         
                                            
                                               {/* <Slider {...settings}> */}
                                               <div className="row">
                                               <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                   <div className="product-card">
                                                       <div className="product-card-img">
                                                           <a className="hover-switch" href="/single_view/1/1">
                                                           <img src="/assets/models/grace.JPG" alt="mannequin" className='img'/>
                                                               
                                                               
                                                           </a>

                                                       
                                                       </div>
                                                   
                                                   </div>
                                               </div>
                                               <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                           <div className="product-card">
                                                               <div className="product-card-img">
                                                                   <a className="hover-switch" href="/single_view/1/2">
                                                                   <img src="/assets/models/chi/chi1.webp" alt="mannequin" className='img'/>
                                                                       
                                                                       
                                                                   </a>

                                                               
                                                               </div>

                                                           </div>
                                                           </div>
                                                           <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                           <div className="product-card">
                                                               <div className="product-card-img">
                                                               <a className="hover-switch" href="/single_view/1/3">
                                                               <img src="/assets/models/damilola/1.png" alt="mannequin" className='img'/>
                                                                       
                                                                       
                                                                   </a>

                                                               
                                                               </div>

                                                           </div>
                                                           </div>
                                                 
                                                 
                                                 
                                                 

                                              
                                               <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                   <div className="product-card">
                                                       <div className="product-card-img">
                                                       <a className="hover-switch" href="/single_view/1/4">
                                                       <img src="/assets/models/diepiriye/2.jpg" alt="mannequin" className='img'/>
                                                               
                                                               
                                                           </a>

                                                       
                                                       </div>
                                                   
                                                   </div>
                                               </div>
                                               <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                           <div className="product-card">
                                                               <div className="product-card-img">
                                                               <a className="hover-switch" href="/single_view/1/5">
                                                               <img src="/assets/models/jessie/1.jpg" alt="mannequin" className='img'/>
                                                                       
                                                                       
                                                                   </a>

                                                               
                                                               </div>

                                                           </div>
                                                           </div>
                                                           <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                           <div className="product-card">
                                                               <div className="product-card-img">
                                                               <a className="hover-switch" href="/single_view/1/6">
                                                               <img src="/assets/models/grace3.jpeg" alt="mannequin"  className='img'/>
                                                                       
                                                                       
                                                                   </a>

                                                               
                                                               </div>

                                                           </div>
                                                           </div>
                                                 
                                                 
                                                 
                                                 

                                              
                                               <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                   <div className="product-card">
                                                       <div className="product-card-img">
                                                       <a className="hover-switch" href="/single_view/1/7">
                                                       <img src="/assets/models/munachimso/1.webp" alt="mannequin"  className='img'/>
                                                               
                                                               
                                                           </a>

                                                       
                                                       </div>
                                                   
                                                   </div>
                                               </div>
                                               <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                           <div className="product-card">
                                                               <div className="product-card-img">
                                                                   <a className="hover-switch" href="/single_view/1/10">
                                                                   <img src="/assets/models/real/real1.webp" alt="mannequin"  className='img'/>
                                                                       
                                                                       
                                                                   </a>

                                                               
                                                               </div>

                                                           </div>
                                                           </div>
                                                           <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                           <div className="product-card">
                                                               <div className="product-card-img">
                                                                   <a className="hover-switch" href="/single_view/1/11">
                                                                   <img src="/assets/models/tolulope/1.webp" alt="mannequin"  className='img'/>
                                                                       
                                                                       
                                                                   </a>

                                                               
                                                               </div>

                                                           </div>
                                                           </div>
                                                 
                                                 
                                                 
                                                 

                                              
                                               <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                   <div className="product-card">
                                                       <div className="product-card-img">
                                                           <a className="hover-switch" href="/single_view/1/12">
                                                           <img src="/assets/models/refilwe/1.jpg" alt="mannequin"  className='img'/>
                                                               
                                                               
                                                           </a>

                                                       
                                                       </div>
                                                   
                                                   </div>
                                               </div>
                                               <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                           <div className="product-card">
                                                               <div className="product-card-img">
                                                                   <a className="hover-switch" href="/single_view/1/13">
                                                                   <img src="/assets/models/grace2.JPG" alt="mannequin" className='img'/>
                                                                       
                                                                       
                                                                   </a>

                                                               
                                                               </div>

                                                           </div>
                                                           </div>
                                                           <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                           <div className="product-card">
                                                               <div className="product-card-img">
                                                                   <a className="hover-switch" href="/single_view/1/14">
                                                                   <img src="/assets/models/grace3.jpeg" alt="mannequin" className='img'/>
                                                                       
                                                                       
                                                                   </a>

                                                               
                                                               </div>

                                                           </div>
                                                           </div>
                                                 
                                                 
                                                 
                                                 

                                               </div>
                                                   

                                                   
                                               {/* </Slider> */}
                                          
                                       </div>
                                   
                                       <div className="plusMannequin">
                                           {/* voir plus */}
                                           <a href="/mannequins">
                                           <img src="/assets/models/add.png" alt=""/>
                                           </a>
                                       
                                       </div>
                                       
                                   </div>
                               </div>
                           </div>
                        </div>
                       
                    </div>
                </div>
    </>
  )
}

export default All_models
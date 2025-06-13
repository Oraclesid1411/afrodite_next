'use client';

import React, {useState, useEffect} from 'react'

import { useParams } from "next/navigation";
// import Slider from "react-slick";

import axios from "axios";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


function All_Influenceurs() {

  const params = useParams();
  console.log("params")
  console.log(params)
  const id_model = params?.id?.[0]; // null si /mannequins, une valeur si /mannequins/123

    const [role_models , setrole_models] = useState([]);
    
    
    const apiUrl = 'https://apiafro.aafrodites.com'
  //  const apiUrl = 'http://localhost:5000'



      useEffect(() => {
      console.log('use effect')
        const fetchData = async () => {
         
          try {
           
            console.log('request send')
                   
            

               const rep1 = await axios.get(`${apiUrl}/role_model/all`);
           
           console.log(rep1)
           setrole_models(rep1.data);
          
           
          } catch (err) {
            console.log(err);
          
          }
        };
        fetchData();
      } , []);

      console.log(role_models)
 

  return (
    <>



                <div className="container tab_list_box mb-3">


                    
                    <div className="tab-content product-tab-content col-12">
                    <div id="influencer" className="tab-pane fade active show">
                        <div className="row">
                               
                               <div className="col-lg-12 col-md-12 col-12">
                                     <div className='bg-white'>

                                       <div className="content">
                                         
                                            
                                               {/* <Slider {...settings}> */}
                                               <div className="row">
                               
                               <div className="col-lg-12 col-md-12 col-12">
                                     <div className='bg-white mannequins-section'>

                                       <div className="content">
                                         
                                            
                                               {/* <Slider {...settings}> */}
                                               <div className="row">
                                               {role_models.map((item) => (
                                                        <>
                                                            <div key={item?.idinfluenceur} className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                   <div className="product-card listing">
                                                       <div className="product-card-img">
                                                       <a className="hover-switch" href={`singleViewI/2/${item?.idinfluenceur}`}>
                                                                      <img src={`${apiUrl}/${item?.path_image}`} alt="influenceur" className='img'/>


                                                                    </a>          


                                                       </div>
                                                       <a className="text-dark hover-switch" href={`singleViewI/2/${item?.idinfluenceur}`}>
                                                                    <label className=''> {item?.pseudo}</label>
                                                                                                                                      
                                                                    </a>  

                                                   
                                                   </div>

                                                 
                                               </div>

                                               </>
                                                    ))}
 
                       
                                               </div>
                                                   

                                                   
                                               {/* </Slider> */}
                                          
                                       </div>
                                   
                                     
                                   </div>
                               </div>
                           </div>
                                                   

                                                   
                                               {/* </Slider> */}
                                          
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

export default All_Influenceurs;
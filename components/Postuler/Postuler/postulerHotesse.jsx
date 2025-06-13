import React from 'react'
// import React from 'react'
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react"; 
import Header_banner from '../Components/Header_banner';  

import { useAuth } from "../Context/AuthenticateContext.jsx";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function PostulerHotesse() {

    const location = useLocation(); 
    const previousPath = location.state?.previousPath; 

    
  const auth_fct = useAuth();
  
  const navigate = useNavigate()


  const apiUrl = 'http://localhost:5000'

  
  // const apiUrl = 'https://fsapi.fashionecos.com'
  


  const [Mvalues, setMValues] = useState({
    pseudoM : '',
    nomM : '',
    prenomM : '',
    descriptionM : ''
  })



  const [errors, setErrors] = useState({})

  const handleMannequinInput = (e) => {
    setMValues({ ...Mvalues, [e.target.name]: e.target.value });
  }


  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  const [fashionModel, setfashionModel] = useState(null);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
   
    if(checked === true){
      const split_name = name.split("_");
      setfashionModel(split_name[1]);
    }
    else{
      setfashionModel(null);
    }
   
  };
  const handleMultiCheckboxChange = (event) => {
    const { name, checked } = event.target;

    console.log(event.target)
    console.log(checked)
    // const split_name = name.split("_");
    if(checked === true){
      setCheckedItems((prevCheckedItems) => ({
        ...prevCheckedItems,
        [name]: checked,
      }));
    }
    else{
      setCheckedItems((prevCheckedItems) => ({
        ...prevCheckedItems,
        // [name]: checked,
      }));

    }
   


    console.log(name)
  };
 
    

  return (
    <>
                 <Header_banner  data_props ={{ 
                            title: 'Postuler',
                     }} 
                     data_page = {{type: "comptes" , back_option: "on"}}
    />
    <div className="main_container">
         <div className="form_zone">
         <ToastContainer className="toast_style"/>
        <div className="login-page">
          <div className="container">
            <form
              onSubmit={handleSubmit}
              className="login-form common-form mx-auto"
            >
                 <div className="row">
                      <div style={{ border: '1px solid #ccc', marginBottom: '10px' }}>
                       
                              <div className="section-header ">
                                <div className="text-center">
                                    <h2 className="text-center">Dévenir Host Modele</h2>
                                </div>
                              </div>
                       
                       
                     
                          <div>
                          <div className="col-12">
                            <fieldset>
                              <label className="label">Votre Pseudo</label>
                              <input
                                type="text"
                                name="pseudoM"
                                value={Mvalues.pseudoM}
                                autoComplete="off"
                                placeholder="votre pseudo"
                                onChange={handleMannequinInput}

                                className="form-control form-control-lg"
                              />
                            </fieldset>
                          </div>
                          <div className="col-12">
                          <fieldset>
                              <label className="label">Nom</label>
                              <input
                                type="text"
                                name="nomM"
                                value={Mvalues.nomM}
                                autoComplete="off"
                                placeholder=""
                                onChange={handleMannequinInput}
                                className="form-control form-control-lg"
                              />

                            </fieldset>
                          </div>
                        
                          <div className="col-12">
                          <fieldset>
                              <label className="label">Votre prénom</label>
                              <input
                                type="text"
                                name="prenomM"
                                value={Mvalues.prenomM}
                                autoComplete="off"
                                placeholder=""
                                onChange={handleMannequinInput}

                                className="form-control form-control-lg"
                              />
                            </fieldset>
                          </div>

                          <div className="col-12 mb-3">
                          <fieldset>
                              <label className="label">Description</label>
                              <textarea
                                name="descriptionM"
                                value={Mvalues.descriptionM}
                                autoComplete="off"
                                placeholder=""
                                onChange={handleMannequinInput}

                                className="form-control form-control-lg"
                              />
                            </fieldset>
                          </div>

                          </div>
                        
                      </div>
               
              </div>
              <hr className="cst_hr"/>
              <div className="row">
                 {/* <EcosMoneyCompo /> */}
                 <div className="container mt-3">
       
                    <div className="row">
                      <div style={{ border: '1px solid #ccc', marginBottom: '10px' }}>
                        
                          <div className="section-header">
                          <h6 className="mt-3 text-center">Dévenir aussi Fashion</h6>
                        </div>
                        
                        
                          <div style={{ padding: '10px' }}>
                            <div className="flex_center">
                            <div className="fit_content">
                                <div className="React__checkbox">
                                  <label>                              
                                    <span className="React__checkbox--span" /> Postuler maintenant
                                  </label>
                                  <input 
                                          type="checkbox" 
                                          className="React__checkbox--input"
                                           name="activer_now" 
                                           checked={fashionModel === "now" || false}
                                          onChange={handleCheckboxChange}
                                    />
                                </div>
                              </div>
                             

                            </div>

                                    {fashionModel === "now" 
                                    
                                    
                                    ?
                                    <div className="row activate_em">

                                    <div className="col-12">
                                      <span className="text-danger text-center">
                                        Vous allez aussi postuler pour dévenir Mannequin
                                      </span>
                                    </div>
                                  </div>
                                     
                                                            
                                     : null
                                     
                                     
                                     
                                     
                                     }
                          </div>
                        
                      </div>
                    
                    
                    </div>  
                </div>
              </div>
              
               
             
               {/* submit button */}
              <div className="row">
              <div className="col-12 mt-3">
                  <button
                    type="submit"
                    className="btn-primary d-block mt-4 btn-signin"
                  >
                    Postuler
                  </button>

                  <hr />
                  <Link to='/'  className="text_14 d-block"> Retourner à l'accueil</Link>
                           
                  
                </div>
              </div>

              
             
              </form>
          </div>
        </div>
        </div>
        </div>
    
    </>
  )
}

export default PostulerHotesse
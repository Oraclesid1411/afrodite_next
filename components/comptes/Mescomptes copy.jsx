// import React from 'react'
import  { useEffect, useState} from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Header_banner from '../../Components/Header_banner';
import axios from 'axios'
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../Context/AuthenticateContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import {
   
  Link
} from "react-router-dom";

import Footer from '../../Components/Footer';
function Mescomptes() {

  
  const apiUrl = 'https://fsapi.fashionecos.com'
  const auth = useAuth();
  const navigate = useNavigate()
  const user_info = auth.currentUser
  // console.log(user_info)

  if(user_info === null){
    navigate("/login");
}
    
  const [user_data , setUserdata] = useState(true);
  const [user_data_upd , setUserdataUpdate] = useState(false);

  const [acheteur_data , setAcheteurdata ] = useState(false);
  const [acheteur_data_upd , setAcheteurdataUpdate ] = useState(false);

  const [vendeur_data , setVendeurdata ] = useState(false);
  const [vendeur_data_upd , setVendeurdataUpdate ] = useState(false);

  const [artisan_data , setArtisandata ] = useState(false);
  const [artisan_data_upd , setArtisandataUpdate ] = useState(false);

  const [admindep_data , setAdmindepotdata] = useState(false);
  const [admindep_data_upd , setAdmindepotdataUpdate] = useState(false);

  const [livreur_data , setLivreur ] = useState(false);
  const [livreur_data_upd , setLivreurUpdate ] = useState(false);

  // show data

  const setData = () => {
    setUserdata(!user_data);
  };
  
  const setData_acheteur = () => {
    setAcheteurdata(!acheteur_data);
  };
  
  const setData_vendeur = () => {
    setVendeurdata(!vendeur_data);
  };
  
  const setData_artisan = () => {
    setArtisandata(!artisan_data);
  };
  
  const setData_admindepot = () => {
    setAdmindepotdata(!admindep_data);
  };
  
  const setData_livreur = () => {
    setLivreur(!livreur_data);
  };

  // show  update field
  const setDataupd = () => {

console.log('update')
    setUserdataUpdate(!user_data_upd);
  };
  
  const setData_acheteurupd = () => {
    setAcheteurdataUpdate(!acheteur_data_upd);
  };
  
  const setData_vendeurupd = () => {
    setVendeurdataUpdate(!vendeur_data_upd);
  };
  
  const setData_artisanupd = () => {
    setArtisandataUpdate(!artisan_data_upd);
  };
  
  const setData_admindepotupd = () => {
    setAdmindepotdataUpdate(!admindep_data_upd);
  };
  
  const setData_livreurupd = () => {
    setLivreurUpdate(!livreur_data_upd);
  };


  // console.log('user_data_upd')
  // console.log(user_data_upd)

  // formulaire data
  
  const [phone, setPhone] = useState("");
  
  const [values, setValues] = useState({
    pseudo: "",
    password: "",
    // nom_oc: "",
    // prenom_oc: "",
    // pseudo_oc: "",
    // num_cdi: "", 
    // nom_pro: "",
    // prenom_pro: "",
    // pseudo_pro: "",
    // num_cdi_pro: "", 
    // indication_pro: "",  
    // nom_art: "",
    // prenom_art: "",
    // pseudo_art: "",
    // num_cdi_art: "", 
    // nom_admindepot: "",
    // prenom_admindepot: "",
    // pseudo_admindepot: "",
    // num_cdi_admindepot: "", 
    // nom_livreur: "",
    // prenom_livreur: "",
    // pseudo_livreur: "",
    // num_cdi_livreur: "",
    // indication_art: "",
    // indication_admindepo: "",
    // indication_livreur: "",
   
  });

  // set user default data
 

  const userid = user_info?.id;

  
  useEffect(() => {
      
    const fetchData = async () => {
      if(user_info?.id != undefined){
        set_default_values();
      }
    
    };
    fetchData();
  });

  const set_default_values = () => {
   // phone number
    const user_number = user_info?.telnumber;
    let user_indicatif = user_info?.indicatif;
    
  
    var code_type = user_indicatif.startsWith("+")
    if(code_type === false){
      user_indicatif = "+" + user_indicatif;
    }
  
      console.log('split_indicatif')
      console.log(user_indicatif)
      console.log("split_indicatif")
  
    const user_fullnumber = user_indicatif + "" + user_number
    // setPhone(user_fullnumber)
    console.log("box")
    console.log(document.querySelector('input[type="tel"][name="user_tel"]'))
  
    // pseudo
    setValues({ ...values, pseudo: user_info?.name })

    setValues({ ...values, password: "" })
    
  };

  // les infos des comptes
  
  const [info_acheteur , setinfo_acheteur] = useState([]);
  const [info_vendeur , setinfo_vendeur] =  useState([]);
  const [info_artisan , setinfo_artisan] =  useState([]);
  const [info_admindepot , setinfo_admindepot] =  useState([]);
  const [info_livreur , setinfo_livreur] =  useState([]);
  const [info_em , setinfo_em] =  useState([]);
  


  useEffect(() => {
      
    const fetchData = async () => {
     
      try {
                axios.defaults.withCredentials = true;
                const params = {
                
                  userid : userid 
              }
             
               const data_a = await axios.post(`${apiUrl}/auth/getAcheteur` , params);
               setinfo_acheteur(data_a.data[0]);

               const data_b = await axios.post(`${apiUrl}/auth/getVendeur` , params);
               setinfo_vendeur(data_b.data[0]);

                 const data_c = await axios.post(`${apiUrl}/auth/getArtisan` , params);
               setinfo_artisan(data_c.data[0]);

                 const data_d = await axios.post(`${apiUrl}/auth/getAdmindepot` , params);
               setinfo_admindepot(data_d.data[0]);
              //  console.log(data_d)

              const data_e = await axios.post(`${apiUrl}/auth/getLivreur` , params);
               setinfo_livreur(data_e.data[0]);
              //  console.log(data_e)

               const data_f = await axios.post(`${apiUrl}/auth/getEm` , params);
               setinfo_em(data_f.data[0]);

              

       
      } catch (err) {
        // console.log(err);
        // console.log('erreur here')
      }
    };
    fetchData();
  });


  // console.log("info_acheteur")

  
  // console.log(info_acheteur)
  // console.log(info_vendeur)
  // console.log(info_artisan)
  // console.log(info_admindepot)
  // console.log(info_livreur)
  // console.log(info_em)
  
  // console.log("info_acheteur")

  // submit des formulaires
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target)
    console.log(values)
    console.log(phone)
    var form_type = e.target.dataset.form;
    console.log(form_type)

    return false;
  };


  return (
    <>
    <Header_banner  data_props ={{ 
                            title: 'Mes comptes',
                          }} 
    />
     <div className="body-wrapper">
     <main id="MainContent" className="content-for-layout">

            <div className="container tab_zone">
              <Tabs defaultActiveKey="comptes" id="justify-tab-example"className="mb-3" justify>
              <Tab eventKey="comptes" title="paramètres des comptes">
              {/* <hr className="cst_hr"/> */}
                <div className="faq-container">
                        <div className="row">
                          {/* compte utilisateur */}
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="faq-item rounded">
                                                <h2 className="faq-heading heading_18 d-flex align-items-center justify-content-between collapsed" 
                                              onClick={setData}
                                                data-bs-toggle="collapse" data-bs-target="#user" aria-expanded="true">
                                                  utilisateur
                                                  
                                                    <span className="faq-heading-icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F76B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-down">
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </span>
                                                </h2>
                                                <form onSubmit={handleSubmit}  data-form ="user">
                                                    {user_data && (

                                                      <>
                                                      {
                                                           user_data_upd 
                                                            ? 
                                                            (

                                                              <>
                                                               <button className='save_btn'>
                                                                                                              sauver
                                                               </button>
                                                                 <button className='cancel_btn' onClick={setDataupd}>
                                                                                                              Annuler
                                                                 </button>

                                                              </>
                                                            )

                                                            :

                                                            ( 
                                                            <button className='edit_btn' onClick={setDataupd}>
                                                              modifier
                                                            </button>
                                                            )
                                                                                                             
                                                      }
                                                      
                                                      </>

                                                    )}
                                                  <div id="user" className="accordion-collapse collapse show">
                                                  <div className="box_data mt-3">
                                                    {
                                                        user_data && (
                                                            <>
                                                              {
                                                                user_data_upd 
                                                                  ? 
                                                                  (
                                                                    <>
                                                                      
                                                  
                                                                          <div className="item_list col-12">
                                                                            <fieldset>
                                                                              <label className="label">Numéro de téléphone</label>
                                                                              <div className='tel_container'>
                                                                              <PhoneInput
                                                                                id="user_tel"
                                                                                defaultCountry="tg"
                                                                                name="user_tel"
                                                                                value={phone}
                                                                                onChange={(phone) => setPhone(phone)}
                                                                              />


                                                                              </div>
                                                                            
                                                                              {/* <input type="number"   name='tel' autoComplete='off' placeholder='votre numéro de téléphone'
                                                                                                onChange={(e) => setValues({...values, tel : e.target.value})} className="form-control form-control-lg" /> */}
                                                                            </fieldset>
                                                                          </div>
                                                                          <div className="item_list col-12">
                                                                            <fieldset>
                                                                              <label className="label">votre pseudo</label>
                                                                              <input
                                                                                type="text"
                                                                                name="pseudo"
                                                                                value={values.pseudo}
                                                                                autoComplete="off"
                                                                                // placeholder="votre pseudo"
                                                                                onChange={(e) =>
                                                                                  setValues({ ...values, pseudo: e.target.value })
                                                                                }
                                                                                className="form-control form-control-lg"
                                                                              />
                                                                            </fieldset>
                                                                          </div>
                                                                        
                                                                          <div className="item_list col-12">
                                                                            <fieldset>
                                                                              <label className="label">mot de passe</label>
                                                                              <input
                                                                                type="password"
                                                                                name="password"
                                                                                value={values.password}
                                                                                autoComplete="off"
                                                                                placeholder=""
                                                                                onChange={(e) =>
                                                                                  setValues({ ...values, password: e.target.value })
                                                                                }
                                                                                className="form-control form-control-lg"
                                                                              />
                                                                            </fieldset>
                                                                          </div>

                                                                      
                                                                      </>

                                                                  )

                                                                :

                                                                  (
                                                                    <>

                                                                      <div className="item_list">
                                                                          <h4 className="subtotal-title">Téléphone</h4>

                                                                          {user_info?.telnumber === null ? 
                                                                            (
                                                                                <p className="subtotal-value"> - </p>
                                                                            )

                                                                            :

                                                                            (
                                                                              <p className="subtotal-value">  {`+${user_info?.indicatif}`} {user_info?.telnumber}</p>

                                                                            )

                                                                        }

                                                                      </div>
                                                                      <div className="item_list">
                                                                          <h4 className="subtotal-title">Pseudo</h4>
                                                                          {user_info?.name === null ? 
                                                                            (
                                                                                <p className="subtotal-value"> - </p>
                                                                            )

                                                                            :

                                                                            (
                                                                              <p className="subtotal-value"> {user_info?.name}</p>

                                                                            )

                                                                        }
                                                                      
                                                                      </div>
                                                                      <div className="item_list">
                                                                          <h4 className="subtotal-title">Mot de passe</h4>
                                                                          {user_info?.password === null ? 
                                                                            (
                                                                                <p className="subtotal-value"> - </p>
                                                                            )

                                                                            :

                                                                            (
                                                                              <p className="subtotal-value">**************</p>

                                                                            )

                                                                        }
                                                                        
                                                                      </div>
                                                              
                                                              </>
                                                                  


                                                                  )

                                                            }
                                                              
                                                          </>
                                                              
                                                        )
                                                      
                                                      }
                                                  
                                                  </div>
                                                  </div>
                                              </form>
                                            </div>
                                        </div>
                          {/*fin compte utilisateur */}

                           {/* compte acheteur */}
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="faq-item rounded">
                                                <h2 className="faq-heading heading_18 collapsed d-flex align-items-center justify-content-between"
                                                  onClick={setData_acheteur} data-bs-toggle="collapse" data-bs-target="#acheteur">
                                                  acheteur
                                                
                                                
                                                    <span className="faq-heading-icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F76B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-down">
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </span>
                                                </h2>
                                                {/* btn action */}
                                                 {acheteur_data && (

                                                  <>
                                                  {
                                                      acheteur_data_upd 
                                                        ? 
                                                        (

                                                          <>
                                                          <button className='save_btn'>
                                                                                                          sauver
                                                          </button>
                                                            <button className='cancel_btn' onClick={setData_acheteurupd}>
                                                                                                          Annuler
                                                            </button>

                                                          </>
                                                        )

                                                        :

                                                        ( 
                                                          <button className='edit_btn'  onClick={setData_acheteurupd}>
                                                            modifier
                                                          </button>
                                                        )
                                                                                                        
                                                  }

                                                  </>
                                                    
                                                  )}

                                                  {/* data */}

                                                <div id="acheteur" className="accordion-collapse collapse">
                                                <div className="box_data mt-3">

                                                  {acheteur_data && (

                                                  <>
                                                  {
                                                      acheteur_data_upd 
                                                        ? 
                                                        (

                                                          <>
                                                           <div style={{ border: '1px solid #ccc', marginBottom: '10px' }}>
                                      
                                                
                                                              <div className="col-12">
                                                                <fieldset>
                                                                  <label className="label">Numéro de téléphone</label>
                                                                  <PhoneInput
                                                                    id="user_tel"
                                                                    defaultCountry="tg"
                                                                    name="user_tel"
                                                                    value={phone}
                                                                    onChange={(phone) => setPhone(phone)}
                                                                  />
                                                                  {/* <input type="number"   name='tel' autoComplete='off' placeholder='votre numéro de téléphone'
                                                                                    onChange={(e) => setValues({...values, tel : e.target.value})} className="form-control form-control-lg" /> */}
                                                                </fieldset>
                                                              </div>
                                                              <div className="col-12">
                                                                <fieldset>
                                                                  <label className="label">votre pseudo</label>
                                                                  <input
                                                                    type="text"
                                                                    name="pseudo"
                                                                    value={values.pseudo}
                                                                    autoComplete="off"
                                                                    placeholder="votre pseudo"
                                                                    onChange={(e) =>
                                                                      setValues({ ...values, pseudo: e.target.value })
                                                                    }
                                                                    className="form-control form-control-lg"
                                                                  />
                                                                </fieldset>
                                                              </div>
                                                            
                                                              <div className="col-12">
                                                                <fieldset>
                                                                  <label className="label">mot de passe</label>
                                                                  <input
                                                                    type="password"
                                                                    name="password"
                                                                    value={values.password}
                                                                    autoComplete="off"
                                                                    placeholder=""
                                                                    onChange={(e) =>
                                                                      setValues({ ...values, password: e.target.value })
                                                                    }
                                                                    className="form-control form-control-lg"
                                                                  />
                                                                </fieldset>
                                                              </div>
                                                              
                                                            
                                                                </div>

                                                          </>
                                                        )

                                                        :

                                                        ( 
                                                          <>
                                                              <div className="item_list">
                                                          <h4 className="subtotal-title">Nom</h4>
                                                          {info_acheteur?.nomachet === null ? 
                                                            (
                                                                <p className="subtotal-value"> - </p>
                                                            )

                                                            :

                                                            (
                                                              <p className="subtotal-value"> {info_acheteur?.nomachet}</p>

                                                            )

                                                        } 
                                                      </div>
                                                      <div className="item_list">
                                                          <h4 className="subtotal-title">Prénom</h4>
                                                          {info_acheteur?.nomachet === null ? 
                                                            (
                                                                <p className="subtotal-value"> - </p>
                                                            )

                                                            :

                                                            (
                                                              <p className="subtotal-value">{info_acheteur?.prenom}</p>

                                                            )

                                                        }
                                                          
                                                      </div>
                                                      <div className="item_list">
                                                          <h4 className="subtotal-title">Téléphone</h4>
                                                          {info_acheteur?.telachet === null ? 
                                                            (
                                                                <p className="subtotal-value"> - </p>
                                                            )

                                                            :

                                                            (
                                                              <p className="subtotal-value">{`+${info_acheteur?.indicatif}`} {info_acheteur?.telachet}</p>

                                                            )

                                                        }
                                                        
                                                      </div>
                                                          </>
                                                        )
                                                                                                        
                                                  }

                                                  </>
                                                    
                                                  )}

                                                    
                                              
                                              
                                                  </div>
                                                </div>
                                            </div>
                                        </div>

                           {/*fin compte acheteur */}

                             {/* compte vendeur */}
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="faq-item rounded">
                                                <h2 className="faq-heading heading_18 collapsed d-flex align-items-center justify-content-between"
                                                  onClick={setData_vendeur} data-bs-toggle="collapse" data-bs-target="#vendeur">
                                                  vendeur
                                                 
                                                  
                                                    <span className="faq-heading-icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F76B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-down">
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </span>
                                                </h2>

                                                    {vendeur_data && (
                                                       <>
                                                       {
                                                           vendeur_data_upd 
                                                             ? 
                                                             (
     
                                                               <>
    
                                                               <button type='submit' className='save_btn'>
                                                                                                               sauver
                                                               </button>
                                                                 <button className='cancel_btn' onClick={setData_vendeurupd}>
                                                                                                               Annuler
                                                                 </button>
     
                                                               </>
                                                             )
     
                                                             :
     
                                                             ( 
                                                               <button className='edit_btn'    onClick={setData_vendeurupd}>
                                                                 modifier
                                                               </button>
                                                             )
                                                                                                             
                                                       }
     
                                                       </>
                                                    )}

                                                <div id="vendeur" className="accordion-collapse collapse">
                                                <div className="box_data mt-3">

                                                {vendeur_data && (
                                                       <>
                                                       {
                                                           vendeur_data_upd 
                                                             ? 
                                                             (
     
                                                               <>
                                                                <div style={{ border: '1px solid #ccc', marginBottom: '10px' }}>
                                      
                                                               
                                                                    <div className="col-12">
                                                                      <fieldset>
                                                                        <label className="label">Numéro de téléphone</label>
                                                                        <PhoneInput
                                                                          id="user_tel"
                                                                          defaultCountry="tg"
                                                                          name="user_tel"
                                                                          value={phone}
                                                                          onChange={(phone) => setPhone(phone)}
                                                                        />
                                                                        {/* <input type="number"   name='tel' autoComplete='off' placeholder='votre numéro de téléphone'
                                                                                          onChange={(e) => setValues({...values, tel : e.target.value})} className="form-control form-control-lg" /> */}
                                                                      </fieldset>
                                                                    </div>
                                                                    <div className="col-12">
                                                                      <fieldset>
                                                                        <label className="label">votre pseudo</label>
                                                                        <input
                                                                          type="text"
                                                                          name="pseudo"
                                                                          value={values.pseudo}
                                                                          autoComplete="off"
                                                                          placeholder="votre pseudo"
                                                                          onChange={(e) =>
                                                                            setValues({ ...values, pseudo: e.target.value })
                                                                          }
                                                                          className="form-control form-control-lg"
                                                                        />
                                                                      </fieldset>
                                                                    </div>
                                                                  
                                                                    <div className="col-12">
                                                                      <fieldset>
                                                                        <label className="label">mot de passe</label>
                                                                        <input
                                                                          type="password"
                                                                          name="password"
                                                                          value={values.password}
                                                                          autoComplete="off"
                                                                          placeholder=""
                                                                          onChange={(e) =>
                                                                            setValues({ ...values, password: e.target.value })
                                                                          }
                                                                          className="form-control form-control-lg"
                                                                        />
                                                                      </fieldset>
                                                                    </div>
                                                                    
                                                                
                                                                  </div>
     
                                                               </>

                                                             )
     
                                                             :
     
                                                             ( 
                                                              <>
                                                                   <div className="item_list">
                                                          <h4 className="subtotal-title">Nom</h4>
                                                          {info_vendeur?.nomvendeur === null || info_vendeur?.nomvendeur === '' ? 
                                                            (
                                                                <p className="subtotal-value"> - </p>
                                                            )

                                                            :

                                                            (
                                                              <p className="subtotal-value"> {info_vendeur?.nomvendeur}</p>

                                                            )

                                                        } 
                                                         
                                                                  </div>
                                                                  <div className="item_list">
                                                                  <h4 className="subtotal-title">Prénom</h4>
                                                                  {info_vendeur?.prenomvendeur === null || info_vendeur?.prenomvendeur === '' ? 
                                                                        (
                                                                            <p className="subtotal-value"> - </p>
                                                                        )

                                                                        :

                                                                        (
                                                                          <p className="subtotal-value"> {info_vendeur?.prenomvendeur}</p>

                                                                        )

                                                                    } 
                                                                    
                                                                  </div>
                                                                  <div className="item_list">
                                                                      <h4 className="subtotal-title">Téléphone</h4>
                                                                      {info_vendeur?.telvendeur === null  || info_vendeur?.telvendeur === '' ? 
                                                                        (
                                                                            <p className="subtotal-value"> - </p>
                                                                        )

                                                                        :

                                                                        (
                                                                          <p className="subtotal-value">{`+${info_vendeur?.indicatif1}`} {info_vendeur?.telvendeur}</p>

                                                                        )

                                                                    } 
                                                                    
                                                                  </div>

                                                              </>
                                                             )
                                                                                                             
                                                       }
     
                                                       </>
                                                    )}


                                                    
                                              
                                              
                                                  </div>
                                                </div>
                                            </div>
                                        </div>
                          {/*fin compte vendeur */}

                           {/* compte artisan */}
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="faq-item rounded">
                                                <h2 className="faq-heading heading_18 collapsed d-flex align-items-center justify-content-between"
                                                  onClick={setData_artisan} data-bs-toggle="collapse" data-bs-target="#artisan">
                                                  artisan
                                                   
                                                    <span className="faq-heading-icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F76B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-down">
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </span>
                                                </h2>

                                                {artisan_data && (
                                                        <>
                                                        {
                                                            artisan_data_upd 
                                                              ? 
                                                              (
      
                                                                <>
                                                                <button className='save_btn'>
                                                                                                                sauver
                                                                </button>
                                                                  <button className='cancel_btn' onClick={setData_artisanupd}>
                                                                                                                Annuler
                                                                  </button>
      
                                                                </>
                                                              )
      
                                                              :
      
                                                              ( 
                                                                <button className='edit_btn'    onClick={setData_artisanupd}>
                                                                  modifier
                                                                </button>
                                                              )
                                                                                                              
                                                        }
      
                                                        </>
                                                    )}
                                                <div id="artisan" className="accordion-collapse collapse">
                                                <div className="box_data mt-3">
                                                {artisan_data && (
                                                        <>
                                                        {
                                                            artisan_data_upd 
                                                              ? 
                                                              (
      
                                                                <>
                                                                      <div style={{ border: '1px solid #ccc', marginBottom: '10px' }}>
                                      
                                                
                                                                    <div className="col-12">
                                                                      <fieldset>
                                                                        <label className="label">Numéro de téléphone</label>
                                                                        <PhoneInput
                                                                          id="user_tel"
                                                                          defaultCountry="tg"
                                                                          name="user_tel"
                                                                          value={phone}
                                                                          onChange={(phone) => setPhone(phone)}
                                                                        />
                                                                        {/* <input type="number"   name='tel' autoComplete='off' placeholder='votre numéro de téléphone'
                                                                                          onChange={(e) => setValues({...values, tel : e.target.value})} className="form-control form-control-lg" /> */}
                                                                      </fieldset>
                                                                    </div>
                                                                    <div className="col-12">
                                                                      <fieldset>
                                                                        <label className="label">votre pseudo</label>
                                                                        <input
                                                                          type="text"
                                                                          name="pseudo"
                                                                          value={values.pseudo}
                                                                          autoComplete="off"
                                                                          placeholder="votre pseudo"
                                                                          onChange={(e) =>
                                                                            setValues({ ...values, pseudo: e.target.value })
                                                                          }
                                                                          className="form-control form-control-lg"
                                                                        />
                                                                      </fieldset>
                                                                    </div>
                                                                  
                                                                    <div className="col-12">
                                                                      <fieldset>
                                                                        <label className="label">mot de passe</label>
                                                                        <input
                                                                          type="password"
                                                                          name="password"
                                                                          value={values.password}
                                                                          autoComplete="off"
                                                                          placeholder=""
                                                                          onChange={(e) =>
                                                                            setValues({ ...values, password: e.target.value })
                                                                          }
                                                                          className="form-control form-control-lg"
                                                                        />
                                                                      </fieldset>
                                                                    </div>
                                                                    
                                                                  
                                                                      </div>
      
                                                                </>
                                                              )
      
                                                              :
      
                                                              ( 
                                                               <>
                                                                  <div className="item_list">
                                                          <h4 className="subtotal-title">Nom</h4>
                                                          {info_artisan?.nom_artisan === null || info_artisan?.nom_artisan === "" ? 
                                                            (
                                                                <p className="subtotal-value"> - </p>
                                                            )

                                                            :

                                                            (
                                                              <p className="subtotal-value"> {info_artisan?.nom_artisan}</p>

                                                            )

                                                        } 
                                                         
                                                      </div>
                                                      <div className="item_list">
                                                          <h4 className="subtotal-title">Prénom</h4>
                                                          {info_artisan?.prenom_artisan === null || info_artisan?.prenom_artisan === "" ? 
                                                            (
                                                                <p className="subtotal-value"> - </p>
                                                            )

                                                            :

                                                            (
                                                              <p className="subtotal-value"> {info_artisan?.prenom_artisan}</p>

                                                            )

                                                        } 
                                                        
                                                      </div>
                                                      <div className="item_list">
                                                          <h4 className="subtotal-title">Téléphone</h4>
                                                          {info_artisan?.tel_artisan === null || info_artisan?.tel_artisan === "" ? 
                                                            (
                                                                <p className="subtotal-value"> - </p>
                                                            )

                                                            :

                                                            (
                                                              <p className="subtotal-value">{`+${info_artisan?.indicatif_artisan}`} {info_artisan?.tel_artisan}</p>

                                                            )

                                                        } 
                                                          
                                                      </div>

                                                               </>
                                                              )
                                                                                                              
                                                        }
      
                                                        </>
                                                 )}


                                                   
                                              
                                              
                                                  </div>
                                                </div>
                                            </div>
                                        </div>
                          {/* compte artisan */}
                          {/* compte admin depot */}
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="faq-item rounded">
                                                <h2 className="faq-heading heading_18 collapsed d-flex align-items-center justify-content-between"
                                                  onClick={setData_admindepot} data-bs-toggle="collapse" data-bs-target="#admindepot">
                                                  administrateur de dépôt
                                                  
                                                    <span className="faq-heading-icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F76B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-down">
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </span>
                                                </h2>

                                                {admindep_data && (
                                                         <>
                                                         {
                                                             admindep_data_upd 
                                                               ? 
                                                               (
       
                                                                <>
                                                              <button className='save_btn'>
                                                                                                                sauver
                                                                </button>
                                                                  <button className='cancel_btn' onClick={setData_admindepotupd}>
                                                                                                                Annuler
                                                                  </button>
   
                                                                </>
                                                               )
       
                                                               :
       
                                                               ( 
                                                                 <button className='edit_btn'    onClick={setData_admindepotupd}>
                                                                   modifier
                                                                 </button>
                                                               )
                                                                                                               
                                                         }
       
                                                         </>
                                                    )}

                                                <div id="admindepot" className="accordion-collapse collapse">
                                                <div className="box_data mt-3">
                                                {admindep_data && (
                                                         <>
                                                         {
                                                             admindep_data_upd 
                                                               ? 
                                                               (
       
                                                                 <>
                                                                       <div style={{ border: '1px solid #ccc', marginBottom: '10px' }}>
                                      
                                                
                                                                          <div className="col-12">
                                                                            <fieldset>
                                                                              <label className="label">Numéro de téléphone</label>
                                                                              <PhoneInput
                                                                                id="user_tel"
                                                                                defaultCountry="tg"
                                                                                name="user_tel"
                                                                                value={phone}
                                                                                onChange={(phone) => setPhone(phone)}
                                                                              />
                                                                              {/* <input type="number"   name='tel' autoComplete='off' placeholder='votre numéro de téléphone'
                                                                                                onChange={(e) => setValues({...values, tel : e.target.value})} className="form-control form-control-lg" /> */}
                                                                            </fieldset>
                                                                          </div>
                                                                          <div className="col-12">
                                                                            <fieldset>
                                                                              <label className="label">votre pseudo</label>
                                                                              <input
                                                                                type="text"
                                                                                name="pseudo"
                                                                                value={values.pseudo}
                                                                                autoComplete="off"
                                                                                placeholder="votre pseudo"
                                                                                onChange={(e) =>
                                                                                  setValues({ ...values, pseudo: e.target.value })
                                                                                }
                                                                                className="form-control form-control-lg"
                                                                              />
                                                                            </fieldset>
                                                                          </div>
                                                                        
                                                                          <div className="col-12">
                                                                            <fieldset>
                                                                              <label className="label">mot de passe</label>
                                                                              <input
                                                                                type="password"
                                                                                name="password"
                                                                                value={values.password}
                                                                                autoComplete="off"
                                                                                placeholder=""
                                                                                onChange={(e) =>
                                                                                  setValues({ ...values, password: e.target.value })
                                                                                }
                                                                                className="form-control form-control-lg"
                                                                              />
                                                                            </fieldset>
                                                                          </div>
                                                                          
                                                                        
                                                                            </div>
       
                                                                 </>
                                                               )
       
                                                               :
       
                                                               ( 
                                                                 <>
                                                                   <div className="item_list">
                                                                          <h4 className="subtotal-title">Nom</h4>
                                                                          {info_admindepot?.nom_admindepot === null || info_admindepot?.nom_admindepot === "" ? 
                                                                            (
                                                                                <p className="subtotal-value"> - </p>
                                                                            )

                                                                            :

                                                                            (
                                                                              <p className="subtotal-value"> {info_admindepot?.nom_admindepot}</p>

                                                                            )

                                                                        } 
                                                                        
                                                                      </div>
                                                                      <div className="item_list">
                                                                          <h4 className="subtotal-title">Prénom</h4>
                                                                          {info_admindepot?.prenom_admindepot === null || info_admindepot?.prenom_admindepot === "" ? 
                                                                            (
                                                                                <p className="subtotal-value"> - </p>
                                                                            )

                                                                            :

                                                                            (
                                                                              <p className="subtotal-value"> {info_admindepot?.prenom_admindepot}</p>

                                                                            )

                                                                        } 
                                                                        
                                                                      </div>
                                                                      <div className="item_list">
                                                                          <h4 className="subtotal-title">Téléphone</h4>
                                                                          {info_admindepot?.telephone_admindepot === null || info_admindepot?.telephone_admindepot === "" ? 
                                                                            (
                                                                                <p className="subtotal-value"> - </p>
                                                                            )

                                                                            :

                                                                            (
                                                                              <p className="subtotal-value">{`+${info_admindepot?.indicatif_admindepot}`} {info_admindepot?.telephone_admindepot}</p>


                                                                            )

                                                                        } 
                                                                        
                                                                      </div>
                                                                 </>
                                                               )
                                                                                                               
                                                         }
       
                                                         </>
                                                    )}

                                                      
                                              
                                              
                                                  </div>
                                                </div>
                                            </div>
                                        </div>
                         {/* compte admin depot */}

                          {/* compte livreur */}
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="faq-item rounded">
                                                <h2 className="faq-heading heading_18 collapsed d-flex align-items-center justify-content-between"
                                                  onClick={setData_livreur} data-bs-toggle="collapse" data-bs-target="#livreur">
                                                livreur
                                                 
                                                    <span className="faq-heading-icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F76B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-down">
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </span>
                                                </h2>
                                                 {livreur_data && (
                                                     <>
                                                     {
                                                         livreur_data_upd 
                                                           ? 
                                                           (
   
                                                             <>
                                                              {/* <button className='edit_btn'>
                                                                                                                sauver
                                                                </button> */}
                                                                  <button className='edit_btn' onClick={setData_livreurupd}>
                                                                                                                Annuler
                                                                  </button>
   
                                                             </>
                                                           )
   
                                                           :
   
                                                           ( 
                                                             <button className='edit_btn' onClick={setData_livreurupd}>
                                                               modifier
                                                             </button>
                                                           )
                                                                                                           
                                                     }
   
                                                     </>
                                                    )
                                                }
                                                <div id="livreur" className="accordion-collapse collapse">
                                                   <div className="box_data mt-3">

                                                   {livreur_data && (
                                                     <>
                                                     {
                                                         livreur_data_upd 
                                                           ? 
                                                           (
   
                                                             <>
                                                              <div style={{ border: '1px solid #ccc', marginBottom: '10px' }}>
                                      
                                                
                                                                  <div className="col-12">
                                                                    <fieldset>
                                                                      <label className="label">Numéro de téléphone</label>
                                                                      <PhoneInput
                                                                        id="user_tel"
                                                                        defaultCountry="tg"
                                                                        name="user_tel"
                                                                        value={phone}
                                                                        onChange={(phone) => setPhone(phone)}
                                                                      />
                                                                      {/* <input type="number"   name='tel' autoComplete='off' placeholder='votre numéro de téléphone'
                                                                                        onChange={(e) => setValues({...values, tel : e.target.value})} className="form-control form-control-lg" /> */}
                                                                    </fieldset>
                                                                  </div>
                                                                  <div className="col-12">
                                                                    <fieldset>
                                                                      <label className="label">votre pseudo</label>
                                                                      <input
                                                                        type="text"
                                                                        name="pseudo"
                                                                        value={values.pseudo}
                                                                        autoComplete="off"
                                                                        placeholder="votre pseudo"
                                                                        onChange={(e) =>
                                                                          setValues({ ...values, pseudo: e.target.value })
                                                                        }
                                                                        className="form-control form-control-lg"
                                                                      />
                                                                    </fieldset>
                                                                  </div>
                                                                
                                                                  <div className="col-12">
                                                                    <fieldset>
                                                                      <label className="label">mot de passe</label>
                                                                      <input
                                                                        type="password"
                                                                        name="password"
                                                                        value={values.password}
                                                                        autoComplete="off"
                                                                        placeholder=""
                                                                        onChange={(e) =>
                                                                          setValues({ ...values, password: e.target.value })
                                                                        }
                                                                        className="form-control form-control-lg"
                                                                      />
                                                                    </fieldset>
                                                                  </div>
                                                                  
                                                                
                                                                    </div>
   
                                                             </>
                                                           )
   
                                                           :
   
                                                           ( 
                                                             <>
                                                              <div className="item_list">
                                                          <h4 className="subtotal-title">Nom</h4>
                                                          {info_livreur?.nom_livreur === null || info_livreur?.nom_livreur === "" ? 
                                                            (
                                                                <p className="subtotal-value"> - </p>
                                                            )

                                                            :

                                                            (
                                                              <p className="subtotal-value"> {info_livreur?.nom_livreur}</p>

                                                            )

                                                        } 
                                                     
                                                      </div>
                                                      <div className="item_list">
                                                          <h4 className="subtotal-title">Prénom</h4>
                                                          {info_livreur?.prenom_livreur === null || info_livreur?.prenom_livreur === "" ? 
                                                            (
                                                                <p className="subtotal-value"> - </p>
                                                            )

                                                            :

                                                            (
                                                              <p className="subtotal-value"> {info_livreur?.prenom_livreur}</p>

                                                            )

                                                        } 

                                                      </div>
                                                      <div className="item_list">
                                                          <h4 className="subtotal-title">Téléphone</h4>
                                                          {info_livreur?.tel_livreur === null || info_livreur?.tel_livreur === "" ? 
                                                            (
                                                                <p className="subtotal-value"> - </p>
                                                            )

                                                            :

                                                            (
                                                              <p className="subtotal-value">{`+${info_livreur?.indicatif_livreur}`} {info_livreur?.tel_livreur}</p>


                                                            )

                                                        } 
                                                          
                                                      </div>

                                                             </>
                                                           )
                                                                                                           
                                                     }
   
                                                     </>
                                                    )
                                                }
                                                     
                                              
                                              
                                                  </div>
                                                </div>
                                            </div>
                                        </div>
                         {/*fin compte livreur */}
                            
                        </div>        
                </div>
              </Tab>
              <Tab eventKey="ecosmoney" title="portefeuille ecosmoney">
              <div className="faq-container">
                        <div className="row">
                          
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="faq-item rounded">
                                                <h2 className="faq-heading heading_18 d-flex align-items-center justify-content-between collapsed" 
                                              // onClick={setData}
                                                >
                                                 Ecos Money
                                                     
                                                      <button className='edit_btn'    onClick={setDataupd}>
                                                        modifier
                                                      </button>

                                                </h2>
                                                <div id="em" className="accordion-collapse collapse show">
                                                  {info_em ? (
                                                      <div className="box_data mt-3">
                                                          <div className="item_list">
                                                              <h4 className="subtotal-title">Nom</h4>

                                                              {info_em?.nom_proprietaire === null || info_em?.nom_proprietaire === "" ? 
                                                                (
                                                                    <p className="subtotal-value"> - </p>
                                                                )

                                                                :

                                                                (
                                                                  <p className="subtotal-value"> {info_em?.nom_proprietaire}</p>

                                                                )

                                                            } 

                                                          </div>
                                                          <div className="item_list">
                                                              <h4 className="subtotal-title">Prénom</h4>
                                                              {info_em?.prenom_proprietaire === null || info_em?.prenom_proprietaire === "" ? 
                                                                (
                                                                    <p className="subtotal-value"> - </p>
                                                                )

                                                                :

                                                                (
                                                                  <p className="subtotal-value">{info_em?.prenom}</p>

                                                                )

                                                            }
                                                          
                                                          </div>
                                                          <div className="item_list">
                                                              <h4 className="subtotal-title">Téléphone</h4>

                                                              {info_em?.tel_proprietaire === null || info_em?.tel_proprietaire === "" ? 
                                                                (
                                                                    <p className="subtotal-value"> - </p>
                                                                )

                                                                :

                                                                (
                                                                  <p className="subtotal-value">{`+${info_em?.indicatif}`} {info_em?.tel_proprietaire}</p>

                                                                )

                                                            }

                                                          </div>
                                                          <div className="item_list">
                                                              <h4 className="subtotal-title">Mot de passe</h4>
                                                              {info_em?.password === null ? 
                                                                (
                                                                    <p className="subtotal-value"> - </p>
                                                                )

                                                                :

                                                                (
                                                                  <p className="subtotal-value">**************</p>

                                                                )

                                                            }
                                                            
                                                          </div>
                                              
                                                     </div>

                                                  )
                                                    
                                             :

                                                    

                                      (
                                       null

                                    )
                                                    
                                }
                                                
                                                </div>
                                            </div>
                                        </div>

                                       
                            
                        </div>        
                </div>
              </Tab>


              </Tabs>

            </div>
            <Footer/>
            </main>

     </div>
      
    
    </>
  )
}

export default Mescomptes
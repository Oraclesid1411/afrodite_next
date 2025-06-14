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
 

 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function Mescomptes() {

  
  const apiUrl = 'https://fsapi.fashionecos.com'
  const auth = useAuth();
  const navigate = useNavigate()
  const user_info = auth.currentUser
  
  // formulaire data
  
  const [phone, setPhone] = useState("");
  const [phone_em, setPhoneEm] = useState("");
  const [phone_acheteur, setPhoneAcheteur] = useState("");
  const [phone_livreur, setPhone_livreur] = useState("");
  const [phone_oc, setPhone_oc] = useState("");
  const [phone_admindepot, setPhone_admindepot] = useState("");
  const [phone_art, setPhone_art] = useState("");
  const [phone_pro, setPhone_pro] = useState("");

  // const [show_msg, setShowmsg] = useState(false);
  const [values, setValues] = useState({
    pseudo: "",
    password: "",
    new_password: "",

    // ecos money
    nom_prop: "",
    prenom_prop: "",
    em_old_password: "",
    em_new_password: "",

    // acheteur
    nom_acheteur: "",
    prenom_acheteur: "",
    pays_acheteur: "",
    ville_acheteur: "",
    quartier_acheteur: "",
    domicile_acheteur: "",
    

    // vendeur

    // occasionnel
    nom_oc: "",
    prenom_oc: "",
    pseudo_oc: "",
    num_cdi: "", 

    // pro
    nom_pro: "",
    prenom_pro: "",
    pseudo_pro: "",
    num_cdi_pro: "", 
    indication_pro: "",
    
    // artisan
    nom_art: "",
    prenom_art: "",
    pseudo_art: "",
    num_cdi_art: "",
    indication_art: "",

    // admin depot
    nom_admindepot: "",
    prenom_admindepot: "",
    pseudo_admindepot: "",
    num_cdi_admindepot: "", 
    indication_admindepo: "",

    // livreur
    nom_livreur: "",
    prenom_livreur: "",
    pseudo_livreur: "",
    num_cdi_livreur: "",
    indication_livreur: "",
   
  });
  // console.log(user_info)

  if(user_info === null){
    navigate("/login");
}
  
axios.defaults.withCredentials = true;

const userid = user_info?.id;
  // const [em_data , setEmdata] = useState(true);
  const [em_data_upd , setEmdataUpdate] = useState(false);

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

  
  const [info_user , setinfo_user] = useState([]);
  const [info_acheteur , setinfo_acheteur] = useState([]);
  const [info_vendeur , setinfo_vendeur] =  useState([]);
  const [info_artisan , setinfo_artisan] =  useState([]);
  const [info_admindepot , setinfo_admindepot] =  useState([]);
  const [info_livreur , setinfo_livreur] =  useState([]);
  const [info_em , setinfo_em] =  useState([]);

  


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

    // console.log('update de user')
    setUserdataUpdate(!user_data_upd);
    set_default_values();
  };
  const setEmDataupd = () => {

    // console.log('update de user')
    setEmdataUpdate(!em_data_upd);
    setEm_default_values();
  };
  
  const setData_acheteurupd = () => {
    setAcheteurdataUpdate(!acheteur_data_upd);
    setAcheteur_default_values();
  };
  
  const setData_vendeurupd = () => {
    setVendeurdataUpdate(!vendeur_data_upd);
  };
  
  const setData_artisanupd = () => {
    setArtisandataUpdate(!artisan_data_upd);
    setArtisan_default_values();
  };
  
  const setData_admindepotupd = () => {
    setAdmindepotdataUpdate(!admindep_data_upd);
    setAdmindepot_default_values();
  };
  
  const setData_livreurupd = () => {
    setLivreurUpdate(!livreur_data_upd);
    setLivreur_default_values();
  };


  // console.log('user_data_upd')
  // console.log(user_data_upd)


  // set user default data
 


   // phone number
    
  const set_default_values = () => {
   // phone number
    const user_number = info_user?.telnumber;
    let user_indicatif = info_user?.indicatif;
    
  
    var code_type = user_indicatif.startsWith("+")
    if(code_type === false){
      user_indicatif = "+" + user_indicatif;
    }
  
      // console.log('split_indicatif')
      // console.log(user_indicatif)
      // console.log("split_indicatif")
  
    const user_fullnumber = user_indicatif + "" + user_number
    setPhone(user_fullnumber)
  
    // pseudo
    // console.log("set pseudo")
    setValues({ ...values, pseudo: info_user?.name , password: ""})

    // setValues({ ...values, password: "" })
    
  };

  
  const setEm_default_values = () => {
    // phone number
     let em_number = info_em?.tel_proprietaire;
     let this_indicatif = info_em?.indicatif;
     
   
     var code_type = this_indicatif.startsWith("+")
     if(code_type === false){
      this_indicatif = "+" + this_indicatif;
     }
   
       // console.log('split_indicatif')
       // console.log(user_indicatif)
       // console.log("split_indicatif")
   
     const this_fullnumber = this_indicatif + "" + em_number
     setPhoneEm(this_fullnumber)
   
     // pseudo
     // console.log("set pseudo")
     setValues({ ...values, nom_prop: info_em?.nom_proprietaire ,prenom_prop: info_em?.prenom_proprietaire ,em_old_password: "" , em_new_password: ""})
 
     // setValues({ ...values, password: "" })
     
   };

   
  const setAcheteur_default_values = () => {
    // phone number
    console.log(info_acheteur)

     let this_number = info_acheteur?.telachet;
     let this_indicatif = info_acheteur?.indicatif;
     
   
     var code_type = this_indicatif.startsWith("+")
     if(code_type === false){
      this_indicatif = "+" + this_indicatif;
     }
   
       // console.log('split_indicatif')
       // console.log(user_indicatif)
       // console.log("split_indicatif")
   
     const this_fullnumber = this_indicatif + "" + this_number
     setPhoneAcheteur(this_fullnumber)
   
     // pseudo
     // console.log("set pseudo")
     setValues({ ...values, 
          
          nom_acheteur: info_acheteur?.nomachet ,
          prenom_acheteur: info_acheteur?.prenom,
          pays_acheteur: info_acheteur?.pays,
          ville_acheteur: info_acheteur?.ville,
          quartier_acheteur: info_acheteur?.quartier,
          domicile_acheteur: info_acheteur?.adrachet})
 
     // setValues({ ...values, password: "" })
     
   };

   
  const setArtisan_default_values = () => {

    // phone number
     let this_number = info_artisan?.tel_artisan;
     let this_indicatif = info_artisan?.indicatif_artisan;
     
   
     var code_type = this_indicatif.startsWith("+")
     if(code_type === false){
      this_indicatif = "+" + this_indicatif;
     }
   
    //    // console.log('split_indicatif')
    //    // console.log(user_indicatif)
    //    // console.log("split_indicatif")
   
     const this_fullnumber = this_indicatif + "" + this_number
     setPhone_art(this_fullnumber)
   
    //  // pseudo
    //  // console.log("set pseudo")
     setValues({ ...values, 
          
      nom_art: info_artisan?.nom_artisan,
      prenom_art: info_artisan?.prenom_artisan,
      pseudo_art: info_artisan?.pseudo_artisan,
      num_cdi_art: info_artisan?.cni_artisan,
      indication_art: info_artisan?.adr_artisan
   })
          
     
   };

    
  const setAdmindepot_default_values = () => {
    // phone number
     let this_number = info_admindepot?.telephone_admindepot;
     let this_indicatif = info_admindepot?.indicatif_admindepot;
     
   
     var code_type = this_indicatif.startsWith("+")
     if(code_type === false){
      this_indicatif = "+" + this_indicatif;
     }
   
    //    // console.log('split_indicatif')
    //    // console.log(user_indicatif)
    //    // console.log("split_indicatif")
   
     const this_fullnumber = this_indicatif + "" + this_number
     setPhone_admindepot(this_fullnumber)
   
    //  // pseudo
    //  // console.log("set pseudo")
     setValues({ ...values, 
          
      nom_admindepot: info_admindepot?.nom_admindepot,
      prenom_admindepot: info_admindepot?.prenom_admindepot,
      pseudo_admindepot: info_admindepot?.pseudo_admindepot,
      num_cdi_admindepot: info_admindepot?.cni_admindepot,
      indication_admindepo: info_admindepot?.adr_admindepot
        
        })
 
          
     
   };

    
  const setLivreur_default_values = () => {
    // phone number
     let this_number = info_livreur?.tel_livreur;
     let this_indicatif = info_livreur?.indicatif_livreur;
     
   
     var code_type = this_indicatif.startsWith("+")
     if(code_type === false){
      this_indicatif = "+" + this_indicatif;
     }
   
    //    // console.log('split_indicatif')
    //    // console.log(user_indicatif)
    //    // console.log("split_indicatif")
   
     const this_fullnumber = this_indicatif + "" + this_number
     setPhone_livreur(this_fullnumber)
   
    //  // pseudo
    //  // console.log("set pseudo")
     setValues({ ...values, 
          
            nom_livreur: info_livreur?.nom_livreur,
            prenom_livreur: info_livreur?.prenom_livreur,
            pseudo_livreur: info_livreur?.pseudo_livreur,
            num_cdi_livreur: info_livreur?.cni_livreur,
            indication_livreur: info_livreur?.adresse_livreur
        })
 
     // setValues({ ...values, password: "" })
     
   };
  // les infos des comptes
  
  

  useEffect(() => {
      
    const fetchData = async () => {
     
      try {
                axios.defaults.withCredentials = true;
                const params = {
                
                  userid : userid 
              }
             
              const data_user = await axios.post(`${apiUrl}/auth/getUser` , params);
              
               if(data_user.length > 0){
                setinfo_user(data_user.data[0]);

               }
               else{
                setinfo_user(data_user.data);
               }

              

              
             
       
      } catch (err) {
        // console.log(err);
        // console.log('erreur here')
      }
    };
    fetchData();
  });

  useEffect(() => {
      
    const fetchData = async () => {
     
      try {
                axios.defaults.withCredentials = true;
                const params = {
                
                  userid : userid 
              }
             
              

               const data_a = await axios.post(`${apiUrl}/auth/getAcheteur` , params);
             
               if(data_a.length > 0){
                setinfo_acheteur(data_a.data[0]);

               }
               else{
                setinfo_acheteur(data_a.data);
               }

               const data_b = await axios.post(`${apiUrl}/auth/getVendeur` , params);
             
               if(data_b.length > 0){
                setinfo_vendeur(data_b.data[0]);

               }
               else{
                setinfo_vendeur(data_b.data);
               }

                 const data_c = await axios.post(`${apiUrl}/auth/getArtisan` , params);
               
               if(data_c.length > 0){
                setinfo_artisan(data_c.data[0]);

               }
               else{
                setinfo_artisan(data_c.data);
               }
              
         
                 const data_d = await axios.post(`${apiUrl}/auth/getAdmindepot` , params);
              
                  
               if(data_d.length > 0){
                setinfo_admindepot(data_d.data[0]);

               }
               else{
                setinfo_admindepot(data_d.data);
               }

              //  console.log(data_d)

              const data_e = await axios.post(`${apiUrl}/auth/getLivreur` , params);
            
               if(data_e.length > 0){
                setinfo_livreur(data_e.data[0]);

               }
               else{
                setinfo_livreur(data_e.data);
               }
              //  console.log(data_e)

               const data_f = await axios.post(`${apiUrl}/auth/getEm` , params);
            
               if(data_f.length > 0){
                setinfo_em(data_f.data[0]);

               }
               else{
                setinfo_em(data_f.data);
               }

              
             
       
      } catch (err) {
        // console.log(err);
        // console.log('erreur here')
      }
    };
    fetchData();
  });


  // console.log("info_acheteur")

  // 
  // console.log(info_acheteur)
  // console.log(info_vendeur)
  // console.log(info_artisan)
  // console.log(info_admindepot)
  // console.log(info_livreur)
  // console.log('liste info')
  // console.log(info_em)
  
  // console.log("info_acheteur")

  // submit des formulaires
  
const handleSubmit = async (e) => {
  e.preventDefault(); 

  var form_type = e.target.dataset.form; 
  // update user
  if(form_type === "user"){
     // set tel number value
  const user_phone_number = document.querySelector(".react-international-phone-input[name='user_tel']" ).value;
  const split_usernumber = user_phone_number.split(" ");

  var user_values = {};
  
      user_values = {
      userid : userid,
      pseudo : values.pseudo,
      password : values.password,
      new_password : values.new_password,
      indicatif : split_usernumber[0],
      number : split_usernumber[1],

     }
     console.log(user_values)
         try {
    await axios
      .post(`${apiUrl}/auth/update_user`,
                [
                       {user : user_values},
                      
                                        
                ]
         )
      .then((result) => {
        console.log(result);
        toast.info('sauvegarde en cours' , {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
         });
      setTimeout(() => {
        // return false;
        if(result?.data != undefined){
          const msg = result?.data?.msg;
          const auth_state = result?.data?.auth_state;
          // const res_data = result?.data?.response;
        
            if(auth_state === 'on'){
              if(msg === "update success"){
                toast.success('mise à jour réussie' , {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  // transition: Bounce,
              });

              // mettre à jour les données sur la page 
                setDataupd();
              }
              else{
                  toast.error('mise à jour échouée!',
                    {
                      position: "top-center",
                      autoClose: 3000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    } 
                  );
    
              }


            }
            else{
              // mot de passe modifier

              navigate("/login", 
                { state: { previousPath: location.pathname }}
            );
              
               
              
            }
        }        
      }, 4000); // Délai de 5 secondes
        // console.log(auth_fct?.set_user(result.data))
          //  navigate("/login");
        
          });

    // navigate("/login");
  } catch (err) {
    console.log("erreur");
    // setError(err.response.data);
  }
  }

  // update em
  else if(form_type === "em"){
    console.log(values)
    const em_phone_number = document.querySelector(".react-international-phone-input[name='em_tel']" ).value;
    const split_emnumber = em_phone_number.split(" ");

    var em_values = {};

    em_values = {

    userid : userid,
    nom : values.nom_prop,
    prenom : values.prenom_prop,
    password : values.em_old_password,
    new_password : values.em_new_password,
    indicatif : split_emnumber[0],
    number : split_emnumber[1],

   }
  //  console.log(em_values)
   try {
    await axios
      .post(`${apiUrl}/auth/update_em`,
                [
                       {em : em_values},
                      
                                        
                ]
         )
      .then((result) => {
        console.log(result);
        if(result?.data != undefined){
          const msg = result?.data?.msg;
            var notif = result?.data?.notification;
          toast.info('sauvegarde en cours' , {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
           });

           setTimeout(() => {
        if(msg === "update success"){
          toast.success(notif , {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
        });

        setEmDataupd();
        }
        else{
            toast.error('mise à jour échouée!',
              {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              } 
            );

        }
      }, 4000); // Délai de 5 secondes
      }

        
          });

    // navigate("/login");
  } catch (err) {
    console.log("erreur");
    // setError(err.response.data);
  }
  }

  // update acheteur
  else if(form_type === "acheteur"){
    // console.log(values)
    const ach_phone_number = document.querySelector(".react-international-phone-input[name='acheteur_tel']" ).value;
    const split_achnumber = ach_phone_number.split(" ");

    var ach_values = {};
    ach_values = {
    userid : userid,
    nom : values.nom_acheteur,
    prenom : values.prenom_acheteur,
    // pseudo : values.pseudo_livreur,
    // cni : values.num_cdi_livreur,
    indication : values.domicile_acheteur,
    indicatif : split_achnumber[0],
    number : split_achnumber[1],

   }
  //  console.log(ach_values)
   try {
    await axios
      .post(`${apiUrl}/auth/update_acheteur`,
                [
                       {acheteur : ach_values},
                      
                                        
                ]
         )
      .then((result) => {


        console.log(result);
        if(result?.data != undefined){
          const msg = result?.data?.msg;
         const res_data = result?.data?.response;
         var notif = result?.data?.notification;
         toast.info('sauvegarde en cours' , {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
         });
         setTimeout(() => {
          if(msg === "update success"){
            toast.success(notif , {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar:  true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              // transition: Bounce,
          });
          setData_acheteurupd();
          }
          else{
              toast.error('mise à jour échouée!',
                {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                } 
              );

          }
        }, 4000); // Délai de 5 secondes


     
        }

      
        
    });

    // navigate("/login");
  } catch (err) {
    console.log("erreur");
    // setError(err.response.data);
  }
  }

  // update vendeur
  // pro
  else if(form_type === "vendeur pro"){

    console.log(form_type)
   
  }

  // occasionnel
  else if(form_type === "vendeur occasionnel"){
    console.log(form_type) 
  }

  // update artisan
  else if(form_type === "artisan"){
    console.log(values)
    const art_phone_number = document.querySelector(".react-international-phone-input[name='phone_art']" ).value;
    const split_artnumber = art_phone_number.split(" ");

    var art_values = {};
    art_values = {
    userid : userid,
    nom : values.nom_art,
    prenom : values.prenom_art,
    pseudo : values.pseudo_art,
    cni : values.num_cdi_art,
    indication : values.indication_art,
    indicatif : split_artnumber[0],
    number : split_artnumber[1],

   }
   console.log(art_values)
   try {
    await axios
      .post(`${apiUrl}/auth/update_art`,
                [
                       {artisan : art_values},
                      
                                        
                ]
         )
      .then((result) => {
        console.log(result);
        if(result?.data != undefined){
          const msg = result?.data?.msg;
          var notif = result?.data?.notification;
          toast.info('sauvegarde en cours' , {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
           });
           setTimeout(() => {

        if(msg === "update success"){
          toast.success(notif , {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
        });
        setData_artisanupd();
        }
        else{
            toast.error('mise à jour échouée!',
              {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              } 
            );

        }
      }, 4000); // Délai de 5 secondes
      } 
        
          });

    // navigate("/login");
  } catch (err) {
    console.log("erreur");
    // setError(err.response.data);
  }
  }

  // update admin depot
  else if(form_type === "admin depot"){
    console.log(values)
    const admdepot_phone_number = document.querySelector(".react-international-phone-input[name='phone_admdepot']" ).value;
    const split_admdepotnumber = admdepot_phone_number.split(" ");

    var admdepot_values = {};
    admdepot_values = {
    userid : userid,
    nom : values.nom_admindepot,
    prenom : values.prenom_admindepot,
    pseudo : values.pseudo_admindepot,
    cni : values.num_cdi_admindepot,
    indication : values.indication_admindepo,
    indicatif : split_admdepotnumber[0],
    number : split_admdepotnumber[1],

   }
   console.log(admdepot_values)
   try {
    await axios
      .post(`${apiUrl}/auth/update_admdepot`,
                [
                       {admin_depot : admdepot_values},
                      
                                        
                ]
         )
      .then((result) => {
        console.log(result);
        if(result?.data != undefined){
          const msg = result?.data?.msg;
          var notif = result?.data?.notification;
          toast.info('sauvegarde en cours' , {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
           });
           setTimeout(() => {

        if(msg === "update success"){
          toast.success(notif , {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
        });
        setData_admindepotupd();
        }
        else{
            toast.error('mise à jour échouée!',
              {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              } 
            );

        }
      }, 4000); // Délai de 5 secondes
      }

        
        
          });

    // navigate("/login");
  } catch (err) {
    console.log("erreur");
    // setError(err.response.data);
  }
  }

  // update livreur
  else if(form_type === "livreur"){
    console.log(values)
    const lv_phone_number = document.querySelector(".react-international-phone-input[name='phone_livr']" ).value;
    const split_lvnumber = lv_phone_number.split(" ");

    var lv_values = {};
    lv_values = {
      userid : userid,
      nom : values.nom_livreur,
      prenom : values.prenom_livreur,
      pseudo : values.pseudo_livreur,
      cni : values.num_cdi_livreur,
      indication : values.indication_livreur,
      indicatif : split_lvnumber[0],
      number : split_lvnumber[1],

   }
   console.log(lv_values)
   try {
    await axios
      .post(`${apiUrl}/auth/update_lv`,
                [
                       {liv : lv_values},
                      
                                        
                ]
         )
      .then((result) => {
        console.log(result);
        if(result?.data != undefined){
          const msg = result?.data?.msg;
          var notif = result?.data?.notification;
          toast.info('sauvegarde en cours' , {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
           });
           setTimeout(() => {

        if(msg === "update success"){
          toast.success(notif , {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
        });
        setData_livreurupd();
        }
        else{
            toast.error('mise à jour échouée!',
              {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              } 
            );

        }
      }, 4000); // Délai de 5 secondes
      }

         
        
          });

    // navigate("/login");
  } catch (err) {
    console.log("erreur");
    // setError(err.response.data);
  }
  }

  // return false;
};  

console.log("info_artisan")
console.log(info_user)
// console.log(info_vendeur.length)

  return (
    <>
    <Header_banner  data_props ={{ 
                            title: 'Mes comptes',
                          }} 
    />

       
     <div className="body-wrapper">
     <main id="MainContent" className="content-for-layout">
               <ToastContainer />

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
                                                            <label className='edit_btn' onClick={setDataupd}>
                                                              modifier
                                                            </label>
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
                                                                              <label className="label">mot de passe actuel</label>
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
                                                                            <div className="item_list col-12">
                                                                            <fieldset>
                                                                              <label className="label">nouveau mot de passe </label>
                                                                              <input
                                                                                type="password"
                                                                                name="new_password"
                                                                                value={values.new_password}
                                                                                autoComplete="off"
                                                                                placeholder=""
                                                                                onChange={(e) =>
                                                                                  setValues({ ...values, new_password: e.target.value })
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

                                                                          {info_user?.telnumber === null || info_user?.telnumber === undefined || info_user?.telnumber === "" ? 
                                                                            (
                                                                                <p className="subtotal-value"> - </p>
                                                                            )

                                                                            :

                                                                            (
                                                                              <p className="subtotal-value">  {`${info_user?.indicatif}`} {info_user?.telnumber}</p>

                                                                            )

                                                                        }

                                                                      </div>
                                                                      <div className="item_list">
                                                                          <h4 className="subtotal-title">Pseudo</h4>
                                                                          {info_user?.name === null || info_user?.name === undefined || info_user?.name === ""? 
                                                                            (
                                                                                <p className="subtotal-value"> - </p>
                                                                            )

                                                                            :

                                                                            (
                                                                              <p className="subtotal-value"> {info_user?.name}</p>

                                                                            )

                                                                        }
                                                                      
                                                                      </div>
                                                                      <div className="item_list">
                                                                          <h4 className="subtotal-title">Mot de passe</h4>
                                                                          {info_user?.password === null || info_user?.password === undefined || info_user?.password === ""? 
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
                                              
                                                <form onSubmit={handleSubmit}  data-form ="acheteur">
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
                                                            <label className='edit_btn'  onClick={setData_acheteurupd}>
                                                              modifier
                                                            </label>
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

                                                           <div className="item_list col-12">
                                                                    <fieldset>
                                                                      <label className="label">votre nom</label>
                                                                      <input
                                                                        type="text"
                                                                        name="nom_acheteur"
                                                                        value={values.nom_acheteur}
                                                                        autoComplete="off"
                                                                        // placeholder="votre pseudo"
                                                                        onChange={(e) =>
                                                                          setValues({ ...values, nom_acheteur: e.target.value })
                                                                        }
                                                                        className="form-control form-control-lg"
                                                                      />
                                                                    </fieldset>
                                                                  </div>

                                                                  <div className="item_list col-12">
                                                                    <fieldset>
                                                                      <label className="label">votre prénom</label>
                                                                      <input
                                                                        type="text"
                                                                        name="prenom_acheteur"
                                                                        value={values.prenom_acheteur}
                                                                        autoComplete="off"
                                                                        // placeholder="votre pseudo"
                                                                        onChange={(e) =>
                                                                          setValues({ ...values, prenom_acheteur: e.target.value })
                                                                        }
                                                                        className="form-control form-control-lg"
                                                                      />
                                                                    </fieldset>
                                                                  </div>
                                      
                                                                  <div className="item_list col-12">
                                                                    <fieldset>
                                                                      <label className="label">Numéro de téléphone</label>
                                                                      <PhoneInput
                                                                        id="acheteur_tel"
                                                                        defaultCountry="tg"
                                                                        name="acheteur_tel"
                                                                        value={phone_acheteur}
                                                                        onChange={(phone_acheteur) => setPhoneAcheteur(phone_acheteur)}
                                                                      />
                                                                      {/* <input type="number"   name='tel' autoComplete='off' placeholder='votre numéro de téléphone'
                                                                                        onChange={(e) => setValues({...values, tel : e.target.value})} className="form-control form-control-lg" /> */}
                                                                    </fieldset>
                                                                  </div>
                                                                  <div className="item_list col-12">
                                                                    <fieldset>
                                                                      <label className="label">votre pays</label>
                                                                      <input
                                                                        type="text"
                                                                        name="pays_acheteur"
                                                                        value={values.pays_acheteur}
                                                                        autoComplete="off" 
                                                                        onChange={(e) =>
                                                                          setValues({ ...values, pays_acheteur: e.target.value })
                                                                        }
                                                                        className="form-control form-control-lg"
                                                                      />
                                                                    </fieldset>
                                                                  </div>
                                                                  <div className="item_list col-12">
                                                                    <fieldset>
                                                                      <label className="label">votre ville</label>
                                                                      <input
                                                                        type="text"
                                                                        name="ville_acheteur"
                                                                        value={values.ville_acheteur}
                                                                        autoComplete="off" 
                                                                        onChange={(e) =>
                                                                          setValues({ ...values, ville_acheteur: e.target.value })
                                                                        }
                                                                        className="form-control form-control-lg"
                                                                      />
                                                                    </fieldset>
                                                                  </div>
                                                                  <div className="item_list col-12">
                                                                    <fieldset>
                                                                      <label className="label">votre quartier</label>
                                                                      <input
                                                                        type="text"
                                                                        name="quartier_acheteur"
                                                                        value={values.quartier_acheteur}
                                                                        autoComplete="off" 
                                                                        onChange={(e) =>
                                                                          setValues({ ...values, quartier_acheteur: e.target.value })
                                                                        }
                                                                        className="form-control form-control-lg"
                                                                      />
                                                                    </fieldset>
                                                                  </div>
                                                                  <div className="item_list col-12">
                                                                    <fieldset>
                                                                      <label className="label">indication du domicile</label>
                                                                      <input
                                                                        type="text"
                                                                        name="domicile_acheteur"
                                                                        value={values.domicile_acheteur}
                                                                        autoComplete="off"
                                                                        // placeholder="votre pseudo"
                                                                        onChange={(e) =>
                                                                          setValues({ ...values, domicile_acheteur: e.target.value })
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
                                                                    {info_acheteur?.nomachet === null || info_acheteur?.nomachet === "" || info_acheteur?.nomachet === undefined ? 
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
                                                          {info_acheteur?.nomachet === null || info_acheteur?.nomachet === "" ||info_acheteur?.nomachet === undefined ? 
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
                                                          {info_acheteur?.telachet === null || info_acheteur?.telachet === "" || info_acheteur?.telachet === undefined ? 
                                                            (
                                                                <p className="subtotal-value"> - </p>
                                                            )

                                                            :

                                                            (
                                                              <p className="subtotal-value">{`${info_acheteur?.indicatif}`} {info_acheteur?.telachet}</p>

                                                            )

                                                        }
                                                        
                                                      </div>
                                                      <div className="item_list">
                                                          <h4 className="subtotal-title">Pays</h4>
                                                          {info_acheteur?.pays === null || info_acheteur?.pays === "" || info_acheteur?.pays === undefined? 
                                                            (
                                                                <p className="subtotal-value"> - </p>
                                                            )

                                                            :

                                                            (
                                                              <p className="subtotal-value">{info_acheteur?.pays}</p>

                                                            )

                                                        }
                                                          
                                                      </div>
                                                      <div className="item_list">
                                                          <h4 className="subtotal-title">Ville</h4>
                                                          {info_acheteur?.ville === null || info_acheteur?.ville === "" || info_acheteur?.ville  === undefined? 
                                                            (
                                                                <p className="subtotal-value"> - </p>
                                                            )

                                                            :

                                                            (
                                                              <p className="subtotal-value">{info_acheteur?.ville }</p>

                                                            )

                                                        }
                                                          
                                                      </div>
                                                      <div className="item_list">
                                                          <h4 className="subtotal-title">Quartier</h4>
                                                          {info_acheteur?.quartier  === null || info_acheteur?.quartier === "" || info_acheteur?.quartier  === undefined? 
                                                            (
                                                                <p className="subtotal-value"> - </p>
                                                            )

                                                            :

                                                            (
                                                              <p className="subtotal-value">{info_acheteur?.quartier }</p>

                                                            )

                                                        }
                                                          
                                                      </div>
                                                      <div className="item_list">
                                                          <h4 className="subtotal-title">Domicile</h4>
                                                          {info_acheteur?.adrachet === null || info_acheteur?.adrachet === "" || info_acheteur?.adrachet === undefined? 
                                                            (
                                                                <p className="subtotal-value"> - </p>
                                                            )

                                                            :

                                                            (
                                                              <p className="subtotal-value">{info_acheteur?.adrachet}</p>

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
                                            </form>
                                            </div>
                                        </div>

                           {/*fin compte acheteur */}

                             {/* compte vendeur */}
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="faq-item rounded">
                                                  {info_vendeur.length === 0 ?
                                                  (
                                                   <>
                                                    <h2 className="faq-heading heading_18 collapsed d-flex align-items-center justify-content-between"
                                                       data-bs-toggle="collapse" data-bs-target="#vendeur" aria-expanded="true">
                                                    vendeur
                                                   
                                                    
                                                    
                                                  </h2>
                                                           <label className='activate_btn'>
                                                                      activer
                                                           </label>
                                                   </>

                                                  )

                                                  :

                                                  (
                                                  <>
                                                    <h2 className="faq-heading heading_18 collapsed d-flex align-items-center justify-content-between"
                                                    onClick={setData_vendeur} data-bs-toggle="collapse" data-bs-target="#vendeur">
                                                    vendeur
                                                   
                                                    
                                                      <span className="faq-heading-icon">
                                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F76B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-down">
                                                              <polyline points="6 9 12 15 18 9"></polyline>
                                                          </svg>
                                                      </span>
                                                  </h2>
                                                  { info_vendeur?.type_vendeur === null || info_vendeur?.type_vendeur === "" || info_vendeur?.type_vendeur === undefined || info_vendeur?.type_vendeur === 2 ? 
                                                     
                                                     (
                                                      <>
                                                       <form onSubmit={handleSubmit}  data-form ="vendeur occasionnel">

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
                                                                    <label className='edit_btn'    onClick={setData_vendeurupd}>
                                                                      modifier
                                                                    </label>
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
                                                                                                                              
                                                                  <div>

                                                                      <div className="item_list col-12">
                                                                        <fieldset>
                                                                          <label className="label">votre nom</label>
                                                                          <input
                                                                            type="text"
                                                                            name="nom_oc"
                                                                            value={values.nom_oc}
                                                                            autoComplete="off"
                                                                            placeholder=""
                                                                            onChange={(e) => setValues({ ...values, nom_oc: e.target.value })}
                                                                            className="form-control form-control-lg"
                                                                          />
                                                                        </fieldset>
                                                                      </div>

                                                                      <div className="item_list col-12">
                                                                        <fieldset>
                                                                          <label className="label">votre prénom</label>
                                                                          <input
                                                                            type="text"
                                                                            name="prenom_oc"
                                                                            value={values.prenom_oc}
                                                                            autoComplete="off"
                                                                            placeholder=""
                                                                            onChange={(e) =>
                                                                              setValues({ ...values, prenom_oc: e.target.value })
                                                                            }
                                                                            className="form-control form-control-lg"
                                                                          />
                                                                        </fieldset>
                                                                      </div>
                                                                      <div className="item_list col-12">
                                                                        <fieldset>
                                                                          <label className="label">pseudo vendeur</label>
                                                                          <input
                                                                            type="text"
                                                                            name="pseudo_oc"
                                                                            value={values.pseudo_oc}
                                                                            autoComplete="off"
                                                                            placeholder=""
                                                                            onChange={(e) =>
                                                                              setValues({ ...values, pseudo_oc: e.target.value })
                                                                            }
                                                                            className="form-control form-control-lg"
                                                                          />
                                                                        </fieldset>
                                                                      </div>

                                                                      <div className="item_list col-12">
                                                                        <fieldset>
                                                                          <label className="label">numéro de carte identité</label>
                                                                          <input
                                                                            type="text"
                                                                            name="num_cdi"
                                                                            value={values.num_cdi}
                                                                            autoComplete="off"
                                                                            placeholder=""
                                                                            onChange={(e) =>
                                                                              setValues({ ...values, num_cdi: e.target.value })
                                                                            }
                                                                            className="form-control form-control-lg"
                                                                          />
                                                                        </fieldset>
                                                                      </div>
                                                                      <div className="item_list col-12">
                                                                        <fieldset>
                                                                          <label className="label">Numéro de téléphone</label>
                                                                          <PhoneInput
                                                                            id="oc_tel"
                                                                            defaultCountry="tg"
                                                                              name="phone_occ"
                                                                            value={phone_oc}
                                                                            onChange={(phone_oc) => setPhone_oc(phone_oc)}
                                                                          />
                                                                          {/* <input type="number"   name='tel' autoComplete='off' placeholder='votre numéro de téléphone'
                                                                                                    onChange={(e) => setValues({...values, tel : e.target.value})} className="form-control form-control-lg" /> */}
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
                                                                                    {info_vendeur?.nomvendeur === null || info_vendeur?.nomvendeur === "" || info_vendeur?.nomvendeur === undefined ? 
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
                                                                          {info_vendeur?.prenomvendeur === null || info_vendeur?.prenomvendeur === "" ||info_vendeur?.prenomvendeur === undefined ? 
                                                                            (
                                                                                <p className="subtotal-value"> - </p>
                                                                            )

                                                                            :

                                                                            (
                                                                              <p className="subtotal-value">{info_vendeur?.prenomvendeur}</p>

                                                                            )

                                                                        }
                                                                          
                                                                      </div>
                                                                      <div className="item_list">
                                                                          <h4 className="subtotal-title">Pseudo vendeur</h4>
                                                                          {info_vendeur?.nom_prof_vendeur === null || info_vendeur?.nom_prof_vendeur === "" ||info_vendeur?.nom_prof_vendeur === undefined ? 
                                                                            (
                                                                                <p className="subtotal-value"> - </p>
                                                                            )

                                                                            :

                                                                            (
                                                                              <p className="subtotal-value">{info_vendeur?.nom_prof_vendeur}</p>

                                                                            )

                                                                        }
                                                                          
                                                                      </div>
                                                                      <div className="item_list">
                                                                          <h4 className="subtotal-title">Téléphone</h4>
                                                                          {info_vendeur?.telvendeur === null || info_vendeur?.telvendeur === "" || info_vendeur?.telvendeur === undefined ? 
                                                                            (
                                                                                <p className="subtotal-value"> - </p>
                                                                            )

                                                                            :

                                                                            (
                                                                              <p className="subtotal-value">{`${info_vendeur?.indicatif1}`} {info_vendeur?.telvendeur}</p>

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
                                                       </form>
                                                      </>


                                                     )

                                                     :

                                                     (
                                                      <>
                                                         <form onSubmit={handleSubmit}  data-form ="vendeur pro">

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
                                                                      <label className='edit_btn'    onClick={setData_vendeurupd}>
                                                                        modifier
                                                                      </label>
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
                                                                       <div className="row ">
                                                                         <div className="item_list col-12">
                                                                           <fieldset>
                                                                             <label className="label">nom</label>
                                                                             <input
                                                                               type="text"
                                                                               name="nom_pro"
                                                                               value={values.nom_pro}
                                                                               autoComplete="off"
                                                                               placeholder=""
                                                                               onChange={(e) =>
                                                                                 setValues({ ...values, nom_pro: e.target.value })
                                                                               }
                                                                               className="form-control form-control-lg"
                                                                             />
                                                                           </fieldset>
                                                                         </div>
                                                                         <div className="item_list col-12">
                                                                           <fieldset>
                                                                             <label className="label">prénom</label>
                                                                             <input
                                                                               type="text"
                                                                               name="prenom_pro"
                                                                               value={values.prenom_pro}
                                                                               autoComplete="off"
                                                                               placeholder=""
                                                                               onChange={(e) =>
                                                                                 setValues({ ...values, prenom_pro: e.target.value })
                                                                               }
                                                                               className="form-control form-control-lg"
                                                                             />
                                                                           </fieldset>
                                                                         </div>
                                                                         <div className="item_list col-12">
                                                                           <fieldset>
                                                                             <label className="label">pseudo vendeur</label>
                                                                             <input
                                                                               type="text"
                                                                               name="pseudo_pro"
                                                                               value={values.pseudo_pro}
                                                                               autoComplete="off"
                                                                               placeholder=""
                                                                               onChange={(e) =>
                                                                                 setValues({ ...values, pseudo_pro: e.target.value })
                                                                               }
                                                                               className="form-control form-control-lg"
                                                                             />
                                                                           </fieldset>
                                                                         </div>
                                                                         <div className="item_list col-12">
                                                                           <fieldset>
                                                                             <label className="label">numéro de carte identité</label>
                                                                             <input
                                                                               type="text"
                                                                               name="num_cdi_pro"
                                                                               value={values.num_cdi_pro}
                                                                               autoComplete="off"
                                                                               placeholder=""
                                                                               onChange={(e) =>
                                                                                 setValues({ ...values, num_cdi_pro: e.target.value })
                                                                               }
                                                                               className="form-control form-control-lg"
                                                                             />
                                                                           </fieldset>
                                                                         </div>
                                                                         <div className="item_list col-12">
                                                                           <fieldset>
                                                                             <label className="label">Numéro de téléphone</label>
                                                                             <PhoneInput
                                                                               defaultCountry="tg"
                                                                             name='phone_pro'
                                                                               value={phone_pro}
                                                                               onChange={(phone_pro) => setPhone_pro(phone_pro)}
                                                                             />
                                                                             {/* <input type="number"   name='tel' autoComplete='off' placeholder='votre numéro de téléphone'
                                                                                                   onChange={(e) => setValues({...values, tel : e.target.value})} className="form-control form-control-lg" /> */}
                                                                           </fieldset>
                                                                         </div>

                                                                         {/* <Locations_vendeurpro /> */}

                                                                         <div className="item_list col-12">
                                                                           <fieldset>
                                                                             <label className="label">indications de ladresse</label>
                                                                             <input
                                                                               type="text"
                                                                               name="indication_pro"
                                                                               autoComplete="off"
                                                                               placeholder=""
                                                                               value={values.indication_pro}
                                                                               onChange={(e) =>
                                                                                 setValues({ ...values, indication_pro: e.target.value })
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
                                                                                           {info_vendeur?.nomvendeur === null || info_vendeur?.nomvendeur === "" || info_vendeur?.nomvendeur === undefined ? 
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
                                                                                 {info_vendeur?.prenomvendeur === null || info_vendeur?.prenomvendeur === "" ||info_vendeur?.prenomvendeur === undefined ? 
                                                                                   (
                                                                                       <p className="subtotal-value"> - </p>
                                                                                   )

                                                                                   :

                                                                                   (
                                                                                     <p className="subtotal-value">{info_vendeur?.prenomvendeur}</p>

                                                                                   )

                                                                               }
                                                                                 
                                                                             </div>
                                                                             <div className="item_list">
                                                                                 <h4 className="subtotal-title">Pseudo vendeur</h4>
                                                                                 {info_vendeur?.nom_prof_vendeur === null || info_vendeur?.nom_prof_vendeur === "" ||info_vendeur?.nom_prof_vendeur === undefined ? 
                                                                                   (
                                                                                       <p className="subtotal-value"> - </p>
                                                                                   )

                                                                                   :

                                                                                   (
                                                                                     <p className="subtotal-value">{info_vendeur?.nom_prof_vendeur}</p>

                                                                                   )

                                                                               }
                                                                                 
                                                                             </div>
                                                                             <div className="item_list">
                                                                                 <h4 className="subtotal-title">Téléphone</h4>
                                                                                 {info_vendeur?.telvendeur === null || info_vendeur?.telvendeur === "" || info_vendeur?.telvendeur === undefined ? 
                                                                                   (
                                                                                       <p className="subtotal-value"> - </p>
                                                                                   )

                                                                                   :

                                                                                   (
                                                                                     <p className="subtotal-value">{`${info_vendeur?.indicatif1}`} {info_vendeur?.telvendeur}</p>

                                                                                   )

                                                                               }
                                                                               
                                                                             </div>
                                                                             <div className="item_list">
                                                                                 <h4 className="subtotal-title">Pays</h4>
                                                                                 {info_vendeur?.pays === null || info_vendeur?.pays === "" || info_vendeur?.pays === undefined? 
                                                                                   (
                                                                                       <p className="subtotal-value"> - </p>
                                                                                   )

                                                                                   :

                                                                                   (
                                                                                     <p className="subtotal-value">{info_vendeur?.pays}</p>

                                                                                   )

                                                                               }
                                                                                 
                                                                             </div>
                                                                             <div className="item_list">
                                                                                 <h4 className="subtotal-title">Ville</h4>
                                                                                 {info_vendeur?.ville === null || info_vendeur?.ville === "" || info_vendeur?.ville  === undefined? 
                                                                                   (
                                                                                       <p className="subtotal-value"> - </p>
                                                                                   )

                                                                                   :

                                                                                   (
                                                                                     <p className="subtotal-value">{info_vendeur?.ville }</p>

                                                                                   )

                                                                               }
                                                                                 
                                                                             </div>
                                                                             <div className="item_list">
                                                                                 <h4 className="subtotal-title">Quartier</h4>
                                                                                 {info_vendeur?.quartier  === null || info_vendeur?.quartier === "" || info_vendeur?.quartier  === undefined? 
                                                                                   (
                                                                                       <p className="subtotal-value"> - </p>
                                                                                   )

                                                                                   :

                                                                                   (
                                                                                     <p className="subtotal-value">{info_vendeur?.quartier }</p>

                                                                                   )

                                                                               }
                                                                                 
                                                                             </div>
                                                                             <div className="item_list">
                                                                                 <h4 className="subtotal-title">Domicile</h4>
                                                                                 {info_vendeur?.adrvendeur === null || info_vendeur?.adrvendeur === "" || info_vendeur?.adrvendeur === undefined? 
                                                                                   (
                                                                                       <p className="subtotal-value"> - </p>
                                                                                   )

                                                                                   :

                                                                                   (
                                                                                     <p className="subtotal-value">{info_vendeur?.adrvendeur}</p>

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
                                                        </form>
                                                       </>

                                                     )

                                                }
                                                  </>

                                                  )

                                                  }

                                               

                                         

                                              
                                               
                                            </div>
                                        </div>
                          {/*fin compte vendeur */}

                           {/* compte artisan */}
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="faq-item rounded">
                                            {
                                                // compte artisan non activé
                                                info_artisan.length === 0
                                                  ?

                                                  (
                                                    <>
                                                    <h2 className="faq-heading heading_18 collapsed d-flex align-items-center justify-content-between"
                                                     data-bs-toggle="collapse" data-bs-target="#artisan" aria-expanded="true">
                                                      artisan
                                                      
                                                       
                                                    </h2>

                                                  

                                              <form onSubmit={handleSubmit}  data-form ="artisan">
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
                                                                  <label className='activate_btn' onClick={setData_artisanupd}>
                                                                      activer
                                                                  </label>
                                                                )
                                                                                                                
                                                          }
                                                <div id="artisan" className="">
                                                <div className="box_data mt-3">
                                               
                                                        <>
                                                        {
                                                            artisan_data_upd 
                                                              ? 
                                                              (

                                                                <>
                                                                      <div className="row ">
                                                                        <div className="item_list col-12">
                                                                          <fieldset>
                                                                            <label className="label">nom</label>
                                                                            <input
                                                                              type="text"
                                                                              name="nom_art"
                                                                              value={values.nom_art}
                                                                              autoComplete="off"
                                                                              placeholder=""
                                                                              onChange={(e) =>
                                                                                setValues({ ...values, nom_art: e.target.value })
                                                                              }
                                                                              className="form-control form-control-lg"
                                                                            />
                                                                          </fieldset>
                                                                        </div>
                                                                        <div className="item_list col-12">
                                                                          <fieldset>
                                                                            <label className="label">prénom</label>
                                                                            <input
                                                                              type="text"
                                                                              name="prenom_art"
                                                                              value={values.prenom_art}
                                                                              autoComplete="off"
                                                                              placeholder=""
                                                                              onChange={(e) =>
                                                                                setValues({ ...values, prenom_art: e.target.value })
                                                                              }
                                                                              className="form-control form-control-lg"
                                                                            />
                                                                          </fieldset>
                                                                        </div>
                                                                        <div className="item_list col-12">
                                                                          <fieldset>
                                                                            <label className="label">pseudo artisan</label>
                                                                            <input
                                                                              type="text"
                                                                              name="pseudo_art"
                                                                              value={values.pseudo_art}
                                                                              autoComplete="off"
                                                                              placeholder=""
                                                                              onChange={(e) =>
                                                                                setValues({ ...values, pseudo_art: e.target.value })
                                                                              }
                                                                              className="form-control form-control-lg"
                                                                            />
                                                                          </fieldset>
                                                                        </div>
                                                                        <div className="item_list col-12">
                                                                          <fieldset>
                                                                            <label className="label">numéro de carte identité</label>
                                                                            <input
                                                                              type="text"
                                                                              name="num_cdi_art"
                                                                              value={values.num_cdi_art}
                                                                              autoComplete="off"
                                                                              placeholder=""
                                                                              onChange={(e) =>
                                                                                setValues({ ...values, num_cdi_art: e.target.value })
                                                                              }
                                                                              className="form-control form-control-lg"
                                                                            />
                                                                          </fieldset>
                                                                        </div>
                                                                        <div className="item_list col-12">
                                                                          <fieldset>
                                                                            <label className="label">Numéro de téléphone</label>
                                                                            <PhoneInput
                                                                              defaultCountry="tg"
                                                                              name="phone_art"
                                                                              value={phone_art}
                                                                              onChange={(phone_art) => setPhone_art(phone_art)}
                                                                            />
                                                                            {/* <input type="number"   name='tel' autoComplete='off' placeholder='votre numéro de téléphone'
                                                                                                  onChange={(e) => setValues({...values, tel : e.target.value})} className="form-control form-control-lg" /> */}
                                                                          </fieldset>
                                                                        </div>
                                                                
                                                                        {/* <Locations_artisan /> */}
                                                                        <div className="item_list col-12">
                                                                                <fieldset>
                                                                                  <label className="label">indications de ladresse</label>
                                                                                  <input
                                                                                type="text"
                                                                                name="indication_art"
                                                                                autoComplete="off"
                                                                                placeholder=""
                                                                                value={values.indication_art}
                                                                                onChange={(e) =>
                                                                                setValues({ ...values, indication_art: e.target.value })
                                                                                }
                                                                                className="form-control form-control-lg"
                                                                                />
                                                                                </fieldset>
                                                                                </div>

                                                                                <div className="row">
                                                                                <h6>choisissez vos domaines de prestations</h6>
                                                                                <div className="fit_content">
                                                                                <div className="React__checkbox">
                                                                                <label>
                                                                                <input
                                                                                type="checkbox"
                                                                                className="React__checkbox--input"
                                                                                name="coiffure"
                                                                                // checked={checkedItems["coiffure"] || false}
                                                                                // onChange={handleMultiCheckboxChange}
                                                                                />
                                                                                <span className="React__checkbox--span" /> coiffure
                                                                                </label>

                                                                                </div>
                                                                                <div className="React__checkbox">
                                                                                <label>
                                                                                <input
                                                                                type="checkbox"
                                                                                className="React__checkbox--input"
                                                                                name="stylisme"
                                                                                // checked={checkedItems["stylisme"] || false}
                                                                                // onChange={handleMultiCheckboxChange}
                                                                                />
                                                                                <span className="React__checkbox--span" />  Stylisme
                                                                                </label>

                                                                                </div>
                                                                                <div className="React__checkbox">
                                                                                <label>
                                                                                <input
                                                                                type="checkbox"
                                                                                className="React__checkbox--input"
                                                                                name="shoesmaker"
                                                                                // checked={checkedItems["shoesmaker"] || false}
                                                                                // onChange={handleMultiCheckboxChange}
                                                                                />
                                                                                <span className="React__checkbox--span" /> Shoesmaker

                                                                                </label>

                                                                                </div>

                                                                                <div className="React__checkbox">

                                                                                <label>
                                                                                <input
                                                                                type="checkbox"
                                                                                className="React__checkbox--input"
                                                                                name="tapisserie"
                                                                                // checked={checkedItems["tapisserie"] || false}
                                                                                // onChange={handleMultiCheckboxChange}
                                                                                />
                                                                                <span className="React__checkbox--span" /> Tapisserie

                                                                                </label>

                                                                                </div>
                                                                                <div className="React__checkbox">
                                                                                <label>
                                                                                <input
                                                                                type="checkbox"
                                                                                className="React__checkbox--input"
                                                                                name="esthetique"
                                                                                // checked={checkedItems["esthetique"] || false}
                                                                                // onChange={handleMultiCheckboxChange}
                                                                                />
                                                                                <span className="React__checkbox--span" /> Esthétique

                                                                                </label>

                                                                                </div>
                                                                                </div>
                                                                                </div>
                                                                                </div>

                                                                </>
                                                              )

                                                              :

                                                              ( 
                                                               null
                                                              )
                                                                                                              
                                                        }

                                                        </>
                                               


                                                  


                                                  </div>
                                                </div>
                                                </form>

                                                      
                                                    </>
                                                   
                                                  )

                                                  :

                                                  (

                                                    <>
                                                    <h2 className="faq-heading heading_18 collapsed d-flex align-items-center justify-content-between"
                                                      onClick={setData_artisan} data-bs-toggle="collapse" data-bs-target="#artisan">
                                                      artisan
                                                      
                                                        <span className="faq-heading-icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F76B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-down">
                                                                <polyline points="6 9 12 15 18 9"></polyline>
                                                            </svg>
                                                        </span>
                                                    </h2>
                                                         
                                                            <form onSubmit={handleSubmit}  data-form ="artisan">
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
                                                                  <label className='edit_btn'    onClick={setData_artisanupd}>
                                                                    modifier
                                                                  </label>
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
                                                                                  <div className="row ">
                                                                                    <div className="item_list col-12">
                                                                                      <fieldset>
                                                                                        <label className="label">nom</label>
                                                                                        <input
                                                                                          type="text"
                                                                                          name="nom_art"
                                                                                          value={values.nom_art}
                                                                                          autoComplete="off"
                                                                                          placeholder=""
                                                                                          onChange={(e) =>
                                                                                            setValues({ ...values, nom_art: e.target.value })
                                                                                          }
                                                                                          className="form-control form-control-lg"
                                                                                        />
                                                                                      </fieldset>
                                                                                    </div>
                                                                                    <div className="item_list col-12">
                                                                                      <fieldset>
                                                                                        <label className="label">prénom</label>
                                                                                        <input
                                                                                          type="text"
                                                                                          name="prenom_art"
                                                                                          value={values.prenom_art}
                                                                                          autoComplete="off"
                                                                                          placeholder=""
                                                                                          onChange={(e) =>
                                                                                            setValues({ ...values, prenom_art: e.target.value })
                                                                                          }
                                                                                          className="form-control form-control-lg"
                                                                                        />
                                                                                      </fieldset>
                                                                                    </div>
                                                                                    <div className="item_list col-12">
                                                                                      <fieldset>
                                                                                        <label className="label">pseudo artisan</label>
                                                                                        <input
                                                                                          type="text"
                                                                                          name="pseudo_art"
                                                                                          value={values.pseudo_art}
                                                                                          autoComplete="off"
                                                                                          placeholder=""
                                                                                          onChange={(e) =>
                                                                                            setValues({ ...values, pseudo_art: e.target.value })
                                                                                          }
                                                                                          className="form-control form-control-lg"
                                                                                        />
                                                                                      </fieldset>
                                                                                    </div>
                                                                                    <div className="item_list col-12">
                                                                                      <fieldset>
                                                                                        <label className="label">numéro de carte identité</label>
                                                                                        <input
                                                                                          type="text"
                                                                                          name="num_cdi_art"
                                                                                          value={values.num_cdi_art}
                                                                                          autoComplete="off"
                                                                                          placeholder=""
                                                                                          onChange={(e) =>
                                                                                            setValues({ ...values, num_cdi_art: e.target.value })
                                                                                          }
                                                                                          className="form-control form-control-lg"
                                                                                        />
                                                                                      </fieldset>
                                                                                    </div>
                                                                                    <div className="item_list col-12">
                                                                                      <fieldset>
                                                                                        <label className="label">Numéro de téléphone</label>
                                                                                        <PhoneInput
                                                                                          defaultCountry="tg"
                                                                                          name="phone_art"
                                                                                          value={phone_art}
                                                                                          onChange={(phone_art) => setPhone_art(phone_art)}
                                                                                        />
                                                                                        {/* <input type="number"   name='tel' autoComplete='off' placeholder='votre numéro de téléphone'
                                                                                                              onChange={(e) => setValues({...values, tel : e.target.value})} className="form-control form-control-lg" /> */}
                                                                                      </fieldset>
                                                                                    </div>
                                                                            
                                                                                    {/* <Locations_artisan /> */}
                                                                                    <div className="item_list col-12">
                                                                                            <fieldset>
                                                                                              <label className="label">indications de ladresse</label>
                                                                                              <input
                                                            type="text"
                                                            name="indication_art"
                                                            autoComplete="off"
                                                            placeholder=""
                                                            value={values.indication_art}
                                                            onChange={(e) =>
                                                            setValues({ ...values, indication_art: e.target.value })
                                                            }
                                                            className="form-control form-control-lg"
                                                            />
                                                            </fieldset>
                                                            </div>

                                                            <div className="row">
                                                            <h6>choisissez vos domaines de prestations</h6>
                                                            <div className="fit_content">
                                                            <div className="React__checkbox">
                                                            <label>
                                                            <input
                                                            type="checkbox"
                                                            className="React__checkbox--input"
                                                            name="coiffure"
                                                            // checked={checkedItems["coiffure"] || false}
                                                            // onChange={handleMultiCheckboxChange}
                                                            />
                                                            <span className="React__checkbox--span" /> coiffure
                                                            </label>

                                                            </div>
                                                            <div className="React__checkbox">
                                                            <label>
                                                            <input
                                                            type="checkbox"
                                                            className="React__checkbox--input"
                                                            name="stylisme"
                                                            // checked={checkedItems["stylisme"] || false}
                                                            // onChange={handleMultiCheckboxChange}
                                                            />
                                                            <span className="React__checkbox--span" />  Stylisme
                                                            </label>

                                                            </div>
                                                            <div className="React__checkbox">
                                                            <label>
                                                            <input
                                                            type="checkbox"
                                                            className="React__checkbox--input"
                                                            name="shoesmaker"
                                                            // checked={checkedItems["shoesmaker"] || false}
                                                            // onChange={handleMultiCheckboxChange}
                                                            />
                                                            <span className="React__checkbox--span" /> Shoesmaker

                                                            </label>

                                                            </div>

                                                            <div className="React__checkbox">

                                                            <label>
                                                            <input
                                                            type="checkbox"
                                                            className="React__checkbox--input"
                                                            name="tapisserie"
                                                            // checked={checkedItems["tapisserie"] || false}
                                                            // onChange={handleMultiCheckboxChange}
                                                            />
                                                            <span className="React__checkbox--span" /> Tapisserie

                                                            </label>

                                                            </div>
                                                            <div className="React__checkbox">
                                                            <label>
                                                            <input
                                                            type="checkbox"
                                                            className="React__checkbox--input"
                                                            name="esthetique"
                                                            // checked={checkedItems["esthetique"] || false}
                                                            // onChange={handleMultiCheckboxChange}
                                                            />
                                                            <span className="React__checkbox--span" /> Esthétique

                                                            </label>

                                                            </div>
                                                            </div>
                                                            </div>
                                                            </div>

                                                                            </>
                                                                          )

                                                                          :

                                                                          ( 
                                                                            <>
                                                                                <div className="item_list">
                                                                                        <h4 className="subtotal-title">Nom</h4>
                                                                                        {info_artisan?.nom_artisan === null || info_artisan?.nom_artisan === "" || info_artisan?.nom_artisan === undefined ? 
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
                                                                                  {info_artisan?.prenom_artisan === null || info_artisan?.prenom_artisan === "" ||info_artisan?.prenom_artisan === undefined ? 
                                                                                    (
                                                                                        <p className="subtotal-value"> - </p>
                                                                                    )

                                                                                    :

                                                                                    (
                                                                                      <p className="subtotal-value">{info_artisan?.prenom_artisan}</p>

                                                                                    )

                                                                                }
                                                                                  
                                                                              </div>
                                                                              <div className="item_list">
                                                                                  <h4 className="subtotal-title">Pseudo</h4>
                                                                                  {info_artisan?.pseudo_artisan === null || info_artisan?.pseudo_artisan === "" ||info_artisan?.pseudo_artisan === undefined ? 
                                                                                    (
                                                                                        <p className="subtotal-value"> - </p>
                                                                                    )

                                                                                    :

                                                                                    (
                                                                                      <p className="subtotal-value">{info_artisan?.pseudo_artisan}</p>

                                                                                    )

                                                                                }
                                                                                  
                                                                              </div>
                                                                              <div className="item_list">
                                                                                  <h4 className="subtotal-title">Téléphone</h4>
                                                                                  {info_artisan?.tel_artisan === null || info_artisan?.tel_artisan === "" ||info_artisan?.tel_artisan === undefined ? 
                                                                                      (
                                                                                        <p className="subtotal-value"> - </p>
                                                                                    )

                                                                                    :

                                                                                    (
                                                                                      <p className="subtotal-value">{`${info_artisan?.indicatif_artisan}`} {info_artisan?.tel_artisan}</p>

                                                                                    )

                                                                                }
                                                                                
                                                                              </div>
                                                                              <div className="item_list">
                                                                                  <h4 className="subtotal-title">Pays</h4>
                                                                                  {info_artisan?.pays_artisan === null || info_artisan?.pays_artisan === "" ||info_artisan?.pays_artisan === undefined ? 
                                                                                    (
                                                                                        <p className="subtotal-value"> - </p>
                                                                                    )

                                                                                    :

                                                                                    (
                                                                                      <p className="subtotal-value">{info_artisan?.pays_artisan}</p>

                                                                                    )

                                                                                }
                                                                                  
                                                                              </div>
                                                                              <div className="item_list">
                                                                                  <h4 className="subtotal-title">Ville</h4>
                                                                                  {info_artisan?.ville_artisan === null || info_artisan?.ville_artisan === "" ||info_artisan?.ville_artisan === undefined ? 
                                                                                    (
                                                                                        <p className="subtotal-value"> - </p>
                                                                                    )

                                                                                    :

                                                                                    (
                                                                                      <p className="subtotal-value">{info_artisan?.ville_artisan }</p>

                                                                                    )

                                                                                }
                                                                                  
                                                                              </div>
                                                                              <div className="item_list">
                                                                                  <h4 className="subtotal-title">Quartier</h4>
                                                                                  {info_artisan?.quartier_artisan === null || info_artisan?.quartier_artisan === "" ||info_artisan?.quartier_artisan === undefined ? 
                                                                                    (
                                                                                        <p className="subtotal-value"> - </p>
                                                                                    )

                                                                                    :

                                                                                    (
                                                                                      <p className="subtotal-value">{info_artisan?.quartier_artisan }</p>

                                                                                    )

                                                                                }
                                                                                  
                                                                              </div>
                                                                              <div className="item_list">
                                                                                  <h4 className="subtotal-title">Domicile</h4>
                                                                                  {info_artisan?.adr_artisan === null || info_artisan?.adr_artisan === "" ||info_artisan?.adr_artisan === undefined ? 
                                                                                    (
                                                                                        <p className="subtotal-value"> - </p>
                                                                                    )

                                                                                    :

                                                                                    (
                                                                                      <p className="subtotal-value">{info_artisan?.adr_artisan}</p>

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
                                                            </form>
                                                    </>
                                                  

                                                  )
                                                }


                                                
                                              
                                            </div>
                                        </div>
                          {/* compte artisan */}
                          {/* compte admin depot */}

                        
                                               

                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="faq-item rounded">

                                            {info_admindepot.length === 0 ?
                                               (
                                              <>
                                               <h2 className="faq-heading heading_18 collapsed d-flex align-items-center justify-content-between"
                                                 data-bs-toggle="collapse" data-bs-target="#admindepot" aria-expanded="true">
                                                  admin. de dépôt
                                                  
                                                   
                                                </h2>

                                               

<form onSubmit={handleSubmit}  data-form ="admin depot">
                                            
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
                                                                 <label className='activate_btn'    onClick={setData_admindepotupd}>
                                                                   activer
                                                                 </label>
                                                               )
                                                                                                               
                                                         }       

                                            <div id="admindepot" className="accordion-collapse collapse show">
                                            <div className="box_data mt-3">
                                            
                                                     <>
                                                     {
                                                         admindep_data_upd 
                                                           ? 
                                                           (
   
                                                             <>
                                                                  <div className="row ">
                                                                  <div className="item_list col-12">
                                                                        <fieldset>
                                                                          <label className="label">nom</label>
                                                                          <input
                                                                            type="text"
                                                                            name="nom_admindepot"
                                                                            value={values.nom_admindepot}
                                                                            autoComplete="off"
                                                                            placeholder=""
                                                                            onChange={(e) =>
                                                                              setValues({ ...values, nom_admindepot: e.target.value })
                                                                            }
                                                                            className="form-control form-control-lg"
                                                                          />
                                                                        </fieldset>
                                                                      </div>
                                                                      <div className="item_list col-12">
                                                                        <fieldset>
                                                                          <label className="label">prénom</label>
                                                                          <input
                                                                            type="text"
                                                                            name="prenom_admindepot"
                                                                            value={values.prenom_admindepot}
                                                                            autoComplete="off"
                                                                            placeholder=""
                                                                            onChange={(e) =>
                                                                              setValues({ ...values, prenom_admindepot: e.target.value })
                                                                            }
                                                                            className="form-control form-control-lg"
                                                                          />
                                                                        </fieldset>
                                                                      </div>
                                                                      <div className="item_list col-12">
                                                                        <fieldset>
                                                                          <label className="label">pseudo adminstrateur de dépôt</label>
                                                                          <input
                                                                            type="text"
                                                                            name="pseudo_admindepot"
                                                                            value={values.pseudo_admindepot}
                                                                            autoComplete="off"
                                                                            placeholder=""
                                                                            onChange={(e) =>
                                                                              setValues({ ...values, pseudo_admindepot: e.target.value })
                                                                            }
                                                                            className="form-control form-control-lg"
                                                                          />
                                                                        </fieldset>
                                                                      </div>
                                                                      <div className="item_list col-12">
                                                                        <fieldset>
                                                                          <label className="label">numéro de carte identité</label>
                                                                          <input
                                                                            type="text"
                                                                            name="num_cdi_admindepot"
                                                                            value={values.num_cdi_admindepot}
                                                                            autoComplete="off"
                                                                            placeholder=""
                                                                            onChange={(e) =>
                                                                              setValues({ ...values, num_cdi_admindepot: e.target.value })
                                                                            }
                                                                            className="form-control form-control-lg"
                                                                          />
                                                                        </fieldset>
                                                                      </div>
                                                                      <div className="item_list col-12">
                                                                        <fieldset>
                                                                          <label className="label">Numéro de téléphone</label>
                                                                          <PhoneInput
                                                                            defaultCountry="tg"
                                                                            name='phone_admdepot'
                                                                            value={phone_admindepot}
                                                                            onChange={(phone_admindepot) =>
                                                                              setPhone_admindepot(phone_admindepot)
                                                                            }
                                                                          />
                                                                          {/* <input type="number"   name='tel' autoComplete='off' placeholder='votre numéro de téléphone'
                                                                                                onChange={(e) => setValues({...values, tel : e.target.value})} className="form-control form-control-lg" /> */}
                                                                        </fieldset>
                                                                      </div>
                                                              
                                                                      {/* <Locations_admindepot /> */}
                                                                      <div className="item_list col-12">
                                                                                        <fieldset>
                                                                                          <label className="label">indications de ladresse</label>
                                                                                          <input
                                                                                            type="text"
                                                                                            name="indication_admindepo"
                                                                                            autoComplete="off"
                                                                                            placeholder=""
                                                                                            value={values.indication_admindepo}
                                                                                            onChange={(e) =>
                                                                                              setValues({ ...values, indication_admindepo: e.target.value })
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
                                                          null
                                                           )
                                                                                                           
                                                     }
   
                                                     </>
                                                

                                                  
                                          
                                          
                                              </div>
                                            </div>
                                            </form>
                                                
                                              </>
                                               )
                                               :

                                               (
                                                  <>
                                                    {admindep_data && (
                                                         <>
                                                            <h2 className="faq-heading heading_18 collapsed d-flex align-items-center justify-content-between"
                                                                  onClick={setData_admindepot} data-bs-toggle="collapse" data-bs-target="#admindepot">
                                                                  admin. de dépôt
                                                                  
                                                                    <span className="faq-heading-icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F76B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-down">
                                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                                        </svg>
                                                                    </span>
                                                                </h2>
                                                      
       
                                                         </>
                                                    )}

                                            <form onSubmit={handleSubmit}  data-form ="admin depot">
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
                                                                 <label className='edit_btn'    onClick={setData_admindepotupd}>
                                                                   modifier
                                                                 </label>
                                                               )
                                                                                                               
                                                         }
                                              

                                            <div id="admindepot" className="accordion-collapse collapse">
                                            <div className="box_data mt-3">
                                            {admindep_data && (
                                                     <>
                                                     {
                                                         admindep_data_upd 
                                                           ? 
                                                           (
   
                                                             <>
                                                                  <div className="row ">
                                                                  <div className="item_list col-12">
                                                                        <fieldset>
                                                                          <label className="label">nom</label>
                                                                          <input
                                                                            type="text"
                                                                            name="nom_admindepot"
                                                                            value={values.nom_admindepot}
                                                                            autoComplete="off"
                                                                            placeholder=""
                                                                            onChange={(e) =>
                                                                              setValues({ ...values, nom_admindepot: e.target.value })
                                                                            }
                                                                            className="form-control form-control-lg"
                                                                          />
                                                                        </fieldset>
                                                                      </div>
                                                                      <div className="item_list col-12">
                                                                        <fieldset>
                                                                          <label className="label">prénom</label>
                                                                          <input
                                                                            type="text"
                                                                            name="prenom_admindepot"
                                                                            value={values.prenom_admindepot}
                                                                            autoComplete="off"
                                                                            placeholder=""
                                                                            onChange={(e) =>
                                                                              setValues({ ...values, prenom_admindepot: e.target.value })
                                                                            }
                                                                            className="form-control form-control-lg"
                                                                          />
                                                                        </fieldset>
                                                                      </div>
                                                                      <div className="item_list col-12">
                                                                        <fieldset>
                                                                          <label className="label">pseudo adminstrateur de dépôt</label>
                                                                          <input
                                                                            type="text"
                                                                            name="pseudo_admindepot"
                                                                            value={values.pseudo_admindepot}
                                                                            autoComplete="off"
                                                                            placeholder=""
                                                                            onChange={(e) =>
                                                                              setValues({ ...values, pseudo_admindepot: e.target.value })
                                                                            }
                                                                            className="form-control form-control-lg"
                                                                          />
                                                                        </fieldset>
                                                                      </div>
                                                                      <div className="item_list col-12">
                                                                        <fieldset>
                                                                          <label className="label">numéro de carte identité</label>
                                                                          <input
                                                                            type="text"
                                                                            name="num_cdi_admindepot"
                                                                            value={values.num_cdi_admindepot}
                                                                            autoComplete="off"
                                                                            placeholder=""
                                                                            onChange={(e) =>
                                                                              setValues({ ...values, num_cdi_admindepot: e.target.value })
                                                                            }
                                                                            className="form-control form-control-lg"
                                                                          />
                                                                        </fieldset>
                                                                      </div>
                                                                      <div className="item_list col-12">
                                                                        <fieldset>
                                                                          <label className="label">Numéro de téléphone</label>
                                                                          <PhoneInput
                                                                            defaultCountry="tg"
                                                                            name='phone_admdepot'
                                                                            value={phone_admindepot}
                                                                            onChange={(phone_admindepot) =>
                                                                              setPhone_admindepot(phone_admindepot)
                                                                            }
                                                                          />
                                                                          {/* <input type="number"   name='tel' autoComplete='off' placeholder='votre numéro de téléphone'
                                                                                                onChange={(e) => setValues({...values, tel : e.target.value})} className="form-control form-control-lg" /> */}
                                                                        </fieldset>
                                                                      </div>
                                                              
                                                                      {/* <Locations_admindepot /> */}
                                                                      <div className="item_list col-12">
                                                                                        <fieldset>
                                                                                          <label className="label">indications de ladresse</label>
                                                                                          <input
                                                                                            type="text"
                                                                                            name="indication_admindepo"
                                                                                            autoComplete="off"
                                                                                            placeholder=""
                                                                                            value={values.indication_admindepo}
                                                                                            onChange={(e) =>
                                                                                              setValues({ ...values, indication_admindepo: e.target.value })
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
                                                                    {info_admindepot?.nom_admindepot === null || info_admindepot?.nom_admindepot === "" || info_admindepot?.nom_admindepot === undefined ? 
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
                                                              {info_admindepot?.prenom_admindepot === null || info_admindepot?.prenom_admindepot === "" || info_admindepot?.prenom_admindepot === undefined ? 
                                                                        (
                                                                    <p className="subtotal-value"> - </p>
                                                                )

                                                                :

                                                                (
                                                                  <p className="subtotal-value">{info_admindepot?.prenom_admindepot}</p>

                                                                )

                                                            }
                                                              
                                                          </div>
                                                          <div className="item_list">
                                                              <h4 className="subtotal-title">Pseudo</h4>
                                                              {info_admindepot?.pseudo_admindepot === null || info_admindepot?.pseudo_admindepot === "" || info_admindepot?.pseudo_admindepot === undefined ? 
                                                                       (
                                                                    <p className="subtotal-value"> - </p>
                                                                )

                                                                :

                                                                (
                                                                  <p className="subtotal-value">{info_admindepot?.pseudo_artisan}</p>

                                                                )

                                                            }
                                                              
                                                          </div>
                                                          <div className="item_list">
                                                              <h4 className="subtotal-title">Téléphone</h4>
                                                              {info_admindepot?.telephone_admindepot === null || info_admindepot?.telephone_admindepot === "" || info_admindepot?.telephone_admindepot === undefined ? 
                                                                         (
                                                                    <p className="subtotal-value"> - </p>
                                                                )

                                                                :

                                                                (
                                                                  <p className="subtotal-value">{`${info_admindepot?.indicatif_admindepot}`} {info_admindepot?.telephone_admindepot}</p>

                                                                )

                                                            }
                                                            
                                                          </div>
                                                          <div className="item_list">
                                                              <h4 className="subtotal-title">Pays</h4>
                                                              {info_admindepot?.pays_admindepot === null || info_admindepot?.pays_admindepot === "" || info_admindepot?.pays_admindepot === undefined ? 
                                                                       (
                                                                    <p className="subtotal-value"> - </p>
                                                                )

                                                                :

                                                                (
                                                                  <p className="subtotal-value">{info_admindepot?.pays_admindepot}</p>

                                                                )

                                                            }
                                                              
                                                          </div>
                                                          <div className="item_list">
                                                              <h4 className="subtotal-title">Ville</h4>
                                                              {info_admindepot?.ville_admindepot === null || info_admindepot?.ville_admindepot === "" || info_admindepot?.ville_admindepot === undefined ? 
                                                                       (
                                                                    <p className="subtotal-value"> - </p>
                                                                )

                                                                :

                                                                (
                                                                  <p className="subtotal-value">{info_admindepot?.ville_admindepot }</p>

                                                                )

                                                            }
                                                              
                                                          </div>
                                                          <div className="item_list">
                                                              <h4 className="subtotal-title">Quartier</h4>
                                                              {info_admindepot?.quartier_admindepot === null || info_admindepot?.quartier_admindepot === "" || info_admindepot?.quartier_admindepot === undefined ? 
                                                                        (
                                                                    <p className="subtotal-value"> - </p>
                                                                )

                                                                :

                                                                (
                                                                  <p className="subtotal-value">{info_admindepot?.quartier_admindepot }</p>

                                                                )

                                                            }
                                                              
                                                          </div>
                                                          <div className="item_list">
                                                              <h4 className="subtotal-title">Domicile</h4>
                                                              {info_admindepot?.adr_admindepot === null || info_admindepot?.adr_admindepot === "" || info_admindepot?.adr_admindepot === undefined ? 
                                                                       (
                                                                    <p className="subtotal-value"> - </p>
                                                                )

                                                                :

                                                                (
                                                                  <p className="subtotal-value">{info_admindepot?.adr_admindepot}</p>

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
                                            </form>
                                                  </>
                                               )

                                               }


                                               
                                            
                                            </div>
                                        </div>
                         {/* compte admin depot */}

                          {/* compte livreur */}

                          
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="faq-item rounded">
                                            {info_livreur.length === 0 ?
                                                    (

                                                      <>
                                                       <h2 className="faq-heading heading_18 collapsed d-flex align-items-center justify-content-between"
                                                           data-bs-toggle="collapse" data-bs-target="#livreur" aria-expanded="true">
                                                              livreur
                                                        
                                                           
                                                        </h2>

                                                      

                                                              {/* formulaire d'enrégistrement */}
                                                              <form onSubmit={handleSubmit}  data-form ="livreur">
                                                 
                                                              {
                                                                  livreur_data_upd 
                                                                    ? 
                                                                    (
            
                                                                      <>
                                                                        <button className='save_btn'>
                                                                                                                    sauver
                                                                    </button>
                                                                            <button className='cancel_btn' onClick={setData_livreurupd}>
                                                                                                                          Annuler
                                                                            </button>
            
                                                                      </>
                                                                    )
            
                                                                    :
            
                                                                    ( 
                                                                      <label className='activate_btn' onClick={setData_livreurupd}>
                                                                        activer
                                                                      </label>
                                                                    )
                                                                                                                    
                                                              }


                                                  
                                                 <div id="livreur" className="accordion-collapse collapse show">
                                                   <div className="box_data mt-3">

                                                 
                                                     <>
                                                     {
                                                         livreur_data_upd 
                                                           ? 
                                                           (
   
                                                             <>
                                                                   <div className="row ">
                                                                   <div className="item_list col-12">
                                                                       <fieldset>
                                                                         <label className="label">nom</label>
                                                                         <input
                                                                           type="text"
                                                                           name="nom_livreur"
                                                                           value={values.nom_livreur}
                                                                           autoComplete="off"
                                                                           placeholder=""
                                                                           onChange={(e) =>
                                                                             setValues({ ...values, nom_livreur: e.target.value })
                                                                           }
                                                                           className="form-control form-control-lg"
                                                                         />
                                                                       </fieldset>
                                                                     </div>
                                                                     <div className="item_list col-12">
                                                                       <fieldset>
                                                                         <label className="label">prénom</label>
                                                                         <input
                                                                           type="text"
                                                                           name="prenom_livreur"
                                                                           value={values.prenom_livreur}
                                                                           autoComplete="off"
                                                                           placeholder=""
                                                                           onChange={(e) =>
                                                                             setValues({ ...values, prenom_livreur: e.target.value })
                                                                           }
                                                                           className="form-control form-control-lg"
                                                                         />
                                                                       </fieldset>
                                                                     </div>
                                                                     <div className="item_list col-12">
                                                                       <fieldset>
                                                                         <label className="label">pseudo livreur</label>
                                                                         <input
                                                                           type="text"
                                                                           name="pseudo_livreur"
                                                                           value={values.pseudo_livreur}
                                                                           autoComplete="off"
                                                                           placeholder=""
                                                                           onChange={(e) =>
                                                                             setValues({ ...values, pseudo_livreur: e.target.value })
                                                                           }
                                                                           className="form-control form-control-lg"
                                                                         />
                                                                       </fieldset>
                                                                     </div>
                                                                     <div className="item_list col-12">
                                                                       <fieldset>
                                                                         <label className="label">numéro de carte identité</label>
                                                                         <input
                                                                           type="text"
                                                                           name="num_cdi_livreur"
                                                                           value={values.num_cdi_livreur}
                                                                           autoComplete="off"
                                                                           placeholder=""
                                                                           onChange={(e) =>
                                                                             setValues({ ...values, num_cdi_livreur: e.target.value })
                                                                           }
                                                                           className="form-control form-control-lg"
                                                                         />
                                                                       </fieldset>
                                                                     </div>
                                                                     <div className="item_list col-12">
                                                                       <fieldset>
                                                                         <label className="label">Numéro de téléphone</label>
                                                                         <PhoneInput
                                                                           defaultCountry="tg"
                                                                           name='phone_livr'
                                                                           value={phone_livreur}
                                                                           onChange={(phone_livreur) => setPhone_livreur(phone_livreur)}
                                                                         />
                                                                         {/* <input type="number"   name='tel' autoComplete='off' placeholder='votre numéro de téléphone'
                                                                                               onChange={(e) => setValues({...values, tel : e.target.value})} className="form-control form-control-lg" /> */}
                                                                       </fieldset>
                                                                     </div>
                                                             
                                                                     {/* <Locations_livreur /> */}
                                                                     <div className="item_list col-12">
                                                                                       <fieldset>
                                                                                         <label className="label">indications de ladresse</label>
                                                                                         <input
                                                                                           type="text"
                                                                                           name="indication_livreur"
                                                                                           autoComplete="off"
                                                                                           placeholder=""
                                                                                           value={values.indication_livreur}
                                                                                           onChange={(e) =>
                                                                                             setValues({ ...values, indication_livreur: e.target.value })
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
                                                              null
                                                           )
                                                                                                           
                                                     }
   
                                                     </>
                                                     
                                                   </div>
                                                 </div>
                                             </form>
 
                                                      </>
                                                   
                                                    )
                                                    :

                                                    (
                                                        <>
                                                         <h2 className="faq-heading heading_18 collapsed d-flex align-items-center justify-content-between"
                                                            onClick={setData_livreur} data-bs-toggle="collapse" data-bs-target="#livreur">
                                                                livreur
                                                          
                                                              <span className="faq-heading-icon">
                                                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F76B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-down">
                                                                      <polyline points="6 9 12 15 18 9"></polyline>
                                                                  </svg>
                                                              </span>
                                                          </h2>
                                                        

                                            <form onSubmit={handleSubmit}  data-form ="livreur">
                                                 
                                            {livreur_data && (
                                                              <>
                                                              {
                                                                  livreur_data_upd 
                                                                    ? 
                                                                    (
            
                                                                      <>
                                                                        <button className='save_btn'>
                                                                                                                    sauver
                                                                    </button>
                                                                            <button className='cancel_btn' onClick={setData_livreurupd}>
                                                                                                                          Annuler
                                                                            </button>
            
                                                                      </>
                                                                    )
            
                                                                    :
            
                                                                    ( 
                                                                      <label className='edit_btn' onClick={setData_livreurupd}>
                                                                        modifier
                                                                      </label>
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
                                                                   <div className="row ">
                                                                   <div className="item_list col-12">
                                                                       <fieldset>
                                                                         <label className="label">nom</label>
                                                                         <input
                                                                           type="text"
                                                                           name="nom_livreur"
                                                                           value={values.nom_livreur}
                                                                           autoComplete="off"
                                                                           placeholder=""
                                                                           onChange={(e) =>
                                                                             setValues({ ...values, nom_livreur: e.target.value })
                                                                           }
                                                                           className="form-control form-control-lg"
                                                                         />
                                                                       </fieldset>
                                                                     </div>
                                                                     <div className="item_list col-12">
                                                                       <fieldset>
                                                                         <label className="label">prénom</label>
                                                                         <input
                                                                           type="text"
                                                                           name="prenom_livreur"
                                                                           value={values.prenom_livreur}
                                                                           autoComplete="off"
                                                                           placeholder=""
                                                                           onChange={(e) =>
                                                                             setValues({ ...values, prenom_livreur: e.target.value })
                                                                           }
                                                                           className="form-control form-control-lg"
                                                                         />
                                                                       </fieldset>
                                                                     </div>
                                                                     <div className="item_list col-12">
                                                                       <fieldset>
                                                                         <label className="label">pseudo livreur</label>
                                                                         <input
                                                                           type="text"
                                                                           name="pseudo_livreur"
                                                                           value={values.pseudo_livreur}
                                                                           autoComplete="off"
                                                                           placeholder=""
                                                                           onChange={(e) =>
                                                                             setValues({ ...values, pseudo_livreur: e.target.value })
                                                                           }
                                                                           className="form-control form-control-lg"
                                                                         />
                                                                       </fieldset>
                                                                     </div>
                                                                     <div className="item_list col-12">
                                                                       <fieldset>
                                                                         <label className="label">numéro de carte identité</label>
                                                                         <input
                                                                           type="text"
                                                                           name="num_cdi_livreur"
                                                                           value={values.num_cdi_livreur}
                                                                           autoComplete="off"
                                                                           placeholder=""
                                                                           onChange={(e) =>
                                                                             setValues({ ...values, num_cdi_livreur: e.target.value })
                                                                           }
                                                                           className="form-control form-control-lg"
                                                                         />
                                                                       </fieldset>
                                                                     </div>
                                                                     <div className="item_list col-12">
                                                                       <fieldset>
                                                                         <label className="label">Numéro de téléphone</label>
                                                                         <PhoneInput
                                                                           defaultCountry="tg"
                                                                           name='phone_livr'
                                                                           value={phone_livreur}
                                                                           onChange={(phone_livreur) => setPhone_livreur(phone_livreur)}
                                                                         />
                                                                         {/* <input type="number"   name='tel' autoComplete='off' placeholder='votre numéro de téléphone'
                                                                                               onChange={(e) => setValues({...values, tel : e.target.value})} className="form-control form-control-lg" /> */}
                                                                       </fieldset>
                                                                     </div>
                                                             
                                                                     {/* <Locations_livreur /> */}
                                                                     <div className="item_list col-12">
                                                                                       <fieldset>
                                                                                         <label className="label">indications de ladresse</label>
                                                                                         <input
                                                                                           type="text"
                                                                                           name="indication_livreur"
                                                                                           autoComplete="off"
                                                                                           placeholder=""
                                                                                           value={values.indication_livreur}
                                                                                           onChange={(e) =>
                                                                                             setValues({ ...values, indication_livreur: e.target.value })
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
                                                                           {info_livreur?.nom_livreur === null || info_livreur?.nom_livreur === "" || info_livreur?.nom_livreur === undefined ? 
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
                                                                     {info_livreur?.prenom_livreur === null || info_livreur?.prenom_livreur === "" || info_livreur?.prenom_livreur === undefined ? 
                                                                             (
                                                                           <p className="subtotal-value"> - </p>
                                                                       )

                                                                       :

                                                                       (
                                                                         <p className="subtotal-value">{info_livreur?.prenom_livreur}</p>

                                                                       )

                                                                   }
                                                                     
                                                                 </div>
                                                                 <div className="item_list">
                                                                     <h4 className="subtotal-title">Pseudo</h4>
                                                                     {info_livreur?.pseudo_livreur === null || info_livreur?.pseudo_livreur === "" || info_livreur?.pseudo_livreur === undefined ? 
                                                                             (
                                                                           <p className="subtotal-value"> - </p>
                                                                       )

                                                                       :

                                                                       (
                                                                         <p className="subtotal-value">{info_livreur?.pseudo_livreur}</p>

                                                                       )

                                                                   }
                                                                     
                                                                 </div>
                                                                 <div className="item_list">
                                                                     <h4 className="subtotal-title">Téléphone</h4>
                                                                     {info_livreur?.tel_livreur === null || info_livreur?.tel_livreur === "" || info_livreur?.tel_livreur === undefined ? 
                                                                              (
                                                                           <p className="subtotal-value"> - </p>
                                                                       )

                                                                       :

                                                                       (
                                                                         <p className="subtotal-value">{`${info_livreur?.indicatif_livreur}`} {info_livreur?.tel_livreur}</p>

                                                                       )

                                                                   }
                                                                   
                                                                 </div>
                                                                 <div className="item_list">
                                                                     <h4 className="subtotal-title">Pays</h4>
                                                                     {info_livreur?.pays_livreur === null || info_livreur?.pays_livreur === "" || info_livreur?.pays_livreur === undefined ? 
                                                                              (
                                                                           <p className="subtotal-value"> - </p>
                                                                       )

                                                                       :

                                                                       (
                                                                         <p className="subtotal-value">{info_livreur?.pays_livreur}</p>

                                                                       )

                                                                   }
                                                                     
                                                                 </div>
                                                                 <div className="item_list">
                                                                     <h4 className="subtotal-title">Ville</h4>
                                                                     {info_livreur?.ville_livreur === null || info_livreur?.ville_livreur === "" || info_livreur?.ville_livreur === undefined ? 
                                                                            (
                                                                           <p className="subtotal-value"> - </p>
                                                                       )

                                                                       :

                                                                       (
                                                                         <p className="subtotal-value">{info_livreur?.ville_livreur }</p>

                                                                       )

                                                                   }
                                                                     
                                                                 </div>
                                                                 <div className="item_list">
                                                                     <h4 className="subtotal-title">Quartier</h4>
                                                                     {info_livreur?.quartier_livreur === null || info_livreur?.quartier_livreur === "" || info_livreur?.quartier_livreur === undefined ? 
                                                                              (
                                                                           <p className="subtotal-value"> - </p>
                                                                       )

                                                                       :

                                                                       (
                                                                         <p className="subtotal-value">{info_livreur?.quartier_livreur }</p>

                                                                       )

                                                                   }
                                                                     
                                                                 </div>
                                                                 <div className="item_list">
                                                                     <h4 className="subtotal-title">Domicile</h4>
                                                                     {info_livreur?.adresse_livreur === null || info_livreur?.adresse_livreur === "" || info_livreur?.adresse_livreur === undefined ? 
                                                                             (
                                                                           <p className="subtotal-value"> - </p>
                                                                       )

                                                                       :

                                                                       (
                                                                         <p className="subtotal-value">{info_livreur?.adresse_livreur}</p>

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
                                                        </>
                                                    )

                                               }
                                               
                                            
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
                                                <h2 className="faq-heading heading_18 d-flex align-items-center justify-content-between collapsed">
                                                 Ecos Money
                                                     
                                                </h2>
                                                <form onSubmit={handleSubmit}  data-form ="em">
                                               

                                                  <>
                                                  {
                                                      em_data_upd 
                                                        ? 
                                                        (

                                                          <>
                                                          <button className='save_btn'>
                                                                                                          sauver
                                                          </button>
                                                            <button className='cancel_btn' onClick={setEmDataupd}>
                                                                                                          Annuler
                                                            </button>

                                                          </>
                                                        )

                                                        :

                                                        ( 
                                                        <label className='edit_btn' onClick={setEmDataupd}>
                                                          modifier
                                                        </label>
                                                        )
                                                                                                        
                                                  }

                                                  </>

                                             
                                                    <div id="em" className="accordion-collapse collapse show">
                                                    <div className="box_data mt-3">

                                                           <>
                                                              {
                                                                em_data_upd 
                                                                  ? 
                                                                  (
                                                                    <>
                                                                      
                                                                          <div className="item_list col-12">
                                                                            <fieldset>
                                                                              <label className="label">votre nom</label>
                                                                              <input
                                                                                type="text"
                                                                                name="nom_prop"
                                                                                value={values.nom_prop}
                                                                                autoComplete="off"
                                                                                onChange={(e) =>
                                                                                  setValues({ ...values, nom_prop: e.target.value })
                                                                                }
                                                                                className="form-control form-control-lg"
                                                                              />
                                                                            </fieldset>
                                                                          </div>
                                                                          <div className="item_list col-12">
                                                                            <fieldset>
                                                                              <label className="label">votre prénom</label>
                                                                              <input
                                                                                type="text"
                                                                                name="prenom_prop"
                                                                                value={values.prenom_prop}
                                                                                autoComplete="off"
                                                                                onChange={(e) =>
                                                                                  setValues({ ...values, prenom_prop: e.target.value })
                                                                                }
                                                                                className="form-control form-control-lg"
                                                                              />
                                                                            </fieldset>
                                                                          </div>
                                                                          <div className="item_list col-12">
                                                                            <fieldset>
                                                                              <label className="label">Numéro de téléphone</label>
                                                                              <div className='tel_container'>
                                                                              <PhoneInput
                                                                                id="em_tel"
                                                                                defaultCountry="tg"
                                                                                name="em_tel"
                                                                                value={phone_em}
                                                                                onChange={(phone_em) => setPhoneEm(phone_em)}
                                                                              />


                                                                              </div>
                                                                            
                                                                              {/* <input type="number"   name='tel' autoComplete='off' placeholder='votre numéro de téléphone'
                                                                                                onChange={(e) => setValues({...values, tel : e.target.value})} className="form-control form-control-lg" /> */}
                                                                            </fieldset>
                                                                          </div>
                                                                         
                                                                        
                                                                          <div className="item_list col-12">
                                                                            <fieldset>
                                                                              <label className="label">mot de passe actuel</label>
                                                                              <input
                                                                                type="password"
                                                                                name="password_em"
                                                                                value={values.em_old_password}
                                                                                autoComplete="off"
                                                                                placeholder=""
                                                                                onChange={(e) =>
                                                                                  setValues({ ...values, em_old_password: e.target.value })
                                                                                }
                                                                                className="form-control form-control-lg"
                                                                              />
                                                                            </fieldset>
                                                                          </div>
                                                                            <div className="item_list col-12">
                                                                            <fieldset>
                                                                              <label className="label">nouveau mot de passe </label>
                                                                              <input
                                                                                type="password"
                                                                                name="em_new_password"
                                                                                value={values.em_new_password}
                                                                                autoComplete="off"
                                                                                placeholder=""
                                                                                onChange={(e) =>
                                                                                  setValues({ ...values, em_new_password: e.target.value })
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
                                                                                <p className="subtotal-value">{info_em?.prenom_proprietaire}</p>

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
                                                                                <p className="subtotal-value">{`${info_em?.indicatif}`} {info_em?.tel_proprietaire}</p>

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
                                                              
                                                                     </>
                                                                  


                                                                  )

                                                            }
                                                              
                                                          </>

                                                    </div>



                                                      {/* gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg */}
                                                    
                                                    
                                                    </div>
                                                </form>
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
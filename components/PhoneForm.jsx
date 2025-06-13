// import { auth } from '../firebase-config';
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useState } from 'react';

import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { sendOtp, verifyOtp_serv, resetPassword } from '../sevices/authserices';
// const apiUrl = "https://apiafro.aafrodites.com";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome ,faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PhoneForm = ({onOtpSuccess}) => {
  
const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

    // const [phone, setPhone] = useState('');
    // const navigate = useNavigate();
    // console.log(onOtpSuccess)
    const [code_pays, setcode_pays] = useState("+228");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState('');
    const [otpview, setOtpview] = useState("test");
  
    
    const [message, setMessage] = useState('');
  
    console.log('message:', message)
  
  const handlePhoneChange = (e) => {
      setPhoneNumber(e.target.value);
    };
  
    const handleSendCode = async (e) => {
      e.preventDefault();
  
      // const data = { code_pays, phoneNumber };
       const loadingToast = toast.info('demande en cours...', {
        position: "top-center",
        autoClose: false, // Ne ferme pas la notification automatiquement
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
     
     const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        const phon_num = code_pays +''+ phoneNumber;
        console.log("phon_num")
        console.log(phon_num)
  //    const data = { 
  //     indicatif :code_pays,
  //     number : phoneNumber,
  //     date : formattedDate
  // };
  
      // console.log(data)
      // return false;
      try {
    
        // await sendOtp(phone);
        const send_otp =  await sendOtp(phon_num);
      
              console.log(send_otp)
              setOtpview(send_otp?.data?.code)
              
              // return false;
              toast.dismiss(loadingToast);
              // success('Code OTP envoyé avec succès')
              toast.success('Code OTP envoyé avec succès', {
                position: "top-center",
                autoClose: 2000,
                // autoClose: true, // Ne ferme pas la notification automatiquement
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
              });

              // toast.success('Code OTP envoyé avec succès');
              setStep(2);
    
          // console.log("result")
          // console.log(result)
          // window.confirmationResult = confirmationResult;
        // return false;
        // onCodeSent(result);
          // await axios
          //  .post(`${apiUrl}/auth/verify_number`,
          //   data
          //    )
          //  .then((result) => {
       
         
          //  console.log(result)
          //      if(result){
          //         // Dismiss la notification de "sauvegarde en cours"
          //          toast.dismiss(loadingToast);
          //          console.log("result")
          //          console.log(result)
          //          return false;
        
          //          const subCategoriesToCheck = new Set([
          //           "meet_afrodite_former_mannequinnat",
          //           "meet_afrodite_hotesse_accueil",
          //           "meet_afrodite_influenceur",
          //           "meet_afrodite_maquillage",
          //           "meet_afrodite_former_selfconfiance",
          //           "meet_afrodite_etiquette_image",
          //           "meet_afrodite_former_fitness"
          //         ]);
                  
          //         if (formData?.rencontrer_afrodite?.etat_candidature) {
          //           setContacter_afrodites(1);
          //         } else if (
          //           formData?.formation?.some(
          //             (formation) =>
          //               formation?.category === "meet_afrodite_formation" ||
          //               formation?.subCategories?.some((sub) => subCategoriesToCheck.has(sub))
          //           )
          //         ) {
          //           setContacter_afrodites(1);
          //         }
    
          //           //  if(formData?.rencontrer_afrodite?.etat_candidature === true){
    
          //           //   setContacter_afrodites(1)
          //           //  }
          //           //   if(formData?.formation.length > 0){
          //           //   for(let i= 0; i < formData?.formation.length; i++){
          //           //     if(formData?.formation[i]?.category === "meet_afrodite_formation"){
    
          //           //       setContacter_afrodites(1)
          //           //     }
                       
          //           //       if(formData?.formation[i]?.subCategories.length > 0){
          //           //         // alert('bis')
          //           //         for(let j = 0; j < formData?.formation[i]?.subCategories.length; j++){
          //           //           if((formData?.formation[i]?.subCategories[j] ==="meet_afrodite_former_mannequinnat")
          //           //           || (formData?.formation[i]?.subCategories[j] ==="meet_afrodite_hotesse_accueil")
                            
          //           //           || (formData?.formation[i]?.subCategories[j] ==="meet_afrodite_influenceur")
          //           //           || (formData?.formation[i]?.subCategories[j] ==="meet_afrodite_maquillage")
          //           //           || (formData?.formation[i]?.subCategories[j] ==="meet_afrodite_former_selfconfiance")
          //           //           || (formData?.formation[i]?.subCategories[j] ==="meet_afrodite_etiquette_image")
          //           //           || (formData?.formation[i]?.subCategories[j] ==="meet_afrodite_former_fitness")
          //           //           )
          //           //           {
          //           //             setContacter_afrodites(1)
          //           //           }
          //           //       }
          //           //        }
                      
          //           //     }
          //           //   }
          //           //  alert('pass')
          //         //  vérifier si il y a des cas de contacter afrodites
          //          if(result?.data?.user === undefined){
    
          //           if(result?.data?.msg){
          //             // alert('1')
          //             toast.error(result?.data?.msg, {
          //               position: "top-center",
          //               autoClose: 3000,
          //               hideProgressBar: true,
          //               closeOnClick: true,
          //               pauseOnHover: true,
          //               draggable: true,
          //               progress: undefined,
          //               theme: "light",
          //               // transition: Bounce,
          //             });
                      
     
          //           }
    
          //           setNewUser(0)
          //           setIsModalOpen(true)
    
          //           setIsSubmitting(false); 
     
          //          }
          //          else{
          //           // alert('2')
          //           // alert('test')
          //           if(result?.data?.msg){
          //             toast.error(result?.data?.msg, {
          //               position: "top-center",
          //               autoClose: 3000,
          //               hideProgressBar: true,
          //               closeOnClick: true,
          //               pauseOnHover: true,
          //               draggable: true,
          //               progress: undefined,
          //               theme: "light",
          //               // transition: Bounce,
          //             });
                      
          //             setIsSubmitting(false); 
     
          //           }
          //           else{
          //             toast.success('demande soumis avec succès' , {
          //               position: "top-center",
          //               autoClose: 3000,
          //               hideProgressBar: true,
          //               closeOnClick: true,
          //               pauseOnHover: true,
          //               draggable: true,
          //               progress: undefined,
          //               theme: "light",
          //               // transition: Bounce,
          //             });
                      
          //            //  setIsModalOpen(true)
          //             if(result.data?.user != null && result.data?.token != null){
          //               // Sauvegarder les données du user dans le localStorage
          //               const   user   = result.data?.user; // Assurez-vous que `response.data.user` contient l'ID, le pseudo et le password
          //               const  token = result.data?.token; // Assurez-vous que `response.data.user` contient l'ID, le pseudo et le password
                       
          //               setAuth_ids((prevState) => ({
          //                 ...prevState,
          //                 auth: {
                           
          //                   pseudo: result.data?.pseudo || "", // Si phone1 est vide, on met une chaîne vide pour éviter les erreurs
          //                   pass: result.data?.pass || "-",
                            
          //                 },
          //               }));
                     
          //               setNewUserData([user , result.data?.pass])
          //                auth.saveToLocalStorage(user ,token);
          //             setNewUser(1)
          //             setIsModalOpen(true)
    
          //             setIsSubmitting(false); 
     
          //                   }
     
          //           }
    
          //          }
    
          //         //  return false;
          //          // affciher une notif
          //          // setIsNotification(true)
               
                 
                   
    
                  
               
     
          //      }
    
             
          //    }); 
             
       } catch (err) {
         console.log(err);
         // setError(err.response.data);
       }   
      
  };

  
  const verifyOtp = async (e) => {
    e.preventDefault();

    const loadingToast = toast.info('vérification en cours...', {
      position: "top-center",
      autoClose: false, // Ne ferme pas la notification automatiquement
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
    const phon_num = code_pays +''+ phoneNumber;
      
    // alert("b")
    try {

    
      console.log([phon_num +" " + otp])
      const res =   await verifyOtp_serv(phon_num, otp);
      // await axios.post(`${apiUrl}/auth/verify-otp`,{ phon_num, code: otp }  );
     
      // const res = await axios.post('/api/auth/verify-otp', { phone, code: otp });
      if (res.data) {
           console.log(res.data)

          toast.dismiss(loadingToast);
        toast.success('Code valide', {
          position: "top-center",
          autoClose: 2000,
          // autoClose: true, // Ne ferme pas la notification automatiquement
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        setStep(3);
        // onOtpSuccess(phon_num);
       
        // toast.success('Code valide');

      } else {
        toast.info('Code invalide');

        setMessage("Code invalide");
      }
    } catch {
      toast.info('Vérification échouée');

      setMessage("Vérification échouée");
    }
  };

  const handleResetPassword = async (e) => {
  e.preventDefault();
  const phon_num = code_pays +''+ phoneNumber;
  console.log("phon_num")
  console.log(phon_num)
console.log(otp)
    try {
      const { data } = await resetPassword(phon_num, otp, newPassword);

      console.log(data)
      // return false;
      toast.success('Mot de passe réinitialisé');
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Redirige après 3 secondes
    } catch {
      toast.error('Échec de la réinitialisation');
    }
  };
//   const handleSendCode = async () => {
//     window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//       size: 'invisible',
//     });

//     const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
//     onCodeSent(confirmation);
//   };

  return (
    <>
    
        <ToastContainer className="toast_style"/>
        {/* <div id="recaptcha-container"></div> */}
        {step === 1 && (
        <>
    
     <div className="otp_box">
      <div className="form_title">
        <label>Récupération de mot de passe</label>
   
        </div>
      <form className="form_zone">

           <div className="form_control">

<div className="indicatif">

<input type="text" 
className="indicatif input_padding" 
placeholder="code"
value={code_pays} 
onChange={(e) => setcode_pays(e.target.value)} />

</div>

<div className="tel_number">

<input type="tel" className="contact input_padding" placeholder="numéro"
    value={phoneNumber} onChange={handlePhoneChange}  />
   
</div>

         </div>
         
      <div className="btn_container">
    
           <button onClick={handleSendCode}>Envoyer le code</button>
   
      </div>
     
      </form>

      </div>
      </>
      )}
      {step === 2 && (
        <>
        <div className="otp_verify">
      <div className="form_title">
        <label>vérifier code</label>
             {otpview && 
             (
              <lebel className="showcode">taper :
              <span>
              {otpview}
                </span> </lebel>
             )}
        </div>
      <form className="form_zone">

           <div className="form_control">

<div className="tel_number">

<input type="tel" 
className="contact input_padding" 
placeholder="Entrez OTP"
value={otp} 
onChange={(e) => setOtp(e.target.value)} />

</div>
 
         </div>
         
      <div className="btn_container">
    
           <button onClick={verifyOtp}>vérifier</button>
   
      </div>
     
      </form>

      </div>

      </>
      )}

     {step === 3 && (
          <div className="otp_verify">
          <div className="form_title">
            <label>changer de mot de passe</label>
       
            </div>
            <form className="form_zone">

<div className="form_control">

<div className="passreset">

          <input value={newPassword} 
          onChange={e => setNewPassword(e.target.value)} 
          placeholder="Nouveau mot de passe" 
          type={showPassword ? 'text' : 'password'}
           />
    
    
<FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              className="icon"
              style={{
                // border : "1px solid red" ,
                // height : "100%",
                fontSize : "17px",
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#999',
              }}
            />

</div>
 
 </div>
 <div className="btn_container">
    
<button onClick={handleResetPassword}>Changer le mot de passe</button>
</div>
     
     </form>
       </div>
      )}

          </>
  );
};

export default PhoneForm;

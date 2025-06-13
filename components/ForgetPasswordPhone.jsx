import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
// import { auth } from '../sevices/firebase';
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import PhoneForm from './PhoneForm';
import OtpForm from './OtpForm';

const apiUrl = "https://apiafro.aafrodites.com";

const ForgetPasswordPhone = ({ onCodeSent }) => {

    const [confirmation, setConfirmation] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    

  return (

    <>
    
    <ToastContainer className="toast_style"/>
    
    <div  className="body-wrapper">
          <div className="forgotpass-page">
                <div className="container">
                         <PhoneForm />
      </div>
      </div>
    </div>
    </>
   
  );
};

export default ForgetPasswordPhone;

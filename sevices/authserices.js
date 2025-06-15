import axios from 'axios';

const apiUrl = "https://apiafro.aafrodites.com";
export const sendOtp = async (phon_num) => {
  return axios.post(`${apiUrl}/auth/send-otp`,{phon_num} );
//   axios.post('/api/auth/send-otp', { phone });
};

export const verifyOtp_serv = async (phon_num, otp) => {
    
    return axios.post(`${apiUrl}/auth/verify-otp`,{phon_num: phon_num, code: otp }  );
     
    // axios.post('/api/auth/verify-otp', { phon_num: phon_num, code });
  };

  
export const resetPassword = async (phone, code, newPassword) => {
    // return axios.post(`${apiUrl}/auth/verify-otp`,{phon_num: phon_num, code: otp }  );
   
    return axios.post(`${apiUrl}/auth/reset-password`, {
      phone,
      code,
      newPassword,
    });
  };
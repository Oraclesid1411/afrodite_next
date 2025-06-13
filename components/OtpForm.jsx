
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OtpForm = ({ confirmationResult, onVerified }) => {
    const [code, setCode] = useState('');
  
    const handleVerify = async () => {
      try {
        const result = await confirmationResult.confirm(code);
        const idToken = await result.user.getIdToken();
  
        const res = await fetch('http://localhost:3001/api/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });
  
        const data = await res.json();
        onVerified(data);
      } catch (err) {
        alert('Code invalide');
      }
    };
  
    return (
      <div>
        <input type="text" placeholder="Entrer le code" onChange={(e) => setCode(e.target.value)} />
        <button onClick={handleVerify}>Vérifier le code</button>
      </div>
    );
  };
  
export default OtpForm;

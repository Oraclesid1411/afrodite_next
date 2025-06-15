// src/services/NotificationService.js
// import { initializeApp } from "firebase/app";
import { messaging, getToken ,onMessage } from "../firebase-config";

import axios from "axios";



// Fonction pour écouter les messages en mode actif
export const onMessageListener = () =>
    new Promise((resolve) => {
        
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    });

    // console.log("onMessageListener")
    
    // console.log(onMessageListener)
const requestPermission = async (userId) => {
    
       const apiUrl = 'https://apiafro.aafrodites.com'
  try {

   
    const token = await getToken(messaging, {
        // apiKey: "AIzaSyDtM-RWuVPGEi5VuZCkIdVyr8hECnaE1ys",
      vapidKey: "BEWbdstOgwYSY7wOkbPuZz-xqWqAJZVARi9XG6-DDGLjdVvbIkvffABc5en2MFYppI-SlNLzgbcLDCuXeI0iPgo", // Obtenez cette clé dans Firebase Console > Project Settings > Cloud Messaging
    });

    if (token) {
      // console.log("Token FCM : ", token);
      // // Envoyez le token au backend pour l'associer à l'utilisateur
      // console.log("id user")
      // console.log(userId)

      try {
        if(userId){
            const save_token  =  await axios.post(`${apiUrl}/auth/saveFcmToken`, 
                { userId: userId ,
                    token: token, 
               });
          //  console.log(save_token)
          //   console.log("Token FCM enregistré avec succès.");
        }
        else{
            return token;
        }
     
      } catch (error) {
        console.error("Erreur lors de l'envoi du token au serveur :", error);
      }
    } else {
      console.log("Pas de token disponible. Autorisation non accordée.");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du token : ", error);
  }
};

export default requestPermission;

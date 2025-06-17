// app/components/LayoutWrapper.jsx
'use client';


import { useState , useEffect  } from 'react'
import { usePathname } from 'next/navigation';
// import Header_menu from './Header_menu';
// import FixedMenu from './FixedMenu';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

import { useAuth } from "../Context/AuthenticateContext";
import { onMessage, getToken, isSupported as isMessagingSupported, getMessaging } from 'firebase/messaging';
import requestPermission from '../sevices/NotificationService';
import Header_menu from './Header_menu';
import FixedMenu from './FixedMenu';

export default function LayoutWrapper({ children }) {

  const auth = useAuth();
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const initMessaging = async () => {
      if (typeof window === 'undefined') return;
      if (!auth?.currentUser) return; // Attendre que l'utilisateur soit connecté

      const supported = await isMessagingSupported();
      if (!supported) {
        console.warn('⚠️ Firebase Messaging non supporté dans ce navigateur.');
        return;
      }

      const messaging = getMessaging();

      const user = auth.currentUser;
      setAdminName(user?.pseudo || user?.email || 'Admin');

      await requestPermission(user.uid);

      // Réception des messages FCM
      onMessage(messaging, (payload) => {
        alert(`🔔 Notification : ${payload?.notification?.title || 'Nouvelle notification'}`);
      });
    };

    initMessaging();
  }, [auth?.currentUser]); // déclenche quand currentUser devient dispo


  const pathname = usePathname();
  const isAuthPage = ['/login', '/register', '/forgotpass', '/postuler', '/creerfranchise', '/creercomptebusiness'].includes(pathname);

  return (
    <div id="root">
      {!isAuthPage && <Header_menu />}
      <main>
        <ToastContainer className="toast_style" />
        <Suspense fallback={<div>Chargement...</div>}>
          {children}
        </Suspense>
      </main>
      {!isAuthPage && <FixedMenu />}
    </div>
  );
}

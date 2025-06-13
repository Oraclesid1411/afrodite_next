// app/components/LayoutWrapper.jsx
'use client';

import { usePathname } from 'next/navigation';
import Header_menu from '../components/Header_menu';
import FixedMenu from '../components/FixedMenu';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAuthPage = ['/login', '/register', '/forgotpass'].includes(pathname);

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

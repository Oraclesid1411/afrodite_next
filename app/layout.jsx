// app/layout.jsx
import './assets/css/new_styles.scss';
import './assets/css/vendor.css';
import './assets/css/style_main-min.css';
import './assets/css/style.scss';
import 'react-toastify/dist/ReactToastify.css';

import AuthProvider from '../Context/AuthenticateContext';
import LayoutWrapper from '../components/LayoutWrapper';

export const metadata = {
  title: 'Afrodites',
  description: 'Professional platform for managing models, photographers, stylists and creative contributors',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com/" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&amp;display=swap"
          rel="preload"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>

        <script src="/assets/js/vendor-min.js"></script>
        <script src="/assets/js/main-min.js"></script>
      </body>
    </html>
  );
}

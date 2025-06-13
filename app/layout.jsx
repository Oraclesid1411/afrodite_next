// app/layout.jsx
export const metadata = {
    title: 'Test NextJS',
    description: 'Projet de test simple Next.js pour déploiement Vercel',
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="fr">
        <body>
          <header style={{ padding: '1rem', backgroundColor: '#f3f4f6' }}>
            <h1 style={{ margin: 0 }}>Bienvenue sur le test</h1>
          </header>
          <main style={{ padding: '2rem' }}>{children}</main>
        </body>
      </html>
    );
  }
  
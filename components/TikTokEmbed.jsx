import { useEffect } from 'react';

const TikTokEmbed = ({ videoUrl }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const videoIdMatch = videoUrl.match(/\/video\/(\d+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  if (!videoId) return <p>❌ URL TikTok invalide</p>;

  return (
    <blockquote
      className="tiktok-embed"
      cite={videoUrl}
      data-video-id={videoId}
      style={{ maxWidth: '325px', minWidth: '200px' }}
    >
      <section>Chargement...</section>
    </blockquote>
  );
};

export default TikTokEmbed;

import React, { useRef, useState } from "react";

const CameraCapture = ({ onCapture, onClose }) => {
  const videoRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Démarrer la caméra
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOpen(true);
      }
    } catch (err) {
      console.error("Erreur lors de l'accès à la caméra : ", err);
      alert("Impossible d'accéder à la caméra.");
    }
  };

  // Capturer une image
  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const image = canvas.toDataURL("image/png");
      onCapture(image); // Retourne l'image capturée
    }
  };

  // Fermer la caméra et arrêter le flux vidéo
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsCameraOpen(false);
    onClose();
  };

  return (
    <div className="camera-moda camera_viewl">
      <div className="camera-overlay" onClick={stopCamera}></div>
      <div className="camera-container">
        {isCameraOpen ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{ width: "100%", height: "auto" }}
            ></video>
            <button className="btn-capture" onClick={captureImage}>
              Capturer
            </button>
            <button className="btn-close" onClick={stopCamera}>
              Fermer
            </button>
          </>
        ) : (
          <button className="btn-start-camera" onClick={startCamera}>
            Activer la caméra
          </button>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;

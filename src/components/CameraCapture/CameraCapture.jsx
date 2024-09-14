import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gymVideoLarge from '../../assets/gym.mp4';
import gymVideoSmall from '../../assets/gymjao.mp4';
import './CameraCapture.css';
import { FaStar, FaTimes } from 'react-icons/fa'; // Importing both star and times icons

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoSource, setVideoSource] = useState(gymVideoLarge);
  const [showMessage, setShowMessage] = useState(false); // State to manage message visibility
  const navigate = useNavigate();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraOpen(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    setVideoPlaying(true);
  };

  const goToHomePage = () => {
    navigate('/');
  };

  const toggleMessage = () => {
    setShowMessage(!showMessage);
  };

  useEffect(() => {
    const updateVideoSource = () => {
      if (window.innerWidth <= 768) {
        setVideoSource(gymVideoSmall);
      } else {
        setVideoSource(gymVideoLarge);
      }
    };

    updateVideoSource();
    window.addEventListener('resize', updateVideoSource);

    return () => window.removeEventListener('resize', updateVideoSource);
  }, []);

  return (
    <div className="camera-capture-container">
      {!videoPlaying && (
        <div>
          {!isCameraOpen && (
            <>
              <h2 className="heading">Open Camera to Analyze Yourself</h2>
              <p className="subheading">
                See if you're ready to hit the gym or need a bit more motivation!
              </p>
            </>
          )}
          <video ref={videoRef} autoPlay className="camera-video" />
          <div className="button-container">
            {!isCameraOpen && (
              <button onClick={startCamera} className="camera-button">Open Camera</button>
            )}
            {isCameraOpen && (
              <>
                <button onClick={capturePhoto} className="camera-button">Capture Photo</button>
              </>
            )}
          </div>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {videoPlaying && (
        <div className="video-fullscreen">
          <video src={videoSource} controls autoPlay loop className="gym-video" />
          <button onClick={goToHomePage} className="lets-go-button btn">Let's Go</button>
        </div>
      )}
      <div className="hidden-message-container">
        {!showMessage ? (
          <FaStar
            className="hidden-message-icon"
            onClick={toggleMessage}
            title="Click me for a surprise!"
          />
        ) : (
          <FaTimes
            className="hidden-message-icon close-icon"
            onClick={toggleMessage}
            title="Close message"
          />
        )}
        {showMessage && (
          <div className="hidden-message">
            Congratulations! You have found a hidden and special component! 
            <br />
            PS: Just For Fun
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;

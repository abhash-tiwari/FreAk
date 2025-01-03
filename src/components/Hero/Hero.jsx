import React, { useState } from 'react';
import './Hero.css';
import hero from "../../assets/abs.jpg";
import Heart from "../../assets/heart.png";
import imgB from '../../assets/hero_image_back.png';
import Calories from "../../assets/calories.png";
import { motion } from 'framer-motion';
import NumberCounter from 'number-counter';
import { useNavigate } from 'react-router-dom';
import vid from "../../assets/bg.mp4";
import { useAuth0 } from "@auth0/auth0-react";

const Hero = () => {
  const transition = { type: "spring", duration: 3 };
  const mobile = window.innerWidth <= 768 ? true : false;
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [showAlert, setShowAlert] = useState(false);

  // Custom notification styles
  const alertStyle = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#ff4444',
    color: 'white',
    padding: '1rem',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
    textAlign: 'center',
    animation: 'fadeIn 0.3s ease-in',
    minWidth: '300px'
  };

  const handleProtectedRoute = (route) => {
    if (!isAuthenticated) {
      setShowAlert(true);
      // Hide alert after 3 seconds
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    navigate(route);
  };

  const handleExplore = () => {
    handleProtectedRoute('/exercises');
  };

  const handleLm = () => {
    navigate('/coaches'); // This is not protected
  };

  const handleBmi = () => {
    handleProtectedRoute('/cal');
  };

  return (
    <div className='hero' id='Hero'>
      {/* Custom Alert */}
      {showAlert && (
        <div style={alertStyle}>
          Please log in to access this feature
        </div>
      )}

      <div className="video-background">
        <video autoPlay loop muted>
          <source src={vid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>
      <div className="blur hero-blur"></div>
      <div className="left">
        <div className='ad' onClick={() => navigate('/camera')}>
          <motion.div
            initial={{ left: mobile ? "165px" : "238px" }}
            whileInView={{ left: "8px" }}
            transition={{ ...transition, type: "tween" }}>
          </motion.div>
          <span>The best Fitness Club In The Town</span>
        </div>
        <div className="hero-text">
          <div>
            <span>Shape </span>
            <span className='stroke-text'>Your</span>
          </div>
          <div>
            <span className='stroke-text'>Ideal</span>
            <span> Body </span>
          </div>
          <div className="spaned">
            <span>In here we will help you to shape and build your ideal body and live up your life to fullest</span>
          </div>
        </div>
        <div className="figures">
          <div>
            <span><NumberCounter end={140} start={120} delay='9' preFix="+" /></span>
            <span>Expert Coaches</span>
          </div>
          <div>
            <span><NumberCounter end={978} start={900} delay='10' preFix="+" /></span>
            <span>Members Joined</span>
          </div>
          <div>
            <span><NumberCounter end={50} start={20} delay='4' preFix="+" /></span>
            <span>Fitness Programs</span>
          </div>
        </div>
        <div className="hero-buttons">
          <button onClick={handleLm} className="btn">About</button>
          <button onClick={handleExplore} className="btn">Explore Exercises</button>
          <button onClick={handleBmi} className="btn">Check Your BMI</button>
        </div>
      </div>
      <div className="right">
        <div className="heart-rate">
          <img src={Heart} alt="" />
          <span>Heart Rate </span>
          <span><NumberCounter end={116} start={90} delay='6' />BPM</span>
        </div>
        <div className="img-hero">
          <motion.div
            className="calorie"
            initial={{ right: "2rem" }}
            whileInView={{ right: "8rem" }}
            transition={transition}
          >
            <img src={Calories} alt="" />
            <div>
              <span>Calories Burn</span>
              <span><NumberCounter end={226} start={190} delay='6' />kcal</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
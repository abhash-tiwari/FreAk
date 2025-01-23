import React, { useState } from 'react';
import './Hero.css';
import Heart from "../../assets/heart.png";
import Calories from "../../assets/calories.png";
import { motion } from 'framer-motion';
import NumberCounter from 'number-counter';
import { useNavigate } from 'react-router-dom';
import vid from "../../assets/bg.mp4";

const Hero = () => {
  const transition = { type: "spring", duration: 3 };
  const mobile = window.innerWidth <= 768;
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  // Function to check if the user is authenticated
  const checkIsAuthenticated = () => {
    // Check if token exists in localStorage
    return localStorage.getItem('token') !== null;
  };


  // Alert style
  const alertStyle = {
    position: "absolute", // Positioned relative to the Navbar
    top: "10%", // Center vertically in the Navbar
    left: "50%", // Center horizontally in the Navbar
    transform: "translate(-50%, -50%)", // Adjust for perfect centering
    backgroundColor: "rgba(255, 0, 0, 0.9)", // Soothing blue background
    color: "white",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    animation: "fadeInOut 3s ease-in-out",
    maxWidth: "80%", // Handles responsiveness
    whiteSpace: "nowrap", // Prevent text wrapping
    overflow: "hidden",
    textOverflow: "ellipsis", // Handles long text gracefully
  };

  // Handle protected route navigation
  const handleProtectedRoute = (route) => {
    if (!checkIsAuthenticated()) {
      setShowAlert(true); // Show alert
      setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
      return; // Stop further navigation
    }
    navigate(route); // Navigate to the route if authenticated
  };

  // Route handlers
  const handleExplore = () => handleProtectedRoute('/exercises');
  const handleBmi = () => handleProtectedRoute('/cal');
  const handleWrkt = () => handleProtectedRoute('/workout');
  const handleLm = () => navigate('/coaches'); // Public route, no check needed

  return (
    <div className='hero' id='Hero'>
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
          <button onClick={handleWrkt} className="btn">Workout Plan</button>
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

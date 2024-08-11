import React, { useState } from 'react';
import './Coaches.css';
import c1 from '../../assets/sample-image.jpg';
import c2 from "../../assets/t-image2.jpg";
import c3 from "../../assets/t-image3.jpg";
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Footer from "../Footer/Footer"
import { useNavigate } from 'react-router-dom';
import leftArrow from "../../assets/leftArrow.png"
import rightArrow from "../../assets/rightArrow.png"

const coachesData = [
  {
    image: c1,
    name: 'Vinay',
    description: 'With over 2 years of hands-on experience in the fitness industry, he specializes in weight training and bodybuilding. His approach is tailored to each individual, ensuring that every workout is effective and aligned with your personal fitness goals. Whether you’re a beginner looking to build strength or an experienced athlete aiming to take your performance to the next level, Vinay provides the guidance and motivation you need to succeed with his customized and efficient training plans.',
  },
  {
    image: c2,
    name: 'Vinay Pandey',
    description: 'He is Very Good at his own. With a focus on cardio and strength training, Vinay Pandey brings a dynamic approach to fitness. His training programs are designed to improve cardiovascular health, build muscle, and enhance overall physical performance. Vinay is dedicated to helping you reach your fitness goals through a balanced and engaging regimen, integrating advanced techniques and personalized plans to ensure maximum results and long-term success.',
  },
  {
    image: c3,
    name: 'Priya Sharma',
    description: 'An expert in yoga and mindfulness, Priya Sharma combines her deep knowledge of yoga techniques with a holistic approach to wellness. Her sessions focus on improving flexibility, reducing stress, and enhancing mental clarity. Priya’s guidance is perfect for those looking to integrate mindfulness into their fitness routine and achieve a harmonious balance between body and mind, offering personalized sessions and expert support to ensure overall well-being.',
  },
];

const Coaches = () => {
  const transition = { type: 'spring', duration: 3 };
  const [selected, setSelected] = useState(0);
  const cLen = coachesData.length;


  const navigate = useNavigate();
  const handleCoaches = () => {
    navigate('/coaches')
  }


  return (
    <div>
         <div className='coaches-container'>
      <hr />
      <h1 className="coaches-heading stroke-text">Choose Your Coach</h1>
      <hr />
      <div className="cards">
        <div className="left-c">
          <h3 className='c-heading'>
            {coachesData[selected].name}
          </h3>
          <motion.p
            key={selected}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={transition}
          >
            {coachesData[selected].description}
          </motion.p>
          <div className="hero-buttons btns-c">
        <button onClick={handleCoaches} className="btn">Get Started</button>
       </div>
          <div className="arrows">
            <FaArrowLeft
              className="arrow-icon"
              onClick={() =>
                selected === 0 ? setSelected(cLen - 1) : setSelected((prev) => prev - 1)
              }
            />
            <FaArrowRight
              className="arrow-icon"
              onClick={() =>
                selected === cLen - 1 ? setSelected(0) : setSelected((prev) => prev + 1)
              }
            />
          </div>
        </div>
        <div className="right-c">
          <div className="blur c-blur-1"></div>
          <div className="blur c-blur-2"></div>
          <div className='img-div'>
          <motion.img
            src={coachesData[selected].image} alt=''
            className='img-c'
            key={selected}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </div>
          </div>
          
      </div>
      <div className='mobile bt-c'>
        <img onClick={() =>
                selected === 0 ? setSelected(cLen - 1) : setSelected((prev) => prev - 1)
              } src={rightArrow} alt="" className='bt-c'/>
        </div>
    </div>
    <div>
      <Footer />
      </div>
    </div>
    
  );
};

export default Coaches;

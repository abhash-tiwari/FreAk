import React, { useState } from 'react';
import './Coaches.css';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Footer from "../Footer/Footer"
import { useNavigate } from 'react-router-dom';
import leftArrow from "../../assets/leftArrow.png"
import rightArrow from "../../assets/rightArrow.png"
import { coachesData } from "../../data/coachesData"



const Coaches = () => {
  const transition = { type: 'spring', duration: 3 };
  const [selected, setSelected] = useState(0);
  const cLen = coachesData.length;


  const navigate = useNavigate();
  const handleCoaches = () => {
    navigate('/cal')
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
            className='lp'
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
      </div>
    </div>
    
  );
};

export default Coaches;

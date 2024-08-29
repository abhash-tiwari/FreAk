import React from 'react'
import './Hero.css'
import hero from "../../assets/abs.jpg"
import Heart from "../../assets/heart.png"
import imgB from '../../assets/hero_image_back.png'
import Calories from "../../assets/calories.png"
import {motion} from 'framer-motion'
import NumberCounter from 'number-counter'
import { useNavigate } from 'react-router-dom';


const Hero = () => {

  const transition = {type: "spring", duration: 3}
  const mobile = window.innerWidth<=768 ? true : false;

  const navigate = useNavigate();
  const handleCoaches = () => {
    navigate('/coaches')
  }
  const handleLm = () => {
    navigate('/learnmore')
  }
  const handleBmi = () => {
    navigate('/cal')
  }
  return (
    <div className='hero' id='Hero'>
      <div className="blur hero-blur"></div>
        <div className="left">
           <div className='ad'>
            <motion.div initial={{left:mobile? "165px" : "238px"}} whileInView={{left:"8px"}} transition={{...transition, type:"tween"}}>

            </motion.div>
            <span>The best Fitness Club In The Town</span>
             </div>



             <div className="hero-text">
               <div>
                <span className='stroke-text'>Shape </span> 
                <span>Your</span>
                </div>
               <div>
                 <span>Ideal Body</span> 
               </div>
               <div className="spaned"> <span>In here we will help you to shape and build your ideal body and live up your life to fullest</span> </div>
            </div>





 {/* figures div */}

 <div className="figures">
    <div><span> <NumberCounter end={140} start={120} delay='9' preFix="+" /></span><span>Expert Coaches</span></div>
    <div><span><NumberCounter end={978} start={900} delay='10' preFix="+" /></span><span>Members Joined</span></div>
    <div><span><NumberCounter end={50} start={20} delay='4' preFix="+" /></span><span>Fitness Programs</span></div>
 </div>



       {/* hero buttons */}
       
       <div className="hero-buttons">
        <button onClick={handleCoaches} className="btn">Explore</button>
        <button onClick={handleLm} className="btn">Learn More</button>
        <button onClick={handleBmi} className="btn">Check Your BMI</button>
       </div>

        
        </div>




      

        <div className="right">


            <div className="heart-rate">
                <img src={Heart} alt="" />
                <span>Heart Rate </span>
                <span><NumberCounter end={116} start={70} delay='4'  />BPM</span>
            </div>



            <div className="img-hero"> 
                <img src={hero} alt="" />
                <motion.img src={imgB} alt="" className="img-back" initial={{right:"11rem"}} whileInView={{right:"24rem"}} transition={transition}></motion.img>

                <motion.div className="calorie" initial={{right:"42rem"}} whileInView={{right:"37rem"}} transition={transition}>
                <img src={Calories} alt=""  />
                <div>
                <span>Calories Burn</span>
                <span>220 kcal</span>
                </div>
                </motion.div>

            </div>
        </div>
    </div>
  )
}

export default Hero
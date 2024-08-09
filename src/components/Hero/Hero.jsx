import React from 'react'
import './Hero.css'
import hero from "../../assets/abs.jpg"
import Heart from "../../assets/heart.png"
import imgB from '../../assets/hero_image_back.png'
import Calories from "../../assets/calories.png"
import {motion} from 'framer-motion'


const Hero = () => {

  const transition = {type: "spring", duration: 3}
  const mobile = window.innerWidth<=768 ? true : false;
  return (
    <div className='hero' >
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
    <div><span>+140</span><span>Expert Coaches</span></div>
    <div><span>+978</span><span>Members Joined</span></div>
    <div><span>+50</span><span>Fitness Programs</span></div>
 </div>



       {/* hero buttons */}
       
       <div className="hero-buttons">
        <button className="btn">Get Started</button>
        <button className="btn">Learn More</button>
       </div>

        
        </div>




      

        <div className="right">


            <motion.div initial={{right:"-1rem"}} whileInView={{right:'4rem'}} transition={transition} className="heart-rate">
                <img src={Heart} alt="" />
                <span>Heart Rate </span>
                <span>116 BPM</span>
            </motion.div>



            <div className="img-hero"> 
                <img src={hero} alt="" />
                <motion.img src={imgB} alt="" className="img-back" initial={{right:"11rem"}} whileInView={{right:"24rem"}} transition={transition}></motion.img>/>

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
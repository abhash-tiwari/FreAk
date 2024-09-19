import React from 'react'
import './Reasons.css'
import img1 from '../../assets/selfie.jpg'
import img2 from '../../assets/selfie1.jpg'
import img3 from '../../assets/wdumbell.jpg'
import tick from '../../assets/tick.png'
import p from '../../assets/nb.png'
import p2 from '../../assets/adidas.png'
import p3 from '../../assets/nike.png'

const Reasons = () => {
  return (
    <div className='Reasons' id='Why Us' >
      <div className="left-r">
        <img src={img1} alt="" />
        <img src={img2} alt="" />
        <img src={img3} alt="" />
      </div>
      <div className="right-r">
        <span>Some Reasons</span>
        <div>
          <span className='stroke-text'>Why</span>
         <span> Choose Us?</span>
         </div>
         <div className='details-r'>
         <div>
          <img src={tick} alt="" />
          <span>OVER 140+ EXPERT COACHS</span>
         </div>
         <div>
          <img src={tick} alt="" />
          <span>TRAIN SMARTER AND FASTER THAN BEFORE</span>
         </div>
         <div>
          <img src={tick} alt="" />
          <span>1 FREE PROGRAM FOR NEW MEMBER</span>
         </div>
         <div>
          <img src={tick} alt="" />
          <span>RELIABLE PARTNERS</span>
         </div>
         <span style={{color:"var(--gray)",fontWeight:"normal",}} >Our Partners</span>
        <div className="partners">
          <img src={p} alt="" />
          <img src={p2} alt="" />
          <img src={p3} alt="" /></div>

        </div>
      </div>
    </div>
  )
}

export default Reasons
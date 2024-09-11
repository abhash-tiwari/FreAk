import React from 'react'
import {plansData} from "../../data/plansData"
import whiteTick from "../../assets/whiteTick.png"
import "./Plans.css"

const Plans = () => {
  return (
    <div className="plans-container" id='Plans'>
        <div className="blur plans-blur-1"></div>
        <div className="blur plans-blur-2"></div>
        <div className="programs-header">
            <span className='stroke-text'>Ready To Start</span>
            <span>Your Journey</span>
            <span className='stroke-text'>Now With Us</span>
        </div>

        <div className="plans-card">
          {plansData.map((ele,idx) => (
            <div className="ele" key={idx}>
                {ele.icon}
                <span>{ele.name}</span>
                <span>{ele.price}</span>

                <div className="features">
                    {ele.features.map((el,id)=> (
                        <div className="feature">
                            <img src={whiteTick} alt="" />
                            <span key={id}>{el}</span>
                        </div>
                    ))}
                </div>
                <div>
                    <span>See More Benefits </span>
                </div>
                <button className="btn">Join Now</button>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Plans
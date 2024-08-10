import React from 'react'
import './Programs.css'
import {programsData} from "../../data/programsData"
import RightArrow from "../../assets/rightArrow.png"

const Programs = () => {
  return (
    <div className='Programs' id='Programs' >
      <div className="programs-header">
        <span className='stroke-text' >Explore Our</span>
        <span>Programs</span>
        <span>To Shape You</span>
      </div>
      <div className="program-categories">
        {programsData.map((ele) => (
            <div className='categories' >
                {ele.image}
                <span>{ele.heading}</span>
                <span>{ele.details}</span>
                <div className="join-now">
                    <span>Join Now</span> <img src={RightArrow} alt="" />
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Programs
import React from 'react'
import "./Footer.css"
import github from "../../assets/github.png"
import insta from "../../assets/instagram.png"
import linkedin from "../../assets/linkedin.png"
import logo from "../../assets/logo.fit.png"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='Footer-Container'>
        <hr />
        <div className="footer">
            <div className="social-l">
           <Link to="https://github.com/abhash-tiwari"> <img src={github} alt="" className="social"/></Link>
           <Link to="https://github.com/abhash-tiwari"> <img src={insta} alt="" className="social"/></Link>
           <Link to="https://www.linkedin.com/in/abhash-tiwari/"> <img src={linkedin} alt="" className="social"/></Link>
            </div>
        <div className="logo-f">
            <img src={logo} alt="" />
        </div>
        </div>

        <div className="blur footer-blur-1"></div>
        <div className="blur footer-blur-2"></div>
    </div>
  )
}

export default Footer
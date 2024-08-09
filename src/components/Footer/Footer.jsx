import React from 'react'
import "./Footer.css"
import github from "../../assets/github.png"
import insta from "../../assets/instagram.png"
import linkedin from "../../assets/linkedin.png"
import logo from "../../assets/logo.fit.png"

const Footer = () => {
  return (
    <div className='Footer-Container'>
        <hr />
        <div className="footer">
            <div className="social">
            <img src={github} alt="" />
            <img src={insta} alt="" />
            <img src={linkedin} alt="" />
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
import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import './Footer.css'
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="footer">
      <hr />
      <div className="footer-top">
        <div className="social-icons">
          <Link to='https://instagram.com/mahi.07club' target='#' aria-label="Instagram"><FaInstagram /></Link>
          <Link to="https://github.com/abhash-tiwari/" target='#' aria-label="Facebook"><FaGithub /></Link>
          <Link to="https://linkedin.com/in/abhash-tiwari/" target='#' aria-label="YouTube"><FaLinkedin /></Link>
        </div>
        <p>Freak Fitness - Push Beyond Your Limits!</p>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Freak Fitness. All Rights Reserved.</p>
        <Link to="/">Terms & Conditions</Link> | <Link to="/">Privacy Policy</Link>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Logo from '../../assets/logo.fit.png';
import bars from '../../assets/bars.png';
import { Link } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDumbbell, faChalkboardTeacher, faCalculator, faDollarSign, faPhone, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    display: "flex",
    alignItems: "center"
  };

  const renderMenuItems = () => {
    if (location.pathname === '/') {
      return (
        <ul className="menu-container">
          <li><Link to='Hero' span={true} smooth={true} activeClass='active' style={linkStyle}><FontAwesomeIcon style={{ marginRight: '8px' }} />Home</Link></li>
          <li><Link to='Programs' span={true} smooth={true} style={linkStyle}><FontAwesomeIcon style={{ marginRight: '8px' }} />Programs</Link></li>
          <li><Link to='Why Us' span={true} smooth={true} style={linkStyle}><FontAwesomeIcon  style={{ marginRight: '8px' }} />Why Us</Link></li>
          <li><Link to='Plans' span={true} smooth={true} style={linkStyle}><FontAwesomeIcon  style={{ marginRight: '8px' }} />Plans</Link></li>
          <li><Link to='testimonials' span={true} smooth={true} style={linkStyle}><FontAwesomeIcon style={{ marginRight: '8px' }} />Testimonials</Link></li>
        </ul>
      );
    } else {
      return (
        <ul className="menu-container">
          <li><RouterLink to='/' style={linkStyle}><FontAwesomeIcon style={{ marginRight: '8px' }} />Home</RouterLink></li>
          <li><RouterLink to='/coaches' style={linkStyle}><FontAwesomeIcon  style={{ marginRight: '8px' }} />About</RouterLink></li>
          <li><RouterLink to='/exercises' style={linkStyle}><FontAwesomeIcon  style={{ marginRight: '8px' }} />Exercises</RouterLink></li>
          <li><RouterLink to='/cal' style={linkStyle}><FontAwesomeIcon  style={{ marginRight: '8px' }} />BMI</RouterLink></li>
          <li><RouterLink to='/pricing' style={linkStyle}><FontAwesomeIcon  style={{ marginRight: '8px' }} />Our Plans</RouterLink></li>
          <li><RouterLink to='/getintouch' style={linkStyle}><FontAwesomeIcon  style={{ marginRight: '8px' }} />Get In Touch</RouterLink></li>
          <li><RouterLink to='/learnmore' style={linkStyle}><FontAwesomeIcon  style={{ marginRight: '8px' }} />Learn More</RouterLink></li>
        </ul>
      );
    }
  };

  return (
    <div className={`nav-container ${isScrolled ? 'scrolled' : ''}`}>
      <RouterLink to='/'><img src={Logo} alt="Logo" className="logo" style={{ maxWidth: '100%' }} /></RouterLink>

      {isMobile ? (
        <div onClick={toggleMenu}>
          <img src={bars} alt="Menu" className="menu-icon" style={{ width: '1.5rem', height: '1.5rem' }} />
        </div>
      ) : (
        renderMenuItems()
      )}

      {menuOpen && isMobile && (
        <ul className="menu-container">
          {location.pathname === '/' ? (
            <>
              <li><Link to='Hero' span={true} smooth={true} onClick={toggleMenu} activeClass='active' style={linkStyle}><FontAwesomeIcon icon={faHome} style={{ marginRight: '8px' }} />Home</Link></li>
              <li><Link to='Programs' span={true} smooth={true} onClick={toggleMenu} style={linkStyle}><FontAwesomeIcon icon={faDumbbell} style={{ marginRight: '8px' }} />Programs</Link></li>
              <li><Link to='Why Us' span={true} smooth={true} onClick={toggleMenu} style={linkStyle}><FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '8px' }} />Why Us</Link></li>
              <li><Link to='Plans' span={true} smooth={true} onClick={toggleMenu} style={linkStyle}><FontAwesomeIcon icon={faDollarSign} style={{ marginRight: '8px' }} />Plans</Link></li>
              <li><Link to='testimonials' span={true} smooth={true} onClick={toggleMenu} style={linkStyle}><FontAwesomeIcon icon={faChalkboardTeacher} style={{ marginRight: '8px' }} />Testimonials</Link></li>
            </>
          ) : (
            <>
              <li><RouterLink to='/' onClick={toggleMenu} style={linkStyle}><FontAwesomeIcon icon={faHome} style={{ marginRight: '8px' }} />Home</RouterLink></li>
              <li><RouterLink to='/coaches' onClick={toggleMenu} style={linkStyle}><FontAwesomeIcon icon={faChalkboardTeacher} style={{ marginRight: '8px' }} />About</RouterLink></li>
              <li><RouterLink to='/exercises' onClick={toggleMenu} style={linkStyle}><FontAwesomeIcon icon={faDumbbell} style={{ marginRight: '8px' }} />Exercises</RouterLink></li>
              <li><RouterLink to='/cal' onClick={toggleMenu} style={linkStyle}><FontAwesomeIcon icon={faCalculator} style={{ marginRight: '8px' }} />BMI</RouterLink></li>
              <li><RouterLink to='/pricing' onClick={toggleMenu} style={linkStyle}><FontAwesomeIcon icon={faDollarSign} style={{ marginRight: '8px' }} />Our Plans</RouterLink></li>
              <li><RouterLink to='/getintouch' onClick={toggleMenu} style={linkStyle}><FontAwesomeIcon icon={faPhone} style={{ marginRight: '8px' }} />Get In Touch</RouterLink></li>
              <li><RouterLink to='/learnmore' onClick={toggleMenu} style={linkStyle}><FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '8px' }} />Learn More</RouterLink></li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default Navbar;

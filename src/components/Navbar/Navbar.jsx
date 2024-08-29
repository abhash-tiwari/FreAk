import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Logo from '../../assets/logo.fit.png';
import bars from '../../assets/bars.png';
import { Link } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';

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
    color: "white"
  };

  const renderMenuItems = () => {
    if (location.pathname === '/') {
      return (
        <ul className="menu-container">
          <li><Link to='Hero' span={true} smooth={true} activeClass='active' style={linkStyle}>Home</Link></li>
          <li><Link to='Programs' span={true} smooth={true} style={linkStyle}>Programs</Link></li>
          <li><Link to='Why Us' span={true} smooth={true} style={linkStyle}>Why Us</Link></li>
          <li><Link to='Plans' span={true} smooth={true} style={linkStyle}>Plans</Link></li>
          <li><Link to='testimonials' span={true} smooth={true} style={linkStyle}>Testimonials</Link></li>
        </ul>
      );
    } else {
      return (
        <ul className="menu-container">
          <li><RouterLink to='/' style={linkStyle}>Home</RouterLink></li>
          <li><RouterLink to='/coaches' style={linkStyle}>Coaches</RouterLink></li>
          <li><RouterLink to='/cal' style={linkStyle}>BMI</RouterLink></li>
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
              <li><Link to='Hero' span={true} smooth={true} onClick={toggleMenu} activeClass='active' style={linkStyle}>Home</Link></li>
              <li><Link to='Programs' span={true} smooth={true} onClick={toggleMenu} style={linkStyle}>Programs</Link></li>
              <li><Link to='Why Us' span={true} smooth={true} onClick={toggleMenu} style={linkStyle}>Why Us</Link></li>
              <li><Link to='Plans' span={true} smooth={true} onClick={toggleMenu} style={linkStyle}>Plans</Link></li>
              <li><Link to='testimonials' span={true} smooth={true} onClick={toggleMenu} style={linkStyle}>Testimonials</Link></li>
            </>
          ) : (
            <>
              <li><RouterLink to='/' onClick={toggleMenu} style={linkStyle}>Home</RouterLink></li>
              <li><RouterLink to='/coaches' onClick={toggleMenu} style={linkStyle}>Coaches</RouterLink></li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default Navbar;

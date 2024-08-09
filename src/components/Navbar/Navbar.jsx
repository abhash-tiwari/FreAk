import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Logo from '../../assets/logo.fit.png';
import bars from '../../assets/bars.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="nav-container">
      <img src={Logo} alt="Logo" className="logo" />

      {isMobile ? (
        <div onClick={toggleMenu}>
          <img src={bars} alt="Menu" className="menu-icon" style={{width:'1.5rem', height:'1.5rem'}}/>
        </div>
      ) : (
        <ul className="menu-container">
          <li>Home</li>
          <li>Programs</li>
          <li>Why Us</li>
          <li>Plans</li>
          <li>Testimonials</li>
        </ul>
      )}

      {menuOpen && isMobile && (
        <ul className="menu-container">
          <li onClick={toggleMenu}>Home</li>
          <li onClick={toggleMenu}>Programs</li>
          <li onClick={toggleMenu}>Why Us</li>
          <li onClick={toggleMenu}>Plans</li>
          <li onClick={toggleMenu}>Testimonials</li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;

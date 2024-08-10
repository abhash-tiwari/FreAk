import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Logo from '../../assets/logo.fit.png';
import bars from '../../assets/bars.png';
import {Link} from 'react-scroll'

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
          <li><Link to='Hero' span={true} smooth={true} activeClass='active'>Home</Link></li>
          <li><Link to='Programs' span={true} smooth={true}>Programs</Link></li>
          <li><Link to='Why Us' span={true} smooth={true}>Why Us</Link></li>
          <li><Link to='Plans' span={true} smooth={true}>Plans</Link></li>
          <li><Link to='testimonials' span={true} smooth={true}>Testimonials</Link></li>
        </ul>
      )}

      {menuOpen && isMobile && (
        <ul className="menu-container">
          <li><Link to='Hero' span={true} smooth={true}  onClick={toggleMenu} activeClass='active'>Home</Link></li>
          <li><Link to='Programs' span={true} smooth={true}  onClick={toggleMenu}>Programs</Link></li>
          <li><Link to='Why Us' span={true} smooth={true}  onClick={toggleMenu}>Why Us</Link></li>
          <li><Link to='Plans' span={true} smooth={true}  onClick={toggleMenu}>Plans</Link></li>
          <li><Link to='testimonials' span={true} smooth={true}  onClick={toggleMenu}>Testimonials</Link></li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;

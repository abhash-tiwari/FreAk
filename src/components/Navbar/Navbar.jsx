import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Logo from '../../assets/logo.fit.png';
import bars from '../../assets/bars.png';
import { Link } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDumbbell, faChalkboardTeacher, faCalculator, faDollarSign, faPhone, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Alert styles
  const alertStyle = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#ff4444',
    color: 'white',
    padding: '1rem',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
    textAlign: 'center',
    animation: 'fadeIn 0.3s ease-in',
    minWidth: '300px'
  };

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

  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

  const handleProtectedRoute = (route) => {
    if (!isAuthenticated) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    navigate(route);
    if (menuOpen) {
      toggleMenu();
    }
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
          <li><Link to='Programs' span={true} smooth={true} offset={-60} style={linkStyle}><FontAwesomeIcon style={{ marginRight: '8px' }} />Programs</Link></li>
          <li><Link to='Why Us' span={true} smooth={true} offset={-60} style={linkStyle}><FontAwesomeIcon style={{ marginRight: '8px' }} />Why Us</Link></li>
          <li><Link to='Plans' span={true} smooth={true} offset={-60} style={linkStyle}><FontAwesomeIcon style={{ marginRight: '8px' }} />Plans</Link></li>
          <li><Link to='testimonials' span={true} smooth={true} offset={-40} style={linkStyle}><FontAwesomeIcon style={{ marginRight: '8px' }} />Testimonials</Link></li>
          <li>{isAuthenticated && <p>Welcome! {user.name}</p>}</li>
          {isAuthenticated ? 
            (<li><button className='btn' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button></li>) :
            (<li><button className='btn' onClick={() => loginWithRedirect()}>Log In</button></li>)
          }
        </ul>
      );
    } else {
      return (
        <ul className="menu-container">
          <li><RouterLink to='/' style={linkStyle}><FontAwesomeIcon style={{ marginRight: '8px' }} />Home</RouterLink></li>
          <li><RouterLink to='/coaches' style={linkStyle}><FontAwesomeIcon style={{ marginRight: '8px' }} />About</RouterLink></li>
          <li><span onClick={() => handleProtectedRoute('/exercises')} style={linkStyle} className="nav-link"><FontAwesomeIcon style={{ marginRight: '8px' }} />Exercises</span></li>
          <li><span onClick={() => handleProtectedRoute('/cal')} style={linkStyle} className="nav-link"><FontAwesomeIcon style={{ marginRight: '8px' }} />BMI</span></li>
          <li><RouterLink to='/pricing' style={linkStyle}><FontAwesomeIcon style={{ marginRight: '8px' }} />Our Plans</RouterLink></li>
          <li><RouterLink to='/getintouch' style={linkStyle}><FontAwesomeIcon style={{ marginRight: '8px' }} />Get In Touch</RouterLink></li>
          <li><RouterLink to='/learnmore' style={linkStyle}><FontAwesomeIcon style={{ marginRight: '8px' }} />Learn More</RouterLink></li>
          <li>{isAuthenticated && <p>Welcome! {user.name}</p>}</li>
          {isAuthenticated ? 
            (<li><button className='btn' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button></li>) :
            (<li><button className='btn' onClick={() => loginWithRedirect()}>Log In</button></li>)
          }
        </ul>
      );
    }
  };

  return (
    <div className={`nav-container ${isScrolled ? 'scrolled' : ''}`}>
      {showAlert && (
        <div style={alertStyle}>
          Please log in to access this feature
        </div>
      )}
      
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
              <li><Link to='Hero' span={true} smooth={true} offset={-60} onClick={toggleMenu} activeClass='active' style={linkStyle}><FontAwesomeIcon icon={faHome} style={{ marginRight: '8px' }} />Home</Link></li>
              <li><Link to='Programs' span={true} smooth={true} offset={-60} onClick={toggleMenu} style={linkStyle}><FontAwesomeIcon icon={faDumbbell} style={{ marginRight: '8px' }} />Programs</Link></li>
              <li><Link to='Why Us' span={true} smooth={true} offset={-60} onClick={toggleMenu} style={linkStyle}><FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '8px' }} />Why Us</Link></li>
              <li><Link to='Plans' span={true} smooth={true} offset={-60} onClick={toggleMenu} style={linkStyle}><FontAwesomeIcon icon={faDollarSign} style={{ marginRight: '8px' }} />Plans</Link></li>
              <li><Link to='testimonials' span={true} smooth={true} offset={-40} onClick={toggleMenu} style={linkStyle}><FontAwesomeIcon icon={faChalkboardTeacher} style={{ marginRight: '8px' }} />Testimonials</Link></li>
              <li>{isAuthenticated && <p>Welcome! {user.name}</p>}</li>
              {isAuthenticated ? 
                (<li><button className='auth' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button></li>) :
                (<li><button className='authbtn' onClick={() => loginWithRedirect()}>Log In</button></li>)
              }
            </>
          ) : (
            <>
              <li><RouterLink to='/' onClick={toggleMenu} style={linkStyle}><FontAwesomeIcon icon={faHome} style={{ marginRight: '8px' }} />Home</RouterLink></li>
              <li><RouterLink to='/coaches' onClick={toggleMenu} style={linkStyle}><FontAwesomeIcon icon={faChalkboardTeacher} style={{ marginRight: '8px' }} />About</RouterLink></li>
              <li><span onClick={() => handleProtectedRoute('/exercises')} style={linkStyle} className="nav-link"><FontAwesomeIcon icon={faDumbbell} style={{ marginRight: '8px' }} />Exercises</span></li>
              <li><span onClick={() => handleProtectedRoute('/cal')} style={linkStyle} className="nav-link"><FontAwesomeIcon icon={faCalculator} style={{ marginRight: '8px' }} />BMI</span></li>
              <li><RouterLink to='/pricing' onClick={toggleMenu} style={linkStyle}><FontAwesomeIcon icon={faDollarSign} style={{ marginRight: '8px' }} />Our Plans</RouterLink></li>
              <li><RouterLink to='/getintouch' onClick={toggleMenu} style={linkStyle}><FontAwesomeIcon icon={faPhone} style={{ marginRight: '8px' }} />Get In Touch</RouterLink></li>
              <li><RouterLink to='/learnmore' onClick={toggleMenu} style={linkStyle}><FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '8px' }} />Learn More</RouterLink></li>
              <li>{isAuthenticated && <p>Welcome! {user.name}</p>}</li>
              {isAuthenticated ? 
                (<li><button className='authbtn' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button></li>) :
                (<li><button className='authbtn' onClick={() => loginWithRedirect()}>Log In</button></li>)
              }
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
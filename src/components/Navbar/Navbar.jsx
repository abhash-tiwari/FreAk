import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';
import './Navbar.css';
import Logo from '../../assets/logo.fit.png';
import bars from '../../assets/bars.png';
import AuthModal from '../authModal/authModal';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('https://freak-backend.onrender.com/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          // Token is invalid
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const handleAuth = (authData) => {
    localStorage.setItem('token', authData.token);
    setUser(authData.user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  const handleProtectedRoute = (route) => {
    if (!isAuthenticated) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    navigate(route);
    if (menuOpen) setMenuOpen(false);
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
          <li><Link to='Hero' span={true} smooth={true} activeClass='active' style={linkStyle}>Home</Link></li>
          <li><Link to='Programs' span={true} smooth={true} offset={-60} style={linkStyle}>Programs</Link></li>
          <li><Link to='Why Us' span={true} smooth={true} offset={-60} style={linkStyle}>Why Us</Link></li>
          <li><Link to='Plans' span={true} smooth={true} offset={-60} style={linkStyle}>Plans</Link></li>
          <li><Link to='testimonials' span={true} smooth={true} offset={-40} style={linkStyle}>Testimonials</Link></li>
          <li>{isAuthenticated && <p>Welcome! {user?.name}</p>}</li>
          {isAuthenticated ? 
            (<li><button className='btn' style={{marginTop:"0px"}} onClick={handleLogout}>Log Out</button></li>) :
            (<li><button className='btn' style={{marginTop:"0px"}} onClick={() => setShowAuthModal(true)}>Login</button></li>)
          }
        </ul>
      );
    }
    return (
      <ul className="menu-container">
        <li><RouterLink to='/' style={linkStyle}>Home</RouterLink></li>
        <li><RouterLink to='/coaches' style={linkStyle}>About</RouterLink></li>
        <li><span onClick={() => handleProtectedRoute('/exercises')} style={linkStyle} className="nav-link">Exercises</span></li>
        <li><span onClick={() => handleProtectedRoute('/cal')} style={linkStyle} className="nav-link">BMI</span></li>
        <li><RouterLink to='/pricing' style={linkStyle}>Our Plans</RouterLink></li>
        <li><RouterLink to='/getintouch' style={linkStyle}>Get In Touch</RouterLink></li>
        <li><RouterLink to='/learnmore' style={linkStyle}>Learn More</RouterLink></li>
        <li>{isAuthenticated && <p>Welcome! {user?.name}</p>}</li>
        {isAuthenticated ? 
          (<li><button className='btn' onClick={handleLogout}>Log Out</button></li>) :
          (<li><button className='btn' onClick={() => setShowAuthModal(true)}>Login</button></li>)
        }
      </ul>
    );
  };

  return (
    <div className={`nav-container ${isScrolled ? 'scrolled' : ''}`}>
      {showAlert && (
        <div className="alert">
          Please log in to access this feature
        </div>
      )}
      
      <RouterLink to='/'>
        <img src={Logo} alt="Logo" className="logo" style={{ maxWidth: '100%' }} />
      </RouterLink>

      {isMobile ? (
        <div onClick={() => setMenuOpen(!menuOpen)}>
          <img src={bars} alt="Menu" className="menu-icon" style={{ width: '1.5rem', height: '1.5rem' }} />
        </div>
      ) : (
        renderMenuItems()
      )}

      {menuOpen && isMobile && renderMenuItems()}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onAuth={handleAuth}
        />
      )}
    </div>
  );
};

export default Navbar;

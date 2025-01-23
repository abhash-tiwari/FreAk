import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';
import './Navbar.css';
import Logo from '../../assets/logo.fit.png';
import bars from '../../assets/bars.png';
import AuthModal from '../authModal/authModal';

// // Separate AuthModal component
// const AuthModal = ({ onClose, onAuth }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });


//   useEffect(() => {
//     const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
//     document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
//     document.body.classList.add('modal-open');
    
//     return () => {
//       document.body.classList.remove('modal-open');
//       document.documentElement.style.removeProperty('--scrollbar-width');
//     };
//   }, []);


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const endpoint = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         onAuth(data);
//         onClose();
//       } else {
//         const error = await response.json();
//         alert(error.message);
//       }
//     } catch (error) {
//       console.error('Auth error:', error);
//       alert('An error occurred. Please try again.');
//     }
//   };

//   const toggleMode = () => {
//     setIsLogin(!isLogin);
//     setFormData({
//       name: '',
//       email: '',
//       password: ''
//     });
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h2>{isLogin ? 'Login' : 'Register'}</h2>
//           <button className="close-btn" onClick={onClose}>&times;</button>
//         </div>
//         <form className="auth-form" onSubmit={handleSubmit}>
//           {!isLogin && (
//             <div className="form-group">
//               <label htmlFor="name">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 placeholder="Enter your name"
//                 required={!isLogin}
//                 autoComplete="name"
//               />
//             </div>
//           )}
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               placeholder="Enter your email"
//               required
//               autoComplete="email"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               placeholder="Enter your password"
//               required
//               autoComplete="current-password"
//             />
//           </div>
//           <button type="submit" className="btn">
//             {isLogin ? 'Login' : 'Register'}
//           </button>
//         </form>
//         <p className="toggle-auth">
//           {isLogin ? "Don't have an account? " : "Already have an account? "}
//           <span className="toggle-link" onClick={toggleMode}>
//             {isLogin ? 'Register' : 'Login'}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// Main Navbar component
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

  // const handleAuth = (authData) => {
  //   localStorage.setItem('token', authData.token);
  //   setUser(authData.user);
  //   setIsAuthenticated(true);
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   setIsAuthenticated(false);
  //   setUser(null);
  // };
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
            (<li><button className='btn' onClick={handleLogout}>Log Out</button></li>) :
            (<li><button className='btn' onClick={() => setShowAuthModal(true)}>Login</button></li>)
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

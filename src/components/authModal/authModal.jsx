import React, { useState, useEffect } from 'react';
import './authModal.module.css';

const AuthModal = ({ onClose, onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    document.body.classList.add('modal-open');
    
    return () => {
      document.body.classList.remove('modal-open');
      document.documentElement.style.removeProperty('--scrollbar-width');
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

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

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const endpoint = isLogin ? 
      'https://freak-backend.onrender.com/api/auth/login' : 
      'https://freak-backend.onrender.com/api/auth/register';
      
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    
    if (response.ok) {
      onAuth(data);  // This will set the token and user state
      onClose();
    } else {
      alert(data.message || 'Authentication failed');
    }
  } catch (error) {
    console.error('Auth error:', error);
    alert('An error occurred. Please try again.');
  }
};

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 style={{color:'black'}}>{isLogin ? 'Login' : 'Register'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required={!isLogin}
                autoComplete="name"
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="toggle-auth modal-p" style={{color:'black'}}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span className="toggle-link" onClick={toggleMode}>
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
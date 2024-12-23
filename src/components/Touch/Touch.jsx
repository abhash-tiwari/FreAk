import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './Touch.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const GetInTouch = () => {
  const { user, isAuthenticated } = useAuth0(); // Get Auth0 user data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    program: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  // Pre-fill form data with Auth0 user information when component mounts
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prevData => ({
        ...prevData,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const YOUR_SERVICE_ID = "service_1ca8g0m";
    const YOUR_TEMPLATE_ID = "template_cvo8y6i";
    const YOUR_PUBLIC_KEY = "uN3lMUILysdLVn5BA";

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_name: "Freak",
      message: formData.message,
    };

    emailjs
      .send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams, YOUR_PUBLIC_KEY)
      .then((result) => {
        console.log("Email Sent Successfully!", result.text);
        setFormData({ name: "", email: "", program: "", message: "" });
        setIsSubmitted(true);
      }).catch((err) => {
        console.log("Error Sending Email", err);
      });
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        navigate('/'); 
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitted, navigate]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <motion.div
        className="contact-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, ease: 'easeInOut' }}>

        <div>
          {!isSubmitted && (
            <h2 className="contact-heading">Fill Your Details</h2>
          )}

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                  readOnly={isAuthenticated}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                  readOnly={isAuthenticated}
                />
              </div>

              <div className="form-group">
                <label htmlFor="program" className="form-label">Select Your Program</label>
                <select
                  name="program"
                  id="program"
                  value={formData.program}
                  onChange={handleChange}
                  className="form-input"
                  required>
                  <option value="" disabled>Select a Program</option>
                  <option value="Strength Training">Strength Training</option>
                  <option value="Cardio Training">Cardio Training</option>
                  <option value="Fat Burning">Fat Burning</option>
                  <option value="Health Fitness">Health Fitness</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-button" disabled={isSubmitted}>Send Message</button>
            </form>
          ) : (
            <motion.p
              className="success-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}>
              Thank you for your interest! We'll Get Back To You Soon
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default GetInTouch;
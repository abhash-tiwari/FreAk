import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Touch.css';

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_1ca8g0m',
      'template_cvo8y6i',
      e.target,
      'uN3lMUILysdLVn5BA'
    ).then(
      (result) => {
        console.log('Success:', result.text);
        setIsSubmitted(true);
      },
      (error) => {
        console.error('Failed:', error.text);
      }
    );

    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div style={{"minHeight":"100vh"}}>
<div className="contact-container">
      <div>
      <h2 className="contact-heading">Get in Touch</h2>
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
            />
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
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      ) : (
        <p className="success-message">Thank you for your message! We will get back to you soon.</p>
      )}
      </div>
      
    </div>
    </div>
    
  );
};

export default GetInTouch;

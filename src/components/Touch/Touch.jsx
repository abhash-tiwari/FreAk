import React, { useState } from 'react';
import emailjs from 'emailjs-com';

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
      'service_1ca8g0m',  // EmailJS Service ID
      'template_cvo8y6i',  // EmailJS Template ID
      e.target,
      'uN3lMUILysdLVn5BA'       // EmailJS User ID (or public key if using the new EmailJS SDK)
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
    <div>
      <h2>Get in Touch</h2>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      ) : (
        <p>Thank you for your message! We will get back to you soon.</p>
      )}
    </div>
  );
};

export default GetInTouch;

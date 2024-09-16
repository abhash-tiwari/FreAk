import React from 'react';
import Slider from 'react-slick';
import './Coaches.css'; // Make sure to import your existing styles
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import bgImage from "../../assets/img1.jpg"; // Background image
import Trainer from "../../assets/img2.jpg";
import Trainer2 from "../../assets/img3.jpg";
import Trainer3 from "../../assets/img5.jpg";
import Trainer4 from "../../assets/gym1.jpg";
import Workout from "../../assets/img6.jpg";
import group from "../../assets/img7.jpg";
import fitness from "../../assets/img8.jpg";
import personal from "../../assets/img9.jpg";
import yoga from "../../assets/img10.jpg";
import nutrition from "../../assets/img11.jpg";
import locker from "../../assets/img12.jpg";

const Coaches = () => {
  const transition = { type: 'spring', duration: 3 };

  const navigate = useNavigate();
  const handleCoaches = () => {
    navigate('/cal');
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className="about-container">
        <motion.div initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
          className="about-header"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div>
          <p className="header-subtitle">Empowering Your Fitness Journey</p>
          <h1 className="header-title">Welcome to Freak Fitness</h1>
          <p className="header-description">
            At FREAK, we're dedicated to helping you reach your fitness goals. Our state-of-the-art facility is equipped with the latest equipment and staffed by experienced trainers who are passionate about helping you succeed.
          </p>
          </div>
          
        </motion.div>

        <div className="team-section">
          <div>
            <h1 className="team-title">Meet Our Dedicated Team</h1>
            <p className="team-description">
              Our team of experienced trainers and staff are here to support and guide you every step of the way.
            </p>
          </div>
          <div className="team-grid">

  <div className="team-member" style={{ backgroundImage: `url(${Trainer})` }}>
    <div className="member-info">
      <h1 className="member-name">John Doe</h1>
      <p className="member-role">Head Trainer</p>
      <p className="member-bio">With over 10 years of experience, John is dedicated to helping you reach your fitness potential.</p>
    </div>
  </div>

  <div className="team-member" style={{ backgroundImage: `url(${Trainer2})` }}>
    <div className="member-info">
      <h1 className="member-name">Jane Smith</h1>
      <p className="member-role">Nutritionist</p>
      <p className="member-bio">Jane provides personalized nutrition plans to complement your fitness regime.</p>
    </div>
  </div>

  <div className="team-member" style={{ backgroundImage: `url(${Trainer3})` }}>
    <div className="member-info">
      <h1 className="member-name">Yoyo Johnson</h1>
      <p className="member-role">Yoga Instructor</p>
      <p className="member-bio">Yoyo's yoga classes are designed to enhance both your physical and mental wellbeing.</p>
    </div>
  </div>
</div>
        </div>

        <div className="journey-section">
          <div className="journey-text">
            <h1 className="journey-title">Our Journey to <br /><span className='stroke-text' style={{"textTransform":"uppercase"}}>Fitness Excellence</span> </h1>
            <div className="journey-stats">
              <p className="stats-number">50+</p>
              <p className="stats-label">Expert Trainers</p>
            </div>
            <button className="journey-button btn" onClick={handleCoaches}>Start Your Journey</button>
            <p className="journey-description">
              Since our inception, Freak has been dedicated to helping individuals achieve their fitness goals through exceptional services and facilities.
            </p>
          </div>

          <div className="journey-image" style={{ backgroundImage: `url(${Trainer4})` }}>
            <div>
            <h1 className="image-title">Our Dedicated Team</h1>
            <p className="image-description">
              Our team is committed to providing personalized training and support to help you achieve your fitness goals.
            </p>
            </div>
          </div>
        </div>

        <div className="community-section">
          <div className="community-header">
            <h1 className="community-title">Our Community in Action</h1>
            <p className="community-subtitle">
              Explore our gallery to see the vibrant community and state-of-the-art facilities at FREAK.
            </p>
          </div>
          <div className="community-gallery">
      <Slider {...settings}>
        <div className="gallery-item">
          <img src={Workout} alt="Free Weights" className="gallery-image" />
          <h2 className="gallery-title">Workout Session</h2>
          <p className="gallery-description">Extensive selection of free weights to challenge your muscles.</p>
        </div>
        <div className="gallery-item">
          <img src={group} alt="Group Class" className="gallery-image" />
          <h2 className="gallery-title">Group Class</h2>
          <p className="gallery-description">Stay motivated with our dynamic group classes.</p>
        </div>
        <div className="gallery-item">
          <img src={fitness} alt="Cardio Equipment" className="gallery-image" />
          <h2 className="gallery-title">Fitness Equipment</h2>
          <p className="gallery-description">State-of-the-art treadmills, ellipticals, and more.</p>
        </div>
        <div className="gallery-item">
          <img src={personal} alt="Expert Trainers" className="gallery-image" />
          <h2 className="gallery-title">Personal Training</h2>
          <p className="gallery-description">Our team of certified trainers are here to guide you every step of the way.</p>
        </div>
        <div className="gallery-item">
          <img src={yoga} alt="Amenities" className="gallery-image" />
          <h2 className="gallery-title">Yoga Studio</h2>
          <p className="gallery-description">Yoga hall, expert yoga trainers.</p>
        </div>
        <div className="gallery-item">
          <img src={nutrition} alt="Amenities" className="gallery-image" />
          <h2 className="gallery-title">Nutrition Consultation</h2>
          <p className="gallery-description">Nutrition Consultation, diet and health plan.</p>
        </div>
        <div className="gallery-item">
          <img src={locker} alt="Amenities" className="gallery-image" />
          <h2 className="gallery-title">Locker Room</h2>
          <p className="gallery-description">Spacious locker rooms, showers, and towel service.</p>
        </div>
      </Slider>
    </div>
        </div>
      </div>
    </div>
  );
};

export default Coaches;
